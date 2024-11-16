import { Type } from '@angular/core';
import { loadShare } from '@module-federation/enhanced/runtime';

type NativeFederationContainer = {
  __NATIVE_FEDERATION__: {
    baseUrlToRemoteNames: Map<string, string>;
    externals: Map<string, string>;
  };
};

export type ShareConfig = {
  [pkgName: string]: {
    version: string;
    scope?: string;
    get: () => Promise<() => Type<unknown>>;
    shareConfig?: {
      singleton?: boolean;
      requiredVersion: string;
    };
  };
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

  for (const key of externals.keys()) {
    if (
      !key.startsWith('/@id/') &&
      !key.startsWith('@angular-architects/module-federation')
    ) {
      const idx = key.lastIndexOf('@');
      const pkgName = key.substring(0, idx);
      const version = key.substring(idx + 1);
      const path = externals.get(key) ?? '';

      shared[pkgName] = {
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
    }
  }
  return shared;
}
