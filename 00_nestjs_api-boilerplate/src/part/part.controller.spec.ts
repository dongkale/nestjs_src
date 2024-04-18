import { Test, TestingModule } from '@nestjs/testing';
import { PartController } from './part.controller';
import { PartService } from './part.service';
import { Part } from './part.entity';
import { CreatePartDto, UpdatePartDto } from './dto/part.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

const mockPartRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PartController', () => {
  let controller: PartController;
  let service: PartService;
  let repository: MockRepository<Part>;
  // let service: MockRepository<PartService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartController],
      providers: [
        PartService,
        {
          provide: getRepositoryToken(Part),
          useValue: mockPartRepository(),
        },
      ],
    }).compile();

    controller = module.get<PartController>(PartController);
    service = module.get<PartService>(PartService);
    repository = module.get<MockRepository<Part>>(getRepositoryToken(Part));
    // service = module.get<MockRepository<PartService>>(
    //   getRepositoryToken(PartService),
    // );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*
  it('create => should create a new part by a given data', async () => {
    const createPartDto = {
      name: 'name_00',
      description: 'description_00',
      dataJson: '{ "numver": 0, "string": "string_00" }',
    } as CreatePartDto;

    const createPart = {
      id: Date.now(),
      name: 'name_00',
      description: 'description_00',
      dataJson: '{ "numver": 0, "string": "string_00" }',
    } as Part;

    // service.create.mockResolvedValue(part);
    //jest.
    // .spyOn(mockPartService as unknown as Repository<PartService>, 'create')
    // .mockResolvedValue(part);

    jest.spyOn(service, 'create').mockResolvedValue(createPart);

    const result = await controller.create(createPartDto);
    console.log('result:', result);

    //   // jest.spyOn(mockPartService, 'create').mockResolvedValue(part);
    //   service.save.mockReturnValue(part);
    //   const result = await controller.create(createPartDto);
    //   //expect(mockPartService as MockRepository<PartService>.create).toHaveBeenCalledWith(createUserDto);
    //   //expect(result).toEqual(user);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(createPartDto);

    // expect(result).toEqual(part);
    expect(result).toEqual({
      resultCode: 0,
      resultMessage: 'Success',
      resultData: createPart,
    });
  });
  */

  describe('create', () => {
    it('should create a new part', async () => {
      const createPartDto: CreatePartDto = {
        name: 'Test Part',
        description: 'Test Description',
        dataJson: '{}',
      };

      const mockData = { id: 1, ...createPartDto };
      jest.spyOn(service, 'create').mockResolvedValue(mockData);

      const result = await controller.create(createPartDto);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(createPartDto);

      expect(result).toEqual({
        resultCode: 0,
        resultMessage: 'Success',
        resultData: mockData,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of parts', async () => {
      const mockData: Part[] = [
        {
          id: 1,
          name: 'Part 1',
          description: 'Test Description 1',
          dataJson: '{}',
        },
        {
          id: 2,
          name: 'Part 2',
          description: 'Test Description 2',
          dataJson: '{}',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockData);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      // expect(service.findAll).toHaveBeenCalledWith(mockData);

      expect(result).toEqual({
        resultCode: 0,
        resultMessage: 'Success',
        resultData: mockData,
      });
    });
  });

  describe('findOne', () => {
    it('should return a part', async () => {
      const testId = 1;

      const mockData: Part = {
        id: 1,
        name: 'Part 1',
        description: 'Test Description 1',
        dataJson: '{}',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockData);

      const result = await controller.findOne(testId);

      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(testId);

      expect(result).toEqual({
        resultCode: 0,
        resultMessage: 'Success',
        resultData: [mockData],
      });
    });

    it('should return an empty array if part not found', async () => {
      const nonExistId = 999;

      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      const result = await controller.findOne(nonExistId);

      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(nonExistId);

      expect(result).toEqual({
        resultCode: 0,
        resultMessage: 'Success',
        resultData: [],
      });
    });

    // it('should fail on findOne exception', async () => {
    //   const testId = 999;
    //   const ErrorString = 'find error';
    //   // repository.findOne.mockReturnValue(ErrorString);
    //   jest.spyOn(service, 'findOne').mockResolvedValue(ErrorString);

    //   const result = await controller.findOne(testId);

    //   expect(repository.findOne).toHaveBeenCalledTimes(1);
    //   expect(repository.findOne).toHaveBeenCalledWith({
    //     where: { id: testId },
    //   });

    //   expect(result).toEqual({
    //     resultCode: 0,
    //     resultMessage: ErrorString,
    //     resultData: [],
    //   });
    // });
  });

  describe('remove', () => {
    it('should remove a part', async () => {
      const testId = 1;

      const mockData = {
        id: 1,
        name: 'Part 1',
        description: 'Test Description 1',
        dataJson: '{}',
      };
      jest.spyOn(service, 'remove').mockResolvedValue(mockData);

      const result = await controller.remove(testId);

      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(testId);

      expect(result).toEqual({
        resultCode: 0,
        resultMessage: 'Success',
        resultData: mockData,
      });
    });

    // it('should throw NotFoundException if part is not found', async () => {
    //   const nonExistId = 999;
    //   const exceptionMessage = `${nonExistId} Not Found.`;

    //   jest
    //     .spyOn(service, 'remove')
    //     .mockRejectedValue(new NotFoundException(exceptionMessage));
    //   // .mockRejectedValue(() => {
    //   //   return throwError(new NotFoundException(exceptionMessage));
    //   // });

    //   const result = await controller.remove(nonExistId);

    //   console.log('result:', result);

    //   expect(service.remove).toHaveBeenCalledTimes(1);
    //   expect(service.remove).toHaveBeenCalledWith(nonExistId);

    //   expect(result).toEqual({
    //     resultCode: 404,
    //     resultMessage: exceptionMessage,
    //     resultData: [],
    //   });
    // });

    it('should throw NotFoundException if part is not found', async () => {
      const nonExistId = 999;
      const exceptionMessage = `${nonExistId} Not Found.`;

      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      try {
        await controller.remove(nonExistId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(exceptionMessage);
      }
    });
  });

  describe('update', () => {
    it('should update a part', async () => {
      const updatePartDto: UpdatePartDto = {
        name: 'Updated Part',
        description: 'Updated Description',
        dataJson: '{}',
      };
      const mockData = { id: 1, ...updatePartDto };
      jest.spyOn(service, 'update').mockResolvedValue(mockData);

      const result = await controller.update(1, updatePartDto);

      expect(result).toEqual({
        resultCode: 0,
        resultMessage: 'Success',
        resultData: mockData,
      });
    });
  });
});
