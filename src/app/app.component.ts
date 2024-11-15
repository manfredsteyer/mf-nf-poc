import { Component, OnInit } from '@angular/core';
import { loadRemote as loadMfRemote } from '@module-federation/enhanced/runtime';
import { loadRemoteModule as loadNfRemote } from '@angular-architects/native-federation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'mfruntime';

  async ngOnInit() {
    await loadMfRemote('react/web-components');
    const reactElm = document.createElement('react-element');
    document.body.appendChild(reactElm);

    await loadMfRemote('angular2/web-components');
    const angular2Elm = document.createElement('angular2-element');
    document.body.appendChild(angular2Elm);

    await loadMfRemote('angular3/web-components');
    const angular3Elm = document.createElement('angular3-element');
    document.body.appendChild(angular3Elm);

    await loadNfRemote('svelte', './web-components');
    const svelteElm = document.createElement('svelte-mfe');
    document.body.appendChild(svelteElm);
  }

}
