// Add the default map token from the Mapbox account
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW55dWFuenkiLCJhIjoiY201eHprYXU0MGZwejJsb242Y3Nza25oYyJ9.h05hqdnqlx2BwgwbQNuKCg'; 

//Import the map style from MapBox. 
const map = new mapboxgl.Map({
    container: 'Lab2Map', // map container ID in the index.html file.
    style: 'mapbox://styles/kevinyuanzy/cm6ztbpqc003s01qwcvdrf6ft', // style URL from created MapBox style.
    center: [-79.391820, 43.701268], // starting position [lng, lat]. 
    zoom: 11.25, // starting zoom level.
});

//Use "map.on" event listener to add features to the webmap.
map.on('load', () => {
    
    //Add geojson files from GitHub repository. 

    map.addSource('line2completed', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kevinyuanzy/472-Lab3-KY/refs/heads/main/line2completed.geojson' // The URL to GeoJson completed portion of subway line.
    });

    map.addLayer({
        'id': 'line2-completed-line', 
        'type': 'line', 
        'source': 'line2completed',
        'paint': {
            'line-color': '#00923f',
            'line-width': 2,
        },
    }); //Add the layer to the map and format the layer.

    map.addSource('line2incompleted', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kevinyuanzy/472-Lab3-KY/refs/heads/main/line2incompleted.geojson' // The URL to GeoJson incompleted portion of subway line.
    });

    map.addLayer({
        'id': 'line2-incompleted-line', 
        'type': 'line', 
        'source': 'line2incompleted',
        'paint': {
            'line-color': '#00923f',
            'line-width': 2,
        },
    });

    map.addSource('stations_completed', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kevinyuanzy/472-Lab3-KY/refs/heads/main/stations_completed.geojson' // The URL to GeoJson completed station points.
    });

    map.addLayer({
        'id': 'line2-completed-stations', 
        'type': 'circle', 
        'source': 'stations_completed',
        'paint': {
            'circle-radius': ['*', ['get','transfer'], 1],
            'circle-color': '#f5f5f5',
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#000000',
        },
    }); 

    map.addSource('stations_incompleted', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kevinyuanzy/472-Lab3-KY/refs/heads/main/stations_incompleted.geojson' // The URL to GeoJson incompleted station points.
    });

    map.addLayer({
        'id': 'line2-incompleted-stations', 
        'type': 'circle', 
        'source': 'stations_incompleted',
        'paint': {
            'circle-radius': ['/', ['get','transfer'], 1],
            'circle-color': '#f5f5f5',
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#000000',
        },
    }); 

    

});

