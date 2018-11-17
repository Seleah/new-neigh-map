# Neighborhood Maps App
## Udacity Front-End Nanodegree Project 7

## TL;DR
* Clone this repo from https://github.com/Seleah/new-neigh-map
* Run `yarn install`
* Run `yarn start`

Note that the default service worker is used in this app (bootstrapped with create-react-app) and so only works in production build.


This project uses React along with some APIs. Namely:

* Google Maps
* FourSquare
* google-maps-react for primary map display

## Features
A list of Ramen restaurants in the Portland, OR area has been created. These locations display as markers on the map. Clicking a marker displays an info box containing the name of the restaurant and the address. On the left of the screen is a list of the venues and a text box at the top. Typing into the box will show a list of locations accordingly. Clicking a locations in the list activates the marker on the map as if it had been clicked. Clicking anywhere on the map closes any active info display.