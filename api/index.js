import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(
        // object with empty "data" array.
        {
            data: [],
        }
    );
});

export default router;