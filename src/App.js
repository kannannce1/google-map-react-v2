// import React from "react";
import React, { Component } from "react";
import Map from "./components/Map";
import GoogleApiPolygon from "./GoogleApiPolygon";
import GoogleApiKML from "./GoogleApiKML";
import KMLmultipleLayer from "./KMLmultipleLayer"
import "./App.css";

// const App = () => {
class App extends Component {
  defaultOptions = {
    strokeWidth: 1,
    stroke: "#FF5106",
    strokeOpacity: "0.8",
    fill: "#FF4234",
    fillOpacity: "0.3",
    onMouseEnter: e => {},
    onMouseLeave: e => {}
  };

  // coords1 = {
  //   coords: [
  //     { lat: 25.774, lng: -80.19 },
  //     { lat: 18.466, lng: -66.118 },
  //     { lat: 32.321, lng: -64.757 },
  //     { lat: 25.774, lng: -80.19 }
  //   ],
  //   options: this.defaultOptions
  // };
  
  // coords3 = {
  //   coords: [
  //     [
  //       [
  //         { lat: 25.774, lng: -80.19 },
  //         { lat: 48.466, lng: -66.118 },
  //         { lat: 32.321, lng: -64.757 },
  //         { lat: 25.774, lng: -80.19 }
  //       ],
  //       [
  //         { lat: 25.774, lng: -60.19 },
  //         { lat: 58.466, lng: -46.118 },
  //         { lat: 32.321, lng: -44.757 },
  //         { lat: 25.774, lng: -60.19 }
  //       ]
  //     ]
  //   ],
  //   options: this.defaultOptions
  // };

  mapOptions = maps => {
    return {
      scrollwheel: false,
      mapTypeId: maps.MapTypeId.HYBRID,
      styles: [
        {
          stylers: [
            { saturation: -150 },
            { gamma: 0.8 },
            { lightness: 4 },
            { visibility: "on" }
          ]
        }
      ]
    };
  };

  coords2 = {
    coords: [],
    options: this.defaultOptions
  }

  deletePolygon = () => {
    console.log('Delete');
    this.setState({path: ''});
    this.coords2.coords = [];
  };

  addPolygon = () => {
    this.setState({path: 'path: '});
    this.coords2.coords= [
        [
          { lat: 25.774, lng: -80.19 },
          { lat: 18.466, lng: -66.118 },
          { lat: 32.321, lng: -64.757 },
          { lat: 25.774, lng: -80.19 }
        ],
        [
          { lat: 25.774, lng: -60.19 },
          { lat: 18.466, lng: -46.118 },
          { lat: 32.321, lng: -44.757 },
          { lat: 25.774, lng: -60.19 }
        ]
      ];
  };

  constructor(props) {
    super(props);

    this.state = {
      path: ''
    };
  }

  componentDidMount() { 
    this.setState({path: 'path: '});
    this.coords2.coords= [
        [
          { lat: 25.774, lng: -80.19 },
          { lat: 18.466, lng: -66.118 },
          { lat: 32.321, lng: -64.757 },
          { lat: 25.774, lng: -80.19 }
        ],
        [
          { lat: 25.774, lng: -60.19 },
          { lat: 18.466, lng: -46.118 },
          { lat: 32.321, lng: -44.757 },
          { lat: 25.774, lng: -60.19 }
        ]
      ];
  }

  render() {
    let pathVal = '';
    if (this.coords2.coords.length > 0) {
      pathVal = <span>{JSON.stringify(this.coords2.coords)}</span>;
    }

    return (
      <div id="react-root" style={{ width: "100%" }}>
       
        <p>Polygons Array</p>
        <div id="panel">
          <div id="color-palette"></div>
          <div>
            <button id="delete-button" onClick={this.deletePolygon}>Delete Polygon</button>
            <button id="delete-button" onClick={this.addPolygon}>Add Polygon</button>
          </div>
          <div id="curpos">
            <b>Curpos:</b> Z: {5} C: {[24.886, ', ', -70.268]}
          </div>
          <div id="cursel">
             <b>Crusel:</b> {this.state.path} {pathVal}
             
          </div>
          <div id="note"><small>Note: markers can be selected, but are not graphically indicated; can be deleted, but cannot have their color changed.</small></div>
        </div>
        <h2>drawSvg API</h2>
        <Map
          coordinates={this.coords2}
          zoom={5}
          center={[24.886, -70.268]}
          options={this.mapOptions}
        />
        {
        <div style={{ height: "400px", width: "100%" }}>
          <h2>Polygon API</h2>
          <GoogleApiPolygon />
          <h2>KML/KMZ to drawing layer</h2>
          <GoogleApiKML />
          <h2>KMLmultipleLayer</h2>
          <KMLmultipleLayer/>
        </div>
        
        }
       
      </div>
    );
  }
};

export default App;
