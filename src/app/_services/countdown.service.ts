import { Injectable } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CountdownService {
    constructor() {}

    countdown(time: number, filter: string): Observable<string> {
        return new Observable<string>((o) => {
            let subTimer: Subscription;
            const oTimer = interval(1000);
            let timeToCountdown = time;

            subTimer = oTimer.subscribe(() => {
                timeToCountdown -= 1;
                const minutes = Math.floor(timeToCountdown / 60);
                const minutesToReturn = minutes >= 10 ? minutes : '0' + minutes;
                const seconds = timeToCountdown - minutes * 60;
                const secondsToReturn = seconds >= 10 ? seconds : '0' + seconds;

                switch (filter) {
                    case 'mm:ss': {
                        o.next(`${minutesToReturn}:${secondsToReturn}`);
                        break;
                    }
                    case 'ss': {
                        o.next(`${secondsToReturn}`);
                        break;
                    }
                    case 's': {
                        o.next(`${secondsToReturn.toString().slice(1)}`);
                        break;
                    }
                }

                if (timeToCountdown <= 0) {
                    subTimer.unsubscribe();
                    o.complete();
                }
            });
        });
    }
}
