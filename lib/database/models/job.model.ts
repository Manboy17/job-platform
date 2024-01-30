import { Schema, model, models } from "mongoose";

export interface IJob extends Document {
  _id: string;
  position: string;
  shortDesc: string;
  description: string;
  city: string;
  type: string;
  industry: string;
  experience: number;
  company: string;
  creator: { _id: string; firstName: string; lastName: string };
  createdAt: Date;
}

const JobSchema = new Schema({
  position: { type: String, required: true },
  shortDesc: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, required: true },
  industry: { type: String, required: true },
  experience: { type: Number, required: true },
  company: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Job = models.Job || model("Job", JobSchema);

export default Job;
