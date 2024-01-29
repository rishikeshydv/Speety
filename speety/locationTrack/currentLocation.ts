function getLocation() {
  navigator.geolocation.getCurrentPosition((success) => {
    const _latitude = success.coords.latitude;
    const _longitude = success.coords.longitude;
    return { _latitude, _longitude };
  });
}

export { getLocation };
