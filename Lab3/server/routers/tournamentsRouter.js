const {Router} =  require('express');
const router = Router();
const Tournament = require('../models/Tournament');
const { Op } = require('sequelize');

router.get('/tournament', async (req, res) => {
    try {
        const tournaments = await Tournament.findAll();
        res.json(tournaments);
    }catch (e) {
        res.status(400).json(e);
    }
});

router.post('/tournament/search', async (req, res) => {
    try {
        const {title, teams_count} = req.body;
        const where = {
            teams_count,
            title: {
                [Op.iLike]: `%${title}%`,
            },
        };
        Object.keys(where).forEach(key => {
            if(where[key] === undefined) {
                delete where[key];
            }
        });
        const tournaments = await Tournament.findAll({
            where,
        });
        res.json(tournaments);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/tournament/new', async (req, res) => {
    try {
        const newTournament = await Tournament.create({
            ...req.body,
        });
        res.json(newTournament);
    } catch (e) {
        res.status(400).json(e);
    }
});


router.delete('/tournament/:id', async (req, res) => {
    try {
        const response = await Tournament.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.put('/tournament/:id', async (req, res) => {
    try {
        let updatedTournament = await Tournament.update({
            ...req.body,
        }, {
            where: {
                id: req.params.id
            }
        });
        if(updatedTournament) {
            updatedTournament = await Tournament.findOne({
                where: {
                    id: req.params.id
                }
            });
        }
        res.json(updatedTournament);
    } catch (e) {
        res.status(400).json(e);
    }
});

module.exports = router;