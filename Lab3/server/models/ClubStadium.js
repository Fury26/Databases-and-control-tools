const { DataTypes } = require('sequelize');

const db = require('../db');

const ClubStadium = db.define('club_stadium', {
    club_id: {
        type: DataTypes.BIGINT,
    },
    stadium_id: {
        type: DataTypes.BIGINT,
    },
}, {
    primaryKey: false,
    underscored: true,
    freezeTableName: true,
    timestamps: false,
});

ClubStadium.removeAttribute('id');

module.exports = ClubStadium;