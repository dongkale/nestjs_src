import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '@/common/common.module';

import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [BrandsController],
      providers: [BrandsService],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  it('정의되어야 함', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /brands', () => {
    it('브랜드 리스트를 가져와야 함', () => {
      const entities = [
        {
          id: 1,
          thumbnail: '',
          locales: {
            kr: '브랜드 1',
            en: 'brand 1',
          },
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(entities);
      const result = controller.getAllList();
      expect(result.brands).toEqual(entities);
    });
  });

  describe('GET /brands/:id', () => {
    it('브랜드의 상세 정보를 가져와야 함', () => {
      const id = 1;
      const entity = {
        id: 1,
        name: '브랜드 1',
        logo: '',
        introduce: '브랜드 소개',
        likes: 1,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(entity);
      const result = controller.getOne(id);
      expect(result.brand).toEqual(entity);
    });
  });

  describe('GET /brands/:id/products', () => {
    it('브랜드의 제품 리스트를 가져와야 함', () => {
      const id = 1;
      const entities = [
        {
          id: 1,
          name: '상품 1',
          thumbnail: '',
          brand: { id, name: 'brand 1' },
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
