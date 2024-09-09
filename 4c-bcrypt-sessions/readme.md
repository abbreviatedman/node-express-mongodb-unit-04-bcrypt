# 4C. Bcrypt Sessions

---

## What this lesson covers:

- Getting Started
- Express-Session
- Cookie-Parser

---

## Getting Started

Here we have a basic application with EJS as our front end. There will be a database included to hold User login information, so make sure to connect your own database.

- In terminal, use command `npm install` to install all dependencies listed in the README.md
- Create a `.env` file. Go into the `.env` file and fill in the connection string to YOUR MongoDB Cluster. Make sure the database name is `Bcrypt-sessions`

## Express-Session

Express-Session is an HTTP server-side framework used to create and manage a session middleware. Session data is **_not_** saved in the cookie itself, just the session ID. Session data is stored server-side.

## Cookie-Parser

Cookie-Parser is used to parse cookie header to store data on the browser whenever a session is established on the server-side.

These 2 modules will be used together to hold a log-in session between the server and the client.

Go to `index.js` to import these modules

1. Import the session handling modules
<!-- 1. Import the session handling modules -->

```js
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
```

Next, we should use the cookie parser so that the server can access the necessary option to save, read, and access a cookie

2. Use cookie parser middleware
<!-- 2. Use cookie parser middleware -->

```js
app.use(cookieParser(process.env.COOKIE_SECRET));
```

Next, we have to set up the login session:

3. Set up the login session
<!-- 3. Set up the login session -->

```js
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
```

Don't forget to add the cookie secret to your `.env` file:

```
COOKIE_SECRET="hamsteroverlord007"
```

Next, we will test the login. This will be done by hard coding the user credentials, and checking for the cookies on the front-end.

On `./routes/indexRouter.js`:

4. Render a page based on login credentials
<!-- 4. Render a page based on login credentials -->

```js
if (req.session.isAuth) {
  res.render("home", { user: req.session.user });
} else {
  res.redirect("/log-in");
}
```

If the credentials are valid:

- The user will be granted the necessary access.
- The server will create a temporary user session with a random string known as a session ID to identify that session.
- The server will send a cookie to the client’s browser.
- The session ID is going to be placed inside this cookie.

Once the client browser saves this cookie, it will send that cookie along with each subsequent request to the server. The server will validate the cookie against the session ID. If the validation is successful, the user is granted access to the requested resources on the server.

If the credentials are invalid, the server will not grant this user access to the resources. No session will be initialized, and no cookie will be saved.

Next, set up the ability to log in

On `./routes/indexRouter.js`:

5. Set temporary login credentials
<!-- 5. Set temporary login credentials -->

```js
let userId = "myUsername";
let tempPass = "myPassword";
```

6. Set up Log In route
<!-- 6. Set up Log In route -->

```js
router.post("/user", (req, res) => {
  // Check IF login credentials are correct
  if (req.body.username === userId && req.body.password === tempPass) {
    // If logged in, set auth to true on the server side session
    req.session.isAuth = true;

    // Add a user to the predefined session object
    req.session.user = req.body.username;

    // check the session object again
    console.log("Someone just logged in: ");
    console.log(req.session);

    // Send client to the welcome page
    res.redirect("welcome");
  } else {
    res.send("invalid username and/or password");
  }
});
```

`req.session` is predefined and holds the same values you would have saved in a production environment on the server-side into a database such as MongoDB, PostgreSQL, etc.

In this case, since we don’t have a database to save the session, we will `console.log(`session: ${session}`);` and glance at how it looks. If you go back to the command line, the session object will be printed to the console.

Finally, on `./routes/indexRouter.js`:

7. Set up the log out route
<!-- 7. Set up the log out route -->

```js
router.get("/logout", (req, res) => {
  // browser-side
  res.clearCookie("connect.sid", {
    path: "/",
    httpOnly: true,
    secure: false,
    maxAge: null,
  });

  // server-side
  req.session.destroy();
  res.redirect("/");
});
```

This will define the logout endpoint. When the user decides to log out, the server will destroy `req.session.destroy();` the session and clear out the cookie on the client-side. Cookies are also cleared in the browser when the maxAge expires.

Now, we will:

- `node index.js` to turn the server on
- Navigate to `localhost:3000/login` and try the login credentials
- Open the browser inspector tool > application > Cookies http://localhost:3000/.
- Log out, and turn the server off

The client won’t be able to modify the contents of the cookie, and even if they try to, it’s going to break the signature of that cookie. This way, the server will be able to detect the modification.

A cookie doesn’t carry any meaningful data inside of them. It just contains the session ID token. The cookie is encrypted. It still has to maintain a one-to-one relationship with the user session. The cookie will be valid until set maxAge expires or the user decides to log out.

When the user logs out, the session will be destroyed. There is no session to compare with the saved cookie. The user will have to log in again to create a session ID for the new login session.
