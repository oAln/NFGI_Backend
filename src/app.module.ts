import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';
import { Member } from './member/entities/member.entity';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './common/constants';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { File } from './files/entities/file.entity';
import { FilesModule } from './files/files.module';
import { Loan } from './loan/entities/loan.entity';
import { LoanModule } from './loan/loan.module';
import { RepaymentModule } from './repayment/repayment.module';
import { Repayment } from './repayment/entities/repayment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'nfgi.db',
      entities: [Member,User,File,Loan,Repayment],
      synchronize: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    AuthModule,
    MemberModule,
    UserModule,
    FilesModule,
    LoanModule,
    RepaymentModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude('/auth/(.*)' )
      .forRoutes('*')
  }
}
