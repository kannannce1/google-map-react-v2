import React from "react";
import GoogleMapReact from "google-map-react";

const onGoogleApiLoaded = (map, maps) => {
  var triangleCoords = [
    /*{ lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }*/
    
    /*{lat:-122.0914977709329,lng:37.42390182131783},
    {lat:-122.0926995893311,lng:37.42419403634421},
    {lat:-122.0922532985281,lng:37.42301710721216}*/

    {lat:37.42390182131783,lng:-122.0914977709329},
    {lat:37.42419403634421,lng:-122.0926995893311},
    {lat:37.42301710721216,lng:-122.0922532985281}
  ];

  

  // Construct the polygon.
  var bermudaTriangle = new maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);
};

const GoogleApiPolygon = () => (
  <GoogleMapReact
    defaultCenter={{ lat: 37.42390182131783, lng: -122.0914977709329 }}
    defaultZoom={5}
    yesIWantToUseGoogleMapApiInternals
    onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
  />
);

export default GoogleApiPolygon;
