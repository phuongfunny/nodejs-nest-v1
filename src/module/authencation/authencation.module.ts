import { Module } from '@nestjs/common';
import { AuthencationService } from './authencation.service';
import { AuthencationController } from './authencation.controller';
import { UserModule } from 'src/module/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secret',
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  controllers: [AuthencationController],
  providers: [AuthencationService, JwtGuard, JwtStrategy],
})
export class AuthencationModule {}
