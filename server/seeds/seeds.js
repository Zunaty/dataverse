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
    // set listData to empty array
    const listData = [];

    for (let i = 0; i < 10; i += 1) {
        // user data generation
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        // list data generation
        const listName = faker.name.jobTitle();
        const itemName = faker.commerce.productName();
        const itemDescription = faker.lorem.sentence();
        const itemImg = faker.image.imageUrl();
        const itemQuantity = 10;
        const itemPrice = faker.finance.amount();
    
        userData.push({ username, email, password });
        listData.push({ username, listName, itemName, itemDescription, itemImg, itemQuantity, itemPrice });
    }

    await User.collection.insertMany(userData);
    await List.collection.insertMany(listData);

    console.log('all done!');
    process.exit(0);
});