module.exports = (phase, { defaultConfig }) => {
    return {
      ...defaultConfig,
  
      webpack: (config) => {
        config.resolve = {
          ...config.resolve,
          fallback: {
            "fs": false,
            "net": false,
            "async_hooks": false,
          }
        }
        return config
      },
    }
  }