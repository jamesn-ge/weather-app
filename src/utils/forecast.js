const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback)=>{

   const url = 'http://api.weatherstack.com/current?access_key=34b9390050c5eef6e9d4f6a52a6ce5c1&query=' + latitude +','+ longitude +'&units=f'

   request({url, json: true}, (error, { body })=>{

    if(error){
        callback(chalk.red("Unable to connect to weather services"), undefined)
    }else if(body.error){
        callback(chalk.red('Location not found, Try another location'), undefined)
    }else{
        callback(undefined, body.current.weather_descriptions)
    }
   })
}

module.exports = forecast