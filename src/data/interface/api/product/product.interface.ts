export interface IProduct {
  productId: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productQuantity: number;
  creation_date: Date;
  update_date: Date;
}

export type ICreateProduct = Omit<IProduct, 'productId'> & {
  productDescription?: string;
};

export type IUpdateProduct = Partial<ICreateProduct>;
