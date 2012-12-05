var orp = new OpenRitsPen("test");
$(function(){
  var socket = io.connect("http://orp.aki017.info:3000");

  // WebSocketでの接続
  socket.on('connect', function(msg) {
    console.log("connet");
    $('#id').html('あなたの接続ID::' + socket.socket.transport.sessid);
    $('#type').html('接続方式::' + socket.socket.transport.name);
  });

  // メッセージを受けたとき
  socket.on('message', function(msg) {
    // メッセージを画面に表示する
    $('#recv').prepend(msg.value + '<br>');
    var s = msg.value.split("\n");
    for(var i = 0;i< s.length;i++)orp.command(s[i]);

    var canvas=document.getElementById('canvas');
    if(!canvas.getContext){
      return false;
    }
    cs = canvas.getContext("2d");
    orp.draw(cs);
  })
});

// メッセージを送る
function send() {
  var msg = $('#message').val();
  // メッセージを送信する
  socket.emit('message', { value: msg });
  $('#message').val('');
}

// 切断する
function DisConnect() {
  var msg = socket.socket.transport.sessid + "は切断しました。";
  // メッセージを送信する
  socket.emit('message', { value: msg });
  // socketを切断する
  socket.disconnect();
}


