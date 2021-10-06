// required libraries
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

// Initializations
const app = express();

// Settings 
app.set('port', process.env.PORT || 4000);
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// setting view engine
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname,'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.use(require('./routes'));

app.get('/home', (req, res) => {
   res.render('home');
});

app.get('/home/:estado/:mensaje', (req, res) => {
    const { estado, mensaje } =  req.params;
    if(estado == 'success')
    {
        let success = { mensaje };
        res.render('home', {success});
    }
    else if(estado == 'error')
    {
        let error = { mensaje };
        res.render('home', {error});
    }
});

// Starting the server
app.listen(app.get('port'), () => {
 console.log('App running on port: '+app.get('port'));
});

// if the route doesn't exist it's gonna be redirect to 404 page
app.use((req, res)=>{
    res.status(404).send('<h1>Page not found</h1>');
});