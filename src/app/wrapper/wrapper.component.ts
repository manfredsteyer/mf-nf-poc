import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, inject } from '@angular/core';
import { loadRemote as loadModuleRemote } from '@module-federation/enhanced/runtime';
import { loadRemoteModule as loadNativeRemote } from '@angular-architects/native-federation';

export interface WrapperConfig {
  remoteName: string;
  exposedModule: string;
  elementName: string;
  kind: 'module' | 'native';
}

export const initWrapperConfig: WrapperConfig = {
  remoteName: '',
  exposedModule: '',
  elementName: '',
  kind: 'native',
};

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wrapper.component.html',
})
export class WrapperComponent implements OnInit {
  elm = inject(ElementRef);

  // Don't forget to call withComponentInputBinding()
  // in your app.config.ts
  @Input() config = initWrapperConfig;

  async ngOnInit() {
    const { exposedModule, remoteName, elementName, kind } = this.config;

    if (kind === 'native') {
      await loadNativeRemote(remoteName, exposedModule);
    }
    else {
      const path = [remoteName, exposedModule].join('/');
      await loadModuleRemote(path);
    }
    const root = document.createElement(elementName);
    this.elm.nativeElement.appendChild(root);
  }
}
