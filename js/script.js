//===input
let searchInput=document.getElementById('searchInput')

//===first-card
let today=document.getElementById('today')
let todaydate=document.getElementById('todaydate')
let todaylocation=document.querySelector('.todaylocation')
let todaydegree=document.querySelector('.todaydegree')
let todayIcon=document.getElementById('todayIcon')
let todaycondition=document.querySelector('.todaycondition')
let humidityIcon=document.querySelector('.humidityIcon')
let kmIcon=document.querySelector('.kmIcon')
let dirIcon=document.querySelector('.dirIcon')


//===second + thired card
let nextday=document.querySelectorAll('.nextday')   
let nextIcon=document.querySelectorAll('.nextIcon')
let nextmaxdeg=document.querySelectorAll('.nextmaxdeg')
let nextmindeg=document.querySelectorAll('.nextmindeg')
let nextcondition=document.querySelectorAll('.nextcondition')
 daysName=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
 monthsName=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']

var currentCity="cairo"   
 var result  
 var responsedata


async function findlocation(){
    result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${currentCity}&days=3`)
    responsedata= await result.json()
    console.log(responsedata)
   displaytoday()
   displaynextdays()
}
findlocation()


let date = new Date()
console.log(date)



function displaytoday(){
    today.innerHTML=daysName[date.getDay()];
    todaydate.innerHTML=`${date.getDate()} ${monthsName[date.getMonth()]}`;
    todaylocation.innerHTML=responsedata.location.name;
    todaydegree.innerHTML=responsedata.current.temp_c ;
    todayIcon.setAttribute('src',`https:${responsedata.current.condition.icon}`)
    todaycondition.innerHTML=responsedata.current.condition.text
    humidityIcon.innerHTML=responsedata.current.humidity
    kmIcon.innerHTML=responsedata.current.wind_kph
    dirIcon.innerHTML=responsedata.current.wind_dir
}


function displaynextdays(){
    for(let i=0 ; i<nextday.length;i++){
        nextday[i].innerHTML=daysName[new Date(responsedata.forecast.forecastday[i+1].date).getDay()]      
        nextIcon[i].setAttribute('src',`https:${responsedata.forecast.forecastday[i+1].day.condition.icon}`)
        nextmaxdeg[i].innerHTML=responsedata.forecast.forecastday[i+1].day.maxtemp_c
        nextmindeg[i].innerHTML=responsedata.forecast.forecastday[i+1].day.mintemp_c
        nextcondition[i].innerHTML=responsedata.forecast.forecastday[i+1].day.condition.text
    }
    
}
searchInput.addEventListener("keyup",function(){
    currentCity=searchInput.value;
    console.log(currentCity);
    findlocation();
})
