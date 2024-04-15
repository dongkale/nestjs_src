import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '@/common/common.module';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('정의되어야 함', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /products', () => {
    it('제품 리스트를 가져와야 함', () => {
      const entities = [
        {
          id: 1,
          name: '상품 1',
          thumbnail: '',
          brand: { id: 1, name: 'brand 1' },
          prices: [
            {
              type: 'now',
              discountPrice: 9000,
              discountInstallmentPrice: 900,
              discountRate: 0,
              cardDiscountInstallmentPrice: 0,
            },
            {
              type: 12,
              discountPrice: 9000,
              discountInstallmentPrice: 900,
              discountRate: 0,
              cardDiscountInstallmentPrice: 0,
            },
            {
              type: 24,
              discountPrice: 9000,
              discountInstallmentPrice: 900,
              discountRate: 0,
              cardDiscountInstallmentPrice: 0,
            },
            {
              type: 36,
              discountPrice: 9000,
              discountInstallmentPrice: 900,
              discountRate: 0,
              cardDiscountInstallmentPrice: 0,
            },
            {
              type: 48,
              discountPrice: 9000,
              discountInstallmentPrice: 900,
              discountRate: 0,
              cardDiscountInstallmentPrice: 0,
            },
            {
              type: 60,
              discountPrice: 9000,
              discountInstallmentPrice: 900,
              discountRate: 0,
              cardDiscountInstallmentPrice: 0,
            },
          ],
          labels: ['new', 'best', 'sale'],
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(entities);
      const result = controller.getAllList();
      expect(result.products).toEqual(entities);
    });
  });

  describe('GET /products/:id', () => {
    it('제품의 상세 정보를 가져와야 함', () => {
      const id = 1;
      const entity = {
        id: 1,
        name: '상품 1',
        images: [''],
        brand: { id: 1, name: 'brand 1' },
        tags: [
          { id: 1, name: '태그 1' },
          { id: 2, name: '태그 2' },
        ],
        prices: [
          {
            type: 'now',
            originalPrice: 10000,
            discountPrice: 9000,
            originalInstallmentPrice: 1000,
            discountInstallmentPrice: 900,
            discountRate: 0,
            cardDiscountInstallmentPrice: 0,
          },
          {
            type: 12,
            originalPrice: 10000,
            discountPrice: 9000,
            originalInstallmentPrice: 1000,
            discountInstallmentPrice: 900,
            discountRate: 0,
            cardDiscountInstallmentPrice: 0,
          },
          {
            type: 24,
            originalPrice: 10000,
            discountPrice: 9000,
            originalInstallmentPrice: 1000,
            discountInstallmentPrice: 900,
            discountRate: 0,
            cardDiscountInstallmentPrice: 0,
          },
          {
            type: 36,
            originalPrice: 10000,
            discountPrice: 9000,
            originalInstallmentPrice: 1000,
            discountInstallmentPrice: 900,
            discountRate: 0,
            cardDiscountInstallmentPrice: 0,
          },
          {
            type: 48,
            originalPrice: 10000,
            discountPrice: 9000,
            originalInstallmentPrice: 1000,
            discountInstallmentPrice: 900,
            discountRate: 0,
            cardDiscountInstallmentPrice: 0,
          },
          {
            type: 60,
            originalPrice: 10000,
            discountPrice: 9000,
            originalInstallmentPrice: 1000,
            discountInstallmentPrice: 900,
            discountRate: 0,
            cardDiscountInstallmentPrice: 0,
          },
        ],
        options: [
          {
            id: 1,
            name: '옵션 1',
            prices: [
              {
                type: 'now',
                originalPrice: 10000,
                discountPrice: 9000,
                originalInstallmentPrice: 1000,
                discountInstallmentPrice: 900,
                discountRate: 0,
                cardDiscountInstallmentPrice: 0,
              },
              {
                type: 12,
                originalPrice: 10000,
                discountPrice: 9000,
                originalInstallmentPrice: 1000,
                discountInstallmentPrice: 900,
                discountRate: 0,
                cardDiscountInstallmentPrice: 0,
              },
              {
                type: 24,
                originalPrice: 10000,
                discountPrice: 9000,
                originalInstallmentPrice: 1000,
                discountInstallmentPrice: 900,
                discountRate: 0,
                cardDiscountInstallmentPrice: 0,
              },
              {
                type: 36,
                originalPrice: 10000,
                discountPrice: 9000,
                originalInstallmentPrice: 1000,
                discountInstallmentPrice: 900,
                discountRate: 0,
                cardDiscountInstallmentPrice: 0,
              },
              {
                type: 48,
                originalPrice: 10000,
                discountPrice: 9000,
                originalInstallmentPrice: 1000,
                discountInstallmentPrice: 900,
                discountRate: 0,
                cardDiscountInstallmentPrice: 0,
              },
              {
                type: 60,
                originalPrice: 10000,
                discountPrice: 9000,
                originalInstallmentPrice: 1000,
                discountInstallmentPrice: 900,
                discountRate: 0,
                cardDiscountInstallmentPrice: 0,
              },
            ],
            depth: 1,
            option: 1,
          },
        ],
        likes: 1,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(entity);
      const result = controller.getOne(id);
      expect(result.product).toEqual(entity);
    });
  });
});
