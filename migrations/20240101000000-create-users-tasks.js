module.exports = {
    up: async (db) => {
      // Create 'users' collection and insert sample user
      await db.createCollection('users');
      await db.collection('users').insertOne({
        username: 'john_doe',
        email: 'john@example.com',
        password: 'hashed_password', // Ensure this is hashed in real applications
      });
  
      // Create 'tasks' collection and insert sample task
      await db.createCollection('tasks');
      await db.collection('tasks').insertOne({
        title: 'Complete migration task',
        description: 'Create migration files for task and user collections',
        priority: 'high',
        deadline: new Date('2024-12-31'),
        userId: { $oid: 'insert_user_object_id_here' }, // You can insert the actual ObjectId from the users collection
      });
    },
  
    down: async (db) => {
      // Rollback logic: Drop the 'tasks' and 'users' collections
      await db.collection('tasks').drop();
      await db.collection('users').drop();
    },
  };
  