import { initFederation as initNativeFederation } from '@angular-architects/native-federation';
import { init as initModuleFederation } from '@module-federation/enhanced/runtime';
import { getShared } from './app/shared/federation-helpers';

(async () => {
  // Step 1: Initialize Native Federation
  await initNativeFederation('federation.manifest.json');

  // Step 2: Get meta data about libs shared via Native Federation
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
