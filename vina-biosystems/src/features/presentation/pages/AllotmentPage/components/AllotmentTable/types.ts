import { ProductModel } from "../../../../../domain/models/productModel";

export interface AllotmentColumns {
  key: string;
  rotulo: string;
  situacao: string;
  productId: number;
  productQuantity: number;
}

export type AllotmentTableProp = {
  dataSource: AllotmentColumns[],
  productList: ProductModel[],
  getAllotmentData: () => any,
}