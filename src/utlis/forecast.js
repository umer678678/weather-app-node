const request = require('request')
const forecast = (latitude,longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=628f73118dde83d07d44b59de3146ca5&query= ' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) 
    request({ url , json :true} , (error,{body}) => {
        if(error){
            console.log('unable to connect to weather stack',undefined)
        }else if(body.error){
            console.log('unable to find the location',undefined)
        }else{
            callback(undefined,'current temperature is ' + body.current.temperature + ' degree and it feel like ' + body.current.feelslike + ' and weather description is ' + body.current.weather_descriptions[0] + ' and  there is '+ body.current.precip +  ' % chance of rain'
            )
           // console.log('It is currently ' + response.body.current.temperature + ' degree out. There is '+ response.body.current.precip +  ' % chance of rain')
        }
    })
}

module.exports = forecast