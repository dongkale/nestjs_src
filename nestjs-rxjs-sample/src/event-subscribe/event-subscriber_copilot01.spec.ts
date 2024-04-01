import { EventSubscriber } from './event-subscriber';

describe('EventSubscriber', () => {
  let eventSubscriber: EventSubscriber;

  beforeEach(() => {
    eventSubscriber = new EventSubscriber();
  });

  it('should subscribe to an event', () => {
    const event = 'testEvent';
    const callback = jest.fn();
    const result = eventSubscriber.subscribeEvent(event, {}, 10, callback);

    expect(result).toBe(true);
  });

  it('should publish an event', () => {
    const event = 'testEvent';
    const argument = 'testArgument';
    const callback = jest.fn();
    eventSubscriber.subscribeEvent(event, {}, 10, callback);

    const result = eventSubscriber.publishEvent(event, argument);

    expect(result).toBe(true);
    expect(callback).toHaveBeenCalledWith(1, event, {}, argument);
  });

  it('should delete an event', () => {
    const event = 'testEvent';
    const callback = jest.fn();
    eventSubscriber.subscribeEvent(event, {}, 10, callback);

    const result = eventSubscriber.deleteEvent(event);

    expect(result).toBe(true);
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

  // Add more test cases as needed

});