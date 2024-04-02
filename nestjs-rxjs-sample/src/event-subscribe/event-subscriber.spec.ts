import { Test, TestingModule } from '@nestjs/testing';
import { EventSubscriber } from './event-subscriber';

describe('EventSubscriber', () => {
  let eventSubscriber: EventSubscriber;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventSubscriber],
    }).compile();

    eventSubscriber = module.get<EventSubscriber>(EventSubscriber);
  });

  it('should be defined', () => {
    expect(eventSubscriber).toBeDefined();
  });

  it('should subscribe to an event', () => {
    const callbackFn = jest.fn(() => true);

    const result = eventSubscriber.subscribeEvent(
      'test_event',
      { testData: 'test' },
      1,
      callbackFn,
    );
    expect(result).toBeTruthy();
  });

  it('should add an event and subscribe to it', () => {
    const event = 'testEvent';
    const callback = jest.fn();
    const result = eventSubscriber.subscribeEvent(event, {}, 10, callback);

    expect(result).toBe(true);
    expect(eventSubscriber['eventSubjects']).toHaveProperty(event);
  });

  it('should publish an event', () => {
    const callbackFn = jest.fn(() => true);
    eventSubscriber.subscribeEvent(
      'test_event',
      { testData: 'test' },
      1,
      callbackFn,
    );

    const result = eventSubscriber.publishEvent('test_event', {
      testData: 'test_data',
    });

    expect(result).toBeTruthy();
    expect(callbackFn).toHaveBeenCalled();
  });

  it('should publish an event and call the callback function', () => {
    const callbackFn = jest.fn(() => true);
    eventSubscriber.subscribeEvent(
      'test_event',
      { testData: 'test' },
      1,
      callbackFn,
    );

    const result = eventSubscriber.publishEvent('test_event', {
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
    eventSubscriber.subscribeEvent(
      'test_event',
      { testData: 'test' },
      1,
      callbackFn,
    );

    const result = eventSubscriber.deleteEvent('test_event');
    expect(result).toBeTruthy();
  });

  it('should not delete an event if it does not exist', () => {
    const result = eventSubscriber.deleteEvent('non_existing_event');
    expect(result).toBeFalsy();
  });

  it('should delete an event', () => {
    const event = 'testEvent';
    const callback = jest.fn();
    eventSubscriber.subscribeEvent(event, {}, 10, callback);

    const result = eventSubscriber.deleteEvent(event);

    expect(result).toBe(true);
    expect(eventSubscriber['eventSubjects']).not.toHaveProperty(event);
  });

  it('should handle callback function', () => {
    const event = 'testEvent';
    const argument = 'testArgument';
    const callback = jest.fn((num, event, data, argument) => {
      if (num === 1) {
        return true;
      }
      return false;
    });
    eventSubscriber.subscribeEvent(event, {}, 10, callback);

    const result = eventSubscriber.publishEvent(event, argument);

    expect(result).toBe(true);
    expect(callback).toHaveBeenCalledWith(1, event, {}, argument);
  });

  it('should handle event error', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const error = new Error('Test error');

    eventSubscriber['handleEventError']('test_event', error);

    expect(consoleSpy).toHaveBeenCalledWith(
      '[EventSubscriber][Error] event: test_event -> Test error',
    );
  });

  it('should handle event complete', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    eventSubscriber['handleEventComplete']('test_event');

    expect(consoleSpy).toHaveBeenCalledWith(
      '[EventSubscriber] complete event: test_event',
    );
  });
});
