# GGR472 Lab 3 by Kevin Yuan

This repository contains the Lab 3 website, documents used to create the website, and data it used. 

## Repository Contents
The website is an interactive map showing the Toronto Subway Line 2, including line, station, transfer information and the line portion that is still under construction. Several interactive features also added to the map. 

- `index.html`: HTML file to render the map and elements including information box containing checkbox, and legend. 
- `style.css`: CSS file for positioning the map interface and elements.
- `script.js`: JavaScript file containing code for adding interactivity with map data layers based on HTML element events

## Functionalities
- Checkbox to display only completed portion of the line
- Pop-up that display station names and transfer information
- Search control
- Zoom & rotation control
- Full screen control
- Legend

## Data
There are 4 .geojson files for this map, including:

- `line2completed.geojson`: completed portion of line 2.
- `line2incompleted.geojson`: incompleted portion of line 2.

Both are line features, displaying in green line on the map.

- `stations_completed.geojson`: completed stations.
- `stations_incompleted.geojson`: incompleted stations.

Both are point features, displaying in either black or red points on the map.

Both point features contains station names and transfer informations as properties.

### Interpreting transfer informations
Stations are sorted into two categories:
- Transfer stations: station that can transfer to another subway route, Light Rail Transit (LRT) route or GO train route.
- Non-transfer stations: stations that can only transfer to streetcar and bus routes. 
- Some transfer stations have indirect transfer to buses (with checking out from subway stations), indicated by "bus (No direct transfer)" in transfer information.

## References
Codes are referenced from GGR472 Week 6 demo and both Week 8 demos.
- https://github.com/smith-lg/ggr472-wk6-demo
- https://github.com/smith-lg/ggr472-wk8-demo1
- https://github.com/smith-lg/ggr472-wk8-demo2/tree/main

Data on station locations and transfer information are from TTC, Metrolinx, geojson.io basemap and Google Map.
- https://www.ttc.ca/routes-and-schedules/2/0 About line 2 Stations
- https://www.metrolinx.com/en/projects-and-programs/scarborough-subway-extension About line 2 extension part

