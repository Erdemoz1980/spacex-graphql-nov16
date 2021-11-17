const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const dotenv = require('dotenv');
const schema = require('./schema/schema');

dotenv.config({ path: './config/config.env' });

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}))

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is listenning on PORT:${PORT}`));
