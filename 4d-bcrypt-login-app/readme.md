# 4D. Bcrypt-login-app

---

- Overview
- Getting Started
- Users collection
- Sign up page
- Login Sessions
- Users views
- Relate Users with Data
- Integrate views for relational data

---

## Overview

The base version of this lesson is a full stack application using MongoDB as the database, EJS as the front end views, Express handling the server. There is 1 collection in the database (the starter data can be found in the models folder), and the views are set up only to see that 1 collection.

The goal of this lesson is to implement Users as the 2nd collection (with a property that references the original collection), and implementation of login sessions. While a user is logged in, the user should have a view to see their information, including the relationship to the data collection. The view should also link to the original data collection from the user's page.

In other words, we're giving this application the following features:

- Users can now create an account
- Users can now log in
- Users can now "favorite" things in this application
- Users can visit their user page to see the list of their "favorites"
- Users can log out

## Getting Started

- Use command `npm install` to install the base dependencies listed on the `package.json` file.

- Create a `.env` file to include your MongoDB connection string. Make sure to change the extension at the end to `...mongodb.net/login-app`

- In the terminal, use command `node index.js` to start up the server. Navigate to `localhost:3000/` in the browser to test that the application works.

- Refresh your MongoDB Compass to see the `login-app` database. The `pokemons` collection should be empty to begin with. Select it, click on the green `ADD DATA` button, select `import file`, and select the `allPokemon.json` file found on the models folder of this appliction

- In the browser, navigate to `http://localhost:3000/allMons` to make sure it can be seen on the client side

- Turn the server off with `ctrl + c`

## Users collection

The goal here is to create a Users collection, give it a property that relates to the original data collection, and test it on the back-end.

- Create the following file: `./models/userModel.js`

1. Create a User model
<!-- 1. Create a User model -->

```js
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Settings for each document within this collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoritePokemon: {
    type: [
      {
        type: ObjectId,
        ref: "Pokemon",
      },
    ],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

Next, it's time to set up a controller and route on the back-end to test it. To have safety around user passwords, the Bcrypt module will be implemented.

- In terminal, use command `npm install bcrypt`

- Create the following file: `./controllers/api/userController.js`

2. Create a userController, with a createUser function
<!-- 2. Create a userController, with a createUser function -->

```js
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
  try {
    // Gather user credentials from the client
    let { username, password } = req.body;

    // Generate a salt
    let salt = await bcrypt.genSalt(10);

    // Encrypt the user password
    let encryptedPassword = await bcrypt.hash(password, salt);

    // Generate the user document
    let newUserObj = {
      username: username,
      password: encryptedPassword,
      favoritePokemon: [],
    };

    // Insert the document into the User collection
    await User.create(newUserObj);

    // Respond to the client - back-end
    res.json({
      message: "success",
      payload: newUserObj,
    });
  } catch (err) {
    let errorObj = {
      message: "create user failure",
      payload: error,
    };

    // server-side
    console.log(errorObj);

    // client-side
    res.json(errorObj);
  }
}

module.exports = {
  createUser,
};
```

Next, there should be a route for the server to listen to the request

- Create the following file: `./routes/api/userRouter.js`

3. Create a user router
<!-- 3. Create a user router -->

```js
const router = require("express").Router();
const { createUser } = require("../../controllers/api/userController");

router.post("/createUser", createUser);

module.exports = router;
```

Next, it's time to connect the router to the server

4. Plug in the user router
<!-- 4. Plug in the user router -->

```js
const userRouter = require("./routes/api/userRouter");
app.use("/api/user", userRouter);
```

Finally, it's time to test this out with Postman

- Start up the server using command `node index.js` in terminal
- In postman, create a POST request to `localhost:3000/api/user/createUser`. Make sure to open body > raw > text -> JSON and create an object with a `username` property and `password` property. Here's an example:

```js
{
    "username": "ashKetchum",
    "password": "iLovePikachu"
}
```

- Once it works, turn the server off

## Sign up page

Here, we will set up a view to sign up, and a view to log in. The sign up page will take advantage of our `createUser` function that we just created & tested, but will be edited to redirect to the log in page. The log in page will not be functional for now.

- Create the following file: `./views/signUp.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokemon App</title>
  </head>
  <body>
    <h1>Welcome to our Pokemon App</h1>

    <!-- This takes clients to the homepage -->
    <a href="/">Head back to the home page</a>

    <!-- Sign up form -->
    <form action="/api/user/createUser" method="POST">
      <div>
        <label for="username">Username</label>
        <input
          name="username"
          type="text"
          id="username"
          placeholder="Username"
        />
      </div>

      <div>
        <label for="signupPassword">Password</label>
        <input
          name="password"
          type="text"
          id="signupPassword"
          placeholder="Password"
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </body>
</html>
```

- Create the following file: `./views/logIn.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokemon App</title>
  </head>
  <body>
    <h1>Welcome to our Pokemon App</h1>

    <!-- This takes clients to the homepage -->
    <a href="/">Head back to the home page</a>

    <!-- Sign up form -->
    <form action="/api/user/logInUser" method="POST">
      <div>
        <label for="username">Username</label>
        <input
          name="username"
          type="text"
          id="username"
          placeholder="Username"
        />
      </div>

      <div>
        <label for="loginPassword">Password</label>
        <input
          name="password"
          type="password"
          id="loginPassword"
          placeholder="Password"
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  </body>
</html>
```

Next, go back to `./controllers/api/userController.js` and change the response to the client, to redirect to the login page

5. Modify the user controller to handle front-end sign ups
<!-- 5. Modify the user controller to handle front-end sign ups -->

```js
// Respond to the client - back-end
// res.json({
//     message: "success",
//     payload: newUserObj
// })

// Respond to the client - front-end
res.redirect("/logIn");
```

For this to work, we need to set up URL routes to render the views we just created.

- On `./controllers/view/viewController.js`, write functions to render the sign up and log in pages

6. Set up Sign up and Log in functions
<!-- 6. Set up Sign up and Log in functions -->

```js
// Return a web page where clients can create a user by signing up
async function renderSignUpForm(req, res) {
  try {
    res.render("signUp");
  } catch (error) {
    console.log(`render sign up form error: `);
    console.log(error);
  }
}

// Return a web page where clients can log in using their credentials
async function renderLogInForm(req, res) {
  try {
    res.render("logIn");
  } catch (error) {
    console.log(`render log in form error: `);
    console.log(error);
  }
}

module.exports = {
  renderAllPokemon,
  renderOnePokemon,
  renderCreatePokemonForm,
  renderUpdatePokemonForm,
  renderSignUpForm,
  renderLogInForm,
};
```

Next we set up a route for these.

- On `./routes/viewRouters/viewRouter.js`, import the functions we just wrote. Then, set up the routes for the sign up form, and the log in form

7. Set up sign-up and log-in form routes
<!-- 7. Set up sign-up and log-in form routes -->

```js
const {
  renderAllPokemon,
  renderOnePokemon,
  renderCreatePokemonForm,
  renderUpdatePokemonForm,
  renderSignUpForm,
  renderLogInForm,
} = require("../../controllers/view/viewController");

// .
// .
// .

// localhost:3000/signUp
router.get("/signUp", renderSignUpForm);
// localhost:3000/logIn
router.get("/logIn", renderLogInForm);
```

- Use command `node index.js` in the terminal to turn the server on
- Navigate to `localhost:3000/signUp`. Enter credentials, and click the sign up button. You should be redirected to the login page
- Double check by checking Compass and refreshing. You should see a newly created user
- Shut off the server with `ctrl + c`

## Login Sessions

Before setting up any more views, it's time to set up the ability for the server and the browser to coordinate on login sessions. For that we need to install a couple of modules

- In terminal, use command `npm install express-session cookie-parser`
- On `index.js`, set up the necessary modules for login sessions

8. Set up necessary modules for login sessions
<!-- 8. Set up necessary modules for login sessions -->

```js
require("dotenv").config();
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
```

- On `.env`, create a COOKIE_SECRET variable

```
COOKIE_SECRET="8tigre24deven3000"
```

- On `index.js`, include the use of the cookie parser middleware

9. Set up cookie parser middleware
<!-- 9. Set up cookie parser middleware -->

```js
app.use(cookieParser(process.env.COOKIE_SECRET));
```

- On `index.js`, set up the log in session

10. Set up the login session
<!-- 10. Set up the login session -->

```js
// 24 hours in milliseconds
const oneDay = 1000 * 60 * 60 * 24;

// session middleware
app.use(
  sessions({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
```

## User Views

In this section, we will set up a view for the user's personal page. This should only be viewed if you are logged in. So we will set up the following:

- A user page, that will render their username and list their favorite pokemon **_by name_**
- A front-end route that will render a user page
- A back-end route that checks if a user's credentials are correct. If they are, begin a session on the server and route the client to the user's page. If not, redirect them to the login page
- A front-end route to log out and end the session

Let's begin with this plan.

- Create the following file: `./views/user.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokemon App</title>
  </head>
  <body>
    <h1>Welcome <%=user.username%> to our Pokemon App</h1>
    <br />
    <a href="/">Go back to the home page</a>
    <br />
    <!-- This takes clients to see the entire Pokemon collection -->
    <a href="/allMons">See all the Pokemon in the database</a>
    <br />
    <ul>
      <%=user.username%>'s Favorite Pokemon: <% favoritePokemon.forEach(
      (pokemon) => { %>
      <li>
        <a href="/oneMon/<%=pokemon%>"><%= pokemon %></a>
      </li>
      <% }) %>
    </ul>

    <a href="/logout">Log out of the session</a>
  </body>
</html>
```

Let's set up the front-end route to render the user page based on the current session.

On `./controllers/view/viewController.js`:

11. A) Import the User collection

```js
const User = require("../../models/userModel");
```

11. B) Set up front-end function to render user page
<!-- 11. B) Set up front-end function to render user page -->

```js
async function renderUserPage(req, res) {
  try {
    // Check the server to see if the client has permission to see this page
    if (req.session.isAuth) {
      let currentUser = await User.findOne({ _id: req.session.user.id });

      // Find all pokemon on this user's favorite list
      let pokeNameList = [];

      for (let i = 0; i < currentUser.favoritePokemon.length; i++) {
        let onePokemon = await Pokemon.findOne({
          _id: currentUser.favoritePokemon[i],
        });

        pokeNameList.push(onePokemon.Name);
      }

      res.render("user", { user: currentUser, favoritePokemon: pokeNameList });
    } else {
      res.redirect("/logIn");
    }
  } catch (error) {
    console.log(`renderUserPage error: ${error}`);
  }
}
```

Don't forget to export this function in `module.exports`!!!

On `./routes/viewRouters/viewRouter.js`:

12. Set up front-end route for the user page
<!-- 12. Set up front-end route for the user page -->

```js
router.get("/user", renderUserPage);
```

Don't forget to import the `renderUserPage` function at the top of the page!!!

It's important to note that the data that will be given to the user page will be the username, and the list of favorite pokemon **_by name_**. The way this data will be stored in the database is **_by id_**. So we will have to search through the Pokemon collection, find each by \_id, and store the array of names in the session's user object instead of \_id. This will all be done on the back end

On `./controllers/api/userController.js`:

13. Import the Pokemon collection
<!-- 13. Import the Pokemon collection -->

```js
const Pokemon = require("../../models/pokemonModel");
```

14. Create a function to handle the login session
<!-- 14. Create a function to handle the login session -->

```js
async function logInUser(req, res) {
  try {
    // findOne User that matches the username from the sign in form
    const user = await User.findOne({ username: req.body.username });

    // If no user, throw error. Otherwise, compare passwords
    if (!user) {
      throw "User not found, please sign up";
    } else {
      // bcrypt compares the incoming password with the database password
      let comparedPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      // If the password is incorrect, throw an error. Otherwise, begin server session
      if (!comparedPassword) {
        throw "Please check your password and try again";
      } else {
        // Give the server login authority
        req.session.isAuth = true;

        // Generate user object to attach to the server-side session
        let userObj = {
          username: user.username,
          id: user._id,
        };

        // Server-side session holds info about the user
        req.session.user = userObj;

        // This route can only be seen if req.session.isAuth is set to true
        res.redirect("/user");
      } // end of "password compare" actions
    } // end of "user found" actions
  } catch (err) {
    // server-side
    console.log(`logInUser error: ${err}`);

    // client-side
    res.json({
      message: "failure",
      payload: `logInUser error: ${err}`,
    });
  }
}

module.exports = {
  createUser,
  logInUser,
};
```

Don't forget to export this function in `module.exports`!!!

Next, we will create the route to use this function

On `./routes/api/userRouter.js`:

15. Create a route to logInUser
<!-- 15. Create a route to logInUser -->

```js
router.post("/logInUser", logInUser);
```

Finally, we will create a route on the front-end to destroy the session, and remove the ability to see the user page.

On `./controllers/view/viewController.js`:

16. Set up front-end function to log the user out
<!-- 16. Set up front-end function to log the user out -->

```js
async function logOutUser(req, res) {
  try {
    // Clear the cookie from the browser
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: null,
    });

    // Clear the session from the server
    req.session.destroy();

    // send the client to the log in page
    res.redirect("/logIn");
  } catch (error) {
    console.log(`logOutUser error: ${error}`);
  }
}
```

Don't forget to export this function in `module.exports`!!!

On `./routes/viewRouters/viewRouter.js`:

17. Set up log out route to end sessions
<!-- 17. Set up log out route to end sessions -->

```js
router.get("/logout", logOutUser);
```

Don't forget to import this function at the top of the page!!!

Now that we set up everything for the server and browser to coordinate on user logins, it's finally time to test it.

- Use command `node index.js` to turn the server on
- Navigate to the app in the browser, and go to the login page. Log in using the user we created earlier:

```js
{
    "username": "ashKetchum",
    "password": "iLovePikachu"
}
```

- You should be redirected to the user page. There should be no favorite pokemon listed yet.
- Right click > Inspect > Application > Cookies to see the cookie on the browser side
- Click the log out link at the bottom
- Notice that the cookie should be removed from the browser
- Shut down the server with `ctrl + c`

Congratulations, Users can now log in and out of your application!!!

## Relate Users with Data

Next, we have to add the ability to add favorite pokemon to the users. We will do this on the back-end first, then modify a lot of files to give the client the ability to do this on the front-end.

On `./controllers/api/userController.js`:

18. Create a function to add a pokemon's \_id to a user document
<!-- 18. Create a function to add a pokemon's _id to a user document -->

```js
async function addFavoritePokemonToUser(req, res) {
  try {
    // back-end testing
    let userId = req.body.userId;
    // front-end login session
    // let userId = req.session.user.id

    // Find the user currently logged in
    let currentUser = await User.findById({ _id: userId });

    // Add the Pokemon's ID to the favoritePokemon list
    currentUser.favoritePokemon.push(req.body.pokeId);

    // Generate a clean object to change only the necessary properties on the User document
    let newUserObj = {
      favoritePokemon: currentUser.favoritePokemon,
    };

    // Update the User document with the new favorite pokemon added
    await User.updateOne(
      { _id: userId },
      { $set: newUserObj },
      { upsert: true }
    );

    // back-end response
    res.json({
      message: "success",
      payload: currentUser,
    });
    // front-end response
    // res.redirect("/user");
  } catch (err) {
    console.log(`addFavoritePokemonToUser error: ${err}`);
  }
}
```

Don't forget to export this function in `module.exports`!!!

On `./routes/api/userRouter.js`:

19. Create a route to add favorite pokemon
<!-- 19. Create a route to add favorite pokemon -->

```js
router.put("/addFavoritePokemon", addFavoritePokemonToUser);
```

Don't forget to import this function at the top of the page!!!

We will test this on the back-end first:

- Use command `node index.js` to start up the server
- Use Compass to find the ID's for ashKetchum on the users collection and Pikachu on the pokemons collection
- Create a new request in Postman. It is a PUT request to the URL `localhost:3000/api/user/addFavoritePokemon`. The body should look like the following:

```js
{
    "userId": "63ba06b2670353ecc63dc020",
    "pokeId": "63b9f79783f2286ec3dbf059"
}
```

- Refresh Compass to see that ashKetchum now has a new pokemon listed
- In the browser, log in as ashKetchum. Pikachu should now be listed
- Click the link to make sure it takes you to the individual Pokemon page
- Navigate to `localhost:3000/logout`
- Once everything works, use `ctrl + c` to turn the server off

## Integrate views for relational data

Now it's time to give the clients the ability to log in, go to a pokemon page, add that pokemon to favorites. This section will include:

- Adding a "add to favorites" button to `oneMon.ejs`
- Modifying the controller to render this page based on the login session
- Modifying the controller to add favorite pokemon to user, to respond properly to the client

On `./views/oneMon.ejs`:

20. Add the "Add this pokemon to favorite" button
<!-- 20. Add the "Add this pokemon to favorite" button -->

```html
<% if(loggedIn && !userFaves.includes(pokemon._id)) { %>
<form action="/api/user/addFavoritePokemon?_method=PUT" method="post">
  <input type="hidden" name="pokeId" value="<%=pokemon._id%>" />
  <input type="submit" name="_method" value="Add to Favorite Pokemon" />
</form>
<% } %>
```

On `./controllers/view/viewController.js`:

21. Modify renderOnePokemon() to show the page based on the login session
<!-- 21. Modify renderOnePokemon() to show the page based on the login session -->

```js
let userFaves;
if (req.session.isAuth) {
  let currentUser = await User.findOne({ username: req.session.user.username });
  userFaves = currentUser.favoritePokemon;
} else {
  userFaves = [];
}

// Use oneMon.ejs file, all data will be in pokemon
res.render("oneMon", {
  pokemon: result[0],
  loggedIn: req.session.isAuth,
  userFaves: userFaves,
});
```

On `./controllers/api/userController.js`:

22. Modify addFavoritePokemonToUser() to respond to the client properly
<!-- 22. Modify addFavoritePokemonToUser() to respond to the client properly -->

```js
// back-end testing
// let userId = req.body.userId
// front-end login session
let userId = req.session.user.id;

// .
// .
// .
// .

// back-end response
// res.json({
//     message: "success",
//     payload: currentUser
// });
// front-end response
res.redirect("/user");
```

Finally, it's time to test that this works

- Turn the server on
- Login as user ashKetchum
- Click on one of the pokemon listed on the user page
- Take note that the "add pokemon to favorite" button is not on this page
- Go back to see all pokemon
- Select a new pokemon
- Click the button to add the pokemon to favorite
- Take note that this pokemon is now on the list
- Log out of this user
- Turn the server off
