import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  saved: Schema.Types.ObjectId[];
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  picture: { type: String, required: true },
  saved: { type: Schema.Types.ObjectId, ref: "Job" },
});

const User = models.User || model("User", UserSchema);

export default User;
