# DEMO: Shell loading Micro Frontends via Native Federation and Module Federation

## Rational

When moving from Module Federation to Native Federation, teams cannot migrate everything at once. To allow a gradual migration, it's desirable to have a shell capable of loading both, Module Federation-based and Native Federation-based Micro Frontends. This example demonstrates how this can be accompished using the Module Federation Runtime in an Native Federation Shell.

## Try it out

```bash
npm i 
ng serve natfed-mf
ng serve modfed-mf
ng serve
```

## Prerequisites

Create a shell using Native Federation and add the `@module-federation/enhanced` package:

```bash
npm i @module-federation/enhanced
```

In **all** Native Federation projects where the Module Federation runtime is used or installed, skip it from beeing shared in your federation.config.js:

```javascript
module.exports = withNativeFederation({
  ...
  skip: [
    ...
    /^@module-federation/,  
        // Use RegExp to skip ALL entry points!
  ]
});
```

## Initializing the Shell

When initializing the shell, initialize both, Native Federation and Module Federation:

```typescript
// main.ts
import { initFederation as initNativeFederation } from '@angular-architects/native-federation';
import { init as initModuleFederation } from '@module-federation/enhanced/runtime';
import { getShared } from './app/shared/federatio-helpers';

(async () => {
  // Step 1: Initialize Native Federation
  await initNativeFederation('federation.manifest.json');

  // Step 2: Get metadata about libs shared via Native Federation
  const shared = getShared();

  // Step 3: Initialize Module Federation
  //  Remarks: Consider loading this MF config via the fetch API
  initModuleFederation({
    name: 'shell',
    remotes: [
      {
        name: 'modfed-mf',
        entry: 'http://localhost:4201/remoteEntry.js',
        type: 'esm',
      },
      {
        name: 'react',
        entry:
          'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
      },
      {
        name: 'angular2',
        entry: 'https://gray-pond-030798810.azurestaticapps.net/remoteEntry.js',
      },
      {
        name: 'angular3',
        entry:
          'https://gray-river-0b8c23a10.azurestaticapps.net/remoteEntry.js',
      }
    ],
    // Step 3a: Delegate shared libs from Native Federation
    shared,
  })
  .initializeSharing();

  // Step 4: Delegate to file bootstrapping the SPA
  await import('./bootstrap');
})();
```

The helper function `getShared` (see [source code here](https://github.com/manfredsteyer/mf-nf-poc/blob/main/src/app/shared/federation-helpers.ts))returns metadata about the libs shared via Native Federation. This metadata is forwarded to the Module Federation config to bridge both worlds.

## Loading Micro Frontends

For loading the Micro Frontends use the respective helper from `@module-federation/enhanced/runtime` for Module Federation-based Micro Frontends and `@angular-architects/native-federation` for Native Federation-based ones:

```typescript
...
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

    ...
]
```

For loading further frameworks in different versions, the example also uses a Wrapper component that loads Web Components. While not shown in this document, this [approach is described here](https://www.angulararchitects.io/blog/micro-frontends-with-modern-angular-part-2-multi-version-and-multi-framework-solutions-with-angular-elements-and-web-components/).

## Further Steps

While this example shows how to bring both worlds together, in an real-world example you might want to abstract both options a bit more. For instance, you might want to load the configuration for the Module Federation Runtime from a file, similar to the federation.manifest.json used for Native Federation. 

As an alternative, you might get metadata for both worlds from a service and a custom helper function could delegate the respective entries to Module and Native Federation during initialization. This matadata could also be used in a further helper function for loading a remote to decided wether to which Federation implementation to delegate.
