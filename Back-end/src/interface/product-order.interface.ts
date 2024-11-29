import { ObjectId } from 'mongodb';

export interface ProductOrder {
  productId: ObjectId;
  urlImage: string;
  quantity: number;
  price: number;
}
