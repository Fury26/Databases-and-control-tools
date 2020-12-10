const { DataTypes } = require('sequelize');

const db = require('../db');

const ClubsTournaments = db.define('clubs_tournaments', {
    club_id: {
        type: DataTypes.BIGINT,
    },
    tournament_id: {
        type: DataTypes.BIGINT,
    },
}, {
    primaryKey: false,
    underscored: true,
    freezeTableName: true,
    timestamps: false,
});

//ClubsTournaments.removeAttribute('id');


module.exports = ClubsTournaments;