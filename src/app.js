const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


// console.log(__dirname);//directory absolute path
// console.log(__filename);//file absolute path

// console.log(path.join(__dirname, '../public'));

const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath =path.join(__dirname , '../templates/views') 
const partialspath = path.join(__dirname ,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views' , viewsPath) //customise views directory path
hbs.registerPartials(partialspath)

//setup static directory to serve
//customise server to match the html file in public directory
app.use(express.static(publicDirPath))

app.get('', (req,res)=>{
    res.render('index',{
        title :'Weather application',
        name :'Jawhar kh'
    })
})



app.get('/about', (req,res)=>{
    res.render('about',{
        title :'This a dynamic body of about web page',

    })
})


app.get('/help', (req,res)=>{
    res.render('help',{
        title :'This a dynamic body of help web page',

    })
})

app.get('/weather' , (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'you must provide an address !'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({error})
            }
            res.send(
                {
                    forecast : data,
                    location,
                    address : req.query.address
                }
            );
        })

    })
    
})

app.get('/product' , (req,res)=>{

    if(!req.query.search){
        return res.send({
            error :'you must provide search term ! '
        })
    }
       
    res.send({
        products : []
    })

    
})


app.get('/help/*', (req,res)=>{
    res.render('404',{
        body :'Help article not found !'})
})

app.get('*', (req,res)=>{
    res.render('404',{
        body :'Soryy ! Not found !',

    })
})


// app.com === get contain first arg wich is the request url 
// app.get('', (req, res)=>{
//     res.send('<h1>hello express !</h1>')
// })

// app.get('/help' , (req,res)=>{
//     res.send([{
//         name : 'Jawhar',
//         age : 24
//     }])
// })

// app.get('/about' , (req, res)=>{
//     res.send('<h2>This is the first nodejs express application !</h2>')
// })


app.listen(3000, ()=>{
    console.log('Server is up on port 3000 !');
})