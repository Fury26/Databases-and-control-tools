const {Router} =  require('express');
const router = Router();
const Match = require('../models/Match');
const { Op } = require('sequelize');

router.get('/match', async (req, res) => {
    try {
        const matches = await Match.findAll();
        res.json(matches);
    }catch (e) {
        res.status(400).json(e);
    }
});

router.post('/match/search', async (req, res) => {
    try {
        const {result, tournament_id, home_club_id, away_club_id, ticket_cost, datetime} = req.body;
        const where = {
            tournament_id,
            home_club_id,
            away_club_id,
            ticket_cost,
            result: {
                [Op.iLike]: `%${result}%`,
            },
            datetime,
        };
        Object.keys(where).forEach(key => {
            if(where[key] === undefined) {
                delete where[key];
            }
        });
        const matches = await Match.findAll({
            where,
        });
        res.json(matches);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/match/new', async (req, res) => {
    try {
        const newMatch = await Match.create({
            ...req.body,
        });
        res.json(newMatch);
    } catch (e) {
        res.status(400).json(e);
    }
});


router.delete('/match/:id', async (req, res) => {
    try {
        const response = await Match.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.put('/match/:id', async (req, res) => {
    try {
        let updatedMatch = await Match.update({
            ...req.body,
        }, {
            where: {
                id: req.params.id
            }
        });
        if(updatedMatch) {
            updatedMatch = await Match.findOne({
                where: {
                    id: req.params.id
                }
            });
        }
        res.json(updatedMatch);
    } catch (e) {
        res.status(400).json(e);
    }
});

module.exports = router;