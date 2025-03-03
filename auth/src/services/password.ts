import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const build = (await (scryptAsync(password, salt, 64))) as Buffer;

        return `${build.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const build = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        return build.toString('hex') === hashedPassword
    }
}