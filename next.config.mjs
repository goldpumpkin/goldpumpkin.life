/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'img.goldpumpkin.life',
            port: '',
            pathname: '/**'
        }]
    }
};

export default nextConfig;
