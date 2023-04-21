import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const options = {
          secret: configService.get('SECRET'),
          signOptions: { expiresIn: '60s' },
        };
        return options;
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
