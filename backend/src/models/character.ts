import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  name: String,
  status: String,
  species: String, 
  gender: String,
  origin: {
    name: String,
    url: String
  }, 
  image: String
});

const Character = mongoose.model('Character', characterSchema);
export default Character;