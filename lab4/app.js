const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const projectSchema = new Schema(
    {
        name: String,
        p_start: Date,
        p_end: Date,
        profit: Number,
    },
    { versionKey: false }
);
const Project = mongoose.model('Project', projectSchema);

app.use(express.static(__dirname + '/public'));

mongoose
    .connect(
        'mongodb://admin123:admin123@localhost:27017/Project?authSource=admin'
        // {
        // useUnifiedTopology: true,
        // useNewUrlParser: true,
        //useFindAndModify: false
        // useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
        //Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false.
        //Please remove these options from your code.
        // Згідно цьому, додатково прописувати їх не має сенсу, і сам mongoose не допустить цього
        // }
    )
    .then(() => {
        console.log('Connection to MongoDB established successfully.');
        app.listen(3000, () => {
            console.log('Сервер працює на порті 3000');
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.send(projects);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving projects.');
    }
});

app.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.send(project);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error finding project.');
    }
});

app.post('/api/projects', jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const project = new Project({
        name: req.body.name,
        p_start: new Date(req.body.p_start),
        p_end: new Date(req.body.p_end),
        profit: req.body.profit,
    });

    try {
        const savedProject = await project.save();
        res.send(savedProject);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error saving project.');
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        res.send(project);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting project.');
    }
});

app.put('/api/projects', jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.body.id,
            {
                name: req.body.name,
                p_start: new Date(req.body.p_start),
                p_end: new Date(req.body.p_end),
                profit: req.body.profit,
            },
            { new: true }
        );
        res.send(updatedProject);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating project.');
    }
});
