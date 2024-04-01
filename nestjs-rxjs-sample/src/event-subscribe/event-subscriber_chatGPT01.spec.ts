import { Test, TestingModule } from '@nestjs/testing';
import { EventSubscriber } from './event-subscriber';

describe('EventSubscriber', () => {
  let service: EventSubscriber;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventSubscriber],
    }).compile();

    service = module.get<EventSubscriber>(EventSubscriber);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should subscribe to an event', () => {
    const callbackFn = jest.fn(() => true);

    const result = service.subscribeEvent(
      'test_event',
      { testData: 'test' },
      1,
      callbackFn,
    );
    expect(result).toBeTruthy();
  });

  it('should publish an event', () => {
    const callbackFn = jest.fn(() => true);
    service.subscribeEvent('test_event', { testData: 'test' }, 1, callbackFn);

    const result = service.publishEvent('test_event', {
      testData: 'test_data',
    });
    expect(result).toBeTruthy();
    expect(callbackFn).toHaveBeenCalled();
  });

  it('should delete an event', () => {
    const callbackFn = jest.fn(() => true);
    service.subscribeEvent('test_event', { testData: 'test' }, 1, callbackFn);

    const result = service.deleteEvent('test_event');
    expect(result).toBeTruthy();
  });
});
