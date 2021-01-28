import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { APP_TITLE } from '../configs/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle(APP_TITLE);
  }
}
