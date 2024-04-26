import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm/index';
import { Part } from './part.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class PartSubscriber implements EntitySubscriberInterface<Part> {
  private readonly logger = new Logger(PartSubscriber.name);

  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Part;
  }

  afterLoad(entity: any) {
    this.logger.log(`After Entity Load: ${JSON.stringify(entity, null, 2)}`);
  }

  beforeInsert(event: InsertEvent<Part>): Promise<any> | void {
    this.logger.log(
      `Before Entity Inserted: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterInsert(event: InsertEvent<Part>): Promise<any> | void {
    this.logger.log(
      `After Entity Inserted: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  beforeUpdate(event: UpdateEvent<Part>): Promise<any> | void {
    this.logger.log(
      `Before Entity Updated: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterUpdate(event: UpdateEvent<Part>): Promise<any> | void {
    this.logger.log(
      `After Entity Updated: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  beforeRemove(event: RemoveEvent<Part>) {
    this.logger.log(
      `Before Entity with ID ${event.entityId} Removed: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterRemove(event: RemoveEvent<Part>) {
    this.logger.log(
      `After Entity with ID ${event.entityId} Removed: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  beforeSoftRemove(event: SoftRemoveEvent<Part>) {
    this.logger.log(
      `Before Entity with ID ${event.entityId}: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterSoftRemove(event: SoftRemoveEvent<Part>) {
    this.logger.log(
      `After Entity with ID ${event.entityId} Soft Removed: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }
}
