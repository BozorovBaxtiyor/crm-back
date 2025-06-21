// types.ts
import { Request } from 'express';

export interface IJwtPayload {
    userId: number;
    role: string;
    roleId: number;
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
    user?: IJwtPayload;
}

export interface IUser {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    fullName?: string;
    role?: string;
    roleId?: number;
    created_at?: Date;
    updated_at?: Date;
}


