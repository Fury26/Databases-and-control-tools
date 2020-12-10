const { DataTypes } = require('sequelize');

const db = require('../db');

const Stadium = db.define('stadium', {
    title: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    capacity: {
        type: DataTypes.INTEGER,
    }
}, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
});

Stadium.associate = models => {
    Stadium.belongsTo(models.Club, {
        foreignKey: 'tournament_id',
        through: models.ClubStadium,
    });
}

module.exports = Stadium;