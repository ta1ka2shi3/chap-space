$(function () {
  var buildHTML = function (message) {
      var image = message.image ? `<img src=${message.image}>` : '';
      var html =`<div class = "messages-box" data-message-id= ${message.id} >  
          <div class="messages-info"> 
            <p class ="info_current">
              ${message.user_name}
            </p>
            <p class = "content">
              ${message.created_at}
            </p>
          </div>
          <div class= "messages-texts">
            <p class = "text">
            ${message.content}
            </p>
          </div>
          ${image}
        </div>`
    return html;
  };
  $("#new_message").on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (message) {
        var html = buildHTML(message);
        $('.messages').append(html);
        $('form')[0].reset();
        $('.main-messages__post').animate({ scrollTop: $('.main-messages__post')[0].scrollHeight });
        $('.submit').prop('disabled', false);
      })
      .fail(function () {
        alert("メッセージ送信に失敗しました");
        $('.submit').prop('disabled', false);
      });
  });
  var reloadMessages = function () {
    var last_message_id = $('.messages-box:last').data("message-id");
    // ブラウザに表示されている最新のメッセージIDを取得
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id },
    })
    .done(function (messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function (i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function () {
      alert('error');
    });
  };
  if(document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});
