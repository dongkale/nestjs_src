import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RecoverEvent,
  RemoveEvent,
  SoftRemoveEvent,
  TransactionCommitEvent,
  TransactionRollbackEvent,
  TransactionStartEvent,
  UpdateEvent,
} from 'typeorm/index';

@EventSubscriber()
export class TypeOrmCommonSubscriber implements EntitySubscriberInterface {
  private readonly logger = new Logger(TypeOrmCommonSubscriber.name);

  afterLoad(entity: any) {
    this.logger.log(`After Entity Load: ${JSON.stringify(entity, null, 2)}`);
  }

  beforeInsert(event: InsertEvent<any>): Promise<any> | void {
    this.logger.log(
      `Before Entity Inserted: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterInsert(event: InsertEvent<any>): Promise<any> | void {
    this.logger.log(
      `After Entity Inserted: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  beforeUpdate(event: UpdateEvent<any>): Promise<any> | void {
    this.logger.log(
      `Before Entity Updated: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterUpdate(event: UpdateEvent<any>): Promise<any> | void {
    this.logger.log(
      `After Entity Updated: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  beforeRemove(event: RemoveEvent<any>) {
    this.logger.log(
      `Before Entity with ID ${event.entityId} Removed: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterRemove(event: RemoveEvent<any>) {
    this.logger.log(
      `After Entity with ID ${event.entityId} Removed: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  beforeSoftRemove(event: SoftRemoveEvent<any>) {
    this.logger.log(
      `Before Entity with ID ${event.entityId}: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterSoftRemove(event: SoftRemoveEvent<any>) {
    this.logger.log(
      `After Entity with ID ${event.entityId} Soft Removed: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  beforeRecover(event: RecoverEvent<any>) {
    this.logger.log(
      `Before Entity with ID ${event.entityId} Recovered: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterRecover(event: RecoverEvent<any>) {
    this.logger.log(
      `After Entity with ID ${event.entityId} Recovered: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeTransactionStart(event: TransactionStartEvent) {
    // console.log(`BEFORE TRANSACTION STARTED: `, event);
    this.logger.log(`Before Transaction Started: `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterTransactionStart(event: TransactionStartEvent) {
    // console.log(`AFTER TRANSACTION STARTED: `, event);
    this.logger.log(`After Transaction Started: `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeTransactionCommit(event: TransactionCommitEvent) {
    // console.log(`BEFORE TRANSACTION COMMITTED: `, event);
    this.logger.log(`Before Transaction Committed: `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterTransactionCommit(event: TransactionCommitEvent) {
    // console.log(`AFTER TRANSACTION COMMITTED: `, event);
    this.logger.log(`After Transaction Committed: `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeTransactionRollback(event: TransactionRollbackEvent) {
    // console.log(`BEFORE TRANSACTION ROLLBACK: `, event);
    this.logger.log(`Before Transaction Rollback: `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterTransactionRollback(event: TransactionRollbackEvent) {
    // console.log(`AFTER TRANSACTION ROLLBACK: `, event);
    this.logger.log(`After Transaction Rollback: `);
  }
}
