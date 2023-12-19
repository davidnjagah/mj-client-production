export interface MJMessage {
  uri: string;
  proxy_url?: string;
  content: string;
  flags: number;
  rid?: string;
  id?: string;
  hash?: string;
  progress?: string;
  options?: MJOptions[];
  width?: number;
  height?: number;
}

export interface IFSMessage {
  id: any;
  proxy_url?: string;
  uri?: string;
  content: any;
  flags: number;
  hash?: string;
  rid: string;
  progress?: string;
  options?: MJOptions[];
}

export type LoadingHandler = (uri: string, progress: string) => void;
export type OnModal = (nonce: string, id: string) => Promise<string>;

export interface WaitMjEvent {
  nonce: string;
  prompt?: string;
  imageUri?: string;
  saveidres?: string;
  idname?: string;
  id?: string;
  rid?: string;
  del?: boolean; // is delete message
  onmodal?: OnModal;
}

export interface WaitIFSEvent {
  nonce: string;
  prompt?: string;
  imageUri?: string;
  saveidres?: string;
  idname?: string;
  id?: string;
  rid: string;
  del?: boolean; // is delete message
  onmodal?: OnModal;
}

export interface MJEmit {
  error?: Error;
  message?: MJMessage;
}

export interface IFSEmit {
  error?: Error;
  message?: IFSMessage;
}

export interface MJInfo {
  subscription: string;
  jobMode: string;
  visibilityMode: string;
  fastTimeRemaining: string;
  lifetimeUsage: string;
  relaxedUsage: string;
  queuedJobsFast: string;
  queuedJobsRelax: string;
  runningJobs: string;
}

export interface MJOptions {
  label: string;
  type: number;
  style: number;
  custom: string;
}
export interface MJSettings {
  content: string;
  id: string;
  flags: number;
  options: MJOptions[];
}
export interface MJDescribe {
  id: string;
  flags: number;
  uri: string;
  proxy_url?: string;
  options: MJOptions[];
  descriptions: string[];
}

export interface MJShorten {
  description: string;
  id: string;
  flags: number;
  options: MJOptions[];
  prompts: string[];
}
