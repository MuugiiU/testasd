import React, { useState } from "react";

import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

function App() {
  const [branches, setBranches] = useState([]);

  const getAllBranch = async () => {
    try {
      const result = await axios.get("http://localhost:8010/restaurants");
      setBranches(result.data.restaurants);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getNearBranch = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8010/restaurants/near?distance=200",
        { lat: 47.92394060040875, lon: 106.93371541130081 }
      );
      setBranches(result.data.branches);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  return (
    <div className="App">
      <h1>Газрын зураг</h1>
      <div>
        <button onClick={getAllBranch}> Бүх салбарыг харуулах</button>
        <button onClick={getNearBranch}> Өгөгдсөн зайд ойрыг харуулах</button>
      </div>
      <div
        style={{
          width: "100%",
          height: "90vh",
          backgroundColor: "greenyellow",
        }}
      >
        <MapContainer
          style={{ width: "100%", height: "90vh" }}
          center={[47.92386288001467, 106.93451484379997]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[47.92386288001467, 106.93451484379997]}>
            <Popup>Seoul Business Center</Popup>
          </Marker>
          {branches.length > 0 &&
            branches.map((r) => (
              <Marker
                position={[
                  r.location.coordinates[1],
                  r.location.coordinates[0],
                ]}
              >
                <Popup>{r.name}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
