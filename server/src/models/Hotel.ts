import { Schema, model } from 'mongoose';

const ownerDetailsSchema = new Schema({
  registrationDate: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  position: { type: String, required: true },
  mobilePhone: { type: String, required: true },
  fullName: { type: String, required: true },
});

const hotelDetailsSchema = new Schema({
  hotelName: { type: String, required: true },
  hotelINN: { type: String, required: true },
  hotelAddress: { type: String, required: true },
  totalArea: { type: Number, required: true },
  landArea: { type: Number, required: false },
  numberOfRooms: { type: Number, required: true },
  roomsByCategory: { type: Map, of: Number, required: true },
  numberOfFoodOutlets: { type: Number, required: false },
  seatsAtFoodPoints: { type: Map, of: Number, required: false },
  totalConferenceRoomArea: { type: Number, required: false },
  numberOfConferenceRooms: { type: Number, required: false },
  conferenceRoomAreas: { type: Map, of: Number, required: false },
  totalSpaArea: { type: Number, required: false },
  numberOfSpaRooms: { type: Number, required: false },
});

const accessSchema = new Schema({
  active: { type: Boolean, default: true },
  dailyRevenueReport: { type: Boolean, default: true },
  monthlyPerformanceReport: { type: Boolean, default: true },
  yearlyValuationReport: { type: Boolean, default: true },
  handbook: { type: Boolean, default: true },
  calendar: { type: Boolean, default: true },
});

const hotelSchema = new Schema({
  ownerDetails: { type: ownerDetailsSchema, required: true },
  hotelDetails: { type: hotelDetailsSchema, required: true },
  access: { type: accessSchema, required: true },
});

const Hotel = model('Hotel', hotelSchema);

export default Hotel;
