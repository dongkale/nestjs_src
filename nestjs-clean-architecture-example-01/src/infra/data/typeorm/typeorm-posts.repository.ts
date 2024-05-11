import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { PostEntity } from '@/core/domain/entities/post.entity';
import { PostsRepository } from '@/core/repositories/posts.repository';
// import { PrismaService } from '@/infra/data/prisma/prisma.service';
import { Post } from './posts.entity';
import { Repository } from 'typeorm';

export class TypeOrmPostsRepository implements PostsRepository {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  async create(data: PostEntity): Promise<PostEntity> {
    return this.postRepository.save(data);
  }

  async findAll(filter?: Partial<PostEntity>): Promise<PostEntity[]> {
    return this.postRepository.find({ where: filter });
  }

  async findOne(filter: Partial<PostEntity>): Promise<PostEntity> {
    const r = this.postRepository.findOne({ where: filter });

    return plainToInstance(PostEntity, r, {
      excludeExtraneousValues: true,
    });

    // return plainToClass(PostEntity, r);
  }

  async update(id: number, data: Partial<PostEntity>): Promise<PostEntity> {
    return this.postRepository.save({ id, ...data });
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
