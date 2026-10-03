import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  Search,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { NodeOccupancyItem } from '../types/dashboard';

export const OccupancyGrowthCard: React.FC = () => {
  const {
    occupancyNodes,
    selectedServerGroup,
    openNodeDetail
  } = useSimulation();

  const [searchTerm, setSearchTerm] = useState('');

  // Filter nodes based on search and selected server group if needed
  const filteredNodes = occupancyNodes.filter(node => {
    const matchesSearch =
      node.node.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.server.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700/80 transition-colors flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800/80 mb-4 gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-cyan-500/10 text-cyan-400">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">
                ISP Occupancy Growth per Node/VM
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>90 Days Top 10</span>
                <span>·</span>
                <span className="text-cyan-400 font-mono">Server group: {selectedServerGroup}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-950/60 px-2 py-1 rounded border border-slate-800">
              <Clock className="h-3 w-3 text-slate-500" />
              <span>12m 2s</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search node or VM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-md pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <span className="text-[11px] text-slate-500 font-mono">
            Showing {filteredNodes.length} of {occupancyNodes.length}
          </span>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-800/90">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
                <th className="py-2 px-3 font-semibold">Server</th>
                <th className="py-2 px-3 font-semibold">Node</th>
                <th className="py-2 px-3 font-semibold text-right">Difference</th>
                <th className="py-2 px-3 font-semibold text-right">Percent</th>
                <th className="py-2 px-3 font-semibold text-center w-24">90d Trend</th>
                <th className="py-2 px-2 text-center w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredNodes.map((item) => {
                const isRapidGrowth = item.percent > 100;
                return (
                  <tr
                    key={item.id}
                    onClick={() => openNodeDetail(item)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-2 px-3 text-slate-300 font-medium whitespace-nowrap">
                      {item.server}
                    </td>
                    <td className="py-2 px-3 text-white font-medium whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="group-hover:text-cyan-400 transition-colors">
                          {item.node}
                        </span>
                        {item.status === 'failed' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" title="Recent backup failure" />
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-right text-slate-200 font-semibold whitespace-nowrap">
                      +{item.differenceFormatted}
                    </td>
                    <td className="py-2 px-3 text-right whitespace-nowrap">
                      <span
                        className={`font-semibold ${
                          isRapidGrowth
                            ? 'text-rose-400'
                            : item.percent > 40
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {item.percent > 0 ? '+' : ''}{item.percent.toFixed(2)} %
                      </span>
                    </td>
                    {/* Sparkline mini visual */}
                    <td className="py-2 px-3 text-center">
                      <div className="h-4 w-20 mx-auto flex items-end justify-center gap-0.5">
                        {item.historySparkline.map((val, idx) => {
                          const maxVal = Math.max(...item.historySparkline, 1);
                          const heightPct = Math.max(15, Math.round((val / maxVal) * 100));
                          return (
                            <div
                              key={idx}
                              className={`w-2 rounded-t-xs transition-all ${
                                isRapidGrowth ? 'bg-rose-500/70' : 'bg-cyan-500/70'
                              }`}
                              style={{ height: `${heightPct}%` }}
                            />
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-2 px-2 text-center text-slate-500 group-hover:text-slate-300">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-3 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span>Click any node row to inspect capacity quota, schedules & file versions</span>
        <button
          onClick={() => {
            const first = occupancyNodes[0];
            if (first) openNodeDetail(first);
          }}
          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-[11px] cursor-pointer"
        >
          <span>Top Spike details</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
