const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('User - ', req.user.id);
    
    pool.query(`
        SELECT * FROM "tournament" 
        WHERE "user_id" = $1`, [req.user.id])
    .then((results) => {
        res.send(results.rows)})
    .catch((error) => {
        console.log('Error in GET user tournaments', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;