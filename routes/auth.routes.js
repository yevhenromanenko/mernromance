
const {Router} = require('express');
const router = Router();
const moment = require('moment');
const User = require('../models/User')
const Admin = require('../models/Admin')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwtToken = require('jsonwebtoken')
const Invite = require("../models/Invite");
const SentInvites = require("../models/SentInvites");
const Profit = require("../models/Profits");
const Letter = require("../models/Letter");
const UsersMassLetter = require("../models/UsersMassLetter");
const UsersSpamLetter = require("../models/UserSpamLetter");
const SentLetters = require("../models/SentLetters");
const ActualMassLetter = require("../models/ActualMassLetter");
const GlobalLetter = require("../models/GlobalLetter");
const SentGlobalLetters = require("../models/SentGlobalLetter");
const InvitePersonal = require("../models/InvitePersonal");
const Templates = require('../models/Templates')

router.post('/registration',
    [
        // check('email', 'Некорректный email').isEmail(),
        check('password', 'Некорректный пароль').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации!'
            })

        }

        const { id, name, email, password } = req.body;

        const isUsed = await User.findOne({ email: email })

        if (isUsed) {
            return res.status(300).json({message: 'Данный Email занят, попробуйте другой!'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            id: id,
            name: name,
            email: email,
            password: hashedPassword
        });

        await user.save()

        res.status(201).json({message: 'Пользователь создан!'})


    } catch (error) {
        console.log(error);
    }
})

router.post('/login',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Некорректный пароль').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации!'
                })

            }

            const { email, password } = req.body;

            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json('Такого пользователя не существует!')
            }
            const isMatch = bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json('Не правильный пароль!')
            }

            const jwtSecret = 'sjdnfkjnrf4398934knjsfdncksnd';
            const token = jwtToken.sign(
                {userId: user.id},
                jwtSecret,
                {expiresIn: '2h'}
                )
            res.json({token, userId: user.id, email: email, password: password});

        } catch (error) {
            console.log(error);
        }
    });

router.get('/user', async (req, res) => {
    try {

        const id = req.query.id;
        // Ищем переводчика по ID в базе данных
        const translator = await User.findOne({ id: id });

        // Если переводчик не найден, возвращаем соответствующий статус и сообщение об ошибке
        if (!translator) {
            return res.status(404).json({ error: 'Translator not found' });
        }

        // Возвращаем ответ клиенту с данными найденного переводчика
        // res.json({ id: translator.id, name: translator.name, email: translator.email, password: translator.password });
        res.send(translator);

    } catch (error) {
        // Если произошла ошибка, возвращаем соответствующий статус и сообщение об ошибке
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/user', async (req, res) => {
    try {
        const id = req.query.id;
        const deletedTranslator = await User.findOneAndDelete({ id: id });

        if (!deletedTranslator) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(deletedTranslator);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/partner',

    async (req, res) => {
        try {
            const errorsP = validationResult(req);

            if(!errorsP.isEmpty()){
                return res.status(400).json({
                    errors: errorsP.array(),
                    message: 'Некорректные данные при регистрации!'
                })
            }
            const { login, pass } = req.body;

            const admin = await Admin.findOne({login: login});
            if (!admin) {
                return res.status(400).json('Такого админа не существует!')
            }
            const isMatch = bcrypt.compare(pass, admin.pass);

            if(!isMatch) {
                return res.status(400).json('Не правильный пароль!')
            }

            const jwtSecretAdmin = 'sjdnfkjnrf439df8934knjsfdncksnd';
            const tokenAdmin = jwtToken.sign(
                {adminId: admin.id},
                jwtSecretAdmin,
                {expiresIn: '1h'}
            )
            res.json({tokenAdmin, adminId: admin.id, login: login, pass: pass});

        } catch (error) {
            console.log(error);
        }
    })

router.post('/registrationpartner',

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации!'
                })
            }

            const { login, pass } = req.body;

            const isUsed = await Admin.findOne({ login: login })

            if (isUsed) {
                return res.status(300).json({message: 'Данный Login занят, попробуйте другой!'})
            }

            const hashedPass = await bcrypt.hash(pass, 12)

            const admin = new Admin({
                login: login,
                pass: hashedPass
            });

            await admin.save()

            res.status(201).json({message: 'Админ создан!'})


        } catch (error) {
            console.log(error);
        }
    })

router.post('/invites', async (req, res) => {
    try {
        const { text, id, ladyId } = req.body;
        const newItem = new Invite({ text: text, id: id, ladyId: ladyId });
        await newItem.save();

        res.send(newItem);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Эндпоинт для удаления приглашения по id
router.delete('/invites', async (req, res) => {
    try {
        const { id, ladyId } = req.query;
        const deletedInvite = await Invite.findOneAndDelete({ id: id, ladyId: ladyId });

        if (!deletedInvite) {
            return res.status(404).json({ message: 'Invite not found' });
        }

        res.send('Invite deleted');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Эндпоинт для получения списка приглашений
router.get('/invites', async (req, res) => {
    try {
        const ladyId = req.query.ladyId;

        const invites = await Invite.find({ ladyId: ladyId });
        res.send(invites);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Эндпоинт для сохранения приглашения
router.post('/invitesPersonal', async (req, res) => {
    try {
        const { text, id, ladyId, smile } = req.body;
        const newItem = new InvitePersonal({ text: text, id: id, ladyId: ladyId, smile: smile });
        await newItem.save();
        res.send(newItem);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Эндпоинт для удаления приглашения по id
router.delete('/invitesPersonal', async (req, res) => {
    try {
        const { id, ladyId } = req.query;
        const deletedInvite = await InvitePersonal.findOneAndDelete({ id: id, ladyId: ladyId });

        if (!deletedInvite) {
            return res.status(404).json({ message: 'Invite not found' });
        }

        res.send('Invite deleted');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Эндпоинт для получения списка приглашений
router.get('/invitesPersonal', async (req, res) => {
    try {
        const ladyId = req.query.ladyId;
        const invites = await InvitePersonal.find({ ladyId: ladyId });
        res.send(invites);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/countinvites', async (req, res) => {

    try {
        const id = req.body.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const filter = { id, date: today };
        const update = { $inc: { count: 1 } };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const result = await SentInvites.findOneAndUpdate(filter, update, options);

        if (!result) {
            await SentInvites.create({ id: id });
        }

        res.json({ success: true, result });

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.get('/countinvites', async (req, res) => {
     const today = new Date();
     const monthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
     today.setHours(0, 0, 0, 0);

    try {
        const id = req.query.id;
        const filter = id ? { id } : { };

        const todayCount = await SentInvites.aggregate([
            { $match: { date: today, ...filter } },
            { $group: { _id: null, count: { $sum: "$count" } } }
        ]).exec();
        const monthCount = await SentInvites.aggregate([
            { $match: { date: { $gte: monthAgo, $lte: today }, ...filter } },
            { $group: { _id: null, count: { $sum: "$count" } } }
        ]).exec();

        res.json({
            success: true,
            today: todayCount.length ? todayCount[0].count : 0,
            month: monthCount.length ? monthCount[0].count : 0,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Произошла ошибка на сервере');
    }
});

router.post('/profits', async (req, res) => {
    try {
        const { id, today, month } = req.body;

        // Проверяем наличие объекта Profit в базе данных по id
        let profit = await Profit.findOne({id: id});

        if (!profit) {
            // Создаем новый объект Profit на основе полученных данных
            profit = await Profit.create({ id: id, today: today, month: month });

            // Отправляем клиенту ответ с данными нового объекта Profit
            res.status(201).json(profit);

        } else {
            // Обновляем объект Profit в базе данных
            profit = await Profit.findOneAndUpdate(
                {id: id},
                { today, month },
                { new: true }
            );
            // Отправляем клиенту ответ с обновленными данными объекта Profit
            return res.json(profit);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/profits', async (req, res) => {
    try {
        const id = req.query.id;
        const profit = await Profit.findOne({ id: id });

        if (!profit) {
            return res.status(404).json({ message: 'Profit not found' });
        }

        res.json(profit);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/letter', async (req, res) => {
    const { ladyId, subject, content, photoId } = req.body;

    try {
        // Поиск письма по ladyId
        let letter = await Letter.findOne({ ladyId: ladyId });

        // Если письмо не найдено, создаем новое
        if (!letter) {
            letter = new Letter({ ladyId: ladyId, subject: subject, content: content, photoId: photoId });
        } else {
            // Если письмо найдено, обновляем его содержимое
            letter.subject = subject;
            letter.content = content;
            letter.photoId = photoId;
        }

        // Сохраняем письмо в базе данных
        await letter.save();

        res.status(200).send({ message: "Письмо сохранено успешно" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Ошибка сервера при сохранении письма" });
    }
});

router.get('/letter', async (req, res) => {
    try {
        // Находим все письма в базе данных и отправляем их клиенту
        const ladyId = req.query.ladyId;
        const letters = await Letter.findOne({ladyId: ladyId});
        res.send(letters);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Обработчик для добавления пользователя
router.post('/usersMassLetter', async (req, res) => {

    const { id, name, ladyId } = req.body;

    try {
        const existingUser = await UsersMassLetter.findOne({ id: id });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь уже существует' });
        }

        const newUser = new UsersMassLetter({ id: id, name: name, ladyId: ladyId });
        await newUser.save();

        res.status(201).json({ message: 'Пользователь успешно добавлен' });
    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

// Обработчик для удаления пользователя
router.delete('/usersMassLetter', async (req, res) => {
    const id = req.query.id;

    try {
        const result = await UsersMassLetter.findOneAndDelete({ id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
        console.error('Произошла ошибка:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

router.get("/usersMassLetter", async (req, res) => {
    try {
        const ladyId = req.query.ladyId;
        const users = await UsersMassLetter.find({ ladyId: ladyId }).exec();
        //const users = await UsersMassLetter.find().exec();
        res.json(users);
    } catch (error) {
        console.error("Ошибка при получении пользователей из MongoDB:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});

// Получение списка айди пользователей, получивших запрос сегодня
router.get('/usersSpamLetter', async (req, res) => {
    const ladyId = req.query.ladyId;
    const threeDaysAgo = moment().startOf('day').subtract(2, 'days');

    try {
        const requests = await UsersSpamLetter.find({
            ladyId: ladyId,
            date: { $gte: threeDaysAgo }
        });

        const userIds = requests.map((request) => request.id);
        res.json(userIds);
    } catch (error) {
        console.error('Error fetching requests', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Добавление айди пользователя и даты запроса
router.post('/usersSpamLetter', async (req, res) => {
    const { id, ladyId } = req.body;

    try {
        // Проверка, существует ли уже запрос для данного пользователя сегодня
       // const today = moment().startOf('day');
        const threeDaysAgo = moment().startOf('day').subtract(2, 'days');
        const existingRequest = await UsersSpamLetter.findOne({
            id: id,
            ladyId: ladyId,
            date: { $gte: threeDaysAgo },
        });
        // const existingRequest = await UsersSpamLetter.findOne({
        //     id: id,
        //     date: { $gte: today },
        // });
        if (existingRequest) {
           // res.status(400).json({ error: 'Request already exists for today' });
            res.status(400).json({ error: 'Request already exists in the last 3 days' });
            return;
        }

        // Создание новой записи запроса
        const newRequest = new UsersSpamLetter({ id: id, ladyId: ladyId, date: new Date() });
        await newRequest.save();

        res.json({ message: 'Request added successfully' });
    } catch (error) {
        console.error('Error adding request', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/countletters', async (req, res) => {

    try {
        const id = req.body.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const filter = { id, date: today };
        const update = { $inc: { count: 1 } };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const result = await SentLetters.findOneAndUpdate(filter, update, options);

        if (!result) {
            await SentLetters.create({ id: id });
        }

        res.json({ success: true, result });

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.get('/countletters', async (req, res) => {
    const today = new Date();
    const monthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
    today.setHours(0, 0, 0, 0);

    try {
        const id = req.query.id;
        const filter = id ? { id } : { };

        const todayCount = await SentLetters.aggregate([
            { $match: { date: today, ...filter } },
            { $group: { _id: null, count: { $sum: "$count" } } }
        ]).exec();
        const monthCount = await SentLetters.aggregate([
            { $match: { date: { $gte: monthAgo, $lte: today }, ...filter } },
            { $group: { _id: null, count: { $sum: "$count" } } }
        ]).exec();

        res.json({
            success: true,
            today: todayCount.length ? todayCount[0].count : 0,
            month: monthCount.length ? monthCount[0].count : 0,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Произошла ошибка на сервере');
    }
});

router.post("/lastSentDate", async (req, res) => {
    try {
        const { id, date } = req.body;

        const newActual = await ActualMassLetter.findOne({ id: id })

        // Удаление предыдущей записи даты рассылки для данного пользователя
        if (!newActual) {
            await ActualMassLetter.create({ id: id, date: date });
        }

        await ActualMassLetter.deleteMany({ id: id });

        // Создание новой записи даты рассылки
        await ActualMassLetter.create({ id: id, date: date });

        res.status(200).json({ message: "Дата рассылки успешно обновлена." });
    } catch (error) {
        console.error("Произошла ошибка при записи даты рассылки:", error);
        res.status(500).json({ error: "Произошла ошибка при записи даты рассылки." });
    }
});

// Обработчик GET-запроса для получения даты рассылки
router.get("/lastSentDate", async (req, res) => {
    try {
        const { id } = req.query;

        const lastSentDate = await ActualMassLetter.findOne({ id: id }).sort({ date: -1 });

        if (lastSentDate) {
            res.status(200).json({ date: lastSentDate.date });
        } else {
            res.status(200).json({ date: null });
        }
    } catch (error) {
        console.error("Произошла ошибка при получении даты рассылки:", error);
        res.status(500).json({ error: "Произошла ошибка при получении даты рассылки." });
    }
});

router.post('/globalLetter', async (req, res) => {
    const { ladyId, subject, content, photoId } = req.body;

    try {
        // Поиск письма по ladyId
        let letter = await GlobalLetter.findOne({ ladyId: ladyId });

        // Если письмо не найдено, создаем новое
        if (!letter) {
            letter = new GlobalLetter({ ladyId: ladyId, subject: subject, content: content, photoId: photoId });
        } else {
            // Если письмо найдено, обновляем его содержимое
            letter.subject = subject;
            letter.content = content;
            letter.photoId = photoId;
        }

        // Сохраняем письмо в базе данных
        await letter.save();

        res.status(200).send({ message: "Письмо для глобальной рассылки сохранено успешно" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Ошибка сервера при сохранении письма" });
    }
});

router.get('/globalLetter', async (req, res) => {
    try {
        // Находим все письма в базе данных и отправляем их клиенту
        const ladyId = req.query.ladyId;
        const letters = await GlobalLetter.findOne({ladyId: ladyId});
        res.send(letters);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
});

router.post('/countGlobalLetters', async (req, res) => {

    try {
        const id = req.body.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const filter = { id, date: today };
        const update = { $inc: { count: 1 } };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const result = await SentGlobalLetters.findOneAndUpdate(filter, update, options);

        if (!result) {
            await SentGlobalLetters.create({ id: id });
        }

        res.json({ success: true, result });

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.get('/countGlobalLetters', async (req, res) => {
    const today = new Date();
    const monthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
    today.setHours(0, 0, 0, 0);

    try {
        const id = req.query.id;
        const filter = id ? { id } : { };

        const todayCount = await SentGlobalLetters.aggregate([
            { $match: { date: today, ...filter } },
            { $group: { _id: null, count: { $sum: "$count" } } }
        ]).exec();
        const monthCount = await SentGlobalLetters.aggregate([
            { $match: { date: { $gte: monthAgo, $lte: today }, ...filter } },
            { $group: { _id: null, count: { $sum: "$count" } } }
        ]).exec();

        res.json({
            success: true,
            today: todayCount.length ? todayCount[0].count : 0,
            month: monthCount.length ? monthCount[0].count : 0,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Произошла ошибка на сервере');
    }
});

router.post('/templatesLetter', async (req, res) => {
    const { ladyId, subject, content } = req.body;

    try {
        // Поиск письма по ladyId
        let letter = await Templates.findOne({ ladyId: ladyId });

        // Если письмо не найдено, создаем новое
        if (!letter) {
            letter = new Templates({ ladyId: ladyId, subject: subject, content: content });
        } else {
            // Если письмо найдено, обновляем его содержимое
            letter.subject = subject;
            letter.content = content;
        }

        // Сохраняем письмо в базе данных
        await letter.save();

        res.status(200).send({ message: "Шаблон сохранено успешно" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Ошибка сервера при сохранении шаблона" });
    }
});

router.get('/templatesLetter', async (req, res) => {
    try {
        // Находим все письма в базе данных и отправляем их клиенту
        const ladyId = req.query.ladyId;
        const letters = await Templates.findOne({ladyId: ladyId});
        res.send(letters);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

