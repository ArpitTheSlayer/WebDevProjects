mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJwaXR0aGVzbGF5ZXIiLCJhIjoiY20wYW0zdzRiMXNrYTJrcXo5MGtsdzlvcCJ9.fZcyX6af0fyp9ZR0vwoOfA";

navigator.geolocation.getCurrentPosition(positionSuccess, positionError, {
  enableHighAccuracy: true,
});

function positionSuccess(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function positionError() {
  setupMap([77.21, 28.64]);
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: center,
    zoom: 10,
  });

  map.addControl(new mapboxgl.NavigationControl());

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: "metric",
    profile: "mapbox/driving",
  });

  map.addControl(directions, "top-left");
}
