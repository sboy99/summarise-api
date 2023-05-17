import { Controller } from '@nestjs/common';
import { JsonApiService } from './json-api.service';

@Controller('json-api')
export class JsonApiController {
  constructor(private readonly jsonApiService: JsonApiService) {}
}
