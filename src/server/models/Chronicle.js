import mongoose from 'mongoose';
import { schema as Story } from './Story';
import { schema as Coterie } from './Coterie';
// import { schema as Player } from './Player';

const Statuses = Object.freeze({
  Draft: 'draft',
  Live: 'live',
  archived: 'archived',
  deleted: 'deleted'
})

let ChronicleSchema = new mongoose.Schema({
  name: String,
  description: String,
  storyTeller: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  status: { type: String, enum: Object.values(Statuses), default: 'draft' },
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  conteries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coterie' }],
  // players: [Player]
});

Object.assign(ChronicleSchema.static, { Statuses });

export default mongoose.model('Chronicle', ChronicleSchema);