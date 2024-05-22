import { ProductDomainService } from 'src/core/domain/services/ProductDomainService';
import { ProductApplication } from '../ProductApplication';
import { CategoryDomainService } from 'src/core/domain/services/CategoryDomainService';
import { SupplierDomainService } from 'src/core/domain/services/SupplierDomainService';
import { NewProductDTO } from '../dto/NewProduct.dto';

export class ProductApplicationService implements ProductApplication {
  constructor(
    private product: ProductDomainService,
    private category: CategoryDomainService,
    private supplier: SupplierDomainService,
  ) {}

  async createProduct(newProduct: NewProductDTO) {
    const category = await this.category.findById(newProduct.categoryId);
    if (!category) {
      throw new ProductApplicationError(
        `Categoría no encontrada id=${newProduct.categoryId}`,
      );
    }
    const supplier = await this.supplier.findById(newProduct.supplierId);
    if (!supplier) {
      throw new ProductApplicationError(
        `Proveedor no encontrado id=${newProduct.supplierId}`,
      );
    }
    const entity = Product.create(newProduct.name, category, supplier);
    const saved = await this.product.save(entity);
    return saved.productId;
  }
}
