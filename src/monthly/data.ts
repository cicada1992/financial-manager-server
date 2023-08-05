export interface IRow {
  id: string;
  name: string;
  value: number;
  done: boolean;
}

export const INCOME_ROWS: Array<IRow> = [
  {
    id: '1',
    name: '월급',
    value: 3000000,
    done: true,
  },
];

export const SPEND_ROWS: Array<IRow> = [
  {
    id: '1',
    name: '유빈 휴대폰비',
    value: 19700,
    done: true,
  },
  {
    id: '2',
    name: '영재 휴대폰비',
    value: 9700,
    done: false,
  },
  {
    id: '3',
    name: 'DB 보험',
    value: 130000,
    done: true,
  },
  {
    id: '4',
    name: '주담대(카카오)',
    value: 1600000,
    done: true,
  },
];
