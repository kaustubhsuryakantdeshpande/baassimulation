import {
  EnvironmentData,
  DailyBackupsMetrics,
  HistoryAggregates,
  NodeOccupancyItem,
  DiskStorageMetrics,
  TapeStorageMetrics,
  FailedJobDetail,
  StoragePoolDetail,
  LiveLogEvent
} from '../types/dashboard';

export const initialEnvironmentData: EnvironmentData = {
  freshness: '12m',
  clients: {
    ibmSpectrumProtect: 1679,
    veeam: 68,
    rubrik: 30,
    emcNetWorker: 16,
    sepSesam: 16,
    ispp: 7
  },
  servers: {
    ibmSpectrumProtect: 7,
    emcNetWorker: 2,
    rubrik: 2,
    sepSesam: 2,
    ispp: 1,
    veeam: 1
  },
  storage: {
    diskUsedTB: 60.75,
    diskTotalTB: 99.92,
    tapeUsedBytes: 0.00,
    tapeTotalBytes: 0.00,
    librariesCount: 1,
    tapesUsed: 70,
    tapesTotal: 72
  },
  devices: {
    dataDomain: 6,
    ibmTape35xx45xx: 3,
    isilonNode: 2,
    ibmTape33xx: 2,
    isilonCluster: 2,
    ibmTapeLibrary: 1
  }
};

export const initialDailyBackups: DailyBackupsMetrics = {
  freshness: '11m',
  total: 4276,
  successful: 3506,
  successfulPercent: 82,
  failed: 585,
  failedPercent: 14,
  nonStarted: 185,
  nonStartedPercent: 4,
  amountTB: 555.80
};

export const initialDailyClientsMetrics: DailyBackupsMetrics = {
  freshness: '11m',
  total: 1816,
  successful: 1616,
  successfulPercent: 89,
  failed: 136,
  failedPercent: 7,
  nonStarted: 64,
  nonStartedPercent: 4,
  amountTB: 555.80
};

export const initialHistoryMonth: HistoryAggregates = {
  freshness: '5h 41m',
  successful: 106221,
  successfulPercent: 83,
  failed: 16228,
  failedPercent: 13,
  nonStarted: 5167,
  nonStartedPercent: 4,
  amountPB: 14.68,
  timePoints: [
    { label: 'May', successful: 25410, failed: 3820, nonStarted: 1210, amountPB: 3.42 },
    { label: 'Jun', successful: 26800, failed: 4110, nonStarted: 1340, amountPB: 3.65 },
    { label: 'Jul', successful: 27150, failed: 4290, nonStarted: 1420, amountPB: 3.81 },
    { label: 'Aug', successful: 26861, failed: 4008, nonStarted: 1197, amountPB: 3.80 }
  ]
};

export const initialHistoryWeek: HistoryAggregates = {
  freshness: '5h 41m',
  successful: 26420,
  successfulPercent: 84,
  failed: 3820,
  failedPercent: 12,
  nonStarted: 1210,
  nonStartedPercent: 4,
  amountPB: 3.75,
  timePoints: [
    { label: 'Wk 35', successful: 6420, failed: 940, nonStarted: 310, amountPB: 0.91 },
    { label: 'Wk 36', successful: 6710, failed: 980, nonStarted: 290, amountPB: 0.95 },
    { label: 'Wk 37', successful: 6580, failed: 910, nonStarted: 320, amountPB: 0.93 },
    { label: 'Wk 38', successful: 6710, failed: 990, nonStarted: 290, amountPB: 0.96 }
  ]
};

export const initialHistoryDay: HistoryAggregates = {
  freshness: '5h 41m',
  successful: 3890,
  successfulPercent: 83,
  failed: 610,
  failedPercent: 13,
  nonStarted: 190,
  nonStartedPercent: 4,
  amountPB: 0.54,
  timePoints: [
    { label: 'Mon', successful: 3420, failed: 590, nonStarted: 190, amountPB: 0.49 },
    { label: 'Tue', successful: 3510, failed: 580, nonStarted: 180, amountPB: 0.51 },
    { label: 'Wed', successful: 3490, failed: 620, nonStarted: 210, amountPB: 0.52 },
    { label: 'Thu', successful: 3620, failed: 540, nonStarted: 170, amountPB: 0.53 },
    { label: 'Fri', successful: 3580, failed: 560, nonStarted: 180, amountPB: 0.52 },
    { label: 'Sat', successful: 2980, failed: 410, nonStarted: 140, amountPB: 0.39 },
    { label: 'Sun', successful: 3506, failed: 585, nonStarted: 185, amountPB: 0.55 }
  ]
};

export const initialTopOccupancyNodes: NodeOccupancyItem[] = [
  {
    id: 'node-1',
    server: 'TSMA',
    node: 'RZC-VM-W12-FILE',
    differenceFormatted: '1.18 TB',
    differenceBytes: 1.18 * 1e12,
    percent: 986.33,
    group: 'IBM SP A',
    os: 'Windows Server 2012 R2',
    lastBackupTime: 'Today 03:14 AM',
    status: 'successful',
    historySparkline: [120, 240, 310, 480, 720, 950, 1180]
  },
  {
    id: 'node-2',
    server: 'TSMA',
    node: 'RZC-DT-W10-DEV3',
    differenceFormatted: '515.71 GB',
    differenceBytes: 515.71 * 1e9,
    percent: 41.72,
    group: 'IBM SP A',
    os: 'Windows 10 Pro',
    lastBackupTime: 'Today 04:02 AM',
    status: 'successful',
    historySparkline: [1200, 1310, 1420, 1550, 1620, 1700, 1715]
  },
  {
    id: 'node-3',
    server: 'TSMA',
    node: 'RZC-VM-W12-CIB',
    differenceFormatted: '144.99 GB',
    differenceBytes: 144.99 * 1e9,
    percent: 89.45,
    group: 'IBM SP A',
    os: 'Windows Server 2012 R2',
    lastBackupTime: 'Today 02:20 AM',
    status: 'successful',
    historySparkline: [160, 180, 210, 240, 270, 290, 305]
  },
  {
    id: 'node-4',
    server: 'TSMA',
    node: 'VE_SRZC-PROD',
    differenceFormatted: '31.00 GB',
    differenceBytes: 31.00 * 1e9,
    percent: 2.48,
    group: 'IBM SP A',
    os: 'Red Hat Enterprise Linux 8.4',
    lastBackupTime: 'Today 01:10 AM',
    status: 'successful',
    historySparkline: [1240, 1245, 1250, 1260, 1265, 1270, 1271]
  },
  {
    id: 'node-5',
    server: 'TSMA',
    node: 'RZC-VM-LIN-WEB',
    differenceFormatted: '3.46 GB',
    differenceBytes: 3.46 * 1e9,
    percent: 12.34,
    group: 'IBM SP A',
    os: 'Ubuntu 20.04 LTS',
    lastBackupTime: 'Today 04:30 AM',
    status: 'successful',
    historySparkline: [28, 29, 30, 30.5, 31, 31.2, 31.46]
  },
  {
    id: 'node-6',
    server: 'TSMA',
    node: 'RZC-VM-W12-SVN',
    differenceFormatted: '215.80 MB',
    differenceBytes: 215.80 * 1e6,
    percent: 4.89,
    group: 'IBM SP A',
    os: 'Windows Server 2012 R2',
    lastBackupTime: 'Today 05:01 AM',
    status: 'successful',
    historySparkline: [4.4, 4.45, 4.5, 4.55, 4.6, 4.61, 4.62]
  },
  {
    id: 'node-7',
    server: 'TSMA',
    node: 'RZC-DB-ORACLE01',
    differenceFormatted: '89.40 GB',
    differenceBytes: 89.40 * 1e9,
    percent: 18.20,
    group: 'IBM SP A',
    os: 'Oracle Linux 8',
    lastBackupTime: 'Today 03:45 AM',
    status: 'failed',
    historySparkline: [480, 495, 510, 530, 550, 565, 570]
  },
  {
    id: 'node-8',
    server: 'TSMA',
    node: 'RZC-K8S-ETCD-02',
    differenceFormatted: '18.15 GB',
    differenceBytes: 18.15 * 1e9,
    percent: 34.12,
    group: 'IBM SP A',
    os: 'CoreOS Container Linux',
    lastBackupTime: 'Today 06:12 AM',
    status: 'successful',
    historySparkline: [52, 56, 61, 65, 68, 70, 71]
  }
];

export const initialDiskStorage: DiskStorageMetrics = {
  freshness: '12m 1s',
  usedTB: 13.27,
  totalTB: 50.73,
  freeTB: 37.46,
  usedPercent: 26.2,
  freePercent: 73.8,
  poolsOk: 48,
  poolsNotOk: 2,
  dirspaceOk: 23,
  dirspaceNotOk: 0,
  fileDeviceUsedGB: 33.85,
  fileDeviceFreeGB: 22.17,
  readThroughputMBs: 384,
  writeThroughputMBs: 892,
  dedupRatio: 2.8
};

export const initialTapeStorage: TapeStorageMetrics = {
  freshness: '12m 4s',
  usedBytes: 0.00,
  totalBytes: 0.00,
  freeBytes: 0.00,
  usedPercent: 0.0,
  freePercent: 0.0,
  poolsOk: 3,
  poolsNotOk: 0,
  pathsOnline: 4,
  pathsOffline: 0,
  tapesUsed: 2,
  tapesScratch: 70,
  librariesOnline: 1,
  librariesOffline: 0,
  drivesOnline: 3,
  drivesOffline: 0,
  drives: [
    {
      id: 'drv-01',
      driveName: 'IBM-LTO8-DRV01',
      tapeSerial: 'CL0891L8',
      status: 'writing',
      speedMBs: 320,
      mountTime: '01h 14m'
    },
    {
      id: 'drv-02',
      driveName: 'IBM-LTO8-DRV02',
      tapeSerial: 'CL0892L8',
      status: 'idle',
      speedMBs: 0,
      mountTime: '00h 42m'
    },
    {
      id: 'drv-03',
      driveName: 'IBM-LTO8-DRV03',
      tapeSerial: 'CL0895L8',
      status: 'reading',
      speedMBs: 285,
      mountTime: '02h 05m'
    }
  ]
};

export const initialFailedJobs: FailedJobDetail[] = [
  {
    id: 'fail-1',
    node: 'RZC-DB-ORACLE01',
    server: 'TSMA',
    os: 'Oracle Linux 8',
    errorCode: 'ANS1228E',
    errorMessage: 'The object is in use by another process or database engine locked datafile.',
    failedAt: '03:45:12 AM',
    dataSize: '89.4 GB',
    retryAttempts: 2
  },
  {
    id: 'fail-2',
    node: 'RZC-VM-W16-EXCH',
    server: 'TSMA',
    os: 'Windows Server 2016',
    errorCode: 'VSS_E_SNAPSHOT_TIMED_OUT',
    errorMessage: 'Microsoft Volume Shadow Copy service timed out creating snapshot for Exchange store.',
    failedAt: '04:12:08 AM',
    dataSize: '240.5 GB',
    retryAttempts: 1
  },
  {
    id: 'fail-3',
    node: 'RZC-SEC-VAULT-01',
    server: 'Rubrik-R01',
    os: 'CentOS 7.9',
    errorCode: 'NET_TIMEOUT_ERR_504',
    errorMessage: 'Network connection aborted while transmitting SSL payload across WAN link.',
    failedAt: '05:02:44 AM',
    dataSize: '14.2 GB',
    retryAttempts: 3
  },
  {
    id: 'fail-4',
    node: 'RZC-K8S-WORKER-04',
    server: 'Veeam-V01',
    os: 'Ubuntu 22.04 LTS',
    errorCode: 'CSI_SNAPSHOT_PENDING',
    errorMessage: 'Container Storage Interface driver did not release lock on PV claim-vol4.',
    failedAt: '05:28:19 AM',
    dataSize: '62.0 GB',
    retryAttempts: 1
  }
];

export const initialStoragePools: StoragePoolDetail[] = [
  {
    id: 'pool-1',
    name: 'FILEPOOL_DEDUP_01',
    type: 'DISK',
    status: 'ok',
    capacityTB: 24.0,
    usedPercent: 44.5,
    server: 'TSMA'
  },
  {
    id: 'pool-2',
    name: 'FILEPOOL_DEDUP_02',
    type: 'DISK',
    status: 'notok',
    capacityTB: 12.0,
    usedPercent: 93.8,
    warningReason: 'High utilization threshold exceeded (93.8% > 90%). Space reclamation advised.',
    server: 'TSMA'
  },
  {
    id: 'pool-3',
    name: 'SP_FAST_DIR01',
    type: 'DIR',
    status: 'notok',
    capacityTB: 8.0,
    usedPercent: 88.2,
    warningReason: 'I/O latency warning: directory container write queue depth > 45.',
    server: 'TSMA'
  },
  {
    id: 'pool-4',
    name: 'DIR_POOL_METADATA',
    type: 'DIR',
    status: 'ok',
    capacityTB: 4.5,
    usedPercent: 28.1,
    server: 'TSMA'
  },
  {
    id: 'pool-5',
    name: 'TAPE_LTO8_PRIMARY',
    type: 'TAPE',
    status: 'ok',
    capacityTB: 120.0,
    usedPercent: 12.4,
    server: 'TSMA'
  }
];

export const initialLogs: LiveLogEvent[] = [
  {
    id: 'log-1',
    timestamp: '11:04:12',
    timeRelative: 'Just now',
    level: 'success',
    category: 'backup',
    node: 'RZC-VM-W12-FILE',
    server: 'TSMA',
    message: 'Incremental backup session #48291 committed successfully',
    size: '1.18 TB',
    duration: '18m 42s'
  },
  {
    id: 'log-2',
    timestamp: '11:04:08',
    timeRelative: '4s ago',
    level: 'info',
    category: 'tape',
    server: 'TSMA',
    message: 'Mount request volume CL0891L8 completed in Drive IBM-LTO8-DRV01 (Slot #14)'
  },
  {
    id: 'log-3',
    timestamp: '11:03:55',
    timeRelative: '17s ago',
    level: 'warning',
    category: 'storage',
    server: 'TSMA',
    message: 'Storage pool FILEPOOL_DEDUP_02 reached warning high-water mark (93.8% utilization)'
  },
  {
    id: 'log-4',
    timestamp: '11:03:32',
    timeRelative: '40s ago',
    level: 'error',
    category: 'backup',
    node: 'RZC-DB-ORACLE01',
    server: 'TSMA',
    message: 'ANS1228E Node backup aborted: database engine locked datafile /u01/app/oracle/oradata'
  },
  {
    id: 'log-5',
    timestamp: '11:03:10',
    timeRelative: '1m ago',
    level: 'success',
    category: 'backup',
    node: 'VE_SRZC-PROD',
    server: 'TSMA',
    message: 'Differential snapshot completed without warnings',
    size: '31.00 GB',
    duration: '2m 14s'
  },
  {
    id: 'log-6',
    timestamp: '11:02:44',
    timeRelative: '1m 28s ago',
    level: 'info',
    category: 'system',
    server: 'Veeam-V01',
    message: 'CBT (Changed Block Tracking) map verified for 68 virtual machines'
  }
];
