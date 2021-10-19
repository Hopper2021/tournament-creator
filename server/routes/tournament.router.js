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
        .then((results) => {
            res.send(results.rows[0]); })
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
        .then((results) => {
            res.send(results.rows); })
        .catch((error) => {
            console.log('Error in SELECT tournament query - ', error);
        })
})

// Select all kingdoms ( kingdom drop down )
router.get('/kingdoms', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "kingdom";`;
    pool.query(sqlText)
        .then((results) => {
            res.send(results.rows); }) 
        .catch((error) => {
            console.log('Error in getting all kingdoms - ', error);
            res.sendStatus(500);
        })
})

// Select all tournament types
router.get('/types', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "tournament_type";`;
    pool.query(sqlText)
        .then((results) => {
            res.send(results.rows); }) 
        .catch((error) => {
            console.log('Error in getting all kingdoms - ', error);
            res.sendStatus(500);
        })
})

// Create new tournament
router.post('/create', rejectUnauthenticated, (req, res) => {
    const tournament = req.body;
    console.log('req.user.id - ', req.user.id);
    console.log('req.body in create tournament POST - ', req.body);
  
    const sqlText = `
        INSERT INTO "tournament" ("name", "kingdom_id", "user_id", "type_id")
        VALUES ($1, $2, $3, $4);`;
    pool.query( sqlText, 
        [tournament.name, tournament.kingdom_id, req.user.id, tournament.type_id] )
    .then((result) => {
        console.log('Tournament Created - ', tournament.name);
        res.sendStatus(201) })
    .catch((error) => {
        console.log('Error in POST new tournament - ', error);
        res.sendStatus(500);
    }) 
});

// Get newest tournament
router.get('/new', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT * FROM "tournament"
        ORDER BY "tournament"."id" DESC LIMIT 1;`;
    pool.query(sqlText)
    .then((result) => {
        console.log('Newest tournament GET - ', result.rows[0]);
        res.send(result.rows[0]); }) 
    .catch((error) => {
        console.log('Error in getting newest tournament - ', error);
        res.sendStatus(500);
    })
})

router.post( '/create/entrant', rejectUnauthenticated, (req, res) => {
    console.log('Req.body in post entrants - ', req.body);
    
    const entrant = req.body;
    const sqlText = `
        INSERT INTO "entrant" ("persona", "kingdom_id", "warriors")
        VALUES ($1, $2, $3)
        RETURNING id;`;
    // First create the entrant in the entrant table
    pool.query(sqlText, 
        [entrant.persona, entrant.kingdom_id, entrant.warriors])
    .then((result) => {
        // Receive back the created entrants id in the "entrants" table
        console.log('The entrant id is - ', result.rows[0].id); // Logs undefined
        const createdEntrantId = result.rows[0].id;

        // Post the entrant and the tournament they're participating in
        const assignToTournament = `
            INSERT INTO "tournament_entrant" ("tournament_id", "entrant_id")
            VALUES ($1, $2);`;

        pool.query(assignToTournament, [entrant.tourny_id, createdEntrantId]) })
    .then((result) => {
        res.sendStatus(200); })
    .catch((error) => {
        console.log('Error in POST new entrants - ', error);
        res.sendStatus(500);
    })
})

module.exports = router;