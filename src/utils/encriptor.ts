import * as CryptoJS from 'crypto-js';

export function encryptPassword(password: string): string {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}