import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import axios from 'axios';

class KMLmultipleLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 30.42419403634421,
        lng: 90.0926995893311
      },
      zoom: 12,
      map:{},
      maps:{},
      layers:[]

    };
 
  }

  componentDidMount(){
  }
  
  

  
  onGoogleApiLoaded = (map, maps) => {

    

  var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
  //var KMZUrl = 'http://iblogbox.github.io/js/gpx/sample/Blackbirds.kmz';
  //var KMZUrl = 'https://github.com/kannannce1/google-map-react/blob/master/public/otherRestrictionsRas.kmz';
  //var src='https://github.com/kannannce1/google-map-react/raw/master/public/otherRestrictionsRas.kmz';
  
  var triangleCoords = [];
   axios.get(src).then(res => {
     var  parser = new DOMParser();
     var  xmlDoc = parser.parseFromString(res.data,"text/xml");
     const coordinatesObj = xmlDoc.getElementsByTagName("coordinates");
     if (coordinatesObj.length > 0) {
        for (var i = 0; i < coordinatesObj.length; i++) {
            var name = coordinatesObj[i].firstChild.nodeValue;
            triangleCoords.push({lat: parseFloat(name.split(",")[1]),lng:parseFloat(name.split(",")[0])})
        }
        this.setState({center: triangleCoords[0]});
        this.setState({map: map});
        this.setState({maps: maps});
        
        // Construct the polygon.
        var bermudaTriangle = new maps.Polygon({
          paths: triangleCoords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35
        });
      //bermudaTriangle.setMap(map);
    }
  });
  //this.state.layers.setState([new this.state.maps.KmlLayer('https://developers.google.com/kml/documentation/us_states.kml'), new this.state.maps.KmlLayer('https://raw.githubusercontent.com/kannannce1/google-map-react/master/public/geojson.kml')]);

  
};

toggleLayers = (layerIndex) => {
    console.log( this.state.map,layerIndex )
    console.log( this.state.maps )
  // if(this.layers[layerIndex].getMap()==null) {
        //this.layers[layerIndex].setMap(this.state.map);
      /*  this.maps.KmlLayer( this.layers[layerIndex], {
           suppressInfoWindows: true,
           preserveViewport: false,
           map: this.map
         });*/

         /*var kmlLayer = new this.state.maps.KmlLayer(this.layers[layerIndex], {
            suppressInfoWindows: true,
            preserveViewport: false,
            map: this.state.map
          });*/
    // }
     //else {
        //this.layers[layerIndex].setMap(null);
        /*maps.KmlLayer( layers[layerIndex], {
           suppressInfoWindows: true,
           preserveViewport: false,
           map: map
         });*/
     
}

render() {

  

  return (
    <div style={{ height: "600px", width: "100%" }}>
        <button id="layer-button1" onClick={()=>this.toggleLayers(0)}>Layer1</button>
        <button id="layer-button2" onClick={()=>this.toggleLayers(1)}>Layer2</button>
   
    <GoogleMapReact
    defaultCenter={{ lat: 24.886, lng: -70.268 }}
    defaultZoom={5}
    yesIWantToUseGoogleMapApiInternals
   
    onGoogleApiLoaded={({ map, maps }) => this.onGoogleApiLoaded(map, maps)}
  />
  <div id="status" style={{ height: "200px", width: "100%" }}>HI</div>
  </div>



  )
}
};
export default KMLmultipleLayer;
