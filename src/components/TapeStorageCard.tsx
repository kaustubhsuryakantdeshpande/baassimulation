import React from 'react';
import {
  Archive,
  Clock,
  CheckCircle,
  Radio,
  Disc,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const TapeStorageCard: React.FC = () => {
  const { tapeStorage, setActiveModal, pulseTick } = useSimulation();

  const {
    freshness,
    usedBytes,
    totalBytes,
    freeBytes,
    usedPercent,
    freePercent,
    poolsOk,
    poolsNotOk,
    pathsOnline,
    pathsOffline,
    tapesUsed,
    tapesScratch,
    librariesOnline,
    librariesOffline,
    drivesOnline,
    drivesOffline,
    drives
  } = tapeStorage;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700/80 transition-colors flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-teal-500/10 text-teal-400">
              <Archive className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">
                Backup Storage Tape
              </h2>
              <div className="text-xs text-slate-400">IBM LTO-8 tape automation library</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-950/60 px-2 py-1 rounded border border-slate-800">
            <Clock className="h-3 w-3 text-slate-500" />
            <span>{freshness}</span>
          </div>
        </div>

        {/* Utilization gauge & stats */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-4">
          {/* Circular ring representation */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  className="stroke-slate-800"
                  strokeWidth="14"
                  fill="transparent"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  className="stroke-teal-500 transition-all duration-700 ease-out"
                  strokeWidth="14"
                  strokeDasharray={`${(Math.max(1, usedPercent) / 100) * 339.29} 339.29`}
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold font-mono text-white">
                  {usedPercent.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Pool Used
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown numbers matching the reference */}
          <div className="md:col-span-7 space-y-2 font-mono text-xs">
            <div className="text-slate-200 font-semibold mb-1 flex items-center justify-between">
              <span className="font-sans text-xs text-slate-400">Pool Utilization</span>
              <span className="text-teal-400 font-mono text-sm">{usedBytes.toFixed(2)} B / {totalBytes.toFixed(2)} B</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 font-sans">Used capacity:</span>
              <span className="font-bold text-white">
                {usedBytes.toFixed(2)} B <span className="text-teal-400 font-normal">({usedPercent.toFixed(1)} %)</span>
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 font-sans">Free space:</span>
              <span className="font-bold text-emerald-400">
                {freeBytes.toFixed(2)} B <span className="text-emerald-500/80 font-normal">({freePercent.toFixed(1)} %)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Status Grid matching exact reference:
            Pools 3 ok 0 notok | Paths 4 0 online offline | Tapes 2 70 used scratch | Libraries 1 0 online offline | Drives 3 0 online offline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono mb-3">
          {/* Pools */}
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 font-sans text-[11px] mb-1">Pools</div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold">{poolsOk} ok</span>
              <span className="text-slate-500">{poolsNotOk} notok</span>
            </div>
          </div>

          {/* Paths */}
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 font-sans text-[11px] mb-1">Paths</div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold">{pathsOnline} online</span>
              <span className="text-slate-500">{pathsOffline} offline</span>
            </div>
          </div>

          {/* Tapes */}
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 font-sans text-[11px] mb-1">Tapes</div>
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 font-bold">{tapesUsed} used</span>
              <span className="text-emerald-400 font-bold">{tapesScratch} scratch</span>
            </div>
          </div>

          {/* Libraries */}
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 font-sans text-[11px] mb-1">Libraries</div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold">{librariesOnline} online</span>
              <span className="text-slate-500">{librariesOffline} offline</span>
            </div>
          </div>

          {/* Drives */}
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 sm:col-span-2">
            <div className="text-slate-400 font-sans text-[11px] mb-1">Drives Status</div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold">{drivesOnline} online</span>
              <span className="text-slate-500">{drivesOffline} offline</span>
              <button
                onClick={() => setActiveModal('tapeRack')}
                className="text-[10px] text-teal-400 hover:text-teal-300 font-sans cursor-pointer underline ml-2"
              >
                view rack
              </button>
            </div>
          </div>
        </div>

        {/* Mini Tape Drive Live Status */}
        <div className="space-y-1.5 pt-1">
          {drives.map(drive => (
            <div
              key={drive.id}
              className="flex items-center justify-between p-2 rounded bg-slate-950/40 border border-slate-800/80 text-[11px] font-mono"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  drive.status === 'writing'
                    ? 'bg-cyan-400 animate-pulse'
                    : drive.status === 'reading'
                    ? 'bg-blue-400 animate-pulse'
                    : 'bg-slate-600'
                }`} />
                <span className="text-slate-300 font-semibold">{drive.driveName}</span>
                <span className="text-slate-500">[{drive.tapeSerial}]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`capitalize ${
                  drive.status === 'writing' ? 'text-cyan-300' : drive.status === 'reading' ? 'text-blue-300' : 'text-slate-500'
                }`}>
                  {drive.status}
                </span>
                {drive.speedMBs > 0 && (
                  <span className="text-emerald-400 font-bold">
                    {drive.speedMBs} MB/s
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Vault Rotation: 70 scratch media available</span>
        <button
          onClick={() => setActiveModal('tapeRack')}
          className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-sans cursor-pointer text-xs"
        >
          <span>Library bays</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
