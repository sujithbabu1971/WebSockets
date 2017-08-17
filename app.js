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
			 // Java script allows you to add your own property. Then the JSON becomes {existingField_1:existingField_1_Value, newField:valueForIt}
			 socket.name=userName;
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
		 var userNames = Object.keys(users);
		 	// We need to emit this back in browser. Browsers will handle them by using on 'updatenames'
		 io.sockets.emit('updatenames', userNames);
			
	 }
	 
	 function updateNicknamesInSocket(socket){
		 var userNames = Object.keys(users);
		 	// We need to emit this back in browser. Browsers will handle them by using on 'updatenames'
		 socket.emit('updatenames', userNames);
			
	 }
	 
	 socket.on('disconnect',function(data){
		 if(!socket.name)
		 {
			 return;
		 }
		// You can delete a property from Objects
		 delete users[socket.name];
		 updateNicknames();
		 
	 });
	 
	 
});


