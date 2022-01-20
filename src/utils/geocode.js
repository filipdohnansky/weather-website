const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZmlsbGtvbyIsImEiOiJja3llcnVod2MxYnZ4Mm5uMDJ1ZjhveTBkIn0.3NrsjCY-5TRB9sij28_KYQ&limit=1'
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. try another search.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

// const place = () => {

// }

module.exports = geocode
