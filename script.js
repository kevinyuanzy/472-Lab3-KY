// Add the default map token from the Mapbox account
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW55dWFuenkiLCJhIjoiY201eHprYXU0MGZwejJsb242Y3Nza25oYyJ9.h05hqdnqlx2BwgwbQNuKCg'; 

//Import the map style from MapBox. 
const map = new mapboxgl.Map({
    container: 'Lab2Map', // map container ID in the index.html file.
    style: 'mapbox://styles/kevinyuanzy/cm6ztbpqc003s01qwcvdrf6ft', // style URL from created MapBox style.
    center: [-79.391820, 43.671268], // starting position [lng, lat]. 
    zoom: 11, // starting zoom level.
});

//Use "map.on" event listener to add features to the webmap.
map.on('load', () => {
    //Add the station_points.geojson file from GitHub repository. 
    map.addSource('stations_points', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kevinyuanzy/472-Lab3-KY/refs/heads/main/stations_points.geojson' // The URL to my GeoJson polygon.
    });

    map.addLayer({
        'id': 'line2-stations', 
        'type': 'circle', 
        'source': 'stations_points',
        'paint': {
            'circle-color': '#f5f5f5',
            'circle-radius': 5,
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#000000'
        },
    });

});

