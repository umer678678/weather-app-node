const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utlis/geocode.js')
const forecast = require('./utlis/forecast.js')
const { getHeapCodeStatistics } = require('v8')
const app = express()

//define path or express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// set handle bars engine and view location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)
//setup static directroy to serve
app.use(express.static(publicDir))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name :'moazam'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name :'moazam'
    })
})
app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        helpingText: 'this is some helping txt',
        name:'moazam'
    })
})
app.get('/weather', (req , res) => {
    if (!req.query.address) {
       return res.send({
           error:'address is required'
       }) 

    }
    geocode(req.query.address ,(error , {latitude , longitude , location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    
})

app.get('/products' , (req , res) => {
    if(!req.query.search){
        return res.send({
            error:'search field is required     '
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*' , (req , res) => {
    res.render('404', {
        title:'404',
        name:'moazam',
        errorMessage:'help article not found'
    })
})
app.get('*' , (req , res) => {
    res.render('404',{
        title: '404',
        name: 'moazam',
        errorMessage: '404 Page not found'
    })
})
app.listen(3000, () =>{
    console.log('server is display on port 3000')
})