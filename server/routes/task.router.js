const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {             //GET from database "tasks"
    let queryText = 'SELECT * FROM "tasks" ORDER BY "name";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting tasks', error);
      res.sendStatus(500);
    });
});                                       //END ROUTER GET


router.post('/',  (req, res) => {           //POST to database "tasks"
    let newTask = req.body;
    console.log(`Adding task`, newTask);
    //  use , after name when inserting new columns see line below this
    let queryText = `INSERT INTO "tasks" ("name")
                     VALUES ($1);`;
    pool.query(queryText, [newTask.name])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
});                                       //END ROUTER POST


router.put('/isdone/:id', (req,res) => {  //PUT insert ISDONE TRUE database "tasks"
    console.log('in PUT')
    const id = req.params.id;
    console.log('put request',id);
    let queryText = `UPDATE "tasks" SET "isDone" = true WHERE "id" = $1;`;
    pool.query(queryText, [id])
    .then(() => {
      console.log('updated with task PUT successful');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('PUT error updating, query:', queryText,  'error: ',error);
      res.send (500);
    } )
})                                          //END ROUTER PUT


router.put('/isnotdone/:id', (req,res) => {  //PUT insert ISDONE FALSE to database "tasks"
    console.log('in PUT')
    const id = req.params.id;
    console.log('put request',id);
    let queryText = `UPDATE "tasks" SET "isDone" = false WHERE "id" = $1;`;
    pool.query(queryText, [id])
    .then(() => {
      console.log('updated with task not done PUT successful');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('PUT error updating, query:', queryText,  'error: ',error);
      res.send (500);
    } )
})                                          //END ROUTER PUT


router.delete('/:id', (req, res) => {       //DELETE from database "tasks"
    const id = req.params.id;
    console.log('delete request for id:', id);
    const queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;
    pool.query(queryText, [id])
        .then(() => {
            console.log('task deleted!')
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error deleting with query: ${queryText}, error: ${error}`);
            res.sendStatus(500);
        })
})                                          //END ROUTER DELETE


module.exports = router;