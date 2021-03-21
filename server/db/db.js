const { Sequelize, DataTypes } = require('sequelize')

const db = new Sequelize('postgres://localhost/campuses', {logging: false})

const Campus = db.define('campus', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: 'default-campus.jpg'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.STRING(10000)
    }
})

const Student = db.define('student', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: 'default-student.jpg'
    },
    gpa: {
        type: DataTypes.DECIMAL,
        validate: {
            min: 0.0,
            max: 4.0
        }
    }
})

Student.belongsTo(Campus)
Campus.hasMany(Student)

module.exports = {
    db,
    models: {
        Campus,
        Student
    }
}