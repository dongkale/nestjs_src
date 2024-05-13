import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksRepository } from '../infrastructure/repositories/tasks.repository';
import { TasksService } from '../usecases/tasks/tasks.service';
import { TaskStatus } from '../domain/enums/task-status.enum';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  id: 424232244,
  username: 'Test user',
  password: 'Test password',
  tasks: []
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test task',
        description: 'Test desc',
        id: '24FS',
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('24FS', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('24FS', mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});