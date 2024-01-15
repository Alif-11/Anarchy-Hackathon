// ajax code for the chat box text field
$(document).ready(function () {
  $('#chat-form').on('submit', function (e) {
    $('#message-box').append("<div style='width:100%;text-align:right;'>" + $('#chat-text-input').val() + "</div>");
    $.ajax({
      data: {
        prompt: "prompt"
      },
      type: "POST",
      url: "/llm-response"
    }).done(function (data) {
      $('#message-box').append("<div style='width:100%;text-align:left;'>Idk</div>");
    });
    e.preventDefault();
  });
});

