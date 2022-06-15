import { Module } from '@nestjs/common';
import { AuthencationService } from './authencation.service';
import { AuthencationController } from './authencation.controller';
import { UserModule } from 'src/module/user/user.module';
import { JwtModule } from '@nestjs/jwt';

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
  providers: [AuthencationService],
})
export class AuthencationModule {}
