import { GameType } from '../_consts/consts';

export interface TxRequest {
  numbers: string;
  createdAt: string;
  type: GameType;
}

export interface TxResponse {
  id: number;
  numbers: string;
  tox: string;
  createdAt: string;
  type: GameType;
  time: string;
}

export interface TxSearchRecordsRequest {
  numberOfRecords?: number;
  allDaysFlag?: boolean;
  time?: string;
}

export interface TxSearchRequest {
  keyword?: string;
  numberOfRecords?: number | null;
  type?: string;
}
