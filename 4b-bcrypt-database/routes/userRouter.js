const express = require('express');

const router = express.Router();

router.get('/', async function(req, res) {
    try {
        const users = await getAllUsers();
        res.json({
            message: "success",
            payload: users,
        });
    } catch (error) {
        const failureObject = {
            message: 'failure',
            payload: error
        }
        
        console.log(failureObject);
        res.status(500).json(failureObject);
    }
})

router.post('/', async function (req, res) {
    try {
        const user = await createUser(req.body);

        // respond to client
        res.json({
            message: "success",
            payload: user,
        });
    } catch (err) {
        // server-side
        console.log(`createUser error: ${err}`);

        // client-side
        res.json({
            message: "failure",
            payload: `createUser error: ${err}`,
        });
    }
})

router.post('/login', async function (req, res) {
    try {
        const result = await loginUser(req.body);
        res.status(200).json({
            message: "success",
            payload: result,
        });
    } catch (err) {
        // server-side
        console.log(`loginUser error: ${err}`);

        // client-side
        res.json({
            message: "failure",
            payload: `loginUser error: ${err}`,
        });
    }
})

router.put('/', async function (req, res) {
    try {
        const result = await updatePassword(req.body);
        res.status(200).json({
            message: 'success',
            payload: result,
        })
    } catch (err) {
        // server-side
        console.log(`updatePassword error: ${err}`);

        // client-side
        res.json({
            message: "failure",
            payload: `updatePassword error: ${err}`,
        });
    }
})

module.exports = router;