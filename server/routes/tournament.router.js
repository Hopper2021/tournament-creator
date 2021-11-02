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
 * @apiSuccess {Array}   tournaments       An array of tournaments that the logged in user has created.
 * @apiSuccess {Number}  id                Id of each tournament
 * @apiSuccess {String}  tournament_name   Name of each tournament
 * @apiSuccess {Date}    date              Date the tournament was created
 * @apiSuccess {String}  kingdom_name      Name of the kingdom the tournament was held in
 * @apiSuccess {String}  organizer_persona Persona of the user that created the tournament
 * @apiSuccess {String}  type              Name of the type of tournament that was created ( pits, brackets, etc. )
 * 
 * @apiError MyTournamentsError   Error in GET user tournaments
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

/**
 * @api {get} /tournament/details/:id  Request All details of tournament id passed
 * @apiName GetTournamentDetails
 * @apiGroup tournament
 *
 * @ApiPermission user      A user must be logged in
 * @apiParam   {Number} id  Users unique ID.
 * @apiParam   {Number} id  Tournament's unique ID.
 *
 * @apiSuccess {Object}  tournament        An object of the tournament that the logged in user has created.
 * @apiSuccess {Number}  id                Tournament's unique Id
 * @apiSuccess {String}  tournament_name   Name of tournament
 * @apiSuccess {Date}    date              Date the tournament was created
 * @apiSuccess {String}  kingdom_name      Name of the kingdom the tournament was held in
 * @apiSuccess {String}  organizer_persona Persona of the user that created the tournament
 * @apiSuccess {String}  type              Name of the type of tournament that was created ( pits, brackets, etc. )
 * 
 * @apiError TournamentDetailError   Error in SELECT tournament query
 */  
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

/**
 * @api {get} /tournament/details/entrants/:id     Request All entrants associated with passed tournament id.
 * @apiName GetTournamentEntrants
 * @apiGroup entrants
 *
 * @ApiPermission user      A user must be logged in
 * @apiParam   {Number} id  Users unique ID.
 * @apiParam   {Number} id  Tournament's unique ID.
 * 
 * @apiSuccess {Array}   entrants       An array of entrants associated with the tournament id provided.
 * @apiSuccess {Number}  id             Id of each entrant
 * @apiSuccess {String}  persona        Persona of each entrant
 * @apiSuccess {number}  score          Score of each entrant associated with the passed tournament id
 * @apiSuccess {number}  warriors       Number of warriors the entrant has
 * @apiSuccess {number}  kingdom.id     Home kingdom the entrant belongs to
 * 
 * @apiError TournamentDetailError   Error in SELECT tournament query
 */  
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

/**
 * @api {get} /tournament/kingdoms Request All kingdoms
 * @apiName GetKingdoms
 * @apiGroup kingdoms
 *
 * @ApiPermission user   A user must be logged in
 * 
 * @apiSuccess {Array}   kingdoms       An array of all kingdoms listed in Amtgard
 * @apiSuccess {Number}  id             Id of each kingdom
 * @apiSuccess {String}  name           Name of each kingdom
 * 
 * @apiError GetKingdomsError   Error in getting all kingdoms
 */  
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
/**
 * @api {get} /tournament/types Request All types
 * @apiName GetTypes
 * @apiGroup types
 *
 * @ApiPermission user   A user must be logged in
 * 
 * @apiSuccess {Array}   types   An array of all types of tournaments
 * @apiSuccess {Number}  id      Id of each type
 * @apiSuccess {String}  name    Name of each type
 * 
 * @apiError GetTypesError   Error in getting all types
 */  
// Select all tournament types
router.get('/types', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "tournament_type";`;
    pool.query(sqlText)
        .then((results) => {
            res.send(results.rows); }) 
        .catch((error) => {
            console.log('Error in getting all types - ', error);
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

/**
 * @api {get} /tournament/new  Request newest tournament made by user
 * @apiName GetNewestTournament
 * @apiGroup tournament
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiError GetNewestTournamentError   Error in getting newest tournament
 */ 
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

/**
 * @api {post} /tournament/create/entrant   Adds new entrants to databases with associated tournament id
 * @apiName PostTournamentEntrants
 * @apiGroup entrants
 *
 * @ApiPermission user   A user must be logged in
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *
 * @apiError CreateEntrantError   Error in POST new entrant
 */  
// Posts new tournament and associated entrants to "tournaments" and "tournament_entrants"
router.post( '/create/entrant', rejectUnauthenticated, (req, res) => {
    console.log('Req.body in post entrants - ', req.body);
    
    const entrant = req.body;
    const sqlText = `
        INSERT INTO "entrant" ("persona", "kingdom_id", "warriors")
        VALUES ($1, $2, $3)
        RETURNING id;`;
    // First, create the entrant in the entrant table
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

/**
 * @api {delete} /tournament/delete/:id   Deletes tournament associated with passed id
 * @apiName DeleteTournament
 * @apiGroup tournament
 *
 * @ApiPermission user    A user must be logged in
 * @apiParam {Number} id  Unique tournament ID.
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *
 * @apiError DeleteTournamentError   Error in DELETE tournament
 */  
// Deletes selected tournament and associated entrants
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

/**
 * @api {put} /tournament/score   Updates score of passed entrant
 * @apiName UpdateScore
 * @apiGroup entrants
 *
 * @ApiPermission user    A user must be logged in
 * @apiParam {Number} id  Unique entrant ID
 * 
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *
 * @apiError UpdateScoreError   Error in score PUT
 */  
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