const TelegramBot = require("node-telegram-bot-api");
const token = "1017572583:AAGP1-aps0B2kz1YRkNPLwHDhHQiMPDYBs4";
const bot = new TelegramBot(token, { polling: true });
const api = require("./api");

const freelancehuntToken = "7b9052f154825826c64733576e63b18746764e38";
let requestOptions = {
  method: "GET",
  hostname: "api.freelancehunt.com",
  path: "/v2/my/feed",
  headers: {
    Authorization: "Bearer " + freelancehuntToken
  }
};

// TODO: THIS COMMENT IS FOR DAVID!
// use this:

// (async () => {
//   console.log("RESP: ", await api.request(requestOptions));
// })();

// OR this to request Freelancehunt Freed:

api.request(requestOptions).then(resp => {
  console.log("resp :", resp);
});

var botOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Add/Change API key", callback_data: "1" }],
      [{ text: "Start receive job offers", callback_data: "2" }],
      [{ text: "Stop receive job offers", callback_data: "3" }],
      [{ text: "Donate to help our project", callback_data: "4" }]
    ]
  })
};

bot.onText(/\/start/, function(msg, match) {
  console.log(msg);

  bot.sendMessage(msg.chat.id, "Select any button:", botOptions);
});
bot.onText(/\/help/, function(msg, match) {
  console.log(msg);

  bot.sendMessage(msg.chat.id, "Select any button:", botOptions);
});
bot.on("document", msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "What are u doing? Plese stop it or I call the POLICE!!!"
  );
});
