import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { KnexModule } from "nestjs-knex";
import knexConfig from "./knexfile";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env', '.env.local'],
            
        }),
        KnexModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                config: knexConfig[configService.get<string>('NODE_ENV') || 'development'],
            })
        })
    ]
})

export class DatabaseModule {}