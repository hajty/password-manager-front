import { TestBed } from '@angular/core/testing';

import { LoginService } from 'src/app/_services/login.service';

describe('LoginService', () => {
    let service: LoginService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoginService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
