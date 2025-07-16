import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {sharedService} from '@one/core/shared-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {
    console.log('id in shell', sharedService.id);
  }
}
