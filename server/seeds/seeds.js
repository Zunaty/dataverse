const faker = require('faker');

const db = require('../config/connection');
const { User, List } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});
    await List.deleteMany({});

    // await User.create({
    //     username: 'blah',
    //     email: 'pamela@testmail.com',
    //     password: 'password12345',
    // });

    const userData = [];

    for (let i = 0; i < 10; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();
    
        userData.push({ username, email, password });
    }

    await User.collection.insertMany(userData);

    console.log('all done!');
    process.exit(0);
});