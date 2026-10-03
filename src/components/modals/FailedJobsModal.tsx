import React from 'react';
import {
  X,
  AlertTriangle,
  RotateCw,
  Server,
  FileText,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const FailedJobsModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    failedJobs,
    retryFailedJob,
    retryAllFailedJobs
  } = useSimulation();

  if (activeModal !== 'failedJobs') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Failed Backup Jobs Inspector
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800 text-rose-300">
                  {failedJobs.length} active incidents
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Detailed root-cause error codes, lock contention, and recovery actions
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

        {/* Modal Body / Job List */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1 font-mono text-xs">
          {failedJobs.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-slate-200 font-semibold text-sm">All Backup Jobs Healthy</p>
              <p className="text-slate-400 text-xs font-sans max-w-sm mx-auto">
                No active failures recorded in the current schedule window. SLA target 99.8% is maintained.
              </p>
            </div>
          ) : (
            failedJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-lg bg-slate-950/80 border border-rose-950/60 hover:border-rose-900/80 transition-all space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {job.node}
                    </span>
                    <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {job.server}
                    </span>
                    <span className="text-[11px] text-slate-500 font-sans">
                      {job.os}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold px-2 py-0.5 rounded bg-rose-950 border border-rose-800">
                      {job.errorCode}
                    </span>
                    <button
                      onClick={() => retryFailedJob(job.id)}
                      disabled={job.isRetrying}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors disabled:opacity-50 cursor-pointer text-xs"
                    >
                      <RotateCw className={`h-3 w-3 ${job.isRetrying ? 'animate-spin' : ''}`} />
                      <span>{job.isRetrying ? 'Retrying...' : 'Retry Job'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-slate-300 font-sans text-xs leading-relaxed bg-slate-900/60 p-2.5 rounded border border-slate-800/60">
                  {job.errorMessage}
                </p>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 font-mono">
                  <div className="flex items-center gap-3">
                    <span>Failed at: {job.failedAt}</span>
                    <span>Payload: {job.dataSize}</span>
                  </div>
                  <span>Retry count: {job.retryAttempts}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Automated retry policy: Every 30 mins (max 3 retries)
          </span>

          <div className="flex items-center gap-2">
            {failedJobs.length > 0 && (
              <button
                onClick={retryAllFailedJobs}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs shadow-sm transition-colors cursor-pointer"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>Retry All ({failedJobs.length})</span>
              </button>
            )}
            <button
              onClick={closeModal}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
