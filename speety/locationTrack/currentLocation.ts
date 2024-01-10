const Locator = (): Promise<number[]> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (onSuccess) => resolve([onSuccess.coords.latitude, onSuccess.coords.longitude]),
        (error) => reject(error)
      );
    });
  };
  
  export { Locator };