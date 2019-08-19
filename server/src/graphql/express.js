import ExpressGraphQL from "express-graphql";
import {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} from "graphql";

import UserModel from "../models/User";

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        displayName: { type: GraphQLString }
    }
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            people: {
                type: GraphQLList(UserType),
                resolve: (root, args, context, info) => {
                    return UserModel.find().exec();
                }
            },
            person: {
                type: UserType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: (root, args, context, info) => {
                    return UserModel.findById(args.id).exec();
                }
            }
        }
    })
});

export default ExpressGraphQL({
    schema: schema,
    graphiql: true
});