// types.ts
import { Request } from 'express';

export interface IJwtPayload {
    id: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

export interface IJwtRefreshPayload {
    id: number;
    iat: number;
    exp: number;
}

export interface IJwtPayloadForAgent {
    id: number;
    hostname: string;
    operation_system: string;
    platform: string;
    unicall_key: string;
    iat: number;
    exp: number;
}

export interface ICustomRequest extends Request {
    user: IJwtPayload;
}

export interface IUser {
    id?: number;
    email?: string;
    password_hash: string;
    role?: string;
    roleId?: number;
    created_at?: Date;
    updated_at?: Date;
}


