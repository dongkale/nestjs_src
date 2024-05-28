import PriceProductLessZeroException from '@/domain/exceptions/price-product-less-zero.exception';

export class Product {
  private id: number;

  private readonly name: string;

  private readonly description: string;

  private readonly imageUrl: string;

  private readonly price: number;

  private createAt: Date;

  constructor(
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price || 0;
    this.validatePrice();
  }

  public validatePrice(): void {
    if (this.price <= 0) {
      throw new PriceProductLessZeroException(
        'The price product should be greater than zero',
      );
    }
  }

  public getName(): string {
    return this.name;
  }

  public getId(): number {
    return this.id;
  }

  public setCreateAt(createdAt: Date): this {
    this.createAt = createdAt;
    return this;
  }
}
