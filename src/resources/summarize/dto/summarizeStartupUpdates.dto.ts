import { PickType } from '@nestjs/mapped-types';
import { SummarizeDto } from './summarize.dto';

export class SummarizeStartupUpdatesDto extends PickType(SummarizeDto, [
  'question',
]) {}
