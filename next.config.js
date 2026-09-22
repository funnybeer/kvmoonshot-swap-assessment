/** @type {import('next').NextConfig} */
try {
  require('./config/platform-bindings.cjs').syncNativeRuntime();
} catch {
  /* optional native dep — assessment runs with mock quotes when absent */
}

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};

module.exports = nextConfig;
