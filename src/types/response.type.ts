import { HttpStatus } from '@nestjs/common';

export type TResponse<TData = unknown, TToken = unknown> = {
  status: HttpStatus;
  message: string;
  data?: TData;
  tokens?: TToken;
};

export type TAuthTokens = {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
};
