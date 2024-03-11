const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient(
    'mongodb://admin123:admin123@localhost:27017/Project?authSource=admin',
    {
        useUnifiedTopology: true,
    }
);

let dbClient;

app.use(express.static(__dirname + '/public'));

mongoClient.connect(function (err, client) {
    if (err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db('Project').collection('Project');
    app.listen(3000, function () {
        console.log('Сервер працює на порті 3000');
    });
});

app.get('/api/projects', function (req, res) {
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function (err, users) {
        if (err) return console.log(err);
        res.send(users);
    });
});
app.get('/api/projects/:id', function (req, res) {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({ _id: id }, function (err, user) {
        if (err) return console.log(err);
        res.send(user);
    });
});

app.post('/api/projects', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    const projectName = req.body.name;
    const projectStart = new Date(req.body.p_start);
    const projectEnd = new Date(req.body.p_end);
    const projectProfit = req.body.profit;

    const project = {
        name: projectName,
        p_start: projectStart,
        p_end: projectEnd,
        profit: projectProfit,
    };

    const collection = req.app.locals.collection;
    collection.insertOne(project, function (err, result) {
        if (err) return console.log(err);
        res.send(project);
    });
});

app.delete('/api/projects/:id', function (req, res) {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({ _id: id }, function (err, result) {
        if (err) return console.log(err);
        let project = result.value;
        res.send(project);
    });
});

app.put('/api/projects', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const projectName = req.body.name;
    const projectStart = new Date(req.body.p_start);
    const projectEnd = new Date(req.body.p_end);
    const projectProfit = req.body.profit;

    const collection = req.app.locals.collection;
    collection.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                name: projectName,
                p_start: projectStart,
                p_end: projectEnd,
                profit: projectProfit,
            },
        },
        { returnOriginal: false },
        function (err, result) {
            if (err) return console.log(err);
            const project = result.value;
            res.send(project);
        }
    );
});

process.on('SIGINT', () => {
    dbClient.close();
    process.exit();
});
