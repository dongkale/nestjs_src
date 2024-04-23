import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RecoverEvent,
  RemoveEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm/index';

@EventSubscriber()
export class TypeOrmCommonSubscriber implements EntitySubscriberInterface {
  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<any>) {
    console.log(`BEFORE ENTITY INSERTED: `, event.entity);
  }

  /**
   * Called before entity insertion.
   */
  beforeUpdate(event: UpdateEvent<any>) {
    console.log(`BEFORE ENTITY UPDATED: `, event.entity);
  }

  /**
   * Called before entity insertion.
   */
  beforeRemove(event: RemoveEvent<any>) {
    console.log(
      `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity,
    );
  }

  /**
   * Called before entity insertion.
   */
  beforeSoftRemove(event: SoftRemoveEvent<any>) {
    console.log(
      `BEFORE ENTITY WITH ID ${event.entityId} SOFT-REMOVED: `,
      event.entity,
    );
  }

  /**
   * Called before entity insertion.
   */
  beforeRecover(event: RecoverEvent<any>) {
    console.log(
      `BEFORE ENTITY WITH ID ${event.entityId} RECOVERED: `,
      event.entity,
    );
  }

  /**
   * Called after entity insertion.
   */
  afterInsert(event: InsertEvent<any>) {
    console.log(`AFTER ENTITY INSERTED: `, event.entity);
  }

  /**
   * Called after entity insertion.
   */
  afterUpdate(event: UpdateEvent<any>) {
    console.log(`AFTER ENTITY UPDATED: `, event.entity);
  }

  /**
   * Called after entity insertion.
   */
  afterRemove(event: RemoveEvent<any>) {
    console.log(
      `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
      event.entity,
    );
  }

  /**
   * Called after entity insertion.
   */
  afterSoftRemove(event: SoftRemoveEvent<any>) {
    console.log(
      `AFTER ENTITY WITH ID ${event.entityId} SOFT-REMOVED: `,
      event.entity,
    );
  }

  /**
   * Called after entity insertion.
   */
  afterRecover(event: RecoverEvent<any>) {
    console.log(
      `AFTER ENTITY WITH ID ${event.entityId} RECOVERED: `,
      event.entity,
    );
  }

  /**
   * Called after entity is loaded.
   */
  //   afterLoad(entity: any) {
  //     console.log(`AFTER ENTITY LOADED: `, entity);
  //   }
}
