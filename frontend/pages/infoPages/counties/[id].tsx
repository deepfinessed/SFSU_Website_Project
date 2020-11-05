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
  const [countyName, setCountyName] = useState('');
  // const [startDate, setStartDate] = useState(new Date(Date.now() - 360 * 24 * 60 * 60 * 1000)); 
  // const [endDate, setEndDate] = useState(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)); 
  // const [hospOn, setHospOn] = useState(1); 
  // const [casesOn, setCasesOn] = useState(1); 
  // const [deathsOn, setDeathsOn] = useState(1); 
  // const [icuOn, seticeOn] = useState(1); 
  const [startDate] = useState(new Date(Date.now() - 360 * 24 * 60 * 60 * 1000)); 
  const [endDate] = useState(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)); 
  const [hospOn] = useState(true); 
  const [casesOn] = useState(true); 
  const [deathsOn] = useState(false); 
  const [sortBy] = useState("date"); 
  const [orderBy] = useState("asc"); 
  const [icuOn] = useState(true); 
  const countyId = router.query.id;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const countyDataUrl = `${baseURL}/api/counties/${countyId}`;

  useEffect(() => {
    console.log(router);
    if(router.query.id === undefined) {
      return; 
    }  else {
      setInit(true);
    }

    async function loadMap() {
      if (initialized) {
        return; 
      }
      const leaflet = await import('leaflet');
      const L = leaflet;

      const currLongLat: [number, number, number] = [0, 0, 0];
     

      const mymap = L.map('mapid').setView(L.latLng(currLongLat), 8);

      const responses = await Promise.all([
        fetch(countyDataUrl),
        fetch(firePerimGeoJSON),
      ]);
      

      const data = await Promise.all(
          responses.map((response) => response.json())
      );

      const [countyData, firePerimData] = data;

      currLongLat[0] = countyData.latitude;
      currLongLat[1] = countyData.longitude;
      setCountyName(countyData.name);

      const myLayer = L.geoJSON().addTo(mymap);
      myLayer.addData(firePerimData);

      L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            minZoom: 5,
            maxZoom: 18,
            id: 'OSM',
            tileSize: 512,
            zoomOffset: -1,
          }
        )
        .addTo(mymap);


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
      
      let requestData = 
      {
        countyId : countyId,
        startDate : startDate, 
        endDate : endDate, 
        casesOn : casesOn,
        icuOn : icuOn, 
        hospOn : hospOn, 
        deathsOn : deathsOn, 
        sortBy : sortBy,
        orderBy : orderBy
      }
      console.log(requestData.orderBy); 
      // const response = await fetch (countyDataUrl);
      // //const response = await fetch(countyDataUrl);
      // const countyData = await response.json(); 
      // setCountyName(countyData.name);

      const fetchedResponse = await fetch(`${baseURL}/api/counties/covid-display`, 
      {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(requestData)

      });
      const dataPromise : Promise<Covid[]>  = await (fetchedResponse.json()); 
      const data = await dataPromise; 
      
        let dateLabels : string[] = []; 
        let deaths : number[] = []; 
        let icu : number[]= [];
        let cases : number[]= []; 
        let hosp : number[]= []; 
        
        data.map((val)=>{  
          dateLabels.push(val.date!); 
          if (deathsOn) {
            deaths.push(val.deaths!);
          }
          if (icuOn) {
            icu.push(val.icu!);
          }
          if (casesOn){
            cases.push(val.cases!);
          }
          if (hospOn){
            hosp.push(val.hosp!); 
          }
          
          

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
    
  }, [initialized, countyId]);

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
        <br />
        <canvas id="myChart" width="1000" height="1000" style={{ height: '800px',width: '800px' }}/>
      </Container>
      <div id="mapid" style={{ height: '500px' }} />
      
    </div>
  );
};

export default CountyPage;
