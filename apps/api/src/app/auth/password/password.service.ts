import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

export type Salt = string | number;

const BCRYPT_SALT_KEY = 'BCRYPT_SALT';
const SALT_OR_ROUNDS_TYPE_ERROR = `${BCRYPT_SALT_KEY} must be a positive integer or text`;

@Injectable()
export class PasswordService {
  salt: Salt;

  constructor(private configService: ConfigService) {
    const saltOrRounds = this.configService.getOrThrow<string>(BCRYPT_SALT_KEY);
    this.salt = PasswordService.parseSalt(saltOrRounds);
  }

  compare(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted);
  }

  hash(password: string): Promise<string> {
    return hash(password, this.salt);
  }

  private static parseSalt(value: string): Salt {
    const rounds = Number(value);

    if (Number.isNaN(rounds)) {
      return value;
    }
    if (!Number.isInteger(rounds) || rounds < 0) {
      throw new Error(SALT_OR_ROUNDS_TYPE_ERROR);
    }
    return rounds;
  }
}
