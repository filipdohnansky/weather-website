const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Filip Dohnansky',
        footer: 'Ja som footer'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Filip Dohnansky',
        footer: 'Ja som footer'
    })
})
app.get('/help/*', (req, res) => {
    res.render('help-404-page',{
        title: 'Help 404'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

geocode(req.query.address, (error, {latitude, longtitude, place} = {}) => {
                if(error){
                    return res.send({ error })
                }
                forecast(latitude,longtitude, (error, forecastData) => {
                    if (error) {
                        return res.send({ error })
                    }
                    res.send({
                        forecastData,
                        place,
                        address: req.query.address
                    })   
                })
    })

})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Filip Dohnansky',
        footer: 'Ja som footer'
    })
})
app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404 Page',
        footer: 'Ja som footer'
    })
})


app.listen(port, () => {
    console.log('server is up on port ' + port );
})