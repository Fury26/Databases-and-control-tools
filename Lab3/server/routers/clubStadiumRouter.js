const {Router} =  require('express');
const router = Router();
const ClubStadium = require('../models/ClubStadium');
const { Op } = require('sequelize');

router.get('/club_stadium', async (req, res) => {
    try {
        const clubStadium = await ClubStadium.findAll();
        res.json(clubStadium);
    }catch (e) {
        res.status(400).json(e);
    }
});

router.post('/club_stadium/search', async (req, res) => {
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
        const clubStadium = await ClubStadium.findAll({
            where,
        });
        res.json(clubStadium);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/club_stadium/new', async (req, res) => {
    try {
        const newClubStadium = await ClubStadium.create({
            ...req.body,
        });
        res.json(newClubStadium);
    } catch (e) {
        res.status(400).json(e);
    }
});


router.delete('/club_stadium/:id', async (req, res) => {
    try {
        const response = await ClubStadium.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.put('/club_stadium/:id', async (req, res) => {
    try {
        let updatedClubStadium = await ClubStadium.update({
            ...req.body,
        }, {
            where: {
                id: req.params.id
            }
        });
        if(updatedClubStadium) {
            updatedClubStadium = await ClubStadium.findOne({
                where: {
                    id: req.params.id
                }
            });
        }
        res.json(updatedClubStadium);
    } catch (e) {
        res.status(400).json(e);
    }
});

module.exports = router;