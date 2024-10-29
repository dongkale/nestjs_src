import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';
import { Dog } from './schemas/dog.schema';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Dog.name) private readonly dogModel: Model<Dog>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const createdCat = await this.catModel.create(createCatDto);

    console.log(JSON.stringify(createdCat));
    return createdCat;
    // return { id: createdCat._id };
    // return Object.assign({ id: createdCat._id, ...createdCat.toJSON() });
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.catModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
