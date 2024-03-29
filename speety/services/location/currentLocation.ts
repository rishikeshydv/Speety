const Locator = (): Promise<number[]> => {
    return new Promise((resolve, reject) => {
      global.navigator.geolocation.getCurrentPosition(
        (onSuccess) => resolve([onSuccess.coords.latitude, onSuccess.coords.longitude]),
        (error) => reject(error)
      );
    });
  };
  
  export { Locator };