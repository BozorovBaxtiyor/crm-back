import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { JwtAuthModule } from '../auth/jwt-auth.module';

@Module({
    imports: [JwtAuthModule],
    controllers: [CustomerController],
    providers: [CustomerService, CustomerRepository],
    exports: [CustomerService],
})
export class CustomerModule {}
