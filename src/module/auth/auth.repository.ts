import { Inject, Injectable } from '@nestjs/common';

import { InjectKnex } from 'nestjs-knex';
import { Knex } from 'knex';
import db from 'src/database/knexfile1';

@Injectable()
export class AuthRepository {
  constructor() { }
  
  async findByEmail(email: string) {
    return db('users')
      .select('id', 'email', 'name', 'role', 'password_hash')
      .where({ email })
      .first();
  }
}
