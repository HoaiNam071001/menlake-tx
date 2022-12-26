export enum GameType {
  txOffline = 'TX_OFFLINE',
  txOnline = 'TX_ONLINE',
  chanLe = 'CHAN_LE',
}

export const GameTypes = [
  {
    label: 'TX Online',
    value: GameType.txOnline,
  },
  {
    label: 'TX Offline',
    value: GameType.txOffline,
  },
  {
    label: 'Chẵn Lẻ',
    value: GameType.chanLe,
  },
];
