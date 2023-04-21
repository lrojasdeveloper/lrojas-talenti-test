import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, UsersModule],
  controllers: [],
  providers: [ 
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
