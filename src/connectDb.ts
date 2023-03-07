import mongoose from 'mongoose';

export const connectDb = async () => {
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017', {
      dbName: 'jokes'
    });
  } catch(err){
    console.log(err);
  }
};
