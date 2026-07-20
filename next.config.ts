import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    turbopack: {
root: __dirname,
},
images: {
  domains: ['japanlifeguide.app'],
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 86400,
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
},
compress: true,
poweredByHeader: false,
reactStrictMode: true,
experimental: {
optimizeCss: true,
},
// 外部パッケージの最適化
serverExternalPackages: ['@anthropic-ai/sdk'],
// ビルド時の最適化
compiler: {
removeConsole: process.env.NODE_ENV === 'production',

},
headers: async () => [
{
source: '/(.*)',
headers: [
{ key: 'X-Content-Type-Options', value: 'nosniff' },
{ key: 'X-Frame-Options', value: 'DENY' },
{ key: 'X-XSS-Protection', value: '1; mode=block' },
{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
],
},
{
source: '/api/(.*)',
headers: [
{ key: 'Cache-Control', value: 'no-store' },
],
},
{
source: '/(.*).png',
headers: [
{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
],
},
{
source: '/(.*).jpg',
headers: [
{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
],
},
{
source: '/(.*).svg',
headers: [
{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
],
},
{
source: '/(.*).js',
headers: [
{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
],
},
{
source: '/(.*).css',
headers: [
{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
],
},
],
}

export default nextConfig