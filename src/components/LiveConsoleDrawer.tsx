import React, { useState } from 'react';
import {
  Terminal,
  ChevronUp,
  ChevronDown,
  Trash2,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const LiveConsoleDrawer: React.FC = () => {
  const { logs, clearLogs, isRunning } = useSimulation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [logFilter, setLogFilter] = useState<'all' | 'error' | 'warning' | 'success' | 'backup' | 'storage'>('all');

  const filteredLogs = logs.filter(log => {
    if (logFilter === 'all') return true;
    if (logFilter === 'error') return log.level === 'error';
    if (logFilter === 'warning') return log.level === 'warning';
    if (logFilter === 'success') return log.level === 'success';
    if (logFilter === 'backup') return log.category === 'backup';
    if (logFilter === 'storage') return log.category === 'storage' || log.category === 'tape';
    return true;
  });

  return (
    <div className="border border-slate-800 bg-slate-950/95 rounded-xl overflow-hidden shadow-lg transition-all duration-300">
      {/* Console Header Bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 cursor-pointer select-none group flex-1"
        >
          <div className="p-1 rounded bg-slate-800 text-cyan-400 group-hover:bg-slate-700 transition-colors">
            <Terminal className="h-3.5 w-3.5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-wide">
              Live Operations Console & Audit Stream
            </span>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {logs.length} events
            </span>
          </div>
          {isRunning && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              STREAMING
            </span>
          )}
        </div>

        {/* Console Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Filters */}
          {isOpen && (
            <div className="flex items-center bg-slate-950 p-0.5 rounded border border-slate-800 text-[11px]">
              {(['all', 'error', 'warning', 'success'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setLogFilter(f)}
                  className={`px-2 py-0.5 rounded capitalize transition-colors cursor-pointer ${
                    logFilter === f
                      ? 'bg-cyan-600 text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          {isOpen && (
            <button
              onClick={clearLogs}
              className="p-1 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800 transition-colors cursor-pointer"
              title="Clear console output"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}

          {isOpen && (
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              title={isMaximized ? 'Restore height' : 'Maximize height'}
            >
              {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Console Stream Body */}
      {isOpen && (
        <div
          className={`font-mono text-xs overflow-y-auto p-3 space-y-1.5 bg-[#070b13] transition-all duration-300 ${
            isMaximized ? 'h-96' : 'h-48'
          }`}
        >
          {filteredLogs.length === 0 ? (
            <div className="text-slate-500 py-6 text-center">
              No matching log events in current stream buffer.
            </div>
          ) : (
            filteredLogs.map(log => {
              let badgeColor = 'text-cyan-400 border-cyan-800/60 bg-cyan-950/40';
              let icon = <Info className="h-3 w-3 shrink-0 text-cyan-400" />;

              if (log.level === 'success') {
                badgeColor = 'text-emerald-400 border-emerald-800/60 bg-emerald-950/40';
                icon = <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-400" />;
              } else if (log.level === 'warning') {
                badgeColor = 'text-amber-400 border-amber-800/60 bg-amber-950/40';
                icon = <AlertTriangle className="h-3 w-3 shrink-0 text-amber-400" />;
              } else if (log.level === 'error') {
                badgeColor = 'text-rose-400 border-rose-800/60 bg-rose-950/40';
                icon = <XCircle className="h-3 w-3 shrink-0 text-rose-400" />;
              }

              return (
                <div
                  key={log.id}
                  className="flex items-start gap-2.5 py-1 px-2 rounded hover:bg-slate-900/60 transition-colors group"
                >
                  <span className="text-slate-500 text-[11px] shrink-0 pt-0.5">
                    {log.timestamp}
                  </span>
                  <div className="pt-0.5">{icon}</div>
                  <span
                    className={`text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded border ${badgeColor} shrink-0`}
                  >
                    {log.category}
                  </span>
                  {log.server && (
                    <span className="text-slate-400 font-bold shrink-0">
                      [{log.server}]
                    </span>
                  )}
                  {log.node && (
                    <span className="text-cyan-300 font-semibold shrink-0">
                      {log.node}:
                    </span>
                  )}
                  <span className="text-slate-300 flex-1 break-words">
                    {log.message}
                  </span>
                  {log.size && (
                    <span className="text-emerald-400 text-[11px] shrink-0 ml-2">
                      +{log.size}
                    </span>
                  )}
                  {log.duration && (
                    <span className="text-slate-500 text-[11px] shrink-0">
                      ({log.duration})
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
