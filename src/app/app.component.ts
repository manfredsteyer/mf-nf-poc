import { Component, OnInit } from '@angular/core';
import { loadRemote as loadMfRemote } from '@module-federation/enhanced/runtime';
import { loadRemoteModule as loadNfRemote } from '@angular-architects/native-federation';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
