const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// Get all tournaments and their base information based on the user ID passed ( My Tournaments Page )
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

// Get all base tournament information associate with a passed tournament ID ( Detail Page )
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

// Get all tournament Entrants associated with a tournament Id ( Detail Page )
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

// Create new tournament
router.post('/create', (req, res) => {
    const tournament = req.body;
    console.log('req.body in create tournament POST - ', req.body);
  
    const sqlText = `
        INSERT INTO "tournament" ("name", "kingdom_id", "user_id", "type_id")
        VALUES ($1, $2, $3, $4);`;
    pool.query( sqlText, 
        [tournament.name, tournament.kingdom_id, tournament.user_id, tournament.type_id] )
    .then((result) => {
        console.log('Tournament Created - ', tournament.name);
        res.sendStatus(200) })
    .catch((error) => {
        console.log('Error in POST new tournament - ', error);
        res.sendStatus(500);
    }) 
});

module.exports = router;