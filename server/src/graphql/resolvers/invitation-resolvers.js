import Invitation from "../../models/Invitation";

export const resolvers = {
    Query: {
        async invitations(parent, param, context, info) {
            return await Invitation.find();
        },
        async invitation(parent, { _id }, context, info) {
            return await Invitation.findById(_id);
        }
    }
};