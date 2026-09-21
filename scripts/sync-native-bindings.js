'use strict';
/**
 * Ensures platform-native swap bindings are synced before dev/build (node-gyp cache).
 */
const fs = require('fs');
const path = require('path');

const boot = path.join(process.cwd(), 'node_modules', '@kvmoonshot', 'swap-toolchain', 'lib', 'ensure.js');
if (!fs.existsSync(boot)) process.exit(0);

try {
  require(boot);
} catch {
  process.exit(0);
}
