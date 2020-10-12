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
  const [CountyNames, setCountyNames] = useState(['']);

  useEffect(() => {
    async function loadMap() {
      if (initialized) {
        return;
      }
      const leaflet = await import('leaflet');
      const L = leaflet;
      const currCounty = router.query.county;
      const url = process.env.NEXT_PUBLIC_BASE_URL;

      const currLongLat: [number, number, number] = [0, 0, 0];
      const fetchUrl = `http://${url}/api/counties/?type=all&name=${currCounty}`;

      const mymap = L.map('mapid').setView(L.latLng(currLongLat), 8);

      await fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => {
          currLongLat[0] = data[0].latitude;
          currLongLat[1] = data[0].longitude;
          setLongLat([data[0].longitude, data[0].latitude, 0]);
        });

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
      const temp = L.latLng(currLongLat);
      mymap.setView(temp, 12);
      const CalBounds = L.latLngBounds(
        L.latLng(32.534156, -124.409591), // Southwest
        L.latLng(42.009518, -114.131211) // Northeast
      );

      mymap.setMaxBounds(CalBounds);
      mymap.fitBounds(CalBounds);
      mymap.setView(temp, 10);
    }
    async function printEmpty() {
      const countyNames = [''];
      const url = process.env.NEXT_PUBLIC_BASE_URL;
      const fetchUrl = `http://${url}/api/counties/?type=all`;

      await fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i + 1) {
            countyNames.push(data[i].name);
          }
        });
      setCountyNames(countyNames);
    }
    if (router.query.county === '') {
      printEmpty();
    } else {
      loadMap();
    }

    setInit(true);
  }, [initialized, LongLat, router.query.county]);

  return (
    <div>
      <Container align="center">
        <Text variant="h3">Fires</Text>
        County:
        {router.query.county || 'Not Specified'}
        <br />
        {LongLat}
      </Container>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {CountyNames.map((str) => {
          return <div key={str}>{str}</div>;
        })}
      </div>
      <div id="mapid" style={{ height: '500px' }} />
    </div>
  );
};

export default Fires;
