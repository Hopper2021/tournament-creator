const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('User - ', req.user);
    
    const sqlText = `SELECT * FROM "tournament" WHERE "user_id" = $1`
    pool.query(sqlText, [req.user])
    .then((results) => {
        res.send(results.rows)})
    .catch((error) => {
        console.log('Error in GET all user\'s tournaments', error);
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