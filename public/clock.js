const kello =()=>{
  let today = new Date();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  minutes =check(minutes);
  document.querySelector('#kello').innerHTML=
      hour+ ":"+ minutes;
  let timeout = setTimeout(kello, 500);
};
const check =(min)=>{
  if (min<10) {min = "0"+ min}
  return min;
};

document.addEventListener('DOMContentLoaded', kello);