export default () => ({
  port: process.env.PORT || 3000,
  database: {
    connectionString: process.env.MONGO_URL,
  },
});
