// module.exports = {
//   mongodb: {
//     url: 'mongodb://localhost:27017/taskmaster_db',  // Your MongoDB connection URI
//     databaseName: 'taskmaster_db',  // Your MongoDB database name
//     options: {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     }
//   },
//   migrationsDir: "migrations",  // Directory where migration files will be stored
//   changelogCollectionName: "changelog"  // Collection for tracking applied migrations
// };

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
