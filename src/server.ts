import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import { connectDb } from "./connectDb";
import mongoose from "mongoose";
import jokeSchema  from  './model/jokeSchema'

mongoose.set('strictQuery', false)

//Connect to MongoDB
connectDb()

const Joke = mongoose.model('joke', jokeSchema)

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

app.get("/jokes", async (req: Request, res: Response) => {
  const allJokes = await Joke.find()
  return res.status(200).json(allJokes);
});

app.post("/jokes/new", async ({body}: Request, res: Response) => {
  if(!body.id || !body.category || !body.joke){
    return res.status(404).json({error: "Missing data"})
  }
  const postJoke = new Joke({id: body.id, category: body.category, joke: body.joke})
  const allJokes = await Joke.find({id: body.id})
  if(allJokes.length >= 1){
    return res.status(405).json({error: "Joke is already in favourites!"})
  }
  try {
    await postJoke.save();
    return res.status(200).json({message: "Joke added succesfully!"})
  } catch(error){
    return res.status(404).json({error: "Error!"})
  }
})

app.delete("/jokes/delete/:id", async (req: Request, res: Response) => {
  const jokeId = req.params.id;
  const deletedJoke = await Joke.findOneAndDelete({id: jokeId});
  if(!deletedJoke){
    return res.status(404).json({ error: "Joke not found"})
  }
  return res.status(200).json({message: "Joke deleted"})
})


mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(3006, () => {
    console.log("Server running on port 3006!");
});
})

app.get("/", (req, res: Response) => {
    res.send("Application works!");
});
