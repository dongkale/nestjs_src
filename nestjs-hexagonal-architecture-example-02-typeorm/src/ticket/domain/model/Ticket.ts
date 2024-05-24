import { randomUUID } from 'crypto';

export class Ticket {
  id: number;
  description: string;
  status: string; //TicketStatus;
  createAt: Date;
  updateAt: Date;
  priority: number;

  constructor(
    id: number,
    description: string,
    status: string,
    priority: number,
    createAt: Date,
    updateAt: Date,
  ) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.createAt = createAt;
    this.updateAt = updateAt;
  }

  // constructor() {
  //   this.id = id;
  //   this.description = description;
  //   this.status = TicketStatus.OPEN;
  //   this.createAt = new Date();
  //   this.updateAt = new Date();
  //   this.priority = priority;
  // }

  isClosed(): boolean {
    return this.status === TicketStatus.CLOSED;
  }
}

enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}
