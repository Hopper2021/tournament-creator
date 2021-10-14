const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('User - ', req.user.id);
    
    pool.query(`
        SELECT "tournament"."id","tournament"."name" AS "tournament_name","tournament"."date","kingdom"."name" AS "kingdom_name",
        "user"."persona" AS "organizer_persona", "tournament_type"."name" AS "type" FROM "tournament"
        JOIN "tournament_type" ON "tournament_type"."id" = "tournament"."type_id"
        JOIN "kingdom" ON "kingdom"."id" = "tournament"."kingdom_id"
        JOIN "user" ON "user"."id" = "tournament"."user_id"
        WHERE "tournament"."user_id" = $1`, [req.user.id] )
    .then((results) => 
        res.send(results.rows))
    .catch((error) => {
        console.log('Error in GET user tournaments', error);
        res.sendStatus(500);
    });
});

router.get('/details/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params.id - ', req.params.id);
    const sqlText = `
        SELECT "tournament"."id","tournament"."name" AS "tournament_name","tournament"."date","kingdom"."name" AS "kingdom_name",
        "user"."persona" AS "organizer_persona", "tournament_type"."name" AS "type" FROM "tournament"
        JOIN "tournament_type" ON "tournament_type"."id" = "tournament"."type_id"
        JOIN "kingdom" ON "kingdom"."id" = "tournament"."kingdom_id"
        JOIN "user" ON "user"."id" = "tournament"."user_id"
        WHERE "tournament"."id" = $1;`;
    pool.query( sqlText, [req.params.id] )
        .then((result) => {
            res.send(result.rows[0]); })
        .catch((error) => {
            console.log('Error in SELECT tournament query - ', error);
        })
})

router.get('/details/entrants/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params.id - ', req.params.id);
    const sqlText = `
        SELECT "entrant"."persona" AS "persona", "tournament_entrant"."score", "entrant"."warriors" FROM "tournament_entrant"
        JOIN "tournament" ON "tournament_entrant"."tournament_id" = "tournament"."id"
        JOIN "entrant" on "entrant"."id" = "tournament_entrant"."entrant_id"
        WHERE "tournament"."id" = $1
        ORDER BY "score" DESC;`;
    pool.query( sqlText, [req.params.id] )
        .then((result) => {
            res.send(result.rows); })
        .catch((error) => {
            console.log('Error in SELECT tournament query - ', error);
        })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;