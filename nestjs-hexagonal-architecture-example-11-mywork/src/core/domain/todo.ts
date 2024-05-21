export class Todo {
  constructor(
    public id: number,
    public content: string,
    public is_done: boolean,
    public created_at: Date,
    public updated_at: Date,
  ) {}
}
