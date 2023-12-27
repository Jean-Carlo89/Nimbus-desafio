/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/map',
                permanent: false
            },
        ];
    },
}

module.exports = nextConfig
