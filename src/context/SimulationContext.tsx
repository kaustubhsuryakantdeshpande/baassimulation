import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  EnvironmentData,
  DailyBackupsMetrics,
  HistoryAggregates,
  NodeOccupancyItem,
  DiskStorageMetrics,
  TapeStorageMetrics,
  LiveLogEvent,
  FailedJobDetail,
  StoragePoolDetail,
  BackupStatus
} from '../types/dashboard';
import {
  initialEnvironmentData,
  initialDailyBackups,
  initialDailyClientsMetrics,
  initialHistoryMonth,
  initialHistoryWeek,
  initialHistoryDay,
  initialTopOccupancyNodes,
  initialDiskStorage,
  initialTapeStorage,
  initialLogs,
  initialFailedJobs,
  initialStoragePools
} from '../data/mockData';

interface SimulationContextType {
  isRunning: boolean;
  toggleRunning: () => void;
  speed: 1 | 2 | 5 | 10;
  setSpeed: (speed: 1 | 2 | 5 | 10) => void;
  selectedServerGroup: string;
  setSelectedServerGroup: (group: string) => void;

  // Environment
  environment: EnvironmentData;

  // Daily
  dailyEntity: 'backups' | 'clients';
  setDailyEntity: (entity: 'backups' | 'clients') => void;
  dailyMetrics: DailyBackupsMetrics;

  // History
  historyEntity: 'backups' | 'clients';
  setHistoryEntity: (entity: 'backups' | 'clients') => void;
  historyMetric: 'sum' | 'average';
  setHistoryMetric: (metric: 'sum' | 'average') => void;
  historyGranularity: 'month' | 'week' | 'day';
  setHistoryGranularity: (granularity: 'month' | 'week' | 'day') => void;
  historyData: HistoryAggregates;

  // Occupancy
  occupancyNodes: NodeOccupancyItem[];
  selectedNode: NodeOccupancyItem | null;
  openNodeDetail: (node: NodeOccupancyItem) => void;

  // Storage
  diskStorage: DiskStorageMetrics;
  tapeStorage: TapeStorageMetrics;

  // Logs & Events
  logs: LiveLogEvent[];
  clearLogs: () => void;

  // Failed jobs
  failedJobs: FailedJobDetail[];
  retryFailedJob: (id: string) => void;
  retryAllFailedJobs: () => void;

  // Storage pools
  storagePools: StoragePoolDetail[];
  reclaimStoragePool: (id: string) => void;

  // Simulation controls
  triggerBackupWave: () => void;
  simulateFailureIncident: () => void;
  resetSimulation: () => void;

  // Modals
  activeModal: 'failedJobs' | 'storagePools' | 'nodeDetail' | 'exportReport' | 'tapeRack' | null;
  setActiveModal: (modal: 'failedJobs' | 'storagePools' | 'nodeDetail' | 'exportReport' | 'tapeRack' | null) => void;
  closeModal: () => void;

  // Pulse effect counter
  pulseTick: number;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [speed, setSpeed] = useState<1 | 2 | 5 | 10>(1);
  const [selectedServerGroup, setSelectedServerGroup] = useState<string>('IBM SP A');

  const [environment, setEnvironment] = useState<EnvironmentData>(initialEnvironmentData);
  const [dailyEntity, setDailyEntity] = useState<'backups' | 'clients'>('backups');
  const [dailyBackups, setDailyBackups] = useState<DailyBackupsMetrics>(initialDailyBackups);
  const [dailyClients, setDailyClients] = useState<DailyBackupsMetrics>(initialDailyClientsMetrics);

  const [historyEntity, setHistoryEntity] = useState<'backups' | 'clients'>('backups');
  const [historyMetric, setHistoryMetric] = useState<'sum' | 'average'>('sum');
  const [historyGranularity, setHistoryGranularity] = useState<'month' | 'week' | 'day'>('month');

  const [occupancyNodes, setOccupancyNodes] = useState<NodeOccupancyItem[]>(initialTopOccupancyNodes);
  const [selectedNode, setSelectedNode] = useState<NodeOccupancyItem | null>(null);

  const [diskStorage, setDiskStorage] = useState<DiskStorageMetrics>(initialDiskStorage);
  const [tapeStorage, setTapeStorage] = useState<TapeStorageMetrics>(initialTapeStorage);

  const [logs, setLogs] = useState<LiveLogEvent[]>(initialLogs);
  const [failedJobs, setFailedJobs] = useState<FailedJobDetail[]>(initialFailedJobs);
  const [storagePools, setStoragePools] = useState<StoragePoolDetail[]>(initialStoragePools);

  const [activeModal, setActiveModal] = useState<'failedJobs' | 'storagePools' | 'nodeDetail' | 'exportReport' | 'tapeRack' | null>(null);
  const [pulseTick, setPulseTick] = useState<number>(0);

  const counterRef = useRef(0);

  // Active metrics based on dailyEntity
  const dailyMetrics = dailyEntity === 'backups' ? dailyBackups : dailyClients;

  // Dynamic history selection based on granularity
  const historyData = React.useMemo(() => {
    let base = initialHistoryMonth;
    if (historyGranularity === 'week') base = initialHistoryWeek;
    if (historyGranularity === 'day') base = initialHistoryDay;

    // Apply multiplier if average or clients
    const factor = (historyEntity === 'clients' ? 0.35 : 1.0) * (historyMetric === 'average' ? 0.25 : 1.0);
    return {
      ...base,
      successful: Math.round(base.successful * factor),
      failed: Math.round(base.failed * factor),
      nonStarted: Math.round(base.nonStarted * factor),
      amountPB: Number((base.amountPB * factor).toFixed(2)),
      timePoints: base.timePoints.map(p => ({
        ...p,
        successful: Math.round(p.successful * factor),
        failed: Math.round(p.failed * factor),
        nonStarted: Math.round(p.nonStarted * factor),
        amountPB: Number((p.amountPB * factor).toFixed(2))
      }))
    };
  }, [historyGranularity, historyEntity, historyMetric]);

  // Simulation tick loop
  useEffect(() => {
    if (!isRunning) return;

    const baseInterval = 2500;
    const intervalTime = Math.max(250, baseInterval / speed);

    const interval = setInterval(() => {
      counterRef.current += 1;
      setPulseTick(prev => prev + 1);

      // Random job outcome
      const rand = Math.random();
      const nodesPool = [
        'RZC-VM-W12-FILE',
        'RZC-DT-W10-DEV3',
        'RZC-VM-W12-CIB',
        'VE_SRZC-PROD',
        'RZC-VM-LIN-WEB',
        'RZC-K8S-ETCD-02',
        'SQL-PROD-CLUSTER-01',
        'SAP-HANA-NODE-03'
      ];
      const randomNode = nodesPool[Math.floor(Math.random() * nodesPool.length)];
      const sizeGB = (Math.random() * 45 + 2).toFixed(1);
      const timeStr = new Date().toTimeString().split(' ')[0];

      if (rand > 0.18) {
        // Successful job completed
        setDailyBackups(prev => {
          const newSuccess = prev.successful + 1;
          const newTotal = prev.total + 1;
          const newAmount = Number((prev.amountTB + Number(sizeGB) / 1024).toFixed(2));
          return {
            ...prev,
            total: newTotal,
            successful: newSuccess,
            successfulPercent: Math.round((newSuccess / newTotal) * 100),
            amountTB: newAmount
          };
        });

        // Add log
        const newLog: LiveLogEvent = {
          id: `log-${Date.now()}-${Math.random()}`,
          timestamp: timeStr,
          timeRelative: 'Just now',
          level: 'success',
          category: 'backup',
          node: randomNode,
          server: 'TSMA',
          message: `Incremental session completed successfully (${sizeGB} GB transferred)`,
          size: `${sizeGB} GB`,
          duration: `${Math.floor(Math.random() * 8) + 1}m ${Math.floor(Math.random() * 50)}s`
        };
        setLogs(prev => [newLog, ...prev.slice(0, 49)]);

        // Subtle throughput jitter
        setDiskStorage(prev => ({
          ...prev,
          readThroughputMBs: Math.floor(340 + Math.random() * 120),
          writeThroughputMBs: Math.floor(820 + Math.random() * 190)
        }));
      } else if (rand > 0.05) {
        // Disk / Tape activity
        if (Math.random() > 0.5) {
          // Tape drive progress
          setTapeStorage(prev => {
            const updatedDrives = prev.drives.map(d => {
              if (d.status === 'writing') {
                return { ...d, speedMBs: Math.floor(290 + Math.random() * 60) };
              }
              if (d.status === 'reading') {
                return { ...d, speedMBs: Math.floor(260 + Math.random() * 50) };
              }
              return d;
            });
            return { ...prev, drives: updatedDrives };
          });
        }
      } else {
        // Rare transient error in live simulation
        setDailyBackups(prev => {
          const newFailed = prev.failed + 1;
          const newTotal = prev.total + 1;
          return {
            ...prev,
            total: newTotal,
            failed: newFailed,
            failedPercent: Math.round((newFailed / newTotal) * 100)
          };
        });

        const newLog: LiveLogEvent = {
          id: `log-${Date.now()}-${Math.random()}`,
          timestamp: timeStr,
          timeRelative: 'Just now',
          level: 'error',
          category: 'backup',
          node: randomNode,
          server: 'TSMA',
          message: `ANS0361I Session failed: temporary network socket reset on port 1500`
        };
        setLogs(prev => [newLog, ...prev.slice(0, 49)]);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isRunning, speed]);

  const toggleRunning = () => setIsRunning(prev => !prev);

  const clearLogs = () => setLogs([]);

  const openNodeDetail = (node: NodeOccupancyItem) => {
    setSelectedNode(node);
    setActiveModal('nodeDetail');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const triggerBackupWave = () => {
    const waveCount = 18;
    const timeStr = new Date().toTimeString().split(' ')[0];

    setDailyBackups(prev => {
      const newSuccess = prev.successful + waveCount;
      const newTotal = prev.total + waveCount;
      const addedTB = 4.2;
      return {
        ...prev,
        total: newTotal,
        successful: newSuccess,
        successfulPercent: Math.round((newSuccess / newTotal) * 100),
        amountTB: Number((prev.amountTB + addedTB).toFixed(2))
      };
    });

    const waveLog: LiveLogEvent = {
      id: `wave-${Date.now()}`,
      timestamp: timeStr,
      timeRelative: 'Just now',
      level: 'info',
      category: 'system',
      server: 'TSMA',
      message: `Triggered batch policy wave: 18 scheduled VM backup snapshots dispatched simultaneously`
    };
    setLogs(prev => [waveLog, ...prev.slice(0, 49)]);

    setDiskStorage(prev => ({
      ...prev,
      writeThroughputMBs: 1420,
      readThroughputMBs: 650
    }));
  };

  const simulateFailureIncident = () => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    const newFailId = `fail-${Date.now()}`;
    const nodeName = `RZC-VM-SQL-HA0${Math.floor(Math.random() * 4) + 1}`;

    const newJob: FailedJobDetail = {
      id: newFailId,
      node: nodeName,
      server: 'TSMA',
      os: 'Windows Server 2022',
      errorCode: 'ANS1228E',
      errorMessage: 'The object is locked by database engine. VSS Writer SQLWRITER entered error state.',
      failedAt: timeStr,
      dataSize: '154.2 GB',
      retryAttempts: 0
    };

    setFailedJobs(prev => [newJob, ...prev]);

    setDailyBackups(prev => {
      const newFailed = prev.failed + 1;
      const newTotal = prev.total + 1;
      return {
        ...prev,
        total: newTotal,
        failed: newFailed,
        failedPercent: Math.round((newFailed / newTotal) * 100)
      };
    });

    const failLog: LiveLogEvent = {
      id: `log-fail-${Date.now()}`,
      timestamp: timeStr,
      timeRelative: 'Just now',
      level: 'error',
      category: 'backup',
      node: nodeName,
      server: 'TSMA',
      message: `CRITICAL: VSS snapshot fault on ${nodeName} (Code: ANS1228E)`
    };
    setLogs(prev => [failLog, ...prev.slice(0, 49)]);
  };

  const retryFailedJob = (id: string) => {
    // Mark as retrying
    setFailedJobs(prev =>
      prev.map(j => (j.id === id ? { ...j, isRetrying: true, retryAttempts: j.retryAttempts + 1 } : j))
    );

    setTimeout(() => {
      // Remove from failed, increment successful
      setFailedJobs(prev => prev.filter(j => j.id !== id));
      setDailyBackups(prev => {
        const newFailed = Math.max(0, prev.failed - 1);
        const newSuccess = prev.successful + 1;
        return {
          ...prev,
          failed: newFailed,
          successful: newSuccess,
          successfulPercent: Math.round((newSuccess / prev.total) * 100),
          failedPercent: Math.round((newFailed / prev.total) * 100)
        };
      });

      const timeStr = new Date().toTimeString().split(' ')[0];
      const successLog: LiveLogEvent = {
        id: `retry-ok-${Date.now()}`,
        timestamp: timeStr,
        timeRelative: 'Just now',
        level: 'success',
        category: 'backup',
        server: 'TSMA',
        message: `Retry successful: Job ${id} recovered with clean VSS shadow copy`
      };
      setLogs(prev => [successLog, ...prev.slice(0, 49)]);
    }, 1200);
  };

  const retryAllFailedJobs = () => {
    const count = failedJobs.length;
    if (count === 0) return;

    setFailedJobs(prev => prev.map(j => ({ ...j, isRetrying: true })));

    setTimeout(() => {
      setFailedJobs([]);
      setDailyBackups(prev => {
        const newFailed = Math.max(0, prev.failed - count);
        const newSuccess = prev.successful + count;
        return {
          ...prev,
          failed: newFailed,
          successful: newSuccess,
          successfulPercent: Math.round((newSuccess / prev.total) * 100),
          failedPercent: Math.round((newFailed / prev.total) * 100)
        };
      });

      const timeStr = new Date().toTimeString().split(' ')[0];
      const log: LiveLogEvent = {
        id: `retry-all-${Date.now()}`,
        timestamp: timeStr,
        timeRelative: 'Just now',
        level: 'success',
        category: 'backup',
        server: 'TSMA',
        message: `Batch recovery: All ${count} failed jobs resolved successfully`
      };
      setLogs(prev => [log, ...prev.slice(0, 49)]);
    }, 1500);
  };

  const reclaimStoragePool = (id: string) => {
    setStoragePools(prev =>
      prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            status: 'ok',
            usedPercent: Math.round(p.usedPercent * 0.72),
            warningReason: undefined
          };
        }
        return p;
      })
    );

    setDiskStorage(prev => ({
      ...prev,
      poolsOk: prev.poolsOk + 1,
      poolsNotOk: Math.max(0, prev.poolsNotOk - 1),
      usedTB: Number((prev.usedTB - 1.8).toFixed(2)),
      freeTB: Number((prev.freeTB + 1.8).toFixed(2)),
      usedPercent: 22.6,
      freePercent: 77.4
    }));

    const timeStr = new Date().toTimeString().split(' ')[0];
    const log: LiveLogEvent = {
      id: `reclaim-${Date.now()}`,
      timestamp: timeStr,
      timeRelative: 'Just now',
      level: 'success',
      category: 'storage',
      server: 'TSMA',
      message: `Space reclamation completed on pool ${id}: 1.8 TB recovered to free pool`
    };
    setLogs(prev => [log, ...prev.slice(0, 49)]);
  };

  const resetSimulation = () => {
    setDailyBackups(initialDailyBackups);
    setDailyClients(initialDailyClientsMetrics);
    setEnvironment(initialEnvironmentData);
    setDiskStorage(initialDiskStorage);
    setTapeStorage(initialTapeStorage);
    setOccupancyNodes(initialTopOccupancyNodes);
    setFailedJobs(initialFailedJobs);
    setStoragePools(initialStoragePools);
    setLogs(initialLogs);
  };

  return (
    <SimulationContext.Provider
      value={{
        isRunning,
        toggleRunning,
        speed,
        setSpeed,
        selectedServerGroup,
        setSelectedServerGroup,
        environment,
        dailyEntity,
        setDailyEntity,
        dailyMetrics,
        historyEntity,
        setHistoryEntity,
        historyMetric,
        setHistoryMetric,
        historyGranularity,
        setHistoryGranularity,
        historyData,
        occupancyNodes,
        selectedNode,
        openNodeDetail,
        diskStorage,
        tapeStorage,
        logs,
        clearLogs,
        failedJobs,
        retryFailedJob,
        retryAllFailedJobs,
        storagePools,
        reclaimStoragePool,
        triggerBackupWave,
        simulateFailureIncident,
        resetSimulation,
        activeModal,
        setActiveModal,
        closeModal,
        pulseTick
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
