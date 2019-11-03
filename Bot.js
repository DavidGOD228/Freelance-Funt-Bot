const TelegramBot = require('node-telegram-bot-api');
const token = '1028161792:AAGUEFr2m8uGSX_2_rAZZLr5V-N4z42h7Gg';
const bot = new TelegramBot(token, { polling: true });
const api = require('./api');

var isReceived = false;
var freelancehuntToken = 'undefined';
const updateRate = 300000;

async function GetFeed(Token) {
  let requestOptions = {
    method: 'GET',
    hostname: 'api.freelancehunt.com',
    path: '/v2/my/feed',
    headers: {
      Authorization: 'Bearer ' + Token
    }
  };

  var response = await api.request(requestOptions);
  return response;
}

var options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Add/Change API key', callback_data: '1' }],
      [{ text: 'Start receive job offers', callback_data: '2' }],
      [{ text: 'Stop receive job offers', callback_data: '3' }],
      [{ text: 'Donate to help our project', callback_data: '4' }],
      [{ text: 'Show my API key', callback_data: '5' }]
    ]
  })
};

bot.on('callback_query', function(msg) {
  var answer = msg.data;
  if (answer == '1') {
    bot.sendMessage(msg.from.id, 'Write your API key: ');
    bot.onText(/[a-z0-9_-]{40}/, function(msg, match) {
      freelancehuntToken = msg.text;
    });
  } else if (answer == '2') {
    isReceived = true;
    bot.sendMessage(msg.from.id, 'Receiving job offers was started!\n\n');

    setInterval(async () => {
      if (isReceived) {
        var Feed = await GetFeed(freelancehuntToken);
        let userData = await api.getDBuserData(freelancehuntToken);
        let newIdxs = [];

        for (let i = 0; i < 5; i++) {
          var orderLink = Feed[i].attributes.message.match(
            /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/
          )[0];

          const alreadyExists =
            userData.shownMessagesIds.findIndex(el => el === Feed[i].id) !== -1;
          if (!alreadyExists) {
            bot.sendMessage(msg.from.id, orderLink);
            newIdxs.push(Feed[i].id);
          }
        }
        api.db
          .collection('users')
          .doc(freelancehuntToken)
          .update({
            shownMessagesIds: [...userData.shownMessagesIds, ...newIdxs]
          });
      }
    }, updateRate);
  } else if (answer == '3') {
    bot.sendMessage(msg.from.id, 'Receiving job offers was stopped!');
    isReceived = false;
  } else if (answer == '4') {
    bot.sendMessage(msg.from.id, 'Its my card: 5375414112341044');
  } else if (answer == '5') {
    bot.sendMessage(msg.from.id, freelancehuntToken);
  }
});

bot.onText(/\/start/, function(msg, match) {
  bot.sendMessage(msg.chat.id, 'Select any button:', options);
});
bot.onText(/\/help/, function(msg, match) {
  bot.sendMessage(msg.chat.id, 'Select any button:', options);
});
bot.on('document', msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    'What are u doing? Plese stop it or I call the POLICE!!!'
  );
});
bot.on('audio', msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    'What are u doing? Plese stop it or I call the POLICE!!!'
  );
});
bot.on('photo', msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    'What are u doing? Plese stop it or I call the POLICE!!!'
  );
});
