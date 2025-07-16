import { Component, inject, VERSION } from '@angular/core';
import {sharedService} from '@one/core/shared-service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  version = VERSION.full;
  constructor() {
    console.log('id in modfed-mf', sharedService.id);
  }
}
