export interface StockColumns {
  key: string;
  nomeInsumo: string;
  quantidadeAtual: number;
  quantidadeMinima: number;
}

export type StockTableProp = {
  dataSource: StockColumns[],
  getStockData: () => any,
}