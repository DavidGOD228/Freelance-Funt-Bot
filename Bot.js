const TelegramBot = require('node-telegram-bot-api');

const token = '1017572583:AAGP1-aps0B2kz1YRkNPLwHDhHQiMPDYBs4';

const bot = new TelegramBot(token, { polling: true });

var options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Add/Change API key', callback_data: '1' }],
      [{ text: 'Start receive job offers', callback_data: '2' }],
      [{ text: 'Stop receive job offers', callback_data: '3' }],
      [{ text: 'Donate to help our project', callback_data: '4' }]
    ]
  })
};

bot.onText(/\/start/, function(msg, match) {
  console.log(msg);

  bot.sendMessage(msg.chat.id, 'Select any button:', options);
});
bot.onText(/\/help/, function(msg, match) {
  console.log(msg);

  bot.sendMessage(msg.chat.id, 'Select any button:', options);
});
bot.on('document', msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    'What are u doing? Plese stop it or I call the POLICE!!!'
  );
});
