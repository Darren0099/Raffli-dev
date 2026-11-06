import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.56.254', 'localhost:3000', '192.168.56.254:3000'],
  async redirects() {
    return [
      { source: '/projects/youth-visual-identity', destination: '/graphic-design', permanent: true },
    ];
  },
};

export default nextConfig;