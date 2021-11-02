const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * @api {get} /tournament Request All tournaments
 * @apiName GetMyTournaments
 * @apiGroup tournament
 *
 * @ApiPermission user A user must be logged in
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Array}   tournaments      An array of tournaments that the logged in user has created.
 * @apiSuccess {Number}  tournament.id    Id of each tournament
 * @apiSuccess {String}  tournament.name  Name of each tournament
 * @apiSuccess {Date}    tournament.date  Date the tournament was created
 * @apiSuccess {String}  kingdom.name     Name of the kingdom the tournament was held in
 * @apiSuccess {String}  user.persona     Persona of the user that created the tournament
 * @apiSuccess {String}  tournament.type  Name of the type of tournament that was created ( pits, brackets, etc. )
 * 
 * 
 */  
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
        SELECT "entrant"."id", "entrant"."persona" AS "persona", "tournament_entrant"."score", 
        "entrant"."warriors", "entrant"."kingdom_id" FROM "tournament_entrant"
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

/**
 * @api {post} /tournament/create Add new tournament
 * @apiName PostNewTournament
 * @apiGroup tournament
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 OK
 */ 
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

// Get newest tournament created by logged in user
router.get('/new', rejectUnauthenticated, (req, res) => {
    console.log('Req.user id - ', req.user.id);
    
    const sqlText = `
        SELECT * FROM "tournament"
        WHERE "tournament"."user_id" = $1
        ORDER BY "tournament"."id" DESC LIMIT 1;`;
    pool.query(sqlText, [req.user.id])
    .then((result) => {
        console.log('Newest tournament GET - ', result.rows[0]);
        res.send(result.rows[0]); }) 
    .catch((error) => {
        console.log('Error in getting newest tournament - ', error);
        res.sendStatus(500);
    })
})

// Posts new tournament and associated entrants to "tournaments" and "tournament_entrants"
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
            INSERT INTO "tournament_entrant" ("tournament_id", "entrant_id", "score")
            VALUES ($1, $2, $3);`;

        pool.query(assignToTournament, [entrant.tourny_id, createdEntrantId, 0])
        .then((result) => {
            res.sendStatus(200); })
        .catch((error) => {
            console.log('Error in POST new entrants - ', error);
            res.sendStatus(500);
        })
    })
})

// Deletes selected tournament
router.delete ( '/delete/:id', rejectUnauthenticated, async (req, res) => {
    console.log('req.params in delete tournament - ', req.params.id);
    const tournamentId = req.params.id;
    // Delete associated entrants in tournament_entrant table
    const deleteEntrants = `DELETE FROM "tournament_entrant" WHERE "tournament_id" = $1;`;
    await pool.query(deleteEntrants, [tournamentId])
    // Delete tournament itself from tournament table
    const deleteTournament = `DELETE FROM "tournament" WHERE "id" = $1;`;
    await pool.query(deleteTournament, [tournamentId])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) =>{
        console.log('Error in delete tournament - ', error);
        res.sendStatus(500);
    })
})

// Updates score of entrant associated with a specific tournament
router.put( '/score', rejectUnauthenticated, (req, res) => {
    console.log('Req.body in /score PUT - ', req.body); 
    const entrant = req.body;
    const sqlText = `
        UPDATE "tournament_entrant"
        SET "score" = $1
        WHERE "tournament_id" = $2 
            AND "entrant_id" = $3;`;
    pool.query(sqlText, [entrant.score, entrant.tournament_id, entrant.entrant_id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in score PUT - ', error);
        res.sendStatus(500);
    })
})

module.exports = router;