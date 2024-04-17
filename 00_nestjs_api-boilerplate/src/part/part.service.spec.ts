import { Test, TestingModule } from '@nestjs/testing';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PartService } from './part.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Part } from './part.entity';
import {
  EntityNotFoundError,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  ServerDescription,
} from 'typeorm';
import { UpdatePartDto } from './dto/part.dto';

const mockPartRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PartService', () => {
  let service: PartService;
  // let repository: Repository<Part>;
  let repository: MockRepository<Part>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartService,
        {
          provide: getRepositoryToken(Part),
          useValue: mockPartRepository(),
        },
      ],
    }).compile();

    service = module.get<PartService>(PartService);
    repository = module.get<MockRepository<Part>>(getRepositoryToken(Part));

    // service = module.get<PartService>(PartService);
    // repository = module.get<Repository<Part>>(getRepositoryToken(Part));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create()', () => {
    const createArgs = {
      name: 'name_00',
      description: 'description_00',
      dataJson: "{ number: 1, string: 'string_01' }",
    };

    it('should fail on error', async () => {
      const ErrorString = 'save error';
      repository.save.mockReturnValue(ErrorString);

      const result = await service.create(createArgs);

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(createArgs);

      expect(result).toEqual(ErrorString);
    });

    it('should create Part', async () => {
      repository.save.mockReturnValue(createArgs);
      const result = await service.create(createArgs);

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(createArgs); // 매개변수로 createArgs가 주어졌니?

      expect(result).toEqual(createArgs);
    });
  });

  describe('findAll()', () => {
    it('should be find All', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledTimes(1);

      expect(result).toEqual([]);
    });

    it('should fail on exception', async () => {
      const ErrorString = 'find error';
      repository.find.mockReturnValue(ErrorString);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledTimes(1);

      expect(result).toEqual(ErrorString);
    });
  });

  describe('findOne()', () => {
    const findOneArgs = { id: 1 };

    it('should be findOne', async () => {
      const mockedPart = {
        id: 1,
        name: 'name_00',
        description: 'description_00',
        dataJson: "{ number: 1, string: 'string_01' }",
      };
      repository.findOne.mockResolvedValue(mockedPart);

      const result = await service.findOne(findOneArgs.id);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      // expect(repository.findOne).toHaveBeenCalledWith(findOneArgs);

      expect(result).toEqual(mockedPart);
    });

    it('should fail if no post is found', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.findOne(findOneArgs.id);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: findOneArgs.id },
      });

      expect(result).toEqual(null);
    });

    it('should fail on findOne exception', async () => {
      const ErrorString = 'find error';
      repository.findOne.mockReturnValue(ErrorString);

      const result = await service.findOne(findOneArgs.id);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: findOneArgs.id },
      });

      expect(result).toEqual(ErrorString);
    });
  });

  describe('update()', () => {
    const partId = 1;
    const updatePartDto: UpdatePartDto = {
      name: 'Updated Name',
      description: 'Updated Description',
      dataJson: '{"updated_key": "updated_value"}',
    };

    it('should be update post', async () => {
      const existingPart = new Part();

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingPart);
      jest.spyOn(repository, 'save').mockResolvedValue(existingPart);

      const result = await service.update(partId, updatePartDto);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: partId },
      });

      expect(result).toEqual(existingPart);
    });

    it('should throw NotFoundException if part is not found', async () => {
      const nonExistId = 999;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = service.update(nonExistId, updatePartDto);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: nonExistId },
      });

      expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove()', () => {
    const partId = 1;
    const expectedPart = new Part();

    it('should be remove post', async () => {
      // repository.findOne.mockResolvedValue(findOneArgs);
      // repository.softDelete.mockResolvedValue(softDeleteArgs);

      repository.findOne.mockResolvedValue(expectedPart);

      const removedPart = await service.remove(partId);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: partId },
      });

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(removedPart).toEqual(expectedPart);
    });

    it('should remove an existing part', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(expectedPart);
      jest.spyOn(repository, 'delete').mockResolvedValue({});

      const result = await service.remove(partId);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: partId },
      });

      expect(result).toEqual(expectedPart);
    });

    it('should nonExistId NotFoundException if part is not found', async () => {
      const nonExistId = 999; // Non-existent ID
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = service.remove(nonExistId);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: nonExistId },
      });

      expect(result).rejects.toThrow(NotFoundException);
    });
  });

  // // 함수 정의 하여 테스트
  // describe('findOne() extend', () => {
  //   it('should return one user who has id in input param', async () => {
  //     const userId = 42;

  //     const result = await service.findOneById(userId);

  //     expect(result.id).toBe(userId);
  //   });

  //   it('should return InternelServerException when input userId is 1', async () => {
  //     const userId = 1;

  //     await expect(service.findOneById(userId)).rejects.toThrow(
  //       InternalServerErrorException,
  //     );
  //   });
  // });
});
