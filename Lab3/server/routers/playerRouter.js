const {Router} =  require('express');
const router = Router();
const Player = require('../models/Player');
const { Op } = require('sequelize');

router.get('/player', async (req, res) => {
    try {
        const players = await Player.findAll();
        res.json(players);
    }catch (e) {
        res.status(400).json(e);
    }
});

router.post('/player/search', async (req, res) => {
    try {
        const {firstname, lastname, birthday, club_id} = req.body;
        const where = {
            club_id,
            birthday,
            firstname: {
                [Op.iLike]: `%${firstname}%`,
            },
            lastname: {
                [Op.iLike]: `%${lastname}%`,
            },
        };
        Object.keys(where).forEach(key => {
            if(where[key] === undefined) {
                delete where[key];
            }
        });
        const players = await Player.findAll({
            where,
        });
        res.json(players);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/player/new', async (req, res) => {
    try {
        const newPlayer = await Player.create({
            ...req.body,
        });
        res.json(newPlayer);
    } catch (e) {
        res.status(400).json(e);
    }
});


router.delete('/player/:id', async (req, res) => {
    try {
        const response = await Player.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.put('/player/:id', async (req, res) => {
    try {
        let updatedPlayer = await Player.update({
            ...req.body,
        }, {
            where: {
                id: req.params.id
            }
        });
        if(updatedPlayer) {
            updatedPlayer = await Player.findOne({
                where: {
                    id: req.params.id
                }
            });
        }
        res.json(updatedPlayer);
    } catch (e) {
        res.status(400).json(e);
    }
});

module.exports = router;