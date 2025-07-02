export interface ProductColumns {
  key: string;
  nomeProduto: string;
  quantidadeAtual: number;
}

export type ProductTableProp = {
  dataSource: ProductColumns[],
  getProductData: () => any,
}