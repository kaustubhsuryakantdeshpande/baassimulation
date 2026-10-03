import React from 'react';
import {
  Play,
  Pause,
  Zap,
  AlertTriangle,
  RotateCcw,
  FileDown,
  Server,
  Activity,
  Radio,
  ChevronDown
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const Header: React.FC = () => {
  const {
    isRunning,
    toggleRunning,
    speed,
    setSpeed,
    selectedServerGroup,
    setSelectedServerGroup,
    triggerBackupWave,
    simulateFailureIncident,
    resetSimulation,
    setActiveModal,
    failedJobs,
    storagePools,
    logs
  } = useSimulation();

  const latestLog = logs[0];
  const notOkPoolsCount = storagePools.filter(p => p.status === 'notok').length;

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Primary Top Bar */}
      <div className="max-w-[1720px] mx-auto px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Title and Branding */}
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Backup as a Service
                <span className="text-slate-400 font-normal text-sm sm:inline hidden">— Operations Dashboard</span>
              </h1>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide bg-slate-900 border border-slate-700 text-slate-300">
                <span className={`h-2 w-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                {isRunning ? 'SIMULATION ACTIVE' : 'PAUSED'}
              </div>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Multi-tenant enterprise backup telemetry · IBM Spectrum Protect, Veeam, Rubrik, NetWorker
            </p>
          </div>
        </div>

        {/* Server Group & Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Server Group Selector */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-md px-2.5 py-1 text-xs text-slate-300">
            <span className="text-slate-500 mr-2 text-[11px] uppercase tracking-wider font-semibold">Group:</span>
            <select
              value={selectedServerGroup}
              onChange={(e) => setSelectedServerGroup(e.target.value)}
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer text-xs pr-1"
            >
              <option value="IBM SP A" className="bg-slate-900 text-slate-200">IBM SP A (Primary)</option>
              <option value="Veeam Fleet" className="bg-slate-900 text-slate-200">Veeam Fleet</option>
              <option value="Rubrik Cloud" className="bg-slate-900 text-slate-200">Rubrik Cloud</option>
              <option value="EMC Enterprise" className="bg-slate-900 text-slate-200">EMC Enterprise</option>
              <option value="All Groups" className="bg-slate-900 text-slate-200">All Clusters</option>
            </select>
            <ChevronDown className="h-3 w-3 text-slate-500 pointer-events-none ml-1" />
          </div>

          {/* Speed Selector */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-md p-0.5 text-xs">
            {([1, 2, 5, 10] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  speed === s
                    ? 'bg-cyan-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Set simulation speed to ${s}x`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Play / Pause Toggle */}
          <button
            onClick={toggleRunning}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
              isRunning
                ? 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                : 'bg-emerald-600/90 hover:bg-emerald-500 border-emerald-500 text-white'
            }`}
            title={isRunning ? 'Pause simulation stream' : 'Resume simulation stream'}
          >
            {isRunning ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Run</span>
              </>
            )}
          </button>

          {/* Quick Simulation Triggers */}
          <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2">
            <button
              onClick={triggerBackupWave}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/70 text-cyan-300 transition-colors cursor-pointer"
              title="Trigger a burst wave of completed backups"
            >
              <Zap className="h-3.5 w-3.5 text-cyan-400" />
              <span>Wave</span>
            </button>

            <button
              onClick={simulateFailureIncident}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/70 text-rose-300 transition-colors cursor-pointer"
              title="Inject a simulated node VSS snapshot failure"
            >
              <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
              <span>Inject Error</span>
            </button>

            <button
              onClick={resetSimulation}
              className="flex items-center gap-1 p-1.5 rounded-md text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
              title="Reset simulation data to baseline"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Action Modals buttons */}
          <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2">
            <button
              onClick={() => setActiveModal('failedJobs')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                failedJobs.length > 0
                  ? 'bg-rose-900/30 border-rose-700/60 text-rose-200 hover:bg-rose-900/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="font-mono font-bold text-rose-400">{failedJobs.length}</span>
              <span>Failed</span>
            </button>

            <button
              onClick={() => setActiveModal('storagePools')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                notOkPoolsCount > 0
                  ? 'bg-amber-900/30 border-amber-700/60 text-amber-200 hover:bg-amber-900/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="font-mono font-bold text-amber-400">{notOkPoolsCount}</span>
              <span>Pool Alerts</span>
            </button>

            <button
              onClick={() => setActiveModal('exportReport')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors cursor-pointer"
              title="Export SLA summary report"
            >
              <FileDown className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden md:inline">Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Event Ticker Marquee Bar */}
      <div className="bg-slate-900/80 border-t border-slate-800/80 px-4 lg:px-8 py-1.5 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400 min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[11px] font-mono uppercase font-semibold text-cyan-400 tracking-wider shrink-0">
            <Radio className="h-3 w-3 animate-pulse text-cyan-400" />
            <span>LIVE DISPATCH:</span>
          </div>

          {latestLog ? (
            <div className="flex items-center gap-2 truncate text-slate-300 font-mono text-[12px]">
              <span className="text-slate-500">[{latestLog.timestamp}]</span>
              <span
                className={`font-semibold ${
                  latestLog.level === 'error'
                    ? 'text-rose-400'
                    : latestLog.level === 'warning'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {latestLog.server}
                {latestLog.node ? ` · ${latestLog.node}` : ''}:
              </span>
              <span className="truncate">{latestLog.message}</span>
            </div>
          ) : (
            <span className="text-slate-500 font-mono text-xs">Waiting for events...</span>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3 text-slate-500 font-mono text-[11px] shrink-0">
          <span className="flex items-center gap-1">
            <Activity className="h-3 w-3 text-cyan-400" />
            <span>SLA 99.82%</span>
          </span>
          <span className="text-slate-700">|</span>
          <span>ESTIMATED RETENTION: 90 DAYS</span>
        </div>
      </div>
    </header>
  );
};
