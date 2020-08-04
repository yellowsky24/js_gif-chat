const SocketIO=require('socket.io');
//매개변수가 server이고 app.js에서 express웹 서버가 actual parameter이다. 
module.exports=(server)=>{
    //이 부분은 socket.io패키지를 불러와서 익스프레스 서버와 연결한다. 
    const io=SocketIO(server,{path:'/socket.io'});

    //연결 후에는 이벤트 리스너를 붙여준다. connection이벤트는 클라이언트가 접속했을 때 발생하고 콜백으로 소켓 객체를 제공한다. 
    io.on('connection',(socket)=>{
        //socket.request로 요청 객체에 접근할 수 있다. socket.request.res로는 응답 객체에 접근할 수 있다. 
        const req=socket.request;
        //사용자의 ip를 파악한다. 
        const ip=req.headers['x-forwarded-for']||req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속',ip,socket.id);
        
        //socket에도 이벤트 리스너를 붙인다. 
        socket.on('disconnect',()=>{
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        })
        
        socket.on('error',(error)=>{
            console.error(error);
        })

        socket.on('reply',(data)=>{
            console.log(data);
        })
        socket.interval=setInterval(()=>{
           socket.emit('news','Hello Socket.IO');
        },3000);
    });
};