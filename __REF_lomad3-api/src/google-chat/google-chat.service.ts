import { Injectable } from '@nestjs/common';

import axios from 'axios';

import { GoogleChatRequest } from './dtos/google-chat.request';

const SPACES = {
  test: 'https://chat.googleapis.com/v1/spaces/AAAA0gC89_A/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=zRyI2so04b2bCAwhCP5YtSwGVcXK0dqIoWqvjy69Dao',
};

@Injectable()
export class GoogleChatService {
  async send({ space, text }: GoogleChatRequest) {
    if (!space) {
      throw new Error('space is required');
    }

    try {
      const { data } = await axios.post(SPACES[space] || space, { text });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
