import { Module } from '@nestjs/common';
import { VideoController } from '@/video/video.controller';
import { VideoService } from '@/video/video.service';
import { AwsModule } from '@/aws/aws.module';
import { UtilsModule } from '@/utils/utils.module';

@Module({
  imports: [AwsModule, UtilsModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
