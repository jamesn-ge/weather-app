const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//setting up the port, both remotely and locally
const port = process.env.PORT || 3030

//setup express configurations
const app = express()
const pathdirectory = path.join(__dirname, '../public')
const viewspathdirectory = path.join(__dirname, '../templates/views')
const partialspathdirectory = path.join(__dirname, '../templates/partials')

//set handlebars views path location
app.set('view engine', 'hbs')
app.set('views', viewspathdirectory)
hbs.registerPartials(partialspathdirectory)

//set html path
app.use(express.static(pathdirectory))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Frank Mwangi'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Frank Mwangi'
    
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title:'Help Text',
        helpText: 'Ask for help',
        name: 'Frank Mwangi'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Ensure you put an address'
     })  
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/address', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Ensure you enter address'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 error',
        name: 'Frank Mwangi',
        errorMessage: 'Help page not found'
    })
})

app.get('/about/*', (req, res)=>{
    res.render('404', {
        title: '404 error',
        name: 'Frank Mwangi',
        errorMessage: 'About page not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 error',
        name: 'Frank Mwangi',
        errorMessage: 'page not found'
    })
})

app.listen(port , ()=>{
    console.log("Server is on port ", port)
})