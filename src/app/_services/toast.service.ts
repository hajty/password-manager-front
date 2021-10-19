import { Injectable } from '@angular/core';
import { IToast } from 'src/app/_models/shared/toast.model';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    toasts: IToast[] = [];

    constructor() {}

    private add(toast: IToast): void {
        this.toasts.push(toast);
    }

    showGreen(toast: IToast): void {
        toast.className = 'bg-success text-light';
        toast.delay = 3000;
        this.add(toast);
    }

    showYellow(toast: IToast): void {
        toast.className = 'bg-warning';
        toast.delay = 3000;
        this.add(toast);
    }

    showRed(toast: IToast): void {
        toast.className = 'bg-danger text-light';
        toast.delay = 5000;
        this.add(toast);
    }

    remove(toast: IToast): void {
        this.toasts.filter((t) => t !== toast);
    }
}
