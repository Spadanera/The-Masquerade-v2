import Character from "../../models/Character";

export const resolvers = {
    Query: {
        async characters(parent, {}, context, info) {
            return await Character.find();
        },
        async character(parent, { _id }, context, info) {
            return await Character.findById(_id);
        }
    }
}