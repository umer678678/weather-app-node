const request = require('request')

const geocode = (address,callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidW1lcmtoYW43ODYiLCJhIjoiY2tlNXVtN2twMHVjNzJ5cGVkbG85YWpkOCJ9.uw8BZJaIpc55YqmvKzlIuA&limit=1'
    request({ url, json: true}, (error,{body}) => {
        if(error){
            console.log('unable to connect to geo location',undefined)
        } else if(body.features.length === 0) {
            console.log('unable to find the location try an other location',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        } 
    })
} 

module.exports = geocode
