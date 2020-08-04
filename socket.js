const WebSocket=require('ws');
module.exports=(server)=>{
    //새로운 웹소켓 서버를 생성한다.
    const wss=new WebSocket.Server({server});
    //클라이언트가 접속을 했을때, 처리하는 이벤트를 처리한다. 
    wss.on('connection',(ws,req)=>{
        //사용자의 ip를 파악한다. 
        const ip=req.headers['x-forwarded-for']||req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속',ip);

        //메시지를 받은 경우 메시지를 출력한다.
        ws.on('message',(message)=>{
            console.log(message);
        })
        //오류가 발생할 경우 오류를 출력한다.
        ws.on('error',(error)=>{
            console.log(error);
        })
        //접속이 종료되면 ws.interval을 0으로 만든다. 
        ws.on('close',()=>{
            console.log('클라이언트 접속 해제',ip);
            clearInterval(ws.interval);
        })


        const interval=setInterval(()=>{
            //3초마다 연결된 모든 클라이언트에게 메시지를 보낸다. 
            if(ws.readyState===ws.OPEN){
                ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
            }
        },3000);
        ws.interval=interval;
    });
};