import React, { useState } from 'react';
import {
  X,
  FileDown,
  Check,
  Copy,
  Table,
  FileText
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const ExportReportModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    dailyMetrics,
    environment,
    occupancyNodes,
    diskStorage,
    tapeStorage
  } = useSimulation();

  const [copied, setCopied] = useState(false);

  if (activeModal !== 'exportReport') return null;

  const reportData = {
    generatedAt: new Date().toISOString(),
    environment: {
      totalClients: Object.values(environment.clients).reduce((a, b) => a + b, 0),
      totalServers: Object.values(environment.servers).reduce((a, b) => a + b, 0),
      diskUsedTB: diskStorage.usedTB,
      diskTotalTB: diskStorage.totalTB,
      poolsHealthy: diskStorage.poolsOk,
      poolsDegraded: diskStorage.poolsNotOk
    },
    dailyMetrics: {
      totalBackups: dailyMetrics.total,
      successful: dailyMetrics.successful,
      successRate: `${dailyMetrics.successfulPercent}%`,
      failed: dailyMetrics.failed,
      failedRate: `${dailyMetrics.failedPercent}%`,
      amountTB: dailyMetrics.amountTB
    },
    topGrowthNodes: occupancyNodes.map(n => ({
      node: n.node,
      server: n.server,
      difference: n.differenceFormatted,
      growthPercent: `${n.percent}%`
    }))
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(reportData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    let csv = "Server,Node,Difference,GrowthPercent,Status\n";
    occupancyNodes.forEach(n => {
      csv += `${n.server},${n.node},${n.differenceFormatted},${n.percent}%,${n.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `baas-operations-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <FileDown className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Export Operations & SLA Report
              </h3>
              <p className="text-xs text-slate-400">
                Generate auditable snapshot for enterprise backup compliance
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
        <div className="p-6 overflow-y-auto space-y-4 font-mono text-xs">
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white font-sans text-sm">Report Preview</span>
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer text-[11px]"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied JSON' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="text-slate-300 max-h-60 overflow-y-auto text-[11px] leading-relaxed">
              {JSON.stringify(reportData, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-sm transition-colors cursor-pointer"
          >
            <Table className="h-3.5 w-3.5" />
            <span>Download CSV Spreadsheet</span>
          </button>

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
