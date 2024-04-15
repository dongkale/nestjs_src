import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '@/common/common.module';

import { MyController } from './my.controller';
import { MyService } from './my.service';

describe('MyController', () => {
  let controller: MyController;
  let service: MyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [MyController],
      providers: [MyService],
    }).compile();

    controller = module.get<MyController>(MyController);
    service = module.get<MyService>(MyService);
  });

  it('정의되어야 함', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /my/:id', () => {
    it('유저 정보를 가져와야 함', () => {
      const entity = {
        id: 1,
        name: 'test',
        phone: '01012345678',
        gender: 1,
        birthday: '1990-01-01',
        snsType: 'naver',
        isReceiveAd: true,
        address: {
          zipCode: '12345',
          address: '서울시 강남구',
          detailAddress: '역삼동',
        },
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(entity);
      const result = controller.getOne();
      expect(result.user).toEqual(entity);
    });
  });

  describe('POST /my', () => {
    it('유저를 생성해야 함', () => {
      const body = {
        name: 'test',
        phone: '01012345678',
        gender: 1,
        birthday: '1990-01-01',
        snsType: 'naver',
        isReceiveAd: true,
      };

      jest.spyOn(service, 'create').mockResolvedValue(true);
      const result = controller.create(body);
      expect(result).toEqual(true);
    });
  });

  describe('PATCH /my/:id', () => {
    it('유저를 수정해야 함', () => {
      const id = 1;
      const body = {
        name: 'test',
        phone: '01012345678',
        gender: 1,
        birthday: '1990-01-01',
        snsType: 'naver',
        isReceiveAd: true,
      };

      jest.spyOn(service, 'update').mockResolvedValue(true);
      const result = controller.update(id, body);
      expect(result).toEqual(true);
    });
  });

  describe('GET /my/:id/orders', () => {
    it('유저의 주문 내역을 가져와야 함', () => {
      const id = 1;
      const entities = [
        {
          orderId: 1,
          productName: 'test',
          options: [
            { depth: 1, option: 'black' },
            { depth: 2, option: 'white' },
          ],
          totalPrice: 10000,
          status: 1,
          contractDate: '2021-01-01',
        },
      ];

      jest.spyOn(service, 'findOrders').mockResolvedValue(entities);
      const result = controller.getOrders(id);
      expect(result.orders).toEqual(entities);
    });
  });

  describe('GET /my/:id/orders/:orderId', () => {
    it('유저의 주문 상세 내역을 가져와야 함', () => {
      const id = 1;
      const orderId = 1;
      const entity = {
        orderId: 1,
        productName: 'test',
        options: [
          { depth: 1, option: 'black' },
          { depth: 2, option: 'white' },
        ],
        totalPrice: 10000,
        status: 1,
        contractDate: '2021-01-01',
        name: '홍길동',
        address: {
          zipcode: '12345',
          address: '서울시 강남구',
          detailAddress: '역삼동',
        },
        phone: '01012345678',
        discountAmount: 1000,
        beforeDiscountAmount: 10000,
        cardName: 'hana',
        installment: 12,
      };

      jest.spyOn(service, 'findOrder').mockResolvedValue(entity);
      const result = controller.getOrder(id, orderId);
      expect(result.order).toEqual(entity);
    });
  });

  describe('POST /my/:id/orders', () => {
    it('유저의 주문을 생성해야 함', () => {
      const id = 1;
      const body = {
        name: '홍길동',
        phone: '01012345678',
        productId: 1,
        options: [
          { depth: 1, option: 'black' },
          { depth: 2, option: 'white' },
        ],
        installmentPeriod: 12,
        recipient: '홍길동',
        recipientPhone: '01012345678',
        totalPrice: 10000,
        installmentPrice: 1000,
        address: {
          zipCode: '12345',
          address: '서울시 강남구',
          detailAddress: '역삼동',
        },
        card: {
          cardName: 'hana',
          cardNumber: '1234123412341234',
          expiredAt: '01/01',
          password: 12,
        },
      };

      jest.spyOn(service, 'createOrder').mockResolvedValue(true);
      const result = controller.createOrder(id, body);
      expect(result).toEqual(true);
    });
  });

  describe('PATCH /my/:id/orders/:orderId', () => {
    it('유저의 주문을 수정해야 함', () => {
      const id = 1;
      const orderId = 1;
      const body = {
        recipient: '홍길동',
        recipientPhone: '01012345678',
        address: {
          zipCode: '12345',
          address: '서울시 강남구',
          detailAddress: '역삼동',
        },
        card: {
          cardName: 'hana',
          cardNumber: '1234123412341234',
          expiredAt: '01/01',
          password: 12,
        },
      };

      jest.spyOn(service, 'updateOrder').mockResolvedValue(true);
      const result = controller.updateOrder(id, orderId, body);
      expect(result).toEqual(true);
    });
  });

  describe('POST /my/:id/orders/:orderId/cancel', () => {
    it('유저의 주문을 취소해야 함', () => {
      const id = 1;
      const orderId = 1;
      const body = {
        reason: 'test',
        etcReason: 'test',
        detailReason: 'test',
      };

      jest.spyOn(service, 'cancelOrder').mockResolvedValue(true);
      const result = controller.cancelOrder(id, orderId, body);
      expect(result).toEqual(true);
    });
  });

  describe('GET /my/:id/cart', () => {
    it('유저의 장바구니 내역을 가져와야 함', () => {
      const id = 1;
      const entities = [
        {
          id: 1,
          type: 'bnpl',
          productId: 1,
          productName: 'test',
          thumbnail: 'test',
          options: [
            { depth: 1, option: 'black' },
            { depth: 2, option: 'white' },
          ],
          installmentPeriod: 12,
          deliveryFee: 2500,
          price: {
            originalPrice: 10000,
            discountPrice: 9000,
            originalInstallmentPrice: 1000,
            discountInstallmentPrice: 900,
            discountRate: 10,
          },
        },
      ];

      jest.spyOn(service, 'findCart').mockResolvedValue(entities);
      const result = controller.getCart(id);
      expect(result.carts).toEqual(entities);
    });
  });

  describe('POST /my/:id/cart', () => {
    it('유저의 장바구니에 제품을 추가해야 함', () => {
      const id = 1;
      const body = {
        productId: 1,
        options: [
          { depth: 1, option: 'black' },
          { depth: 2, option: 'white' },
        ],
        installmentPeriod: 12,
      };

      jest.spyOn(service, 'createCart').mockResolvedValue(true);
      const result = controller.createCart(id, body);
      expect(result).toEqual(true);
    });
  });

  describe('DELETE /my/:id/cart/:cartId', () => {
    it('유저의 장바구니에서 제품을 삭제해야 함', () => {
      const id = 1;
      const cartId = 1;

      jest.spyOn(service, 'deleteCart').mockResolvedValue(true);
      const result = controller.deleteCart(id, cartId);
      expect(result).toEqual(true);
    });
  });
});
