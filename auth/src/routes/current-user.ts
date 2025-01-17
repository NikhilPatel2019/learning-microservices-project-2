import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (reqq,res ) => {
    res.send("Hello there!")
});

export { router as currentUserRouter };