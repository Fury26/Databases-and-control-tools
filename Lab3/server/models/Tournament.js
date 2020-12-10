const { DataTypes } = require('sequelize');

const db = require('../db');
// const Player = require('./Player');

const Tournament = db.define('tournament', {
    title: {
        type: DataTypes.STRING,
    },
    teams_count: {
        type: DataTypes.INTEGER,
    }
}, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
});

Tournament.associate = models => {
    Tournament.hasMany(models.Match, {
        foreignKey: 'tournament_id',
        as: 'players',
    });
    Tournament.hasMany(models.Club, {
        foreignKey: 'tournament_id',
        through: models.ClubsTournaments,
    });
}

module.exports = Tournament;