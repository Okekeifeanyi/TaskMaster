
// In migrate-mongo-config.js
module.exports = {
  mongodb: {
    url: "mongodb://localhost:27017/taskmaster_db",
    databaseName: "taskmaster_db",
    options: {
      // Remove useNewUrlParser and useUnifiedTopology
    },
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
};
