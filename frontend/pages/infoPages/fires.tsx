import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';

const Fires = (): JSX.Element => {
  const firePerimGeoJSON =
    'https://opendata.arcgis.com/datasets/5da472c6d27b4b67970acc7b5044c862_0.geojson';
  const router = useRouter();
  const [initialized, setInit] = useState(false);
  const currCoords: [number, number, number] = [0, 0, 0];
  const [LongLat, setLongLat] = useState(currCoords);

  useEffect(() => {
    async function loadMap() {
      if (initialized) {
        return;
      }

      const leaflet = await import('leaflet');
      const L = leaflet;
      // change this to county latlng
      setLongLat([38.06, -122.73, 0]);

      const mymap = L.map('mapid').setView(L.latLng(LongLat), 8);

      await fetch(firePerimGeoJSON)
        .then((response) => response.json())
        .then((data) => {
          const myLayer = L.geoJSON().addTo(mymap);
          myLayer.addData(data);
        });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 18,
        id: 'OSM',
        tileSize: 512,
        zoomOffset: -1,
      }).addTo(mymap);

      const CalBounds = L.latLngBounds(
        L.latLng(32.534156, -124.409591), // Southwest
        L.latLng(42.009518, -114.131211) // Northeast
      );

      mymap.setMaxBounds(CalBounds);
      mymap.fitBounds(CalBounds);
    }
    loadMap();
    setInit(true);
  }, [initialized, LongLat]);

  return (
    <div>
      <Container align="center">
        <Text variant="h3">Fires</Text>
        County:
        {router.query.county || 'Not Specified'}
      </Container>
      <div id="mapid" style={{ height: '500px' }} />
    </div>
  );
};

export default Fires;
