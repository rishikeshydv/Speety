const { createSecureHeaders } = require('next-secure-headers');
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

// module.exports = (phase, { defaultConfig }) => {
//     return {
//       ...defaultConfig,
  
//       webpack: (config) => {
//         config.resolve = {
//           ...config.resolve,
//           fallback: {
//             "fs": false,
//             "net": false,
//             "async_hooks": false,
//           },
//         }
//         return config
//       },
      
//     }
//   }


//now i will create a nextConfig object based on the commented code above using withPWA

module.exports = withPWA({
    webpack: (config) => {
        config.resolve = {
            ...config.resolve,
            fallback: {
                fs: false,
                net: false,
                async_hooks: false,
            },
        };
        return config;
    },
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: createSecureHeaders({
              contentSecurityPolicy: {
                directives: {
                  defaultSrc: ["'self'"],
                  styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
                  imgSrc: ["'self'", 'data:', 'https:'],
                  scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'https:'],
                  connectSrc: ["'self'", 'https:'],
                },
              },
              referrerPolicy: 'no-referrer',
              permissionsPolicy: {
                camera: [],
                microphone: [],
                geolocation: [],
              },
              setHeaders: [
                {
                  key: 'Set-Cookie',
                  value: 'myCookie=myValue; Path=/; SameSite=Strict; HttpOnly; Secure',
                },
              ],
            }),
          },
        ];
      },
});

