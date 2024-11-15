import { initFederation as initNativeFederation } from '@angular-architects/native-federation';
import { init as initModuleFederation } from '@module-federation/enhanced/runtime';

initModuleFederation({
  name: 'shell',
  remotes: [
    {
      name: 'react',
      entry: 'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js'
    },
    {
      name: 'angular2',
      entry: 'https://gray-pond-030798810.azurestaticapps.net/remoteEntry.js'
    },
    {
      name: 'angular3',
      entry: 'https://gray-river-0b8c23a10.azurestaticapps.net/remoteEntry.js'
    },
  ]
});

initNativeFederation('federation.manifest.json')
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
