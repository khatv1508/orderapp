module.exports = (sequelize, Sequelize) => {
    class Role extends Sequelize.Model {}
    Role.init({
      role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      role_name: {
        type: Sequelize.STRING
      },
    }, { sequelize, modelName: 'roles', timestamps: false, underscored: true });
    return Role;
  };