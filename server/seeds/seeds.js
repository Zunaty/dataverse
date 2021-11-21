const faker = require('faker');

const db = require('../config/connection');
const { List, Item, User } = require('../models');
const { listeners } = require('../models/List');

db.once('open', async () => {
    await Item.deleteMany({});
    await List.deleteMany({});
    await User.deleteMany({});

    const userData = [];


    for (let i = 0; i < 10; i += 1) {
        // user data generation
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        userData.push({ username, email, password });
    }

    const createdUsers = await User.collection.insertMany(userData);

    let createdLists = [];
    for (let i = 0; i < 20; i += 1) {

        // list data generation
        const listName = faker.random.word();

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username, _id: userId } = createdUsers.ops[randomUserIndex];


        const createdList = await List.create({ listName, username });

        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { lists: createdList._id } }
        );

        createdLists.push(createdList);
    }

    let createdItems = [];
    // create items
    for (let i = 0; i < 50; i += 1) {
        const itemName = faker.commerce.productName();
        const itemDescription = faker.lorem.sentence();
        const itemImg = faker.image.imageUrl();
        const itemQuantity = 10;
        const itemPrice = faker.finance.amount();

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username } = createdUsers.ops[randomUserIndex];

        const randomListIndex = Math.floor(Math.random() * createdLists.length);
        const { _id: listId } = createdLists[randomListIndex];

        const createdItem = await Item.create({ username, itemName, itemDescription, itemImg, itemQuantity, itemPrice });
        const updatedList = await List.updateOne(
            { _id: listId },
            { $push: { items: createdItem._id } },
            { runValidators: true }
        );

        createdItems.push(createdItem);
    }


    console.log('all done!');
    process.exit(0);
});