import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WrapperComponent, WrapperConfig } from './wrapper/wrapper.component';
import { startsWith } from './shared/starts-with';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
    },
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
