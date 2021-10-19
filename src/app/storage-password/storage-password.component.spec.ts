import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePasswordComponent } from './storage-password.component';

describe('StoragePasswordComponent', () => {
    let component: StoragePasswordComponent;
    let fixture: ComponentFixture<StoragePasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StoragePasswordComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StoragePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
