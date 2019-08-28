import Session from "../../models/Session";
import Story from "../../models/Story";

export const resolvers = {
    Query: {
        async sessions(parent, { storyId }, context, info) {
            return await Story.find({ _id: storyId }).populate("sessions").sessions;
        },
        async session(parent, { _id }, context, info) {
            return await Session.findById(_id);
        }
    }
}