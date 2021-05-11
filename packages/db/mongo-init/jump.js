/**
 * https://stackoverflow.com/questions/42912755/how-to-create-a-db-for-mongodb-container-on-start-up
 * mongodb://jumpuser:jump123@localhost:28017/jump?authSource=jump
 */ 

conn = new Mongo();
db = conn.getDB("jump");
db.createUser({
  user: "jumpuser",
  pwd: "jump123",
  roles: [
    {
      role: "readWrite",
      db: "jump",
    },
  ],
});
