async function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const _latitude = success.coords.latitude;
        const _longitude = success.coords.longitude;
        resolve([ _latitude, _longitude ]);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export { getLocation };
