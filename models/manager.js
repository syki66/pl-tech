module.exports = function (sequelize, DataTypes) {
  const manager = sequelize.define('Manager', {
    manager_id: { field: 'manager_id', type: DataTypes.STRING(50), unique: true, allowNull: false },
    password: { field: 'password', type: DataTypes.STRING(100), allowNull: false },
  }, {
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps: false,
    // define the table's name
    tableName: "manager"
  });

  return manager;
};

  /*
   Sequelize 참고
   DataTypes => http://docs.sequelizejs.com/en/v3/api/datatypes/
   Associations => http://docs.sequelizejs.com/en/v3/api/associations/
   Model Function => http://docs.sequelizejs.com/en/v3/api/model/
   */