const {Router} =  require('express');
const router = Router();
const Stadium = require('../models/Stadium');
const { Op, QueryTypes } = require('sequelize');
const db = require('../db');

router.get('/stadium', async (req, res) => {
    try {
        const stadiums = await Stadium.findAll();
        res.json(stadiums);
    }catch (e) {
        res.status(400).json(e);
    }
});

router.post('/stadium/search', async (req, res) => {
    try {
        const {title, capacity, city} = req.body;
        const where = {
            capacity,
            city: {
                [Op.iLike]: `%${city}%`,
            },
            title: {
                [Op.iLike]: `%${title}%`,
            },
        };
        Object.keys(where).forEach(key => {
            if(where[key] === undefined) {
                delete where[key];
            }
        });
        const stadiums = await Stadium.findAll({
            where,
        });
        res.json(stadiums);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/stadium/new', async (req, res) => {
    try {
        const newStadium = await Stadium.create({
            ...req.body,
        });
        res.json(newStadium);
    } catch (e) {
        res.status(400).json(e);
    }
});


router.delete('/stadium/:id', async (req, res) => {
    try {
        const response = await Stadium.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.put('/stadium/:id', async (req, res) => {
    try {
        let updatedStadium = await Stadium.update({
            ...req.body,
        }, {
            where: {
                id: req.params.id
            }
        });
        if(updatedStadium) {
            updatedStadium = await Stadium.findOne({
                where: {
                    id: req.params.id
                }
            });
        }
        res.json(updatedStadium);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/stadium/rand', async(req, res) => {
    try {
        const {count} = req.body;
        console.log(count);
        let response = await db.query(`INSERT INTO stadium(title, city, capacity) select getrandomstring(10) as title, getrandomstring(10) as city, randomnum(100000) as capacity from generate_series(1, ${count});`, { type: QueryTypes.INSERT });
        response = await db.query( `SELECT * FROM stadium ORDER BY id DESC FETCH FIRST ${count} ROW ONLY;`, { type: QueryTypes.SELECT });
        console.log(response);
        res.json(response);
    } catch (error) {
        res.status(400).json('Error');

        console.log(error.message);
    }
});


module.exports = router;