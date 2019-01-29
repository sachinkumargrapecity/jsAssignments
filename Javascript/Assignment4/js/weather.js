// default city Delhi

class searchNewCityWithCordinates{
    constructor(longitude,latitude){
        this.longitude = longitude;
        this.latitude = latitude;
    }
    

     callApi(){
        fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ this.latitude +
        '&lon=' + this.longitude + 
        '&appid=60c8bd080454dd711b11fac58b168398')
        .then(response=> response.json()).then(json => {
         if(json.weather){
            // update Information
            searchNewCityWithCordinates.updateInformation(json);
              // change icon

            searchNewCityWithCordinates.ChangeIcon(json.weather[0].main,json.sys);
         }
         else if(json.message == 'city not found'){
            alert("Check spelling of name of city");
        }   
        });
        }   
 
     updateCordinatesAndCallApi(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position=>{
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.callApi();
                });
            }
            
    }


    static updateInformation(json){
        let desc = json.weather[0].description;
        document.getElementById('weatherInfo').innerHTML = desc;
        document.getElementById('temperature').innerHTML = (json.main.temp).toFixed(2) + '<sup>o</sup>K';
        document.getElementById('time').innerHTML = addZero(new Date().getHours()) + ':' + addZero(new Date().getMinutes());
       
        function addZero(i) {
           if (i < 10) {
             i = "0" + i;
           }
           return i;
         }
    }
    static ChangeIcon(weatherDesciption,timingOfSunsetAndSunrise){
        let element =  document.getElementById('image');
        switch(weatherDesciption){
            
            case 'Clouds' : {
               element.className = 'fas fa-cloud';
               break;
            }
            case 'Clear' : {
                // moon or sun
               let sunsetHour  = new Date(timingOfSunsetAndSunrise.sunset*1000).getHours();
               let sunsetMinutes  = new Date(timingOfSunsetAndSunrise.sunset*1000).getMinutes();

               let currentHour  = new Date().getHours();
               let currentMinutes = new Date().getMinutes();

               // moon icon when current time is more than or equal to sunset
               if(currentHour>sunsetHour){
                element.className = 'fas fa-moon';
               }
               else if(currentHour == sunsetHour){
                   if(currentMinutes > sunsetMinutes){
                    element.className = 'fas fa-moon';
                   }
                   else{
                       element.className = 'fas fa-sun';
                   }
               }
               else{
                   element.className = 'fas fa-sun';
               }

               break;
            }
            case 'Haze' :{
                element.className = 'fas fa-smog'; break;
            }
            case 'Mist' : {
                element.className = 'fas fa-smog'; break;
            }
            case 'Snow' : {
                element.className = 'fas fa-snowflake'; break;
            }
            case 'Smoke' : {
                element.className = 'fas fa-smog'; break;
            }
            case 'Drizzle' : {
                element.className = 'fas fa-cloud-rain'; break;
            }
            case 'Fog' : {
                element.className = 'fas fa-water'; break;
            }
            case 'default':{
                element.className = 'fas fa-circle-notch';
            }
        }
    }
}


class searchNewCityWithName{
    constructor(){
        this.cityName = 'Delhi';
    }

    // call the api with current city name
    callApi(){
        this.cityName = document.forms['searchForm']['cityName'].value;
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.cityName+'&appid=60c8bd080454dd711b11fac58b168398')
        .then(response=> response.json()).then(json => {
            
            if(json.weather){
                
            searchNewCityWithCordinates.updateInformation(json);
            searchNewCityWithCordinates.ChangeIcon(json.weather[0].main,json.sys);
            }
            else if(json.message == 'city not found'){
                alert("Check spelling of name of city");
            } 
        });
    }
}




class changeTemperatureBase{
    constructor(){
        this.current = 'K';
    }
     change(){
        let temperature = parseFloat(document.getElementById('temperature').innerHTML);
        if(temperature == undefined) return;
        
        if(this.current == 'K'){
            this.toCelcius(temperature);
            this.current = 'C';
        }
        else if(this.current == 'C'){
            this.toFarenheight(temperature);
            this.current = 'F';
        }
        else if(this.current == 'F'){
            this.toKelvin(temperature);
            this.current = 'K';
        }
        
    }

    toCelcius(temperature){
        let element = document.getElementById('temperature');
        element.innerHTML = (temperature - 275).toFixed(2) + '<sup>o</sup>C';
    }

    toFarenheight(temperature){
        let element = document.getElementById('temperature');
        element.innerHTML = ((temperature*9/5)+32).toFixed(2) + '<sup>o</sup>F';
    }

    toKelvin(temperature){
        //convert to celcius first
        let element = document.getElementById('temperature');
        element.innerHTML = (275+((temperature-32)*5/9)).toFixed(2) + '<sup>o</sup>K';
    }
}


searchCityWithCordinates = new searchNewCityWithCordinates(77,26);
searchCityWithCordinates.updateCordinatesAndCallApi();
changeBaseVar = new changeTemperatureBase();

searchForNewCity = new searchNewCityWithName();