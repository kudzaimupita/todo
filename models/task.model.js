const crypto = require('crypto')

module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    description: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
    },

    completed: {
      type: Sequelize.BOOLEAN,
    },
    user: {
      type: Sequelize.INTEGER,
    },
  });

  return Task;
};