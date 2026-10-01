import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.56.254', 'localhost:3000', '192.168.56.254:3000'],
};

export default nextConfig;