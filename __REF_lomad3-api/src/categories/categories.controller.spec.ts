import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '@/common/common.module';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('정의되어야 함', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /categories', () => {
    it('카테고리 리스트를 가져와야 함', () => {
      const entities = [
        {
          id: 1,
          name: '큰 카테고리 1',
          children: [
            {
              id: 2,
              name: '작은 카테고리 1',
              children: [],
            },
          ],
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(entities);
      const result = controller.getAllList();
      expect(result.categories).toEqual(entities);
    });
  });

  describe('GET /categories/:id/products', () => {
    it('카테고리의 상품 리스트를 가져와야 함', () => {
      const id = 1;
      const entities = [
        {
          id: 1,
          name: '상품 1',
          thumbnail: '',
          brand: { id: 1, name: 'brand 1' },
          prices: [
            {
              type: 'now',
              price: 1000,
              discountRate: 0,
              card: { name: 'hana', discountPrice: 1000 },
            },
            {
              type: 12,
              price: 1000,
              discountRate: 0,
              card: { name: 'hana', discountPrice: 1000 },
            },
            {
              type: 24,
              price: 1000,
              discountRate: 0,
              card: { name: 'hana', discountPrice: 1000 },
            },
            {
              type: 36,
              price: 1000,
              discountRate: 0,
              card: { name: 'hana', discountPrice: 1000 },
            },
            {
              type: 48,
              price: 1000,
              discountRate: 0,
              card: { name: 'hana', discountPrice: 1000 },
            },
            {
              type: 60,
              price: 1000,
              discountRate: 0,
              card: { name: 'hana', discountPrice: 1000 },
            },
          ],
          labels: ['new', 'best', 'sale'],
        },
      ];

      jest.spyOn(service, 'findProducts').mockResolvedValue(entities);
      const result = controller.getProducts(id);
      expect(result.products).toEqual(entities);
    });
  });
});
