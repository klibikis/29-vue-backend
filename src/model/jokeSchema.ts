import mongoose from "mongoose";
const { Schema } = mongoose;


export const jokeSchema = new Schema({
  id: Number,
  category: String,
  joke: String
});

export default jokeSchema;
