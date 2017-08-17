var express=require('express');
var app=express();
var     server=require('http').createServer(app);
var     io=require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');

app.get('/',function(req,res){
     res.render('index');
});

var port = process.env.PORT || 4000;
server.listen(port);
// {} means a java script object (Remember JSON object
var users={};

io.sockets.on('connection',function(socket){
	 
	 socket.on('new user', function (userName, callback){
		 if(userName in users)
		 {
			console.log("user name "+userName+" already used.")
		 	callback(false);
		 }
		 else
		 {
			 console.log("user name "+userName+" being used.")
			 callback(true);
			 // Java script allows you to add your own property to a pre-defined class.
			 // Then the JSON becomes {existingField_1:existingField_1_Value, newField:valueForIt}
			 // Refer the javascript MDN API at https://developer.mozilla.org/en-US/docs/Web/JavaScript and refer to Object.
			 socket.name=userName;
			 // Basically we keep an array of socket objects.
	         users[socket.name]=socket;
	         updateNicknames();
		 }
		 
	 });
	 socket.on('getUsers', function (unusedData, callback){
		 updateNicknamesInSocket(socket);
		 
	 });
	 socket.on('showCurrentUser', function (unusedData, callback){
		 socket.emit('updateCurrentUser', socket.name);
		 
	 });
	 function updateNicknames(){
		// For details on Object.keys, refer the javascript MDN API. Refer to Object at https://developer.mozilla.org/en-US/docs/Web/JavaScript
		 // More specifically, refer to the link 
		 // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
		 var userNames = Object.keys(users);
		 	// We need to emit this back in browser. Browsers will handle them by using on 'updatenames'
		 io.sockets.emit('updatenames', userNames);
			
	 }
	 
	 function updateNicknamesInSocket(socket){
		 var userNames = Object.keys(users);
		 	// We need to emit this back in browser. Browsers will handle them by using on 'updatenames'
		 socket.emit('updatenames', userNames);
			
	 }
	 
	 // Note that on refresh and browser close, the disconnect is called and thus the 
	 //	the current user socket if available is removed.
	 socket.on('disconnect',function(data)
	 {
		 if(!socket.name)
		 {
			 return;
		 }
		// You can delete a property from Objects. Google the delete keyword im java
		 delete users[socket.name];
		 updateNicknames();
		 
	 });
	 
	 
});


