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
    images: {
    
        remotePatterns: [{
            hostname: "images.unsplash.com"
        }]
        
    }
});

