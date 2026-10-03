import React from 'react';
import {
  X,
  Archive,
  Disc,
  Layers,
  Radio,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const TapeRackModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    tapeStorage
  } = useSimulation();

  if (activeModal !== 'tapeRack') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <Archive className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                IBM Tape Library 35xx/45xx Hardware Rack
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-teal-300">
                  72 Slots · 4 Drives
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Robotic arm status: ONLINE · Media standard: Ultrium LTO-8 (12 TB Native / 30 TB Compressed)
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
        <div className="p-6 overflow-y-auto space-y-5 font-mono text-xs">
          {/* Drive Bays */}
          <div>
            <div className="text-xs font-semibold text-slate-200 mb-2 font-sans flex items-center gap-2">
              <Cpu className="h-4 w-4 text-teal-400" />
              Tape Drive Bays (LTO-8 FC 8Gb)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tapeStorage.drives.map((drv, idx) => (
                <div
                  key={drv.id}
                  className="p-3.5 rounded-lg bg-slate-950/90 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">BAY #{idx + 1}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      drv.status === 'writing'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : drv.status === 'reading'
                        ? 'bg-blue-950 text-blue-300 border border-blue-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {drv.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 space-y-0.5">
                    <div>Drive: <span className="text-slate-200">{drv.driveName}</span></div>
                    <div>Mounted Tape: <span className="text-cyan-400 font-bold">{drv.tapeSerial}</span></div>
                    <div>Transfer: <span className="text-emerald-400 font-bold">{drv.speedMBs} MB/s</span></div>
                    <div>Mount Time: <span className="text-slate-300">{drv.mountTime}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 72 Slots Matrix */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-200 font-sans">
                Cartridge Slots Matrix (72 Slots)
              </span>
              <div className="flex items-center gap-4 text-[11px] text-slate-400 font-sans">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" /> 2 In Use
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/80" /> 70 Scratch Ready
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 grid grid-cols-8 sm:grid-cols-12 gap-1.5 max-h-48 overflow-y-auto">
              {Array.from({ length: 72 }).map((_, i) => {
                const isMounted = i === 13 || i === 24;
                const tapeId = `L8-${String(i + 1).padStart(3, '0')}`;
                return (
                  <div
                    key={i}
                    title={`Slot #${i + 1}: ${isMounted ? 'Mounted / Active' : 'Scratch Media available'}`}
                    className={`h-7 rounded flex items-center justify-center text-[10px] cursor-pointer transition-transform hover:scale-105 ${
                      isMounted
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-emerald-400 border border-slate-700/60'
                    }`}
                  >
                    #{i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Robotic accessor calibrations: NORMAL · Clean cycles: 0 pending
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
