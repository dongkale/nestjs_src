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

  it('should add an event and subscribe to it', () => {
    const event = 'testEvent';
    const callback = jest.fn();
    const result = eventSubscriber.addedEvent(event, callback);

    expect(result).toBe(true);
    expect(eventSubscriber['eventSubjects']).toHaveProperty(event);
  });

  it('should not add an event if it already exists', () => {
    const event = 'testEvent';
    const callback = jest.fn();
    eventSubscriber.addedEvent(event, callback);
    const result = eventSubscriber.addedEvent(event, callback);

    expect(result).toBe(false);
  });

  it('should delete an existing event', () => {
    const event = 'testEvent';
    const callback = jest.fn();
    eventSubscriber.addedEvent(event, callback);
    const result = eventSubscriber.deleteEvent(event);

    expect(result).toBe(true);
    expect(eventSubscriber['eventSubjects']).not.toHaveProperty(event);
  });

  it('should not delete a non-existing event', () => {
    const event = 'testEvent';
    const result = eventSubscriber.deleteEvent(event);

    expect(result).toBe(false);
  });

  it('should publish an event and call the subscribed callback', () => {
    const event = 'testEvent';
    const callback = jest.fn();
    eventSubscriber.addedEvent(event, callback);
    const data = { message: 'Hello' };
    const result = eventSubscriber.publishEvent(event, data);

    expect(result).toBe(true);
    expect(callback).toHaveBeenCalledWith(event, data);
  });

  it('should not publish a non-existing event', () => {
    const event = 'testEvent';
    const data = { message: 'Hello' };
    const result = eventSubscriber.publishEvent(event, data);

    expect(result).toBe(false);
  });

  // Add more test cases here
});