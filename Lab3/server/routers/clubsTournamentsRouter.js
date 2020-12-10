const {Router} =  require('express');
const router = Router();
const ClubsTournaments = require('../models/ClubsTournaments');
const { Op } = require('sequelize');

router.get('/clubs_tournaments', async (req, res) => {
    try {
        const clubsTournaments = await ClubsTournaments.findAll();
        res.json(clubsTournaments);
    }catch (e) {
        res.status(400).json(e);
    }
});

router.post('/clubs_tournaments/search', async (req, res) => {
    try {
        const {club_id, tournament_id} = req.body;
        const where = {
            club_id,
            tournament_id,
        };
        Object.keys(where).forEach(key => {
            if(where[key] === undefined) {
                delete where[key];
            }
        });
        const clubsTournaments = await ClubsTournaments.findAll({
            where,
        });
        res.json(clubsTournaments);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/clubs_tournaments/new', async (req, res) => {
    try {
        const newClubsTournaments = await ClubsTournaments.create({
            ...req.body,
        });
        res.json(newClubsTournaments);
    } catch (e) {
        res.status(400).json(e);
    }
});


router.delete('/clubs_tournaments/:id', async (req, res) => {
    try {
        const response = await ClubsTournaments.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.put('/clubs_tournaments/:id', async (req, res) => {
    try {
        let updatedClubsTournaments = await ClubsTournaments.update({
            ...req.body,
        }, {
            where: {
                id: req.params.id
            }
        });
        if(updatedClubsTournaments) {
            updatedClubsTournaments = await ClubsTournaments.findOne({
                where: {
                    id: req.params.id
                }
            });
        }
        res.json(updatedClubsTournaments);
    } catch (e) {
        res.status(400).json(e);
    }
});

module.exports = router;