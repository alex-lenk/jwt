import {Request, Response} from 'express';
import * as hotelService from '../services/hotelService';
import ApiError from '../exceptions/api-error';

export const getAllHotels = async (req: Request, res: Response) => {
  const hotels = await hotelService.getAllHotels();
  if (!hotels) {
    throw ApiError.BadRequest('Error fetching hotels');
  }
  res.json(hotels);
};

export const createHotel = async (req: Request, res: Response) => {
  const hotelData = req.body;
  if (!hotelData) {
    throw ApiError.BadRequest('Invalid hotel data');
  }
  const hotel = await hotelService.createHotel(hotelData);
  res.status(201).json(hotel);
};

export const getHotelById = async (req: Request, res: Response) => {
  const hotel = await hotelService.getHotelById(req.params.id);
  if (!hotel) {
    throw ApiError.BadRequest(`No hotel found with id: ${req.params.id}`);
  }
  res.json(hotel);
};

export const updateHotel = async (req: Request, res: Response) => {
  const updatedHotel = await hotelService.updateHotel(req.params.id, req.body);
  if (!updatedHotel) {
    throw ApiError.BadRequest(`Failed to update hotel with id: ${req.params.id}`);
  }
  res.json(updatedHotel);
};

export const deleteHotel = async (req: Request, res: Response) => {
  const deleted = await hotelService.deleteHotel(req.params.id);
  if (!deleted) {
    throw ApiError.BadRequest(`Failed to delete hotel with id: ${req.params.id}`);
  }
  res.status(204).send();
};
