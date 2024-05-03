export class UpdateByCompletedCommand {
  id: number;
  completed: boolean;
  constructor(id: number, completed: boolean) {
    this.id = id;
    this.completed = completed === true ? true : false;
  }
}
