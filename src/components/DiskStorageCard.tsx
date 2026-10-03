import React from 'react';
import {
  HardDrive,
  Clock,
  CheckCircle,
  AlertTriangle,
  FolderSync,
  Activity,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const DiskStorageCard: React.FC = () => {
  const { diskStorage, setActiveModal, pulseTick } = useSimulation();

  const {
    freshness,
    usedTB,
    freeTB,
    usedPercent,
    freePercent,
    poolsOk,
    poolsNotOk,
    dirspaceOk,
    dirspaceNotOk,
    fileDeviceUsedGB,
    fileDeviceFreeGB,
    readThroughputMBs,
    writeThroughputMBs,
    dedupRatio
  } = diskStorage;

  // Gauge calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius; // ~339.29
  const usedDash = (usedPercent / 100) * circumference;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700/80 transition-colors flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-indigo-500/10 text-indigo-400">
              <HardDrive className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white tracking-tight">
                Backup Storage Disk
              </h2>
              <div className="text-xs text-slate-400">Primary deduplicated disk tier</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-950/60 px-2 py-1 rounded border border-slate-800">
            <Clock className="h-3 w-3 text-slate-500" />
            <span>{freshness}</span>
          </div>
        </div>

        {/* Circular Gauge and Capacity Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-4">
          {/* Gauge */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="14"
                  fill="transparent"
                />
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  className="stroke-indigo-500 transition-all duration-700 ease-out"
                  strokeWidth="14"
                  strokeDasharray={`${usedDash} ${circumference}`}
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold font-mono text-white">
                  {usedPercent.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Disk Used
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown numbers */}
          <div className="md:col-span-7 space-y-2 font-mono text-xs">
            <div className="text-slate-200 font-semibold mb-1 flex items-center justify-between">
              <span className="font-sans text-xs text-slate-400">Storage Utilization</span>
              <span className="text-indigo-400 font-mono text-sm">{usedTB} TB / {(usedTB + freeTB).toFixed(2)} TB</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 font-sans">Used capacity:</span>
              <span className="font-bold text-white">
                {usedTB} TB <span className="text-indigo-400 font-normal">({usedPercent} %)</span>
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 font-sans">Free space:</span>
              <span className="font-bold text-emerald-400">
                {freeTB} TB <span className="text-emerald-500/80 font-normal">({freePercent} %)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Pools and Dirspace Status Rows */}
        <div className="grid grid-cols-2 gap-3 text-xs mb-3">
          {/* Pools */}
          <div
            onClick={() => setActiveModal('storagePools')}
            className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 font-medium font-sans">Pools</span>
              <span className="text-[10px] font-mono text-cyan-400 group-hover:underline">inspect</span>
            </div>
            <div className="flex items-center gap-3 font-mono">
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle className="h-3 w-3" />
                <span>{poolsOk} ok</span>
              </div>
              <div className={`flex items-center gap-1 font-bold ${poolsNotOk > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                {poolsNotOk > 0 ? <AlertTriangle className="h-3 w-3" /> : null}
                <span>{poolsNotOk} notok</span>
              </div>
            </div>
          </div>

          {/* Dirspace */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 font-medium font-sans">Dirspace</span>
              <span className="text-[10px] font-mono text-slate-500">23 containers</span>
            </div>
            <div className="flex items-center gap-3 font-mono">
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle className="h-3 w-3" />
                <span>{dirspaceOk} ok</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <span>{dirspaceNotOk} notok</span>
              </div>
            </div>
          </div>
        </div>

        {/* File Device Stats */}
        <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs flex items-center justify-between font-mono">
          <span className="text-slate-400 font-sans flex items-center gap-1.5">
            <FolderSync className="h-3.5 w-3.5 text-indigo-400" />
            File Device Volumes:
          </span>
          <span className="text-slate-200">
            <strong className="text-white">{fileDeviceUsedGB} GB</strong> used / {fileDeviceFreeGB} GB free
          </span>
        </div>
      </div>

      {/* Live I/O Footer */}
      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex items-center text-cyan-400">
            <ArrowDownRight className="h-3 w-3 mr-0.5" />
            {readThroughputMBs} MB/s
          </span>
          <span className="flex items-center text-indigo-400">
            <ArrowUpRight className="h-3 w-3 mr-0.5" />
            {writeThroughputMBs} MB/s
          </span>
        </div>
        <div className="text-slate-300">
          DEDUP RATIO: <span className="text-emerald-400 font-bold">{dedupRatio}:1</span>
        </div>
      </div>
    </div>
  );
};
