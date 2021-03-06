import { Schema, Document, model} from "mongoose";
import { IUser } from "./User";
import mongooseAutoPopulate from "mongoose-autopopulate";
/**
 * Expedient model
 */
export interface IExpedient extends Document {
  patient: IUser;
  records: Array<object>;
  files: Array<object>;
  requestAccess: string;
}

/**
 * Expedient schema
 * @param patient - type: IUser, required: true
 * @param records - type: Array<object>, required: true.plugin(mongooseDeepPopulate);
 * @param files - type: Array<object>, required: true
 */
const ExpedientSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true,
  },
  records: [
    {
      record: String,
      date: Schema.Types.Date,
    },
  ],
  files: [
    {
      name: String,
      extension: String,
      url: String,
      public_id: String,
    },
  ],
  requestAccess: {
    type: String,
    enum: ["pending", "accepted", "default"],
    default: "default",
  }
}).plugin(mongooseAutoPopulate)


export default model<IExpedient>("Expedient", ExpedientSchema);
