import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GoogleChatRequest } from './dtos/google-chat.request';
import { GoogleChatService } from './google-chat.service';

@ApiTags('Google Chat')
@Controller('google-chat')
export class GoogleChatController {
  constructor(private readonly googleChatService: GoogleChatService) {}

  @ApiOperation({ summary: 'Send a message' })
  @ApiResponse({ status: 200 })
  @Post()
  async send(@Body() body: GoogleChatRequest) {
    return this.googleChatService.send(body);
  }
}
