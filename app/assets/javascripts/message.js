$(function () {
  function buildHTML(message) {
    if (message.image) {
      var html =
        `<div class = "messages-box">
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
          <img src=${message.image}>
        </div>`
      return html;
    } else {
      var html = 
        `<div class = "messages-box">
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
        </div>`
      return html;
    }
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
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit').prop('disabled', false);
    });
  });
})
