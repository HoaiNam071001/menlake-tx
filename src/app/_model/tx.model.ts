export interface TxRequest {
  numbers: string;
  createdAt: string;
}

export interface TxResponse {
  numbers: string;
  tox: string;
  createdAt: string;
}

export interface TxSearchRequest {
  numberOfRecords?: number;
  allDaysFlag?: boolean;
  time?: string;
}

export interface TxSearchResponse {
  time?: number;
  numbers?: boolean;
}
