import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const  eventoSchema=new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  rating: { type: Number, required: true },
  numReviews: { type: Number, required: true },
  reviews: [reviewSchema],
},
{
  timestamps: true,
}

)

const Evento = mongoose.model('evento',  eventoSchema);

export default Evento;
