// Make connection
var socket = io.connect('http://localhost:3000');

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {message: message.value,handle: handle.value});
    message.value = "";
});

message.addEventListener('keypress', function(event){
    if (event.keyCode == 13)
        {
            socket.emit('chat', {message: message.value,handle: handle.value});
            message.value = "";
        }
})

message.addEventListener('keypress', function(){
    let text = message.value;
    if(message.value !== '') {
        socket.emit('typing', handle.value);
    }
})


// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    if(data.handle===handle.value)
        {
            output.innerHTML += '<p style="background: #86ff86; margin-left: 50%; margin-top: 10px; padding: 2%; box-sizing: border-box"><strong>You: </strong>' + data.message + '</p>';
        }
    else
        {
            output.innerHTML += '<p style="background: #6fe9ff; margin-right: 50%; margin-top: 10px; padding: 2%; box-sizing: border-box"><strong>' + data.handle + ': </strong>' + data.message + '</p>';
        }
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message ...</em></p>';
});