import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  stars: { type: Number, required: true },
  hasSpa: { type: Boolean, default: false },
  hasPool: { type: Boolean, default: false },
  priceCategory: { type: Number, required: true }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
