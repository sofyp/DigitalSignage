'use strict';
const querydata =`
{
  stopsByRadius(lat: 60.2585857, lon: 24.8433926, radius: 1000) {
    edges {
      node {
        distance
        stop {
          platformCode
          vehicleMode
          name
          stoptimesWithoutPatterns (numberOfDepartures: 10, omitNonPickups: true){
            serviceDay
            scheduledArrival
            realtimeArrival
            arrivalDelay
            realtime
            trip {
              wheelchairAccessible
              gtfsId
              tripHeadsign
              routeShortName
            }
          }
        }
      }
    }
  }
}
`;
/*distance= kävelymatka
* vechileMode= mikä kulkuneuvo
* name= mihin bussi on matkalla
* service day=
* scheduledArrival= aikataulun mukainen saapuminen
* realtimeArrival= milloin saapuu oikeasti
* arrivalDelay = viivästys
* realtime = true/false
* tripheadsign= minne linja menee
* routeShortName= Linjan nro esim 550*/
let walk = 1.5;         // Kävelynopeus m/s
const loadPage =()=>{

  fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'POST',
    headers: {"Content-Type": "application/graphql"},
    body: querydata
  }).
      then(vastaus => vastaus.json())
      .then((json) =>{
      console.log(json),
      firstData(json.data)
      }).catch(error => console.log(error));
};


const firstData = (Data) => {
  let linja = [];
  let busStop, distance, name ='';
  for(let e=0; e< Data.stopsByRadius.edges.length; e++) {
     busStop = Data.stopsByRadius.edges[e].node;
     distance = busStop.distance;
     name = busStop.stop.name;
    for (let s=0; s< busStop.stop.stoptimesWithoutPatterns.length; s++) {
      let rivi = [];
      let tanaan = new Date();
      let saapuu = busStop.stop.stoptimesWithoutPatterns[s];
      rivi.scheduleArrival = new Date((saapuu.serviceDay+saapuu.scheduledArrival)*1000);
      rivi.realtimeArrival = new Date((saapuu.serviceDay+saapuu.realtimeArrival)*1000);
      rivi.scheduleHour = rivi.scheduleArrival.getHours();
      rivi.scheduleMinute = rivi.scheduleArrival.getMinutes();
      rivi.realHour = rivi.realtimeArrival.getHours();
      rivi.realMinute = rivi.realtimeArrival.getMinutes();
      rivi.delay = saapuu.arrivalDelay;
      rivi.realtime = saapuu.realtime;
      rivi.realState = saapuu.realtimeState;
      rivi.id = saapuu.trip.gtfsId;
      rivi.number = saapuu.trip.routeShortName;
      rivi.heading = saapuu.trip.tripHeadsign;

      rivi.distance = distance;
      rivi.name = name;
      rivi.walkingTime = rivi.distance/walk*1000;
      rivi.timeUntil = (rivi.realtimeArrival-rivi.walkingTime-tanaan)/60000;

      if (linja.findIndex(x => x.id === rivi.id)>=0) {break;}
      if (rivi.timeUntil<0) {break;}
      linja.push(rivi);
    }
  }
  linja.sort((a, b) => a.scheduleArrival - b.scheduleArrival);
  tulosta(linja);
};

const tulosta = (Data) => {
  let show= document.getElementById('tulos');
  while (show.firstChild){
    show.removeChild(show.firstChild);
  }
   let divi="<div class='aikataulu'>";
  for(let line=0; line< 25; line++) {
    let real="", blink="", showTxt = "", late, hide;
    let row = Data[line];

    if (row.scheduleMinute<10) {row.scheduleMinute = "0"+row.scheduleMinute.toString()}
    if (row.scheduleHour<10) {row.scheduleHour = "0"+row.scheduleHour.toString()}
    if (row.realMinute<10) {row.realMinute = "0"+row.realMinute.toString()}
    if (row.realHour<10) {row.realHour = "0"+row.realHour.toString()}

    let scheduleTime = row.scheduleHour+":"+row.scheduleMinute;
    let realTime = row.realHour+":"+row.realMinute;

    if (row.delay>60) {late=` > </span><span class="late">${realTime}</span>`;hide="hide";}
    else if (row.delay<-30) {late=` > </span><span class="early">${realTime}</span>`;hide="hide";}
    else {late="</span>";hide="";}
    real = row.realtime?"online":"offline";

    if (0) {if (row.timeUntil<0) {blink ="soon";}}

    showTxt += `<div class='row ${blink}'>`;

    showTxt += `<div class="time"><span class="${hide}">${scheduleTime}${late}</div>`;
    showTxt += `<div class="number heading">${row.number}  `;
    showTxt += `${row.heading}</div>`;
    showTxt += `<div class="stopName">${row.name}</div>`;
   // showTxt += `<div class="walking">${Math.ceil(row.walkingTime/60000)} min</div>`;

    showTxt +="</div>";
    divi+=showTxt;

  }
  divi +="</div>";
  show.innerHTML += divi;
  console.log('kierros');
};


loadPage();

let reload =  setInterval(loadPage, 30*1000);