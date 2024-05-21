import { NewProductDTO } from './dto/NewProduct.dto';

export interface ProductApplication {
  createProduct(newProduct: NewProductDTO): Promise<number>;
}
