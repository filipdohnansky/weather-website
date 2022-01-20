const request = require("request")


const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6637adbc5fb129482c8e8ae85cfa9e4a&query='+ latitude +',' + longtitude +'&units=m'
    request({url, json: true}, (error, { body }) => {
            if(error){
                callback('Unable to connect to location services!', undefined)
            }else if(body.error){
                callback('Your location is wrong!', undefined)
            }else{
                callback(undefined, {
                description: body.current.weather_descriptions[0],
                local: body.location.name,
                tem: body.current.temperature
                })
               // console.log(`${cur.weather_descriptions[0]}. In ${place.name} is now ${cur.temperature} degrees out. There is a ${cur.precip}% chance of rain.` )
            }
            
        })
}


module.exports = forecast
