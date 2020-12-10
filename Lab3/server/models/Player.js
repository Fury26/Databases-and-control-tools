const { DataTypes } = require('sequelize');

const db = require('../db');

const Player = db.define('player', {
    lastname: {
        type: DataTypes.STRING,
    },
    firstname: {
        type: DataTypes.STRING,
    },
    club_id: {
        type: DataTypes.BIGINT,
    },
    birthday: {
        type: DataTypes.DATEONLY,
        get() {
            return new Date(this.getDataValue('birthday')).toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
}, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
});

Player.associate = models => {
    Player.belongsTo(models.Club, {
        foreignKey: 'club_id',
    });
}



module.exports = Player;