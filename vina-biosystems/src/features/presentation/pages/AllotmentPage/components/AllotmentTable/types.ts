export interface AllotmentColumns {
  key: string;
  rotulo: string;
  situacao: string;
}

export type AllotmentTableProp = {
  dataSource: AllotmentColumns[],
  getAllotmentData: () => any,
}