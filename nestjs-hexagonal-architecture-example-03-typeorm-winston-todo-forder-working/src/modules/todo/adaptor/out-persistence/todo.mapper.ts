import { TodoEntity } from '@/todo/domains/entities/todo.entity';
import { TodoOrmEntity } from '@/todo/adaptor/out-persistence/todo.orm-entity';

export class TodoMapper {
  static mapToTodos(todoOrmEntity: TodoOrmEntity[]) {
    const todoEntitys: TodoEntity[] = [];

    todoOrmEntity.forEach((todoOrmEntity: TodoOrmEntity) => {
      todoEntitys.push(TodoMapper.mapToTodo(todoOrmEntity));
    });

    return todoEntitys;
  }

  static mapToTodo(todoOrm: TodoOrmEntity): TodoEntity {
    return new TodoEntity(
      todoOrm.id,
      todoOrm.title,
      todoOrm.content,
      todoOrm.updatedAt,
      todoOrm.createdAt,
    );
  }

  static mapToTodoOrmEntity(todoEntity: TodoEntity): TodoOrmEntity {
    const todoOrmEntity = new TodoOrmEntity();
    todoOrmEntity.title = todoEntity.title;
    todoOrmEntity.content = todoEntity.content;
    if (todoEntity.id !== null) {
      todoOrmEntity.id = todoEntity.id;
    }
    return todoOrmEntity;
  }
}
