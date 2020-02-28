$(function () {
  $(".#new_message").on('submit', function (e) {
    console.log('this');
    e.preventDefault()
    // console.logを用いてイベント発火しているか確認
  });
});