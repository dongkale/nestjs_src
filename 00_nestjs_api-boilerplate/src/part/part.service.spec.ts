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
import { CreatePartDto, ResponsePartDto, UpdatePartDto } from './dto/part.dto';

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

    it('should fail on save error', async () => {
      const exceptionString = 'Create Part Failed';
      repository.save.mockResolvedValue(null); // save() 에 정상처리 되었을 때(물론 에러 리턴하지만)

      await expect(service.create(createArgs)).rejects.toThrow(
        new Error(exceptionString),
      );

      // const result = await service.create(createArgs);
      // expect(await service.create(createArgs)).rejects.toThrow(exceptionString);

      // await expect(service.create({})).rejects.toThrow(exceptionString);

      // expect(repository.save).toHaveBeenCalledTimes(1);
      // expect(repository.save).toHaveBeenCalledWith(createArgs);

      // expect(result).toEqual(ErrorString);
    });

    it('should fail on save exception', async () => {
      repository.save.mockRejectedValue(new Error()); // save() 에 에러가 발생했을 때

      await expect(service.create(createArgs)).rejects.toThrow(new Error());
    });

    it('should create a part', async () => {
      // Mocking the repository methods and data
      const createPartDto: CreatePartDto = {
        name: 'mame_00',
        description: 'description_00',
        dataJson: JSON.stringify({ number: 0, string: 'string_00' }),
      };

      const createdPart: Part = {
        id: 1,
        ...createPartDto,
      };

      repository.save.mockResolvedValue(createdPart);
      repository.findOne.mockResolvedValue(createdPart);

      const result = await service.create(createPartDto);

      // Check if the repository methods were called with the correct arguments
      expect(repository.save).toHaveBeenCalledWith(createPartDto, {
        reload: true,
      });
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: createdPart.id },
      });

      // Json String 파싱이 잘 되나?
      expect(JSON.parse(result.dataJson)).toBeTruthy();

      // Check if the result matches the expected value
      expect(result).toEqual(createdPart);
    });
  });

  describe('findAll()', () => {
    it('should be find All', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledTimes(1);

      expect(result).toEqual([]);
    });

    it('should return an array of ResponsePartDto', async () => {
      const findData = [
        {
          id: 1,
          name: 'name_01',
          description: 'description_01',
          dataJson: JSON.stringify({ number: 0, string: 'string_00' }),
        },
        {
          id: 2,
          name: 'name_02',
          description: 'description_02',
          dataJson: JSON.stringify({ number: 0, string: 'string_00' }),
        },
      ];
      const expectedData: ResponsePartDto[] = [
        {
          id: findData[0].id,
          name: findData[0].name,
          description: findData[0].description,
          dataJson: findData[0].dataJson,
        },
        {
          id: findData[1].id,
          name: findData[1].name,
          description: findData[1].description,
          dataJson: findData[1].dataJson,
        },
      ];
      repository.find.mockResolvedValue(findData);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedData);
    });

    it('should fail on exception', async () => {
      repository.find.mockRejectedValue(new Error()); // save() 에 에러가 발생했을 때

      await expect(service.findAll()).rejects.toThrow(new Error());
    });
  });

  describe('findOne()', () => {
    const findName = 'name_00';
    const nonExistName = 'name_999';

    it('should be findOne', async () => {
      const findOneData = {
        id: 1,
        name: findName,
        description: 'description_00',
        dataJson: JSON.stringify({ number: 0, string: 'string_00' }),
      };

      const expectedData = {
        id: findOneData.id,
        name: findOneData.name,
        description: findOneData.description,
        dataJson: findOneData.dataJson,
      };

      repository.findOne.mockResolvedValue(findOneData);

      const result = await service.findOne(findName);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { name: findName },
      });

      expect(result).toEqual(expectedData);
    });

    it('should throw a NotFoundException if part is not found', async () => {
      const exceptionString = `"${nonExistName}" Not Found.`;

      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(nonExistName)).rejects.toThrow(
        new NotFoundException(exceptionString),
      );
    });

    it('should fail on exception', async () => {
      repository.findOne.mockRejectedValue(new Error()); // save() 에 에러가 발생했을 때

      await expect(service.findOne(nonExistName)).rejects.toThrow(new Error());
    });

    /*
    it('should fail if no post is found', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.findOne(findName);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { name: findName },
      });

      expect(result).toEqual(null);
    });
    
    it('should fail on findOne exception', async () => {
      const ErrorString = 'find error';
      repository.findOne.mockReturnValue(ErrorString);

      const result = await service.findOne(findOneArgs.name);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { name: findOneArgs.name },
      });

      expect(result).toEqual(ErrorString);
    });
    */
  });

  describe('update()', () => {
    const partName = 'name_00';
    const nonExistName = 'name_999';

    it('should update a part and return the updated part', async () => {
      const updatedData: UpdatePartDto = {
        description: 'description_99',
        dataJson: '{ "number": 9, "string": "string_99" }',
      };

      const findOne1Data = {
        id: 1,
        name: partName,
        description: 'description_00',
        dataJson: JSON.stringify({ number: 0, string: 'string_00' }),
      };

      const findOne2Data = {
        id: 1,
        name: partName,
        description: updatedData.description,
        dataJson: updatedData.dataJson,
      };

      const updatedResponse: ResponsePartDto = {
        id: 1,
        name: partName,
        description: updatedData.description,
        dataJson: updatedData.dataJson,
      };
      repository.findOne.mockResolvedValueOnce(findOne1Data); // findOne() 함수가 1번째 호출
      repository.findOne.mockResolvedValueOnce(findOne2Data); // findOne() 함수가 2번째 호출
      repository.save.mockResolvedValue(null);

      const result = await service.update(partName, updatedData);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { name: partName },
      });

      expect(repository.save).toHaveBeenCalledWith({
        ...findOne1Data,
        ...updatedData,
      });

      console.log(result);

      // findOne() 함수가 2번 호출 되어서
      expect(result.id).toEqual(updatedResponse.id);
      expect(result.name).toEqual(updatedResponse.name);
      expect(result.description).toEqual(updatedResponse.description);
      expect(JSON.parse(result.dataJson)).toEqual(
        JSON.parse(updatedResponse.dataJson),
      );
    });

    it('should throw a NotFoundException if part is not found', async () => {
      const updatePartDto: UpdatePartDto = {
        description: 'description_00',
        dataJson: '{ "number": 0, "string": "string_00" }',
      };

      const exceptionString = `"${nonExistName}" Not Found.`;

      repository.findOne.mockResolvedValue(null);

      await expect(service.update(nonExistName, updatePartDto)).rejects.toThrow(
        new NotFoundException(exceptionString),
      );
    });

    it('should fail on exception', async () => {
      const updatePartDto: UpdatePartDto = {
        description: 'description_00',
        dataJson: '{ "number": 0, "string": "string_00" }',
      };

      repository.findOne.mockRejectedValue(new Error()); // save() 에 에러가 발생했을 때

      await expect(service.update(nonExistName, updatePartDto)).rejects.toThrow(
        new Error(),
      );
    });

    /*
    it('should be update post', async () => {
      const existingPart = new Part();

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingPart);
      jest.spyOn(repository, 'save').mockResolvedValue(existingPart);

      const result = await service.update(partName, updatePartDto);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { name: partName },
      });

      expect(result).toEqual(existingPart);
    });

    it('should throw NotFoundException if part is not found', async () => {
      const nonExistName = 'name_999';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = service.update(nonExistName, updatePartDto);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { name: nonExistName },
      });

      expect(result).rejects.toThrow(NotFoundException);
    });
    */
  });

  describe('remove()', () => {
    const partName = 'name_00';

    it('should remove a part and return the removed part', async () => {
      const findOneData = {
        id: 1,
        name: partName,
        description: 'description_00',
        dataJson: JSON.stringify({ number: 0, string: 'string_00' }),
      };
      const expectedData = {
        id: 1,
        name: findOneData.name,
        description: findOneData.description,
        dataJson: findOneData.dataJson,
      };
      repository.findOne.mockResolvedValue(findOneData);
      repository.delete.mockResolvedValue({});

      const result = await service.remove(partName);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { name: partName },
      });
      expect(repository.delete).toHaveBeenCalledWith({ name: partName });
      expect(result).toEqual(expectedData);
    });

    it('should throw a NotFoundException if part is not found', async () => {
      const exceptionString = `"${partName}" Not Found.`;

      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(partName)).rejects.toThrow(
        new NotFoundException(exceptionString),
      );
    });

    it('should fail on exception', async () => {
      repository.findOne.mockRejectedValue(new Error()); // save() 에 에러가 발생했을 때

      await expect(service.remove(partName)).rejects.toThrow(new Error());
    });

    // it('should be remove post', async () => {
    //   // repository.findOne.mockResolvedValue(findOneArgs);
    //   // repository.softDelete.mockResolvedValue(softDeleteArgs);

    //   const expectedPart = new Part();

    //   repository.findOne.mockResolvedValue(expectedPart);

    //   const removedPart = await service.remove(partName);

    //   expect(repository.findOne).toHaveBeenCalledTimes(1);
    //   expect(repository.findOne).toHaveBeenCalledWith({
    //     where: { name: partName },
    //   });

    //   expect(repository.delete).toHaveBeenCalledTimes(1);
    //   expect(removedPart).toEqual(expectedPart);
    // });

    // it('should remove an existing part', async () => {
    //   jest.spyOn(repository, 'findOne').mockResolvedValue(expectedPart);
    //   jest.spyOn(repository, 'delete').mockResolvedValue({});

    //   const result = await service.remove(partName);

    //   expect(repository.findOne).toHaveBeenCalledTimes(1);
    //   expect(repository.findOne).toHaveBeenCalledWith({
    //     where: { name: partName },
    //   });

    //   expect(result).toEqual(expectedPart);
    // });

    // it('should nonExistId NotFoundException if part is not found', async () => {
    //   const nonExistname = 'name_999'; // Non-existent ID
    //   jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    //   const result = service.remove(nonExistname);

    //   expect(repository.findOne).toHaveBeenCalledTimes(1);
    //   expect(repository.findOne).toHaveBeenCalledWith({
    //     where: { name: nonExistname },
    //   });

    //   expect(result).rejects.toThrow(NotFoundException);
    // });
  });
});
