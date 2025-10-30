import { Schema, model, Document } from "mongoose";

// Inherit from Document interface, so IRole has all properties of a Mongoose document, plus the ones I define here.
export interface IRole extends Document {
  role: string;
  description?: string;
  active: boolean;
}

/** 
 * Define the Role schema, for whenever I create a role for the db, I can 
 * only add these fields. Mongoose will enforce this structure, bc by default 
 * it allows any structure. Using IRole interface to type the schema(for TS 
 * only).
 */
const RoleSchema = new Schema<IRole>({
  role: { type: String, required: true, unique: true},
  description: { type: String },
  active: { type: Boolean, default: true}
}, 
{
  collection: "roles",
  timestamps: true
})

export default model<IRole>("Role", RoleSchema); // RoleSchema has an alias of Role, for wherever we import it.