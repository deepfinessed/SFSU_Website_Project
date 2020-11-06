import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import Covid from '../../../types/Covid';
import { Chart } from 'chart.js';
import { Field, Formik } from 'formik';

let covidChart : any = null;
  let canvas : any = null; 
  let ctx : any = null;

const CountyPage = (): JSX.Element => {
  const firePerimGeoJSON =
    'https://opendata.arcgis.com/datasets/5da472c6d27b4b67970acc7b5044c862_0.geojson';
  const router = useRouter();
  const [initialized, setInit] = useState(false);
  const [countyName, setCountyName] = useState(''); 
  const [startDate, setStartDate] = useState(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)); 
  const [endDate, setEndDate] = useState(new Date(Date.now())); 
  const [hospOn, setHospOn] = useState(true); 
  const [casesOn, setCasesOn] = useState(true); 
  const [deathsOn, setdeathsOn] = useState(true); 
  const [sortBy, setSortBy] = useState("date"); 
  const [orderBy, setorderBy] = useState("asc"); 
  const [icuOn, setIcuOn] = useState(true); 
  const [limit, setLimit] = useState(20); 
  const countyId = router.query.id;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const countyDataUrl = `${baseURL}/api/counties/${countyId}`;
   
  function parseDate(s) {
    var b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
  }

  useEffect(() => {
    console.log(router);
    if(router.query.id === undefined) {
      return; 
    }  else {
      setInit(true);
    }
    if (canvas === null) {
      canvas = document.getElementById('covidChart');
      ctx = canvas.getContext("2d");
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
      var circle = L.circle(temp, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 15000
      });
      circle.addTo(mymap);
      mymap.setMaxBounds(CalBounds);
      mymap.fitBounds(CalBounds);
      mymap.setView(temp, 10);
    }

    async function loadCovidChart (){
      
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
        orderBy : orderBy, 
        limit : limit
      }
      console.log(requestData.orderBy); 
      const response = await fetch (countyDataUrl);
      //const response = await fetch(countyDataUrl);
      const countyData = await response.json(); 
      setCountyName(countyData.name);

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
        ctx.clearRect(0, 0, 1000, 1000); 
        if (covidChart != null) {
          covidChart.destroy();
        } 
         
        covidChart = new Chart(ctx, {
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
              text: 'Covid Stats',
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
      loadCovidChart(); 
      document.getElementById("mapid")!.style.display = "none"; 
    } else if (router.query.type === "Fire") {
      if (!initialized) {
        loadMap();
      }
      
      document.getElementById("covidChart")!.style.display = "none"; 
    } else {
        loadCovidChart(); 
        if (!initialized) {
          loadMap();
        }
    }
    
  }, [initialized, countyId, sortBy, orderBy, deathsOn, icuOn, casesOn, hospOn, startDate, endDate, limit]);

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
        
        <div id= "covidInputs">
        Sort By:
          <select
          
          id="sortDropDown"
          onChange={(event) => setSortBy(event.target.value)}
          value = {sortBy}
          >
            <option value="date">date</option>
          <option value="icu">ICU</option>
          <option value="deaths">Deaths</option>
          <option value="hosp">Hospital</option>
          <option value="cases">cases</option>
          

         </select>
         Order:
         <select
          
          id="orderDropDown"
          onChange={(event) => setorderBy(event.target.value)}
          >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
    
         </select>
         <br></br>
         Deaths: <input type="checkbox" checked={deathsOn} onChange ={(event) => setdeathsOn(event.target.checked)} />
         Icu: <input type="checkbox" checked={icuOn} onChange ={(event) => setIcuOn(event.target.checked)} />
         Cases: <input type="checkbox" checked={casesOn} onChange ={(event) => setCasesOn(event.target.checked)} />
         Hospitalizations: <input type="checkbox" checked={hospOn} onChange ={(event) => setHospOn(event.target.checked)} />
         Start Date: <input type = "date" value = {startDate.toISOString().split('T')[0]} onChange  = {(event) => setStartDate(parseDate(event.target.value))}></input>
         End Date: <input type = "date" value = {endDate.toISOString().split('T')[0]} onChange  = {(event) => setEndDate(parseDate(event.target.value))}></input>
         Limit: <input type = "range" value = {limit} onChange ={(event) => setLimit(parseInt(event.target.value))} min = "5" max = "100"></input>
        </div>
        <div id = "fireInputs">

        </div>

        <canvas id="covidChart" width="1000" height="1000" style={{ height: '800px',width: '800px' }}/>
      </Container>
      <div id="mapid" style={{ height: '500px' }} />
      
    </div>
  );
};

export default CountyPage;
