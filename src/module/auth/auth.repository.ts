import { Injectable } from '@nestjs/common';

import { IUser } from 'src/common/types/types';
import db from 'src/database/knexfile1';

@Injectable()
export class AuthRepository {
    constructor() {}

    async findByEmail(email: string): Promise<IUser | null> {
        return db('users')
            .select('id', 'email', 'name', 'role', 'password_hash')
            .where({ email })
            .first();
    }

    async findById(id: number): Promise<IUser | null> {
        return db('users')
            .select('id', 'email', 'role')
            .where({ id:id })
            .first();
    }
}
