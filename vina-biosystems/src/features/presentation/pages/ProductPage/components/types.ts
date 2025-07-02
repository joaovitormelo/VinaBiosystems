import { ProductModel } from "../../../../domain/models/productModel";

export interface ProductColumns {
  key: string;
  nomeProduto: string;
  quantidadeAtual: number;
}

export type ProductTableProp = {
  dataSource: ProductColumns[],
  productList: ProductModel[],
  getProductData: () => any,
}