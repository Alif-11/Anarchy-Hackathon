// ajax code for the chat box text field
$(document).ready(function () {
  $('#chat-form').on('submit', function (e) {
    // User's message
    var userMessage = $('#chat-text-input').val();

    // Display user's message in the message box
    $('#message-box').append("<div style='width:100%;display:flex;align-items:right;justify-content:right;'> <p style='background-color:steelblue; border: 2px solid steelblue;border-radius: 12px; padding: 5px;'>" + userMessage + "</p></div>");

    // Display "Bot is thinking" message
    $('#message-box').append("<div style='width:100%;text-align:left;color:gainsboro;'>Bot is thinking...</div>");

    // Make an AJAX request to the server with the user's input and OpenAI key
    $.ajax({
      data: {
        prompt: userMessage,
        openai_key: $('#openai-key').val()
      },
      type: "POST",
      url: "/llm-response"
    }).done(function (data) {
      // Remove "Bot is thinking" message
      $('#message-box').find('div:contains("Bot is thinking")').remove();

      // Display the bot's response in the message box
      $('#message-box').append("<div style='width:100%;display:flex;align-items:left;justify-content:left;'> <p style='background-color:gray; border: 2px solid gray;border-radius: 12px; padding: 5px;'>" + data["response"] + "</p></div>");
    });

    // Prevent the default form submission behavior
    e.preventDefault();
  });
});

