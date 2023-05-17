import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AccessKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const accessKey = req.headers['access-key'];
    const apiAccessKey = this.configService.get('API_ACCESS_KEY');
    if (accessKey && apiAccessKey && accessKey === apiAccessKey) {
      return true;
    }
    throw new UnauthorizedException('Valid access key required');
  }
}
