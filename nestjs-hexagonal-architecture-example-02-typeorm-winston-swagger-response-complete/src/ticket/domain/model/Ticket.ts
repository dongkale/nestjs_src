// import { randomUUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';

export class Ticket {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: string; //TicketStatus;

  @ApiProperty()
  createAt: Date;

  @ApiProperty()
  updateAt: Date;

  @ApiProperty()
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

  isOpened(): boolean {
    return this.status === TicketStatus.OPEN;
  }
}

enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}
