import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { SummarizeDto } from './dto/summarize.dto';
import { TResponse } from '@/types';
import { JsonApiService } from '../json-api/json-api.service';
import { SummarizeStartupUpdatesDto } from './dto/summarizeStartupUpdates.dto';

@Injectable()
export class SummarizeService {
  private openAiApi: OpenAIApi;

  constructor(config: ConfigService, private jsonApiService: JsonApiService) {
    const configuration = new Configuration({
      apiKey: config.get('OPENAI_API_KEY'),
    });
    this.openAiApi = new OpenAIApi(configuration);
  }

  async summarize(
    summarizeDto: SummarizeDto,
  ): Promise<TResponse<string> | never> {
    const question = summarizeDto.question ?? `Summarize this for a investor`;
    const { data } = await this.openAiApi.createCompletion({
      model: 'text-davinci-003',
      prompt: question + `:\n` + summarizeDto.text,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    const answer = data.choices.find((choice) => choice.index === 0).text;
    return {
      message: 'Success',
      status: HttpStatus.OK,
      data: answer,
    };
  }

  async summarizeStartupUpdates(
    startupReferenceId: string,
    summarizeStartupUpdatesDto: SummarizeStartupUpdatesDto,
  ): Promise<TResponse<string> | never> {
    const { data } = await this.jsonApiService.getStartupUpdates(
      startupReferenceId,
    );
    const updateInfo = this.buildStartupUpdatesString(data);
    console.log(updateInfo);

    return await this.summarize({
      question: summarizeStartupUpdatesDto.question,
      text: updateInfo,
    });
  }

  private buildStartupUpdatesString(updateData: unknown[]): string {
    const fieldsMap = {
      title: '',
      field_startup_update_date: 'Startup update date',
      field_asks_in_updates: 'Asks in updates',
      field_body: 'Description of the update',
      field_updates_fundraising_only: 'Fundraising information in this update',
      field_updates_mentoring_only: 'Mentoring information in this update',
      field_updates_pivot_only: 'Pivot information in this update',
      field_updates_product_only: 'Product information in this update',
      field_updates_questions_only: 'Questions asked in this update',
      field_updates_traction_only: 'Traction information in this update',
      field_updates_vouches_only: 'Vouches update',
      field_update_morale: 'Morale in this update',
    };
    const updateAttributes = updateData.map((update: any) => update.attributes);
    const allUpdates = updateAttributes.slice(0, 10).map((data) => {
      const updates = Object.keys(fieldsMap).map((field) => {
        return !!data[field]
          ? !!fieldsMap[field]
            ? `${fieldsMap[field]}:\n${data[field]}`
            : data[field]
          : '';
      });
      return updates.filter((update) => update !== '').join('\n');
    });
    return allUpdates.filter((update) => update !== '').join('\n\n');
  }
}
