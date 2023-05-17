import { Module } from '@nestjs/common';
import { JsonApiService } from './json-api.service';
import { JsonApiController } from './json-api.controller';

@Module({
  controllers: [JsonApiController],
  providers: [JsonApiService],
  exports: [JsonApiService],
})
export class JsonApiModule {}
