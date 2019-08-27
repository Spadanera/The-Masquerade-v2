import Coterie from "../../models/Coterie";
import Character from '../../models/Character';

export const resolvers = {
    Query: {
        async coteries(parent, {}, context, info) {
            return await Coterie.find();
        },
        async coterie(parent, { _id }, context, info) {
            return await Coterie.findById(_id);
        }
    },
    Coterie: {
        async characters(parent, {}, context, info) {
            return await Character.find({ _id: { $in: parent.characters }});
        }
    }
}