import { useEffect, useRef, useState } from "react";
import SoilSampleAPI from "../api/soil-sample";
import mapboxGl from "mapbox-gl";
import "./Maps.css";

function Maps() {
  const [pointsDataSource, setPointsDataSource] = useState([]);
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  mapboxGl.accessToken =
    "pk.eyJ1Ijoibmljb21hbGRvcyIsImEiOiJjbHRhN2FkY3gwNXA5MmpwazNucTl6dTE4In0.H_vxRwys50LLh7qLW0--uQ"; //usar env

  const getAllSoilSample = async () => {
    const response = await SoilSampleAPI.getAll();
    const points = response.map((row) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: row.coordinate,
        },
      };
    });
    console.log("a");
    setPointsDataSource(points);
  };

  useEffect(() => {
    getAllSoilSample();
  }, []);

  useEffect(() => {
    if (pointsDataSource.length !== 0) {
      console.log(mapContainer.current);
      console.log(pointsDataSource);
      const map = new mapboxGl.Map({
        container: mapContainer.current,
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-100.04, 38.907],
        zoom: 5,
      });
      // map = new mapboxGl.Map({
      //   container: mapContainer.current,
      //   style: "mapbox://styles/mapbox/streets-v12",
      //   center: [lng, lat],
      //   zoom: zoom,
      // });

      map.on("load", () => {
        // Add a source for the state polygons.
        // map.addSource("states", {
        //   type: "geojson",
        //   data: "https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson",
        // });

        // Add a layer showing the state polygons.
        // map.addLayer({
        //   id: "states-layer",
        //   type: "fill",
        //   source: "states",
        //   paint: {
        //     "fill-color": "rgba(200, 100, 240, 0.4)",
        //     "fill-outline-color": "rgba(200, 100, 240, 1)",
        //   },
        // });
        map.addSource("maine", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              // These coordinates outline Maine.
              coordinates: [
                [
                  [-67.13734, 45.13745],
                  [-66.96466, 44.8097],
                  [-68.03252, 44.3252],
                  [-69.06, 43.98],
                  [-70.11617, 43.68405],
                  [-70.64573, 43.09008],
                  [-70.75102, 43.08003],
                  [-70.79761, 43.21973],
                  [-70.98176, 43.36789],
                  [-70.94416, 43.46633],
                  [-71.08482, 45.30524],
                  [-70.66002, 45.46022],
                  [-70.30495, 45.91479],
                  [-70.00014, 46.69317],
                  [-69.23708, 47.44777],
                  [-68.90478, 47.18479],
                  [-68.2343, 47.35462],
                  [-67.79035, 47.06624],
                  [-67.79141, 45.70258],
                  [-67.13734, 45.13745],
                ],
              ],
            },
          },
        });

        map.addLayer({
          id: "states-layer",
          type: "fill",
          source: "maine",
          paint: {
            "fill-color": "rgba(200, 100, 240, 0.4)",
            "fill-outline-color": "rgba(200, 100, 240, 1)",
          },
        });

        // When a click event occurs on a feature in the states layer,
        // open a popup at the location of the click, with description
        // HTML from the click event's properties.
        map.on("click", "states-layer", (e) => {
          new mapboxGl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
        });

        // Change the cursor to a pointer when
        // the mouse is over the states layer.
        map.on("mouseenter", "states-layer", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        // Change the cursor back to a pointer
        // when it leaves the states layer.
        map.on("mouseleave", "states-layer", () => {
          map.getCanvas().style.cursor = "";
        });

        map.loadImage(
          "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
          (error, image) => {
            if (error) throw error;
            map.addImage("custom-marker", image);
            // Add a GeoJSON source with 2 points
            map.addSource("points", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: pointsDataSource,
              },
            });

            // Add a symbol layer
            map.addLayer({
              id: "points",
              type: "symbol",
              source: "points",
              layout: {
                "icon-image": "custom-marker",
              },
            });
          }
        );
      });
    }
  }, [pointsDataSource]);

  // useEffect(() => {
  //   map.on("move", () => {
  //     setLng(map.getCenter().lng.toFixed(4));
  //     setLat(map.getCenter().lat.toFixed(4));
  //     setZoom(map.getZoom().toFixed(2));
  //   });
  // }, [dataSource]);

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  );
}

export default Maps;
