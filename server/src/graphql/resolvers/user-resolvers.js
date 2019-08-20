import User from "../../models/User";

export const resolvers = {
    Query: {
        async users(parent, {}, context, info) {
            return await User.find();
        },
        async user(parent, { _id }, context, info) {
            return await User.findById(_id);
        }
    }
}