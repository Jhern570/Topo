import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const [selectedParcel, setSelectedParcel] = useState(null);

  useEffect(() => {
    console.log("STATE UPDATED:", selectedParcel);
  }, [selectedParcel]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-118.25, 34.05], // LA area
      zoom: 10,
    });

    mapRef.current = map;

    map.on("load", () => {
      // your axios + addLayer code here
      axios.get(import.meta.env.VITE_API_URL + "/api/parcels").then((res) => {
        res.data.forEach((parcel) => {
          const pricePerAcre = (parcel.price / parcel.acres).toFixed(2);

          map.addSource(`parcel-${parcel.id}`, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [parcel.coordinates],
              },
            },
          });

          map.addLayer({
            id: `parcel-fill-${parcel.id}`,
            type: "fill",
            source: `parcel-${parcel.id}`,
            paint: {
              "fill-color": "#0080ff",
              "fill-opacity": 0.4,
            },
          });

          map.addLayer({
            id: `parcel-outline-${parcel.id}`,
            type: "line",
            source: `parcel-${parcel.id}`,
            paint: {
              "line-color": "#000",
              "line-width": 2,
            },
          });

          // Click event
          map.on("click", `parcel-fill-${parcel.id}`, (e) => {
            setSelectedParcel(parcel);
            map.flyTo({
              center: [-118.25, 34.04],
              zoom: 13,
              duration: 2000,
            });

            map.setPaintProperty(
              `parcel-fill-${parcel.id}`,
              "fill-opacity",
              0.15,
            );
            //   new mapboxgl.Popup()
            //     .setLngLat(e.lngLat)
            //     .setHTML(
            //       `
            //   <h3>${parcel.name}</h3>
            //   <p>Price: $${parcel.price}</p>
            //   <p>Acres: ${parcel.acres}</p>
            //   <p>$/Acre: $${pricePerAcre}</p>
            // `,
            //     )
            //     .addTo(map);
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedParcel) return;

    console.log("DRAWING LOTS");

    selectedParcel.lots.forEach((lot) => {
      if (map.getSource(`lot-${lot.id}`)) return; // prevent duplicates

      map.addSource(`lot-${lot.id}`, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [lot.coordinates],
          },
        },
      });

      map.addLayer({
        id: `lot-fill-${lot.id}`,
        type: "fill",
        source: `lot-${lot.id}`,
        paint: {
          "fill-color": "#00ff88",
          "fill-opacity": 0.5,
        },
      });
    });
  }, [selectedParcel]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Land Map</h2>
      <div ref={mapContainer} style={{ width: "100%", height: "90vh" }} />
    </div>
  );
}

export default App;
