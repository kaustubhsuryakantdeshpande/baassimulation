export type BackupStatus = 'successful' | 'failed' | 'non_started' | 'running';

export interface ClientDistribution {
  ibmSpectrumProtect: number;
  veeam: number;
  rubrik: number;
  emcNetWorker: number;
  sepSesam: number;
  ispp: number;
}

export interface ServerDistribution {
  ibmSpectrumProtect: number;
  emcNetWorker: number;
  rubrik: number;
  sepSesam: number;
  ispp: number;
  veeam: number;
}

export interface StorageCapacity {
  diskUsedTB: number;
  diskTotalTB: number;
  tapeUsedBytes: number;
  tapeTotalBytes: number;
  librariesCount: number;
  tapesUsed: number;
  tapesTotal: number;
}

export interface DeviceDistribution {
  dataDomain: number;
  ibmTape35xx45xx: number;
  isilonNode: number;
  ibmTape33xx: number;
  isilonCluster: number;
  ibmTapeLibrary: number;
}

export interface EnvironmentData {
  freshness: string;
  clients: ClientDistribution;
  servers: ServerDistribution;
  storage: StorageCapacity;
  devices: DeviceDistribution;
}

export interface DailyBackupsMetrics {
  freshness: string;
  total: number;
  successful: number;
  successfulPercent: number;
  failed: number;
  failedPercent: number;
  nonStarted: number;
  nonStartedPercent: number;
  amountTB: number;
}

export interface HistoryTimePoint {
  label: string;
  successful: number;
  failed: number;
  nonStarted: number;
  amountPB: number;
}

export interface HistoryAggregates {
  freshness: string;
  successful: number;
  successfulPercent: number;
  failed: number;
  failedPercent: number;
  nonStarted: number;
  nonStartedPercent: number;
  amountPB: number;
  timePoints: HistoryTimePoint[];
}

export interface NodeOccupancyItem {
  id: string;
  server: string;
  node: string;
  differenceFormatted: string;
  differenceBytes: number;
  percent: number;
  group: string;
  os: string;
  lastBackupTime: string;
  status: BackupStatus;
  historySparkline: number[];
}

export interface DiskStorageMetrics {
  freshness: string;
  usedTB: number;
  totalTB: number;
  freeTB: number;
  usedPercent: number;
  freePercent: number;
  poolsOk: number;
  poolsNotOk: number;
  dirspaceOk: number;
  dirspaceNotOk: number;
  fileDeviceUsedGB: number;
  fileDeviceFreeGB: number;
  readThroughputMBs: number;
  writeThroughputMBs: number;
  dedupRatio: number;
}

export interface TapeDriveStatus {
  id: string;
  driveName: string;
  tapeSerial: string;
  status: 'writing' | 'reading' | 'idle' | 'rewinding' | 'cleaning';
  speedMBs: number;
  mountTime: string;
}

export interface TapeStorageMetrics {
  freshness: string;
  usedBytes: number;
  totalBytes: number;
  freeBytes: number;
  usedPercent: number;
  freePercent: number;
  poolsOk: number;
  poolsNotOk: number;
  pathsOnline: number;
  pathsOffline: number;
  tapesUsed: number;
  tapesScratch: number;
  librariesOnline: number;
  librariesOffline: number;
  drivesOnline: number;
  drivesOffline: number;
  drives: TapeDriveStatus[];
}

export interface LiveLogEvent {
  id: string;
  timestamp: string;
  timeRelative: string;
  level: 'info' | 'success' | 'warning' | 'error';
  category: 'backup' | 'storage' | 'tape' | 'system';
  node?: string;
  server?: string;
  message: string;
  size?: string;
  duration?: string;
}

export interface FailedJobDetail {
  id: string;
  node: string;
  server: string;
  os: string;
  errorCode: string;
  errorMessage: string;
  failedAt: string;
  dataSize: string;
  retryAttempts: number;
  isRetrying?: boolean;
}

export interface StoragePoolDetail {
  id: string;
  name: string;
  type: 'DISK' | 'DIR' | 'TAPE' | 'CLOUD';
  status: 'ok' | 'notok';
  capacityTB: number;
  usedPercent: number;
  warningReason?: string;
  server: string;
}
