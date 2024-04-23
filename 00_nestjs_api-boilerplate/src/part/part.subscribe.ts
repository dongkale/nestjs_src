import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm/index';
import { Part } from './part.entity';

@EventSubscriber()
export class PartSubscriber implements EntitySubscriberInterface<Part> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Part;
  }

  beforeInsert(event: InsertEvent<Part>): Promise<any> | void {
    console.log('Part beforeInsert : ', event.entity);
  }

  afterInsert(event: InsertEvent<Part>): Promise<any> | void {
    console.log('Part afterInsert : ', event.entity);
  }

  beforeUpdate(event: UpdateEvent<Part>): Promise<any> | void {
    console.log('Part beforeUpdate : ', event.entity);
  }

  afterUpdate(event: UpdateEvent<Part>): Promise<any> | void {
    console.log('Part afterUpdate : ', event.entity);
  }
}
