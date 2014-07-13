
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hello = require('./routes/hello');
var api = require('./routes/api');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/* try to connect to mongodb server */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/booklog');

/* get the connection */
var conn = mongoose.connection;

/* event handler */
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
  console.log('MongoDB: connected.');	
});


/* schema design and desctiption */
var userSchema = new mongoose.Schema({
    Name: { type: String, default: ''},
    Phone: String,
    Email: String,
    Address: String,
    Age: { type: Number, default: 0 },
    Interests: [{ type: String }],
    Updated: { type: Date, default: Date.now }
});

userSchema.index({ Address: 1 });

userSchema.statics.trunkEmail = function(email) {
  return "###" + email;
};

var postSchema = new mongoose.Schema({
    uid: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: String,
    content: String
});

/* integrate into Express framework */
app.db = {
	models: {
		User: mongoose.model('user', userSchema),
    Post: mongoose.model('post', postSchema),
	}
};

// REST APIs
app.get('/1/post', api.readAll);
app.post('/1/post', api.createOne);
app.get('/1/user', api.readAllUsers);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});





