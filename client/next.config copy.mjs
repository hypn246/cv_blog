/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            //   protocol: 'http',
              hostname: '**',
            //   pathname: '**',
            },
        ]
    },
};

export default nextConfig;
