import React, { useState } from 'react';
import {
  BarChart3,
  Clock,
  Layers,
  Calendar,
  Info
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const BackupsHistoryCard: React.FC = () => {
  const {
    historyEntity,
    setHistoryEntity,
    historyMetric,
    setHistoryMetric,
    historyGranularity,
    setHistoryGranularity,
    historyData
  } = useSimulation();

  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const {
    freshness,
    successful,
    successfulPercent,
    failed,
    failedPercent,
    nonStarted,
    nonStartedPercent,
    amountPB,
    timePoints
  } = historyData;

  // Find max point total for chart scaling
  const maxTotal = Math.max(
    ...timePoints.map(p => p.successful + p.failed + p.nonStarted),
    1
  );

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700/80 transition-colors flex flex-col justify-between">
      {/* Header with Title, Controls, and Freshness */}
      <div>
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800/80 mb-4 gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white tracking-tight">
              Backups History
              <span className="text-slate-400 font-normal text-xs ml-2">
                | {historyGranularity === 'month' ? 'Month - Week' : historyGranularity === 'week' ? 'Weekly Rollup' : 'Daily Trend'}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-950/60 px-2 py-1 rounded border border-slate-800">
            <Clock className="h-3 w-3 text-slate-500" />
            <span>{freshness}</span>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 text-xs">
          {/* Entity & Metric Controls */}
          <div className="flex items-center gap-2">
            {/* Backups vs Clients */}
            <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setHistoryEntity('backups')}
                className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  historyEntity === 'backups'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Backups
              </button>
              <button
                onClick={() => setHistoryEntity('clients')}
                className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  historyEntity === 'clients'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Clients
              </button>
            </div>

            {/* Sum vs Average */}
            <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setHistoryMetric('sum')}
                className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  historyMetric === 'sum'
                    ? 'bg-slate-700 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sum
              </button>
              <button
                onClick={() => setHistoryMetric('average')}
                className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  historyMetric === 'average'
                    ? 'bg-slate-700 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Average
              </button>
            </div>
          </div>

          {/* Granularity switch: Month / Week / Day */}
          <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
            {(['month', 'week', 'day'] as const).map(gran => (
              <button
                key={gran}
                onClick={() => setHistoryGranularity(gran)}
                className={`px-2.5 py-0.5 rounded text-xs capitalize transition-colors cursor-pointer ${
                  historyGranularity === gran
                    ? 'bg-cyan-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {gran}
              </button>
            ))}
          </div>
        </div>

        {/* Aggregated Numbers Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 mb-5 text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-sans">Successful</span>
            <span className="text-emerald-400 font-bold text-sm">
              {successful.toLocaleString()}
            </span>
            <span className="text-slate-400 ml-1 text-[11px]">({successfulPercent}%)</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-sans">Failed</span>
            <span className="text-rose-400 font-bold text-sm">
              {failed.toLocaleString()}
            </span>
            <span className="text-slate-400 ml-1 text-[11px]">({failedPercent}%)</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-sans">Non Started</span>
            <span className="text-amber-400 font-bold text-sm">
              {nonStarted.toLocaleString()}
            </span>
            <span className="text-slate-400 ml-1 text-[11px]">({nonStartedPercent}%)</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-sans">Total Volume</span>
            <span className="text-cyan-400 font-bold text-sm">
              {amountPB} PB
            </span>
            <span className="text-slate-400 ml-1 text-[11px]">amount</span>
          </div>
        </div>

        {/* Stacked Histogram Chart */}
        <div className="relative pt-2 pb-1">
          {/* Legend */}
          <div className="flex items-center justify-end gap-4 text-[11px] text-slate-400 mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Successful
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Failed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> Non Started
            </span>
          </div>

          {/* Bar container */}
          <div className="h-44 flex items-end gap-3 sm:gap-6 pt-4 border-b border-slate-800">
            {timePoints.map((point, index) => {
              const pointTotal = point.successful + point.failed + point.nonStarted;
              const totalHeightPercent = (pointTotal / maxTotal) * 100;
              const successPercent = (point.successful / pointTotal) * totalHeightPercent;
              const failedPercentBar = (point.failed / pointTotal) * totalHeightPercent;
              const nonStartedPercentBar = (point.nonStarted / pointTotal) * totalHeightPercent;

              const isHovered = hoveredPointIndex === index;

              return (
                <div
                  key={point.label}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  onMouseEnter={() => setHoveredPointIndex(index)}
                  onMouseLeave={() => setHoveredPointIndex(null)}
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -top-12 z-20 bg-slate-950 border border-slate-700 px-2.5 py-1.5 rounded shadow-lg text-[11px] font-mono whitespace-nowrap pointer-events-none">
                      <div className="font-bold text-white border-b border-slate-800 pb-0.5 mb-1 flex justify-between gap-3">
                        <span>{point.label}</span>
                        <span className="text-cyan-400">{point.amountPB} PB</span>
                      </div>
                      <div className="text-emerald-400">✓ {point.successful.toLocaleString()}</div>
                      <div className="text-rose-400">✗ {point.failed.toLocaleString()}</div>
                      <div className="text-amber-400">○ {point.nonStarted.toLocaleString()}</div>
                    </div>
                  )}

                  {/* Stacked bar segments */}
                  <div
                    className={`w-full max-w-[42px] flex flex-col justify-end rounded-t overflow-hidden transition-all duration-300 ${
                      isHovered ? 'ring-2 ring-cyan-400/80' : ''
                    }`}
                    style={{ height: `${totalHeightPercent}%` }}
                  >
                    <div
                      style={{ height: `${(point.nonStarted / pointTotal) * 100}%` }}
                      className="bg-amber-400/90 w-full transition-all duration-500"
                    />
                    <div
                      style={{ height: `${(point.failed / pointTotal) * 100}%` }}
                      className="bg-rose-500/90 w-full transition-all duration-500"
                    />
                    <div
                      style={{ height: `${(point.successful / pointTotal) * 100}%` }}
                      className="bg-emerald-500/90 w-full transition-all duration-500"
                    />
                  </div>

                  {/* Label */}
                  <span className={`text-[11px] font-mono mt-2 transition-colors ${
                    isHovered ? 'text-cyan-400 font-bold' : 'text-slate-400'
                  }`}>
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Aggregation: {historyMetric.toUpperCase()} ({historyGranularity.toUpperCase()})</span>
        <span className="text-slate-300">Total: {timePoints.reduce((acc, p) => acc + p.successful + p.failed + p.nonStarted, 0).toLocaleString()} records</span>
      </div>
    </div>
  );
};
