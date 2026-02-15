//ADDING DUMMY USER TO DATABASE WHERE THERE IS NONE
//PLS RUN npm run seed
//DONT IMPORT THIS
const mongoose = require("mongoose");
const User = require("./models/User");
const dummyUsers = require("./data/dummyUsers");

require("dotenv").config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.Mongo_URI);

    const existingUsers = await User.countDocuments();

    if (existingUsers > 0) {
      console.log(`Database already has ${existingUsers} users. Skipping seed.`);
      await mongoose.connection.close();
      return;
    }
    console.log("Seeding users...");
    for (const userData of dummyUsers) {
      const user = new User(userData);
      await user.save();
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

module.exports = seedDatabase;
