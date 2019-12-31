var express=require('express');
var socket=require('socket.io');
var routes=require('./routes/webchatController');

//App setup
var app=express();

app.set('view engine','ejs');
app.use(routes);
app.use(express.static('public'));

var PORT = process.env.PORT || 3000;
var server=app.listen(PORT,function(){
    console.log('Now listening to port 3000.');
})



//Socket setup
var io=socket(server);

io.on('connection',function(socket){
    console.log('A user connected to socket: '+socket.id);
    
    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    })  
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    })
})