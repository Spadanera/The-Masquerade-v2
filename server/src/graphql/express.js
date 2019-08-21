import fs from "fs";
import path from "path";
import { merge } from 'lodash';
import ExpressGraphQL from "express-graphql";
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers as queryResolvers } from './resolvers/chronicle-resolvers';
import { resolvers as userResolvers } from './resolvers/user-resolvers';
import { resolvers as playerResolvers } from './resolvers/player-resolvers';
import { resolvers as characterResolvers } from './resolvers/character-resolvers';
import { resolvers as storyResolvers } from './resolvers/story-resolvers';
import { resolvers as sessionResolvers } from './resolvers/session-resolvers';
import { resolvers as coterieResolvers } from './resolvers/coterie-resolvers';

const schema = makeExecutableSchema({
    typeDefs: fs.readFileSync(path.join(__dirname, "api.graphql"), 'utf-8'),
    resolvers: merge(queryResolvers, userResolvers, playerResolvers, characterResolvers, storyResolvers, sessionResolvers, coterieResolvers)
});

export default ExpressGraphQL({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: (error) => {
        return {
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path,
            statusCode: 401
        };
    }
});