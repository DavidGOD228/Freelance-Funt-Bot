import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const TelegramBot = require('node-telegram-bot-api');
const token = '1017572583:AAGP1-aps0B2kz1YRkNPLwHDhHQiMPDYBs4';
const bot = new TelegramBot(token, { polling: true });
const api = require('./api');
//
//
/////// NE ROBEEEEE. Я згадав чого я юзав MySQL, замість цього)
//
//
var app = firebase.initializeApp({
  apiKey: 'AIzaSyCy0s47WkBnaqXw-DjJsXF9Hne2AvLDsQY',
  authDomain: 'freelancehunt-bot-d1d8e.firebaseapp.com',
  databaseURL: 'https://freelancehunt-bot-d1d8e.firebaseio.com',
  projectId: 'freelancehunt-bot-d1d8e',
  storageBucket: 'freelancehunt-bot-d1d8e.appspot.com',
  messagingSenderId: '326194914754',
  appId: '1:326194914754:web:ad4f73c2ea7d5db900a25b',
  measurementId: 'G-M3BWL8C9JJ'
});
var isReceive = false;
var freelancehuntToken = 'undefined';

async function GetFeed(Token) {
  let requestOptions = {
    method: 'GET',
    hostname: 'api.freelancehunt.com',
    path: '/v2/my/feed',
    headers: {
      Authorization: 'Bearer ' + Token
    }
  };

  var Response = await api.request(requestOptions);
  return Response;
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
    isReceive = true;
    bot.sendMessage(msg.from.id, 'Receiving job offers was started!\n\n');
    (async () => {
      setInterval(async function() {
        var Feed = await GetFeed(freelancehuntToken);
        // here u should add database checking
        for (let i = 0; i < 4; i++) {
          var feedBlocks = Feed[i].attributes.message.match(
            /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/
          );
          bot.sendMessage(
            msg.from.id,
            feedBlocks[1] +
              feedBlocks[2] +
              '.' +
              feedBlocks[3] +
              feedBlocks[4] +
              '\n'
          );
        }
      }, 3000); //300000
    })();
  } else if (answer == '3') {
    bot.sendMessage(msg.from.id, 'Receiving job offers was stopped!');
    isReceive = false;
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
