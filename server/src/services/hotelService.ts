import Hotel from '../models/Hotel';

export const getAllHotels = async () => {
  return await Hotel.find();
};

export const createHotel = async (hotelData: any) => {
  const hotel = new Hotel(hotelData);
  return await hotel.save();
};

export const getHotelById = async (id: string) => {
  return await Hotel.findById(id);
};

export const updateHotel = async (id: string, hotelData: any) => {
  return await Hotel.findByIdAndUpdate(id, hotelData, {new: true});
};

export const deleteHotel = async (id: string) => {
  return await Hotel.findByIdAndDelete(id);
};
