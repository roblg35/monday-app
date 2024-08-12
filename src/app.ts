import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import fragranceRoutes from './routes/fragranceRoutes';
import schema from './schema';
import resolvers from './resolvers';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(routes);

app.use('/api', fragranceRoutes); // Use the routes

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));


app.listen(port, () => console.log(`Quickstart app listening at http://localhost:${port}`));

