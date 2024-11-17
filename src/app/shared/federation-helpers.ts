import { Type } from '@angular/core';
import { loadShare } from '@module-federation/enhanced/runtime';

type NativeFederationContainer = {
  __NATIVE_FEDERATION__: {
    baseUrlToRemoteNames: Map<string, string>;
    externals: Map<string, string>;
  };
};

export type ShareObject = {
  version: string;
  scope?: string;
  get: () => Promise<() => Type<unknown>>;
  shareConfig?: {
    singleton?: boolean;
    requiredVersion: string;
  };
};

export type ShareConfig = {
  [pkgName: string]: Array<ShareObject>;
};

export async function initCrossShare(shared: ShareConfig) {
  for (const pkg in shared) {
    await loadShare(pkg, {
      customShareInfo: {},
    });
  }
}

export function getShared() {
  const nfc = window as unknown as NativeFederationContainer;
  const externals = nfc.__NATIVE_FEDERATION__.externals;
  const shared: ShareConfig = {};

  const allKeys = [...externals.keys()];
  const keys = allKeys.filter(k => 
    !k.startsWith('/@id/')
    && !k.startsWith('@angular-architects/module-federation')
    && !k.endsWith('@')
  )
  .sort();

  for (const key of keys) {
      const idx = key.lastIndexOf('@');
      const pkgName = key.substring(0, idx);
      const version = key.substring(idx + 1);
      const path = externals.get(key) ?? '';

      const shareObj: ShareObject = {
        version,
        get: async () => {
          const lib = await (window as any).importShim(path);
          return () => lib;
        },
        shareConfig: {
          singleton: true,
          requiredVersion: version,
        },
      };

      if (!shared[pkgName]) {
        shared[pkgName] = [];
      }

      shared[pkgName].push(shareObj);
    
  }
  return shared;
}
