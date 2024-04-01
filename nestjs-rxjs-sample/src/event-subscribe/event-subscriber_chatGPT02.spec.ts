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

  it('should publish an event and call the callback function', () => {
    const callbackFn = jest.fn(() => true);
    service.subscribeEvent('test_event', { testData: 'test' }, 1, callbackFn);

    const result = service.publishEvent('test_event', {
      testData: 'test_data',
    });
    expect(result).toBeTruthy();
    expect(callbackFn).toHaveBeenCalledWith(
      1,
      'test_event',
      { testData: 'test' },
      { testData: 'test_data' },
    );
  });

  it('should delete an event', () => {
    const callbackFn = jest.fn(() => true);
    service.subscribeEvent('test_event', { testData: 'test' }, 1, callbackFn);

    const result = service.deleteEvent('test_event');
    expect(result).toBeTruthy();
  });

  it('should not delete an event if it does not exist', () => {
    const result = service.deleteEvent('non_existing_event');
    expect(result).toBeFalsy();
  });

  it('should handle event error', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const error = new Error('Test error');

    service['handleEventError']('test_event', error);

    expect(consoleSpy).toHaveBeenCalledWith(
      '[EventSubscriber][Error] event: test_event -> Test error',
    );
  });

  it('should handle event complete', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    service['handleEventComplete']('test_event');

    expect(consoleSpy).toHaveBeenCalledWith(
      '[EventSubscriber] complete event: test_event',
    );
  });
});
