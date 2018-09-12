'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('projectstud', 'root', '')

let Student = sequelize.define('student',{
    
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    faculty: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    group: {
        type: Sequelize.STRING,
        allowNull:false
        
    },
    
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

let Project= sequelize.define('project',{
    
     disciplina : {
        allowNull : false,
        type: Sequelize.STRING
    },
    
    programe_folosite : {
        type: Sequelize.STRING,
        allowNull : false,
        validate: {
            len: [5, 100]
        }
    },
    
    tehnologii_folosite : {
        type: Sequelize.STRING,
        allowNull : false,
        validate: {
            len: [5, 100]
        }
    }
})

Student.hasMany(Project, {
    foreignKey: 'studentId'
})
Project.belongsTo(Student, {
    foreignKey: 'studentId'
})

let app = express()
app.use(bodyParser.json())
app.use(express.static('app'))


app.get('/create', (req, res) => {
    sequelize
        .sync({
            force: true
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(400).send('error')
        })
})

app.get('/students', (req, res) => {
    Student
        .findAll({
            attributes: ['id', 'name','faculty','group', 'email']
        })
        .then((students) => {
            res.status(200).send(students)
        })
        .catch((error) => {
            console.warn(error)
            res.status(400).send('error')
        })
})

app.get('/students/:id', (req, res) => {
    Student
        .find({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'name','faculty','group', 'email']
        })
        .then((student) => {
            res.status(200).send(student)
        })
        .catch((error) => {
            console.warn(error)
            res.status(400).send('error')
        })
})

app.post('/students', (req, res) => {
    Student
        .create(req.body)
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(400).send('error')
        })
})

app.put('/students/:id', (req, res) => {
    Student
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((student) => {
            return student.updateAttributes(req.body)
        })
        .then(() => {
            res.status(201).send('modified')
        })
        .catch((error) => {
            console.warn(error)
            res.status(400).send('error')
        })
})

app.delete('/students/:id', (req, res) => {
    Student
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((student) => {
            return student.destroy()
        })
        .then(() => {
            res.status(201).send('removed')
        })
        .catch((error) => {
            console.warn(error)
            res.status(400).send('error')
        })
})

app.get('/students/:id/projects', (req, res) => {
    Student
        .find({
            where: {
                id: req.params.id
            },
            include: [Project]
        })
        .then((student) => {
            return student.getProjects()
        })
        .then((projects) => {
            res.status(200).send(projects)
        })
        .catch((error) => {
            console.warn(error)
            res.status(400).send('error')
        })
})

app.get('/students/:id/projects/:mId', (req, res) => {
    Project
        .find({
            where: {
                id: req.params.mId
            },
            attributes: ['id', 'disciplina', 'programe_folosite','tehnologii_folosite']
        })
        .then((project) => {
            res.status(200).send(project)
        })
        .catch((error) => {
            console.warn(error)
            res.status(400).send('error')
        })
})

app.post('/students/:id/projects', (req, res) => {
    Student
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((student) => {
            return Project.create({
                disciplina: req.body.disciplina,
                programe_folosite: req.body.programe_folosite,
                tehnologii_folosite: req.body.tehnologii_folosite,
                studentId: student.id
            })
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(400).send('error')
        })
})

app.put('/students/:id/projects/:mId', (req, res) => {
    Project
        .find({
            where: {
                id: req.params.mId
            }
        })
        .then((project) => {
            project.disciplina = req.body.disciplina
            project.programe_folosite = req.body.programe_folosite
            project.tehnologii_folosite = req.body.tehnologii_folosite
            return project.save()
        })
        .then(() => {
            res.status(201).send('modified')
        })
        .catch((error) => {
            console.warn(error)
            res.status(400).send('error')
        })
})

app.delete('/students/:id/projects/:mId', (req, res) => {
    Project
        .find({
            where: {
                id: req.params.mId
            }
        })
        .then((project) => {
            return project.destroy()
        })
        .then(() => {
            res.status(201).send('removed')
        })
        .catch((error) => {
            console.warn(error)
            res.status(400).send('error')
        })
})

app.listen(8080)
