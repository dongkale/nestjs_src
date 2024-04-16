import { Test, TestingModule } from '@nestjs/testing';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { Sample } from './sample.entity';
import { CreateSampleDto, UpdateSampleDto } from './dto/sample.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { throwError } from 'rxjs';

const mockSampleRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('SampleController', () => {
  let controller: SampleController;
  let service: SampleService;
  let repository: MockRepository<Sample>;
  // let service: MockRepository<SampleService>;
  // let sampleRepository: Sample;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleController],
      providers: [
        SampleService,
        {
          provide: getRepositoryToken(Sample),
          useValue: mockSampleRepository(),
        },
      ],
    }).compile();

    controller = module.get<SampleController>(SampleController);
    service = module.get<SampleService>(SampleService);
    repository = module.get<MockRepository<Sample>>(getRepositoryToken(Sample));
    // service = module.get<MockRepository<SampleService>>(
    //   getRepositoryToken(SampleService),
    // );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*
  it('create => should create a new sample by a given data', async () => {
    const createSampleDto = {
      name: 'name_00',
      description: 'description_00',
      dataJson: '{ "numver": 0, "string": "string_00" }',
    } as CreateSampleDto;

    const createSample = {
      id: Date.now(),
      name: 'name_00',
      description: 'description_00',
      dataJson: '{ "numver": 0, "string": "string_00" }',
    } as Sample;

    // service.create.mockResolvedValue(sample);
    //jest.
    // .spyOn(mockSampleService as unknown as Repository<SampleService>, 'create')
    // .mockResolvedValue(sample);

    jest.spyOn(service, 'create').mockResolvedValue(createSample);

    const result = await controller.create(createSampleDto);
    console.log('result:', result);

    //   // jest.spyOn(mockSampleService, 'create').mockResolvedValue(sample);
    //   service.save.mockReturnValue(sample);
    //   const result = await controller.create(createSampleDto);
    //   //expect(mockSampleService as MockRepository<SampleService>.create).toHaveBeenCalledWith(createUserDto);
    //   //expect(result).toEqual(user);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(createSampleDto);

    // expect(result).toEqual(sample);
    expect(result).toEqual({
      result_code: 0,
      result_message: 'Success',
      result_data: createSample,
    });
  });
  */

  describe('create', () => {
    it('should create a new sample', async () => {
      const createSampleDto: CreateSampleDto = {
        name: 'Test Sample',
        description: 'Test Description',
        dataJson: '{}',
      };

      const mockData = { id: 1, ...createSampleDto };
      jest.spyOn(service, 'create').mockResolvedValue(mockData);

      const result = await controller.create(createSampleDto);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(createSampleDto);

      expect(result).toEqual({
        result_code: 0,
        result_message: 'Success',
        result_data: mockData,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of samples', async () => {
      const mockData: Sample[] = [
        {
          id: 1,
          name: 'Sample 1',
          description: 'Test Description 1',
          dataJson: '{}',
        },
        {
          id: 2,
          name: 'Sample 2',
          description: 'Test Description 2',
          dataJson: '{}',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockData);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      // expect(service.findAll).toHaveBeenCalledWith(mockData);

      expect(result).toEqual({
        result_code: 0,
        result_message: 'Success',
        result_data: mockData,
      });
    });
  });

  describe('findOne', () => {
    it('should return a sample', async () => {
      const testId = 1;

      const mockData: Sample = {
        id: 1,
        name: 'Sample 1',
        description: 'Test Description 1',
        dataJson: '{}',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockData);

      const result = await controller.findOne(testId);

      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(testId);

      expect(result).toEqual({
        result_code: 0,
        result_message: 'Success',
        result_data: [mockData],
      });
    });

    it('should return an empty array if sample not found', async () => {
      const nonExistId = 999;

      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      const result = await controller.findOne(nonExistId);

      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(nonExistId);

      expect(result).toEqual({
        result_code: 0,
        result_message: 'Success',
        result_data: [],
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
    //     result_code: 0,
    //     result_message: ErrorString,
    //     result_data: [],
    //   });
    // });
  });

  describe('remove', () => {
    it('should remove a sample', async () => {
      const testId = 1;

      const mockData = {
        id: 1,
        name: 'Sample 1',
        description: 'Test Description 1',
        dataJson: '{}',
      };
      jest.spyOn(service, 'remove').mockResolvedValue(mockData);

      const result = await controller.remove(testId);

      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(testId);

      expect(result).toEqual({
        result_code: 0,
        result_message: 'Success',
        result_data: mockData,
      });
    });

    // it('should throw NotFoundException if sample is not found', async () => {
    //   const nonExistId = 999;
    //   const exceptionMessage = `id: ${nonExistId} Not Found.`;

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
    //     result_code: 404,
    //     result_message: exceptionMessage,
    //     result_data: [],
    //   });
    // });
  });

  describe('update', () => {
    it('should update a sample', async () => {
      const updateSampleDto: UpdateSampleDto = {
        name: 'Updated Sample',
        description: 'Updated Description',
        dataJson: '{}',
      };
      const mockData = { id: 1, ...updateSampleDto };
      jest.spyOn(service, 'update').mockResolvedValue(mockData);

      const result = await controller.update(1, updateSampleDto);

      expect(result).toEqual({
        result_code: 0,
        result_message: 'Success',
        result_data: mockData,
      });
    });
  });
});
