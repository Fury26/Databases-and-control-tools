const { DataTypes } = require('sequelize');

const db = require('../db');
// const Player = require('./Player');

const convertDate = time => {
    let res = '';
    res += time.getFullYear().toString() + '-';
    res += (time.getMonth() + 1).toString() + '-';
    res += time.getDate().toString() + ' ';
    res += time.getHours().toString() + ':';
    res += time.getMinutes().toString() + ':';
    res += time.getSeconds().toString();
    return res;
}

const Match = db.define('match', {
    tournament_id: {
        type: DataTypes.BIGINT,
    },
    home_club_id: {
        type: DataTypes.BIGINT,
    },
    away_club_id: {
        type: DataTypes.BIGINT,
    },
    result: {
        type: DataTypes.STRING,
    },
    datetime: {
        type: DataTypes.DATE,
        get() {
            const time = new Date(this.getDataValue('datetime')).toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            return time;
        }
    },
    ticket_cost: {
        type: DataTypes.FLOAT,
    }
}, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
});

Match.associate = models => {
    // Match.hasMany(models.Club, {
    //     foreignKey: 'Match_id',
    //     as: 'players',
    // });
    Match.hasOne(models.Tournament, {
        foreignKey: 'tournament_id',
    });
}

module.exports = Match;