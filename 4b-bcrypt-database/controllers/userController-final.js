const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const getAllUsers = async function () {
    try {
        const users = await User.find({});

        return users;
    } catch (error) {
        throw error;
    }
}

const createUser = async function (userData) {
    try {
        // temporarily hold password
        const userPassword = userData.password;

        // generate a salt
        const salt = await bcrypt.genSalt(10);

        // encrypt password
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        // generate user document
        const newUser = {
            username: userData.username,
            password: hashedPassword,
        };

        // insert document into the database
        const user = await User.create(newUser);

        return user;
    } catch (error) {
        throw error;
    }
}

async function loginUser(userData) {
    try {
        // temporarily hold username & password separately
        const incomingUsername = userData.username;
        const incomingPassword = userData.password;

        // find correct username
        const foundUser = await User.findOne({ username: incomingUsername });
        if (!foundUser) {
            return "No user found with that username."
        }

        // compare passwords
        const isCorrectPassword = await bcrypt.compare(
            incomingPassword,
            foundUser.password
        );

        // respond to client based on password
        return isCorrectPassword;
    } catch (err) {
        throw error;
    }
}

const updatePassword = async function (userData) {
    try {
        // temporarily hold username and password from client
        const incomingUsername = userData.username;
        const incomingOldPassword = userData.oldPassword;
        const incomingNewPassword = userData.newPassword;

        // Find the correct user
        const foundUser = await User.findOne({ username: incomingUsername });
        if (!foundUser) {
            return "No user found with that username."
        }

        // Compare old password to check credentials
        const isCorrectPassword = await bcrypt.compare(
            incomingOldPassword,
            foundUser.password
        );

        // Compare NEW password to double check that it's being changed
        const isSamePassword = await bcrypt.compare(
            incomingNewPassword,
            foundUser.password
        );

        if (isSamePassword) {
            return "New password must be different from the old password";
        } else if (isCorrectPassword && !isSamePassword) {
            // new encryption process
            const salt = await bcrypt.genSalt(10);
            const newHashedPassword = await bcrypt.hash(incomingNewPassword, salt);

            // generate updated user
            const updatedUser = {
                username: foundUser.username,
                password: newHashedPassword,
            };

            // Update it on database end
            await User.updateOne(
                { username: foundUser.username },
                { $set: updatedUser },
                { upsert: true }
            );

            // respond to client
            return "password successfully updated";
        } else if (!isCorrectPassword) {
            return "incoming password incorrect, please check the spelling and try again";
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    updatePassword,
}