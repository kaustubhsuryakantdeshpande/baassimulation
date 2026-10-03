/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SimulationProvider } from './context/SimulationContext';
import { Header } from './components/Header';
import { EnvironmentOverviewCard } from './components/EnvironmentOverviewCard';
import { DailyBackupsCard } from './components/DailyBackupsCard';
import { BackupsHistoryCard } from './components/BackupsHistoryCard';
import { OccupancyGrowthCard } from './components/OccupancyGrowthCard';
import { DiskStorageCard } from './components/DiskStorageCard';
import { TapeStorageCard } from './components/TapeStorageCard';
import { LiveConsoleDrawer } from './components/LiveConsoleDrawer';

import { FailedJobsModal } from './components/modals/FailedJobsModal';
import { StoragePoolsModal } from './components/modals/StoragePoolsModal';
import { NodeDetailModal } from './components/modals/NodeDetailModal';
import { TapeRackModal } from './components/modals/TapeRackModal';
import { ExportReportModal } from './components/modals/ExportReportModal';

export default function App() {
  return (
    <SimulationProvider>
      <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Navigation & Live Controls Header */}
        <Header />

        {/* Main Dashboard Grid */}
        <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
          {/* Panel 1: Environment Overview (Clients, Servers, Storage, Devices) */}
          <section aria-label="Environment Overview">
            <EnvironmentOverviewCard />
          </section>

          {/* Panel 2 & 3: Daily Backups & Backups History */}
          <section aria-label="Daily Backups and History" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyBackupsCard />
            <BackupsHistoryCard />
          </section>

          {/* Panel 4, 5, 6: Occupancy Growth, Disk Storage, Tape Storage */}
          <section aria-label="Storage and Occupancy" className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Occupancy Growth per Node/VM */}
            <div className="xl:col-span-6">
              <OccupancyGrowthCard />
            </div>

            {/* Storage Disk Tier */}
            <div className="xl:col-span-3">
              <DiskStorageCard />
            </div>

            {/* Storage Tape Tier */}
            <div className="xl:col-span-3">
              <TapeStorageCard />
            </div>
          </section>

          {/* Live Operations & Audit Console */}
          <section aria-label="Live Operations Console">
            <LiveConsoleDrawer />
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/60 py-4 px-4 lg:px-8 text-center text-xs text-slate-500 font-mono">
          <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-2">
            <span>Backup as a Service (BaaS) · Operations & Disaster Recovery Simulation Platform</span>
            <span>Protocols: IBM TSM/ISP · Veeam VBR · Rubrik CDM · EMC NetWorker</span>
          </div>
        </footer>

        {/* Action & Drilldown Modals */}
        <FailedJobsModal />
        <StoragePoolsModal />
        <NodeDetailModal />
        <TapeRackModal />
        <ExportReportModal />
      </div>
    </SimulationProvider>
  );
}
