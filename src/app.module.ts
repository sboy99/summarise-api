import { Module } from '@nestjs/common';
import { SummarizeModule } from './resources/summarize/summarize.module';
import { ConfigModule } from '@nestjs/config';
import { JsonApiModule } from './resources/json-api/json-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SummarizeModule,
    JsonApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
