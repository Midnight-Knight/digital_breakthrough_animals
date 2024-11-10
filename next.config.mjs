/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            }
        ]
    },
     env: {
        GET_PACKAGE: process.env.GET_PACKAGE || 'https://crisply-protected-ribbonfish.cloudpub.ru/archive/get_package?packageId=',
         LIST_PACKAGE: process.env.LIST_PACKAGE || 'https://crisply-protected-ribbonfish.cloudpub.ru/archive/list_packages',
         SESSIONS: process.env.SESSIONS || 'https://crisply-protected-ribbonfish.cloudpub.ru/images/create_package',
         UPLOAD_IMAGE: process.env.UPLOAD_IMAGE || 'https://crisply-protected-ribbonfish.cloudpub.ru/images/upload_image',
         CSV_FILE: process.env.CSV_FILE || 'https://crisply-protected-ribbonfish.cloudpub.ru/archive/get_report?packageId=',
     }
};

export default nextConfig;
