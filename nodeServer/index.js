//Node server which will handle socket io connection
// const io=require('socket.io')(8000)
// .

// const server=app.listen(8000,()=>{
//     console.log('server running on port 8000');
// })
// const io =require('socket.io')(8000);
const io = require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500",  // Your client URL
        methods: ["GET", "POST"]
    }
});

const user={};


 // If any new user joins ,let other user connected to server know
io.on('connection',socket =>{
    socket.on('new-user-joined',name=>{
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    //if someone sends a message ,broacast it to other people 
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name:user[socket.id]})
    });
    //if someone leave the chat
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    });
})