import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Observable } from 'rxjs';
export declare class ClearCacheInterceptor implements NestInterceptor {
    private cacheManager;
    constructor(cacheManager: Cache);
    intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
