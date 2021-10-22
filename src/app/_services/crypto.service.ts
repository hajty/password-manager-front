import { Injectable } from '@angular/core';
import { AES } from 'crypto-ts';

@Injectable({
    providedIn: 'root',
})
export class CryptoService {
    constructor() {}

    encrypt(text: string, key: string): string {
        return AES.encrypt(text, key).toString();
    }

    decrypt(cipherText: string, key: string): string {
        return AES.decrypt(cipherText, key).toString();
    }
}
