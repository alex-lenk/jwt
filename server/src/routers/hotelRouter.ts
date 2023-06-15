import express from 'express';
import * as hotelController from '../controllers/hotelController';

const router = express.Router();

router.get('/', hotelController.getAllHotels);
router.post('/', hotelController.createHotel);
router.get('/:id', hotelController.getHotelById);
router.put('/:id', hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);

export default router;
