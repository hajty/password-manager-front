import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor() {}

    saveFile(data: Blob): void {
        saveAs(data, 'key');
    }
}
