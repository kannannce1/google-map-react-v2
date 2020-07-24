//import React from "react";
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from 'axios';
//import KMZGeoJSON from 'kmz-geojson';
import toGeoJSON from '@mapbox/togeojson';




var mmm=[]
var onGoogleApiLoaded = (map, maps) => {
  //var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
  //var KMZUrl = 'http://iblogbox.github.io/js/gpx/sample/Blackbirds.kmz';
  //var KMZUrl = 'https://github.com/kannannce1/google-map-react/blob/master/public/otherRestrictionsRas.kmz';
 // var src = 'https://raw.githubusercontent.com/kannannce1/google-map-react/master/public/westcampus.kml';
 var src="https://raw.githubusercontent.com/kannannce1/google-map-react/master/public/geojson.kml";

  //var KMZGeoJSON = require('kmz-geojson');

  //KMZGeoJSON.toGeoJSON(KMZUrl, function(err, json) {
    // Do something with the GeoJSON data.
    //console.log("working")
  //});

  axios.get(src).then(res => {
    console.log(res.data, '....');
   // console.log(toGeoJSON.kml(res));
  var  parser = new DOMParser();
  var  xmlDoc = parser.parseFromString(res.data,"text/xml");
  const coordinatesObj = xmlDoc.getElementsByTagName("coordinates");
  
    console.log(typeof(coordinatesObj))
    console.log(coordinatesObj.length)
    var mmm=[]
    for (var i = 0; i < coordinatesObj.length; i++) {
      var name = coordinatesObj[i].firstChild.nodeValue;
      mmm.push({lat: parseFloat(name.split(",")[1]),lng:parseFloat(name.split(",")[0])})
     // var div = document.createElement("div");
      //var textNode = document.createTextNode(name);
      //div.appendChild(textNode);
      //document.getElementById("wrapper").appendChild(div);
    }
    console.log(JSON.stringify(mmm))

  //var coordinates = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
  //console.log('coordinates', coordinates)


    // Construct the polygon.
    var bermudaTriangle = new maps.Polygon({
      paths: mmm,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35
    });
   //bermudaTriangle.setMap(map);




  });

  
  console.log('mmm',mmm[0])

  var kmlLayer = new maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map
  });
};



const GoogleApiKML = (mmm) => (
  
  <GoogleMapReact
    defaultCenter={{ lat: 24.886, lng: -70.268 }}
    defaultZoom={5}
    yesIWantToUseGoogleMapApiInternals
    onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
  />
);

/*class GoogleApiKML extends Component {

  componentDidMount(){
   // let url = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
   
   }
  

render() {
  return (
    <GoogleMapReact
        defaultCenter={{ lat: 24.886, lng: -70.268 }}
        defaultZoom={5}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
      />
  )
}
};
*/
export default GoogleApiKML;
