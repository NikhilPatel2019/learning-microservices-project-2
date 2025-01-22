import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req,res ) => {
    res.send("Hello there 123!")
});

export { router as currentUserRouter };