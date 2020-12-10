const { DataTypes } = require('sequelize');

const db = require('../db');


const Club = db.define('club', {
    name: {
        type: DataTypes.STRING,
    }
}, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
});

Club.associate = models => {
    Club.hasMany(models.Player, {
        foreignKey: 'club_id',
        as: 'players',
    });
    Club.belongsToMany(models.Tournament, {
        foreignKey: 'club_id',
        through: models.ClubsTournaments,
    });
}


module.exports = Club;