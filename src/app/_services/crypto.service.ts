import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { IPassword } from 'src/app/_models/shared/password.model';

@Injectable({
    providedIn: 'root',
})
export class CryptoService {
    constructor() {}
    storageKey: Blob;

    private static async encrypt(text: string, storageKey: Blob): Promise<string> {
        const key = CryptoJS.enc.Hex.parse(await storageKey.slice(0, 64).text());
        const iv = CryptoJS.enc.Hex.parse(await storageKey.slice(64).text());
        return CryptoJS.AES.encrypt(text, key, { iv }).toString();
    }

    private static async decrypt(cipherText: string, storageKey: Blob): Promise<string> {
        const key = CryptoJS.enc.Hex.parse(await storageKey.slice(0, 64).text());
        const iv = CryptoJS.enc.Hex.parse(await storageKey.slice(64).text());
        return CryptoJS.AES.decrypt(cipherText, key, { iv }).toString(CryptoJS.enc.Utf8);
    }

    generateKey(): Blob {
        this.storageKey = new Blob([CryptoJS.lib.WordArray.random(64).toString()]);

        return this.storageKey;
    }

    async encryptPassword(password: IPassword): Promise<IPassword> {
        return {
            _id: password._id,
            service: await CryptoService.encrypt(password.service, this.storageKey),
            username: await CryptoService.encrypt(password.username, this.storageKey),
            password: await CryptoService.encrypt(password.password, this.storageKey),
        };
    }

    async decryptPassword(password: IPassword): Promise<IPassword> {
        return {
            _id: password._id,
            service: await CryptoService.decrypt(password.service, this.storageKey),
            username: await CryptoService.decrypt(password.username, this.storageKey),
            password: await CryptoService.decrypt(password.password, this.storageKey),
        };
    }
}
