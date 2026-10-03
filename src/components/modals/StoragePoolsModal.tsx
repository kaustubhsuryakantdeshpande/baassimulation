import React from 'react';
import {
  X,
  Database,
  CheckCircle,
  AlertTriangle,
  HardDrive,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const StoragePoolsModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    storagePools,
    reclaimStoragePool
  } = useSimulation();

  if (activeModal !== 'storagePools') return null;

  const notOkCount = storagePools.filter(p => p.status === 'notok').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Storage Pools Management
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                  48 ok · {notOkCount} alerts
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                IBM Spectrum Protect storage pool thresholds, directory containers and reclamation
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

        {/* Pool List */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1 font-mono text-xs">
          {storagePools.map((pool) => {
            const isDegraded = pool.status === 'notok';

            return (
              <div
                key={pool.id}
                className={`p-4 rounded-lg bg-slate-950/80 border transition-all space-y-2.5 ${
                  isDegraded
                    ? 'border-amber-900/60 bg-amber-950/15'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {pool.name}
                    </span>
                    <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      Type: {pool.type}
                    </span>
                    <span className="text-[11px] text-slate-500 font-sans">
                      Server: {pool.server}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isDegraded ? (
                      <span className="flex items-center gap-1 text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800">
                        <AlertTriangle className="h-3 w-3" />
                        Threshold Alert
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800">
                        <CheckCircle className="h-3 w-3" />
                        Healthy
                      </span>
                    )}

                    {isDegraded && (
                      <button
                        onClick={() => reclaimStoragePool(pool.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors cursor-pointer text-xs"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Run Reclamation</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Utilization Bar */}
                <div className="space-y-1 font-sans">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Capacity Allocated: {pool.capacityTB} TB</span>
                    <span className="font-mono font-bold text-white">{pool.usedPercent}% Used</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        pool.usedPercent > 90
                          ? 'bg-rose-500'
                          : pool.usedPercent > 80
                          ? 'bg-amber-500'
                          : 'bg-indigo-500'
                      }`}
                      style={{ width: `${pool.usedPercent}%` }}
                    />
                  </div>
                </div>

                {pool.warningReason && (
                  <div className="p-2.5 rounded bg-amber-950/30 border border-amber-900/40 text-amber-300 font-sans text-xs">
                    <strong>Issue:</strong> {pool.warningReason}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Total Aggregate Pool Pool: 48 online / 2 warning
          </span>
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
