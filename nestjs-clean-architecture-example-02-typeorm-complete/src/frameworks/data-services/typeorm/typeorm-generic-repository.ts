import { ObjectLiteral, Repository } from 'typeorm';
import { IGenericRepository } from '@/core';

export class TypeOrmGenericRepository<
  T extends ObjectLiteral,
> extends IGenericRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    super();
    this._repository = repository;
  }

  async getAll(): Promise<T[]> {
    return await this._repository.find();
  }

  async getOne(id: any): Promise<T | null> {
    return await this._repository.findOne({ where: { id } });
  }

  // async get(id: any): Promise<T | null> {
  //   // console.log('id', id);
  //   // return null; // await this._repository.findOne({ where: { id: id } });
  //   // return await this._repository.findOne(id);
  //   // try {
  //   //   return await this._repository.findOneOrFail(id);
  //   // } catch (error) {
  //   //   console.log('error', error);
  //   //   return null;
  //   // }
  //   const r = await this._repository.findOne({ where: { id: id } });

  //   return r;
  // }

  async create(item: T): Promise<T> {
    return await this._repository.save(item);
  }

  async update(id: any, item: T): Promise<T | null> {
    await this._repository.update(id, item);

    return await this._repository.findOne({ where: { id } });
  }
}
