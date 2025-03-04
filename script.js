// Add the default map token from the Mapbox account
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW55dWFuenkiLCJhIjoiY201eHprYXU0MGZwejJsb242Y3Nza25oYyJ9.h05hqdnqlx2BwgwbQNuKCg'; 

//Import the map style from MapBox. 
const map = new mapboxgl.Map({
    container: 'Lab2Map', // map container ID in the index.html file.
    style: 'mapbox://styles/kevinyuanzy/cm6ztbpqc003s01qwcvdrf6ft', // style URL from created MapBox style.
    center: [-79.391820, 43.701268], // starting position [lng, lat]. 
    zoom: 11.25, // starting zoom level.
});

//Add search control to map overlay
//Requires plugin as source in HTML body
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        countries: "ca"
    })
);

//Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add fullscreen option to the map
map.addControl(new mapboxgl.FullscreenControl()); 

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
            //Stations that can transfer to other subway line(s) or train route(s) are shown in larger icons. (non-transfer at 3 and transfer at 5, written in .geojson file "properties-transfer" row.)
            'circle-color':[ 
              'step', // STEP expression produces stepped results based on value pairs
              ['get', 'transfer'], // GET expression retrieves property value from 'capacity' data field
              '#800026', // Colour assigned to any values < first step
              3, '#000000', // Colours assigned to values >= each step
              5, '#ff1a1a',
            ]
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
            'circle-radius': ['*', ['get','transfer'], 1],
            'circle-color': [ 
                'step',
                ['get', 'transfer'], 
                '#800026', 
                3, '#000000', 
                5, '#ff1a1a',
              ]
        },
    }); 

    //Create a popup, so station names and transfer information will appear when mouse clicks on features.
    map.on('click', 'line2-completed-stations', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("<b>Station Name:</b> " + e.features[0].properties.name + "<br>" + "Transfer to: " + e.features[0].properties.transferto)          
            .addTo(map);
    });

    map.on('mouseenter', 'line2-completed-stations', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    
    map.on('mouseleave', 'line2-completed-stations', () => {
        map.getCanvas().style.cursor = '';
    });
    
    //Create another popup for incompleted stations.
    map.on('click', 'line2-incompleted-stations', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("<b>Station Name:</b> " + e.features[0].properties.name + "<br>" + "Transfer to: " + e.features[0].properties.transferto)          
            .addTo(map);
    });

    map.on('mouseenter', 'line2-incompleted-stations', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'line2-incompleted-stations', () => {
        map.getCanvas().style.cursor = '';
    });

    //Change map layer display based on check box using setLayoutProperty method
    document.getElementById('layercheck').addEventListener('change', (e) => {
        map.setLayoutProperty(
            'line2-incompleted-stations',
            'visibility',
        e.target.checked ? 'visible' : 'none'
        );
    });

    document.getElementById('layercheck').addEventListener('change', (e) => {
        map.setLayoutProperty(
            'line2-incompleted-line',
            'visibility',
        e.target.checked ? 'visible' : 'none'
        );
    });

    //Declare array variables for labels and colours
    const legendlabels = [
    'Non-exchange Stations',
    'Exchange Stations'
    ];

    const legendcolours = [
    '#000000',
    '#ff1a1a'
    ];

    //Declare legend variable using legend div tag
    const legend = document.getElementById('legend');

    //For each layer create a block to put the colour and label in
    legendlabels.forEach((label, i) => {
    const colour = legendcolours[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-key'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    legend.appendChild(item); //add row to the legend
    });

});

