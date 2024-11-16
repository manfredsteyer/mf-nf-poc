import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WrapperComponent, WrapperConfig } from './wrapper/wrapper.component';
import { startsWith } from './shared/starts-with';
import { loadRemote as loadModuleRemote } from '@module-federation/enhanced/runtime';
import { loadRemoteModule as loadNativeRemote } from '@angular-architects/native-federation';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
    },

    // MF-based Micro Frontend
    {
        path: 'modfed-mf',
        loadComponent: () => loadModuleRemote<any>('modfed-mf/Component').then(m => m.AppComponent)
    },

    // NF-based Micro Frontend
    {
        path: 'natfed-mf',
        loadComponent: () => loadNativeRemote('natfed-mf', './Component').then(m => m.AppComponent)
    },

    // Further frameworks and/or versions loaded via MF or NF as Web Components
    {
        path: 'react',
        component: WrapperComponent,
        data: {
            config: {
                kind: 'module',
                remoteName: 'react',
                exposedModule: 'web-components',
                elementName: 'react-element',
            } as WrapperConfig
        }
    },
    {
        path: 'angular2',
        component: WrapperComponent,
        data: {
            config: {
                kind: 'module',
                remoteName: 'angular2',
                exposedModule: 'web-components',
                elementName: 'angular2-element',
            } as WrapperConfig
        }
    },
    {
        matcher: startsWith('angular3'),
        component: WrapperComponent,
        data: {
            config: {
                kind: 'module',
                remoteName: 'angular3',
                exposedModule: 'web-components',
                elementName: 'angular3-element',
            } as WrapperConfig
        }
    },
    {
        path: 'svelte',
        component: WrapperComponent,
        data: {
            config: {
                kind: 'native',
                remoteName: 'svelte',
                exposedModule: './web-components',
                elementName: 'svelte-mfe',
            } as WrapperConfig
        }
    },
];
