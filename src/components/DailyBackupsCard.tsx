import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  HardDrive,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const DailyBackupsCard: React.FC = () => {
  const {
    dailyEntity,
    setDailyEntity,
    dailyMetrics,
    setActiveModal,
    isRunning,
    pulseTick
  } = useSimulation();

  const {
    freshness,
    total,
    successful,
    successfulPercent,
    failed,
    failedPercent,
    nonStarted,
    nonStartedPercent,
    amountTB
  } = dailyMetrics;

  // Calculate SVG stroke dashes for Donut chart
  const radius = 62;
  const circumference = 2 * Math.PI * radius; // ~389.55

  const successDash = (successfulPercent / 100) * circumference;
  const failedDash = (failedPercent / 100) * circumference;
  const nonStartedDash = (nonStartedPercent / 100) * circumference;

  const successOffset = 0;
  const failedOffset = -successDash;
  const nonStartedOffset = -(successDash + failedDash);

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700/80 transition-colors flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white tracking-tight">Daily Backups</h2>
            {isRunning && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Backups vs Clients switch */}
            <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setDailyEntity('backups')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  dailyEntity === 'backups'
                    ? 'bg-blue-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Backups
              </button>
              <button
                onClick={() => setDailyEntity('clients')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  dailyEntity === 'clients'
                    ? 'bg-blue-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Clients
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-950/60 px-2 py-1 rounded border border-slate-800">
              <Clock className="h-3 w-3 text-slate-500" />
              <span>{freshness}</span>
            </div>
          </div>
        </div>

        {/* Content: Donut Chart & Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-1">
          {/* SVG Donut */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                {/* Background Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="16"
                  fill="transparent"
                />

                {/* Successful segment (Emerald) */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-emerald-500 transition-all duration-700 ease-out"
                  strokeWidth="16"
                  strokeDasharray={`${successDash} ${circumference}`}
                  strokeDashoffset={successOffset}
                  fill="transparent"
                  strokeLinecap="round"
                />

                {/* Failed segment (Rose) */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-rose-500 transition-all duration-700 ease-out"
                  strokeWidth="16"
                  strokeDasharray={`${failedDash} ${circumference}`}
                  strokeDashoffset={failedOffset}
                  fill="transparent"
                  strokeLinecap="round"
                />

                {/* Non-started segment (Amber) */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-amber-400 transition-all duration-700 ease-out"
                  strokeWidth="16"
                  strokeDasharray={`${nonStartedDash} ${circumference}`}
                  strokeDashoffset={nonStartedOffset}
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>

              {/* Inside Donut Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold font-mono tracking-tight text-white">
                  {total.toLocaleString()}
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 tracking-wide uppercase">
                  {successfulPercent}% Success
                </span>
                <span className="text-[10px] text-slate-400 capitalize">Total {dailyEntity}</span>
              </div>
            </div>
          </div>

          {/* Right Metrics Cards */}
          <div className="md:col-span-7 space-y-2.5">
            {/* Successful Row */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-200">Successful</div>
                  <div className="text-[11px] text-slate-400">Policy completed with 0 errors</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-mono text-emerald-400">
                  {successful.toLocaleString()}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {successfulPercent}%
                </div>
              </div>
            </div>

            {/* Failed Row - Clickable to open Failed Jobs Inspector */}
            <div
              onClick={() => setActiveModal('failedJobs')}
              className="flex items-center justify-between p-2.5 rounded-lg bg-rose-950/25 border border-rose-900/40 hover:border-rose-700 cursor-pointer transition-colors group"
              title="Click to inspect failed backup jobs"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-rose-500/20 text-rose-400 group-hover:scale-105 transition-transform">
                  <XCircle className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-rose-200 flex items-center gap-1.5">
                    Failed Backups
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-900/50 text-rose-300">
                      View details
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">VSS timeout / locked file errors</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-mono text-rose-400">
                  {failed.toLocaleString()}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {failedPercent}%
                </div>
              </div>
            </div>

            {/* Non-Started Row */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-amber-500/20 text-amber-400">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-amber-200">Non Started</div>
                  <div className="text-[11px] text-slate-400">Queued in scheduler window</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-mono text-amber-400">
                  {nonStarted.toLocaleString()}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {nonStartedPercent}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info: Amount Transferred */}
      <div className="pt-3 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-400 flex items-center gap-1.5">
          <HardDrive className="h-3.5 w-3.5 text-cyan-400" />
          Daily Ingested Volume:
        </span>
        <span className="font-mono font-bold text-white tracking-wide bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/60">
          {amountTB} TB <span className="font-normal text-slate-400">amount</span>
        </span>
      </div>
    </div>
  );
};
