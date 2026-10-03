import React from 'react';
import {
  Server,
  HardDrive,
  Database,
  Layers,
  Clock,
  Cpu,
  Archive
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const EnvironmentOverviewCard: React.FC = () => {
  const { environment, pulseTick } = useSimulation();
  const { clients, servers, storage, devices } = environment;

  const totalClients =
    clients.ibmSpectrumProtect +
    clients.veeam +
    clients.rubrik +
    clients.emcNetWorker +
    clients.sepSesam +
    clients.ispp;

  const totalServers =
    servers.ibmSpectrumProtect +
    servers.emcNetWorker +
    servers.rubrik +
    servers.sepSesam +
    servers.ispp +
    servers.veeam;

  const diskPercent = Math.round((storage.diskUsedTB / storage.diskTotalTB) * 100);

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 shadow-sm hover:border-slate-700/80 transition-colors">
      {/* Header with Title and Freshness indicator */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white tracking-tight">Environment Overview</h2>
            <p className="text-xs text-slate-400">Inventory of active backup infrastructure & nodes</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-950/60 px-2.5 py-1 rounded border border-slate-800">
          <Clock className="h-3 w-3 text-slate-500" />
          <span>{environment.freshness}</span>
        </div>
      </div>

      {/* 4 Category Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. Backup Clients / Nodes / VMs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              Backup Clients / Nodes / VMs
            </span>
            <span className="text-xs font-mono font-semibold text-slate-200">
              {totalClients.toLocaleString()}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">IBM Spectrum Protect</span>
              <span className="font-mono text-slate-200 font-semibold">{clients.ibmSpectrumProtect.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(clients.ibmSpectrumProtect / totalClients) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between group pt-1">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">Veeam</span>
              <span className="font-mono text-slate-200">{clients.veeam}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">Rubrik</span>
              <span className="font-mono text-slate-200">{clients.rubrik}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">EMC NetWorker</span>
              <span className="font-mono text-slate-200">{clients.emcNetWorker}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">SEP sesam</span>
              <span className="font-mono text-slate-200">{clients.sepSesam}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">ISPP</span>
              <span className="font-mono text-slate-200">{clients.ispp}</span>
            </div>
          </div>
        </div>

        {/* 2. Backup Server */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-blue-400" />
              Backup Server
            </span>
            <span className="text-xs font-mono font-semibold text-slate-200">
              {totalServers} Instances
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">IBM Spectrum Protect</span>
              <span className="font-mono text-slate-200 font-semibold">{servers.ibmSpectrumProtect}</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(servers.ibmSpectrumProtect / totalServers) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between group pt-1">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">EMC NetWorker</span>
              <span className="font-mono text-slate-200">{servers.emcNetWorker}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">Rubrik</span>
              <span className="font-mono text-slate-200">{servers.rubrik}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">SEP sesam</span>
              <span className="font-mono text-slate-200">{servers.sepSesam}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">ISPP</span>
              <span className="font-mono text-slate-200">{servers.ispp}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">Veeam</span>
              <span className="font-mono text-slate-200">{servers.veeam}</span>
            </div>
          </div>
        </div>

        {/* 3. Backup Storage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <HardDrive className="h-3.5 w-3.5 text-indigo-400" />
              Backup Storage
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-400">
              {diskPercent}% Used
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex items-center justify-between group">
                <span className="text-slate-400">Disk</span>
                <span className="font-mono text-slate-200">
                  <strong className="text-white">{storage.diskUsedTB} TB</strong> / {storage.diskTotalTB} TB
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${diskPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-1">
              <div className="flex items-center justify-between group">
                <span className="text-slate-400">Tape</span>
                <span className="font-mono text-slate-300">
                  {storage.tapeUsedBytes.toFixed(2)} B / {storage.tapeTotalBytes.toFixed(2)} B
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between group pt-1">
              <span className="text-slate-400">Libraries</span>
              <span className="font-mono text-slate-200 font-semibold">{storage.librariesCount} Active</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400">Tapes</span>
              <span className="font-mono text-slate-200">
                <span className="text-cyan-400 font-semibold">{storage.tapesUsed}</span> / {storage.tapesTotal}
              </span>
            </div>

            <div className="p-2 rounded bg-slate-950/70 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between mt-2">
              <span>SCRATCH MEDIA</span>
              <span className="text-emerald-400 font-bold">{storage.tapesTotal - storage.tapesUsed} TAPES READY</span>
            </div>
          </div>
        </div>

        {/* 4. Storage Devices */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-teal-400" />
              Storage Devices
            </span>
            <span className="text-xs font-mono font-semibold text-slate-200">
              16 Units
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">DataDomain</span>
              <span className="font-mono text-slate-200 font-semibold">{devices.dataDomain}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">IBM Tape Library 35xx/45xx</span>
              <span className="font-mono text-slate-200">{devices.ibmTape35xx45xx}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">Isilon Node</span>
              <span className="font-mono text-slate-200">{devices.isilonNode}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">IBM Tape Library 33xx</span>
              <span className="font-mono text-slate-200">{devices.ibmTape33xx}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">Isilon Cluster</span>
              <span className="font-mono text-slate-200">{devices.isilonCluster}</span>
            </div>

            <div className="flex items-center justify-between group">
              <span className="text-slate-400 group-hover:text-slate-200 transition-colors">IBM Tape Library</span>
              <span className="font-mono text-slate-200">{devices.ibmTapeLibrary}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
