import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { SummarizeService } from './summarize.service';
import { SummarizeDto } from './dto/summarize.dto';
import { SummarizeStartupUpdatesDto } from './dto/summarizeStartupUpdates.dto';

@Controller('summarize')
export class SummarizeController {
  constructor(private readonly summarizeService: SummarizeService) {}
  @HttpCode(HttpStatus.OK)
  @Post()
  summaries(@Body() summarizeDto: SummarizeDto) {
    return this.summarizeService.summarize(summarizeDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('startup-updates/:id')
  summarizeStartupUpdates(
    @Param('id', ParseUUIDPipe) startupReferenceId: string,
    @Body() summarizeStartupUpdatesDto: SummarizeStartupUpdatesDto,
  ) {
    return this.summarizeService.summarizeStartupUpdates(
      startupReferenceId,
      summarizeStartupUpdatesDto,
    );
  }
}
