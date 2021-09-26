const request = require('request')
const chalk = require('chalk')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoibndhczk1IiwiYSI6ImNrcDJ3YWl6bDFxa3gyeG1jYjlqeG01NjEifQ.D1Oll9Qq8KbzDy8bQX2p7Q&limit=1'

    request({url, json: true}, (error, { body })=>{
        if(error){
            callback(chalk.red('Unable to access location services'), undefined)
        }else if(body.features.length === 0){
            callback(chalk.red('Location not found, try another search'),undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode