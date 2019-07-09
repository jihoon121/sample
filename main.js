
if (navigator.geolocation) 
{
navigator.geolocation.getCurrentPosition(successCallback,errorCallback);  
}
else
{
alert("이 브라우저는 Geolocation를 지원하지 않습니다");
}

function successCallback(position)
{
var lat = position.coords.latitude;
var lng = position.coords.longitude;


var latlng ="<p>"+lat+"</p>";
latlng +="<p>"+lng+"</p>";
console.log(lat);
$("#t").append(latlng);
//날씨 api
$(document).ready(function(){
    var apikey = "7d497ad3fbc2d9472cef13891ae8a206";
    var apiURI = "http://api.openweathermap.org/data/2.5/weather";  //?q=Yongin&appid=7d497ad3fbc2d9472cef13891ae8a206";
        apiURI += "?lat=" +lat;
        apiURI += "&lon=" +lng;
        apiURI += "&appid=" +apikey;
  
  //var URL = "http://api.openweathermap.org/data/2.5/weather?lat=37.3501761&lon=127.11512619999999&appid=7d497ad3fbc2d9472cef13891ae8a206"
  var result = "";
          $.ajax({
              url: apiURI,
              dataType: "jsonp",
              type: "GET",
              async: "false",
              success: function(resp) {
                  console.log(result.innerHTML = resp.main.humidity);
                  console.log("현재온도 : "+ (resp.main.temp- 273.15) );
                  console.log("현재습도 : "+ resp.main.humidity);
                  console.log("날씨 : "+ resp.weather[0].main );
                  console.log("상세날씨설명 : "+ resp.weather[0].description );
                  console.log("날씨 이미지 : "+ resp.weather[0].icon );
                  console.log("바람   : "+ resp.wind.speed );
                  console.log("나라   : "+ resp.sys.country );
                  console.log("도시이름  : "+ resp.name );
                  console.log("구름  : "+ (resp.clouds.all) +"%" );   
                     
                  
                  var temp=resp.main.temp - 273;
                  var imgURL = "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
  
                  if(resp.name=="Yongin"){
                      resp.name="용인시 ";
                  }else if(resp.name == "Seongnam"){
                      resp.name="성남시";
                  }
  
                  if((resp.clouds.all)>1 && (resp.clouds.all)<=2){
                      (resp.clouds.all)="구름 조금";
                  }else if((resp.clouds.all)>=0 && (resp.clouds.all)<=1){
                    (resp.clouds.all)="구름 없음"
                }
  
                  if(resp.wind.speed>1 && resp.wind.speed<=2){
                      resp.wind.speed="바람 조금";
                  }else if(resp.wind.speed>=0 && resp.wind.speed<=1){
                      resp.wind.speed="바람 없음"
                  }
  
                  if(resp.weather[0].description=="haze"){
                      resp.weather[0].description="안개 있음";
                  }
                  
                  var location_s ="<h1>"+ resp.name + parseInt(temp)+"℃</h1>" ;
                  location_s+= "<br></br>";
                  location_s+= "<p>구름:  "+(resp.clouds.all)+"</p>";
                  location_s+= "<p>바람:  "+resp.wind.speed+"</p>";
                  location_s+= "<p>상세날씨설명:  "+resp.weather[0].description+"</p>";
                  
                  $("#todayWeather").append(location_s);
                
              }
          });
    
  
  
      });
}

function errorCallback(error)
{
alert(error.message);
}



      /*

     function getWeatherLocation() {
 
        navigator.geolocation.getCurrentPosition
        (onWeatherSuccess, onWeatherError, { enableHighAccuracy: true });
    }

    var onWeatherSuccess = function (position) {
 
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;
     
        getWeather(Latitude, Longitude);
    }
     
    // Get weather by using coordinates
     
    function getWeather(latitude, longitude) {
     
        // Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
        var OpenWeatherAppKey = "7d497ad3fbc2d9472cef13891ae8a206";
     
        var queryString =
          'http://api.openweathermap.org/data/2.5/weather?lat='
          + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial';
     
        $.getJSON(queryString, function (results) {
     
            if (results.weather.length) {
     
                $.getJSON(queryString, function (results) {
     
                    if (results.weather.length) {
     
                        $('#todayWeather').append(results.name);
                        $('#temp').text(results.main.temp);
                        $('#wind').text(results.wind.speed);
                        $('#humidity').text(results.main.humidity);
                        $('#visibility').text(results.weather[0].main);
     
                        var sunriseDate = new Date(results.sys.sunrise);
                        $('#sunrise').text(sunriseDate.toLocaleTimeString());
     
                        var sunsetDate = new Date(results.sys.sunrise);
                        $('#sunset').text(sunsetDate.toLocaleTimeString());
                    }
     
                });
            }
        }).fail(function () {
            console.log("error getting location");
        });
    }
     
    // Error callback
     
    function onWeatherError(error) {
        console.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }

    */