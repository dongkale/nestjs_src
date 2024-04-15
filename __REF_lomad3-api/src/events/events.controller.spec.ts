import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '@/common/common.module';

import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('정의되어야 함', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /events', () => {
    it('이벤트 리스트를 불러와야 함', () => {
      const entities = [
        {
          id: 1,
          thumbnail: 'https://example.com',
          startedAt: new Date(),
          endedAt: new Date(),
          label: '이벤트 1',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(entities);
      const result = await controller.getAll();
      expect(result.events).toEqual(entities);
    });
  });

  describe('GET /events/:id/products', () => {
    it('이벤트의 상품 리스트를 불러와야 함', () => {
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
