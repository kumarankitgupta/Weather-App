var main = document.getElementById("main");
var cname = document.getElementById("cname");
var submit = document.getElementById("submit");
var cityName ;
submit.addEventListener('click',()=>{
    var cn = cname.value;
    cityName = cn;
    if(cn.trim().length == 0){
        alert("Empty value Not accepted")
    }else{
        getCity(cn);
    }
})
const key = 'mgMBXf41O1KuG1WObHi8LGir5JbeQXBE';
var getkey;
function getCity(city){
    const url = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`
    var x = new XMLHttpRequest();
    x.open('GET',url+query);
    x.send();
    x.addEventListener('load',()=>{
        var l = JSON.parse(x.responseText);
        if(l.length != 0){
        getkey = l[0].Key;
        console.log(getkey)
        getTemprature(getkey);
    }else{
        console.log("error");
        alert(cityName + "❌ Do Not exist")
    }
    })
}
function getTemprature(k){
    const url = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${k}?apikey=${key}`
    var x = new XMLHttpRequest();
    x.open('GET',url+query);
    x.send();
    x.addEventListener('load',()=>{
        var l = JSON.parse(x.responseText);
        console.log(l)
        console.log(l[0].WeatherText)
        var wt = l[0].WeatherText;
        var wi = l[0].WeatherIcon;
        console.log(wi);
        var temp = l[0].Temperature.Metric.Value;
        console.log(temp)
        CreateUI(wi,wt,temp);
    })
}
function CreateUI(icon,des,temp){
    var di = document.createElement("div");
    di.setAttribute("class","col-3 mycols text-center");
    var img = document.createElement("img");
    img.setAttribute("class","colimage");
    img.setAttribute("src","https://developer.accuweather.com/sites/default/files/"+String(icon).padStart(2, '0')+"-s.png");
    var h1 = document.createElement("h2");
    h1.innerHTML = cityName.substring(0,1).toUpperCase()+cityName.substring(1);
    var h2 = document.createElement("h2");
    h2.innerHTML = temp + "&deg" +"C";
    var h5 = document.createElement("h5");
    h5.innerHTML = des;
    di.appendChild(img);
    di.appendChild(h1);
    di.appendChild(h2);
    di.appendChild(h5);
    main.appendChild(di);
    cname.value ="";
}
