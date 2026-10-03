import React from 'react';
import {
  X,
  Server,
  TrendingUp,
  Clock,
  HardDrive,
  Calendar,
  ShieldCheck,
  Play
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const NodeDetailModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    selectedNode,
    triggerBackupWave
  } = useSimulation();

  if (activeModal !== 'nodeDetail' || !selectedNode) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                {selectedNode.node}
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300">
                  {selectedNode.server}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {selectedNode.os} · Domain: PROD-ENTERPRISE · {selectedNode.group}
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 font-sans text-xs">
          {/* Growth Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 font-mono">
              <div className="text-slate-400 text-[10px] uppercase font-sans">90-Day Delta</div>
              <div className="text-base font-bold text-white mt-1">
                +{selectedNode.differenceFormatted}
              </div>
              <div className="text-[11px] text-slate-500">Incremental change</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 font-mono">
              <div className="text-slate-400 text-[10px] uppercase font-sans">Growth Rate</div>
              <div className="text-base font-bold text-rose-400 mt-1">
                +{selectedNode.percent.toFixed(2)} %
              </div>
              <div className="text-[11px] text-rose-500/80">Rapid storage tier expansion</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 font-mono">
              <div className="text-slate-400 text-[10px] uppercase font-sans">Last Backup</div>
              <div className="text-sm font-semibold text-emerald-400 mt-1">
                {selectedNode.lastBackupTime}
              </div>
              <div className="text-[11px] text-slate-500">Status: {selectedNode.status}</div>
            </div>
          </div>

          {/* Sparkline Visual */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold">90 Days Occupancy Trajectory</span>
              <span className="font-mono text-cyan-400 text-[11px]">Sampling: 7 checkpoints</span>
            </div>
            <div className="h-20 flex items-end gap-2 pt-3">
              {selectedNode.historySparkline.map((val, i) => {
                const max = Math.max(...selectedNode.historySparkline, 1);
                const height = Math.max(15, (val / max) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-slate-500">{val}G</span>
                    <div
                      className="w-full bg-cyan-500/80 hover:bg-cyan-400 rounded-t transition-all"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[9px] font-mono text-slate-500">T-{7 - i}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Retention & Protection Policy */}
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Backup Policy & SLA Binding
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-400 font-mono text-[11px]">
              <div>Policy Domain: <span className="text-slate-200">STANDARD_ENTERPRISE</span></div>
              <div>Retention: <span className="text-slate-200">90 Days Active</span></div>
              <div>Versions Exist: <span className="text-slate-200">3 Versions</span></div>
              <div>Versions Deleted: <span className="text-slate-200">1 Version</span></div>
              <div>Deduplication: <span className="text-emerald-400">Enabled (Client + Server)</span></div>
              <div>Compression: <span className="text-emerald-400">LZ4 In-Flight</span></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <button
            onClick={() => {
              triggerBackupWave();
              closeModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-sm transition-colors cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Trigger On-Demand Backup</span>
          </button>

          <button
            onClick={closeModal}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
