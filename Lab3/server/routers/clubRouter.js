const {Router} =  require('express');
const router = Router();
const Club = require('../models/Club');
const { Op, QueryTypes } = require('sequelize');
const db = require('../db');

router.get('/club', async (req, res) => {
    try {
        const clubs = await Club.findAll();
        res.json(clubs);
    }catch (e) {
        res.status(400).json(e);
    }
});

router.post('/club/search', async (req, res) => {
    try {
        const {name} = req.body;
        const clubs = await Club.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
        res.json(clubs);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/club/new', async (req, res) => {
   try {
       const {name} = req.body;
       const newClub = await Club.create({
           name
       });
       res.json(newClub);
   } catch (e) {
       res.status(400).json(e);
   }
});


router.delete('/club/:id', async (req, res) => {
    try {
        const response = await Club.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.put('/club/:id', async (req, res) => {
   try {
       console.log(req.params.id, 'body', req.body);

       const {name} = req.body;
       let updatedClub = await Club.update({
           name: name,
       }, {
            where: {
                id: req.params.id
            }
       });
       if(updatedClub) {
           updatedClub = await Club.findOne({
               where: {
                   id: req.params.id
               }
           });
       }
       res.json(updatedClub);
   } catch (e) {
       res.status(400).json(e);
   }
});

router.post('/club/rand', async(req, res) => {
    try {
        const {count} = req.body;
        console.log(count);
        let response = await db.query(`INSERT INTO club(name) select getrandomstring(10) as name from generate_series(1, ${count});`, { type: QueryTypes.INSERT });
        response = await db.query( `SELECT * FROM club ORDER BY id DESC FETCH FIRST ${count} ROW ONLY;`, { type: QueryTypes.SELECT });
        console.log(response);
        res.json(response);
    } catch (error) {
        res.status(400).json('Error');

        console.log(error.message);
    }
})


module.exports = router;