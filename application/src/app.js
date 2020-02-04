/**
 * Main file for backend tht manages dependencies, middlware routing, and server functionatlities.
 *
 * All the main dependencies used in the project are imported in this file and declared as application functions. 
 * Middleware routes and services are managed by this file.
 * Manages sessions for login authentication
 *
 * @author Alexander Beers.
 */

const express = require('express'), app = express()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const routes = require('./routes/index')
const loginAuth = require('./routes/loginAuthentication')
const search = require('./routes/searchFunction')
const aboutRoutes = require('./routes/aboutPgRoutes')
const postFormRoutes = require('./routes/postFormRoutes')
const contactMessageRoutes = require('./routes/contactMessageRoutes')
const user = require('./routes/user.js')
const flash = require('connect-flash')

//configures ejs as templating language
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

//configure express-session for login authentication needs
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash({unsafe: true}))

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//add middleware layers required for application (static file serving, etc)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes)
app.use('/', loginAuth)
app.use('/', search)
app.use('/', aboutRoutes)
app.use('/', postFormRoutes)
app.use('/', contactMessageRoutes)
app.use('/',user)


const PORT = 3000

app.listen(PORT, () => console.log('Server running on port ' + PORT))
