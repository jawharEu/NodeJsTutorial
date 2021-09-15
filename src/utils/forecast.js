const request = require('request')

const forecast = (latitude, longitude, callback) => {


    const url = 'http://api.weatherstack.com/current?access_key=e4d73c3e890182f79ba7fef912a6eb86&query=' + latitude + ',' + longitude + '&units='

    // request({ url, json: true }, (error, response) => {
    //     if (error) {
    //         callback('Unable to connect to weather services !'), undefined
    //     } else if (response.body.error) {
    //         callback('Unable to find location. Try another search.')
    //     } else {
    //         callback(undefined, response.body.current.weather_descriptions[0] +'. It is currently ' + response.body.current.temperature
    //             + ' degreess out. There is s ' + response.body.current.precip +'% chance of rain')
    //     }
    // })


    //    // with destructuring and Property Shorthand

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services !'), undefined
        } else if (body.error) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +
                ' degreess out. There is s ' + body.current.precip + '% chance of rain. The humidity is ' + body.current.humidity + "%.")
        }
    })

}

module.exports = forecast