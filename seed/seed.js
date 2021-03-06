const { db, models: { Campus, Student}} = require('../server/db/db')
// const {campuses, students} = require('./seedData')
const campuses = require('./campusesData.json')
const students = require('./studentsData.json')

const seedDatabase = async() => {
    try {
        await db.sync({ force: true })
        
        await Promise.all(campuses.map( campus => Campus.create(campus)));
        await Promise.all(students.map(student => Student.create(student)));

        console.log('Seeding was successful!')

    }
    catch(error){
        console.log('SEED DATABASE ERROR: ', error)
    }
    finally {
        db.close();
    }
}
seedDatabase()