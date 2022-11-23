const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const eventRouter = require('./routes/event.routes')
//const db = require("./db");

const token = '5727297877:AAHXOLPsFjTNl80Dmmqz7PONLVUQ6e2dXKQ';

const PORT = 8000;
const webAppuUrl = 'https://unrivaled-zabaione-164aa2.netlify.app/';
const webAppuUrl2 = 'https://unrivaled-zabaione-164aa2.netlify.app/form';

const app = express();
const bot = new TelegramBot(token, {polling: true});

app.use(express.json());
app.use(cors());

//app.use('/test', eventRouter)

bot.setMyCommands([
    {command: '/start', description: 'Начало работы бота'},
    {command: '/list', description: 'Мероприятия'},
    {command: '/info', description: 'Информация о проекте'},
    {command: '/create', description: 'Создание мероприятия'},
])

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start'){
        await bot.sendPhoto(chatId, 'Photo\\Nivent.jpg', );
        await bot.sendMessage(chatId, 'Бот находится в разработке, загляните позже');

    }

    if(text === '/info'){
        await bot.sendMessage(chatId, 'Информация о проекте (добавим потом)');
    }

    if(text === '/list'){
    //    const events = await db.query('SELECT * FROM event');
        await bot.sendMessage(chatId, 'Мероприятия можно посмотреть ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Мероприятия', web_app: {url: webAppuUrl}}]
                ]
            }
        })
    }

    if(text === '/create'){
        await bot.sendMessage(chatId, 'Введите информацию о мероприятии в форме ниже.', {
            reply_markup: {
                one_time_keyboard: true,
                resize_keyboard: true,
                keyboard: [
                    [{text: 'Форма для создания мероприятий', web_app: {url: webAppuUrl2}}],
                ]
            }
        })
    }

 /*   if(msg?.web_app_data?.data){
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data.rows);

            const newEvent = await db.query(
                'INSERT INTO event (name, info, date, time, address, subject) values ($1, $2, $3, $4, $5, $6) RETURNING *',
                [data.name, data.info, data.date, data.time, data.address, data.subject]
            )
            console.log(newEvent)


            await bot.sendMessage(chatId, 'Вы создали мероприятие!');
            await bot.sendMessage(chatId, 'Информация о созданном мероприятии: ');
            setTimeout(async () => {
                await bot.sendPhoto(chatId,'Photo\\Nivent.jpg');
                await bot.sendMessage(chatId, 'Название: ' + data.name);
                await bot.sendMessage(chatId, 'Информация: ' + data.info);
                await bot.sendMessage(chatId, 'Дата: ' + data.date);
                await bot.sendMessage(chatId, 'Время: ' + data.time);
                //await bot.sendMessage(chatId, 'Ссылка на онлайн мероприятие: ' + data.link);
                await bot.sendMessage(chatId, 'Адрес: ' + data.address);
                await bot.sendMessage(chatId, 'Тег: ' + data.subject);
            }, 1000)
        }
        catch (e){
            console.log(e);
        }
    } */
});

app.post('/web-data', async (req, res) => {
    const events = await db.query('SELECT * FROM event');
    const queryId = req.body;

    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Все доступные мероприятия',
            input_message_content: {entities: [events]}
        })
    } catch (e) {
        console.log(e)
    }

})


app.listen(PORT, () => console.log('Cервер работает, порт ' + PORT));