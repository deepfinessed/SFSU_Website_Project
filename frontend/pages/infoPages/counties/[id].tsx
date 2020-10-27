import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import Covid from '../../../types/Covid';
import { Chart } from 'chart.js';

const CountyPage = (): JSX.Element => {
  const firePerimGeoJSON =
    'https://opendata.arcgis.com/datasets/5da472c6d27b4b67970acc7b5044c862_0.geojson';
  const router = useRouter();
  const [initialized, setInit] = useState(false);
  const currCoords: [number, number, number] = [0, 0, 0];
  const [LongLat, setLongLat] = useState(currCoords);
  const [countyName, setCountyName] = useState('');
  const countyId = router.query.id;
  const [countyCovidResponse, setCountyCovidResponse] = useState <Array<Covid>> ([]);

  useEffect(() => {
    console.log(router);
    // if(router.query.id === undefined && !initialized) {
    //   router.push('/vphome');  
    //   return; 
    // } 
    async function getCountyCovid() {
    
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        
        const url = `${baseURL}/api/counties/${countyId}/covid-display`;
        await fetch(url)
          .then((response) => {
            console.log(response); 
            return response.json()})
          .then((data) => {setCountyCovidResponse(data)});
    }

    async function loadMap() {
      if (initialized) {
        return;
      }
      const leaflet = await import('leaflet');
      const L = leaflet;
      const url = process.env.NEXT_PUBLIC_BASE_URL;

      const currLongLat: [number, number, number] = [0, 0, 0];
      const fetchUrl = `${url}/api/counties/${countyId}`;

      const mymap = L.map('mapid').setView(L.latLng(currLongLat), 8);

      await fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => {
          currLongLat[0] = data.latitude;
          currLongLat[1] = data.longitude;
          setLongLat([data.longitude, data.latitude, 0]);
          setCountyName(data.name);
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
    async function loadChart (){
      
      await getCountyCovid().then(() => {
      
        let dateLabels : string[] = []; 
        let deaths : number[] = []; 
        let icu : number[]= [];
        let cases : number[]= []; 
        let hosp : number[]= []; 
        countyCovidResponse.map((val)=>{  
          dateLabels.push(val.date!); 
          deaths.push(val.deaths!); 
          icu.push(val.icu!); 
          cases.push(val.cases!);
          hosp.push(val.hosp!); 

        })
        const canvas : any = document.getElementById('myChart');

        const ctx = canvas.getContext("2d")
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: dateLabels,
            datasets: [
              {
                label: 'Deaths',
                backgroundColor: 'blue',
                data: deaths,
              },
              {
                label: 'Cases',
                backgroundColor: 'red',
                data: cases,
              },
              {
                label: 'Icu',
                backgroundColor: 'green',
                data: icu,
              },
              {
                label: 'hospitalization', 
                backgroundColor: 'purple', 
                data: hosp
              }
            ],
          },
          options: {
            responsive: false,
            legend: { display: true },
            title: {
              display: true,
              text: 'Covid last 90 days',
            },
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
            }
          },
        });
      }) 
      
    }
    if (router.query.type === "Covid") {
      loadChart(); 
      document.getElementById("mapid")!.style.display = "none"; 
    } else if (router.query.type === "Fire") {
      loadMap();
      document.getElementById("myChart")!.style.display = "none"; 
    } else {
        loadChart(); 
        loadMap(); 
    }
    setInit(true);
  }, [initialized, LongLat, countyId]);

  return (
    <div>
      <Container align="center">
        <Text variant="h3">
          {router.query.type
            ? // @ts-ignore
              router.query.type.charAt(0).toUpperCase() +
              router.query.type.slice(1) +
              ' '
            : 'All'}
          Data for
          {' ' + countyName}
        </Text>
        County:
        {router.query.county || 'Not Specified'}
        <br />
        {LongLat}
        <canvas id="myChart" width="1000" height="1000" style={{ height: '800px',width: '800px' }}/>
      </Container>
      <div id="mapid" style={{ height: '500px' }} />
      
    </div>
  );
};

export default CountyPage;
