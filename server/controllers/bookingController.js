import Booking from '../models/Booking.js';
import Schedule from '../models/Schedule.js';
import QRCode from 'qrcode';

export const createBooking = async (req, res) => {
  try {
    const { scheduleId, seatNumbers, passengerDetails } = req.body;

    if (!scheduleId || !seatNumbers || seatNumbers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide schedule ID and seat numbers',
      });
    }

    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found',
      });
    }

    // Check seat availability
    if (seatNumbers.length > schedule.availableSeats) {
      return res.status(400).json({
        success: false,
        message: 'Not enough available seats',
      });
    }

    const totalPrice = seatNumbers.length * schedule.fare;

    const booking = new Booking({
      userId: req.userId,
      scheduleId,
      busId: schedule.busId,
      seatNumbers,
      travelDate: schedule.date,
      totalPrice,
      status: 'pending',
      passengerDetails: passengerDetails || [],
    });

    await booking.save();

    // Update schedule available seats
    schedule.availableSeats -= seatNumbers.length;
    schedule.occupancyRate = ((schedule.totalSeats - schedule.availableSeats) / schedule.totalSeats) * 100;
    await schedule.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    console.error('[v0] Create booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate('scheduleId')
      .populate('busId', 'busNumber busName type')
      .sort('-createdAt');

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('[v0] Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('scheduleId')
      .populate('busId')
      .populate('userId', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check authorization
    if (booking.userId._id.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking',
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('[v0] Get booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled',
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Restore available seats
    const schedule = await Schedule.findById(booking.scheduleId);
    if (schedule) {
      schedule.availableSeats += booking.seatNumbers.length;
      schedule.occupancyRate = ((schedule.totalSeats - schedule.availableSeats) / schedule.totalSeats) * 100;
      await schedule.save();
    }

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error) {
    console.error('[v0] Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    booking.status = 'confirmed';
    booking.paymentStatus = 'completed';

    // Generate QR code
    const qrData = `Booking ID: ${booking._id}\nSeats: ${booking.seatNumbers.join(', ')}\nPrice: Rs. ${booking.totalPrice}`;
    const qrCode = await QRCode.toDataURL(qrData);
    booking.qrCode = qrCode;

    await booking.save();

    res.json({
      success: true,
      message: 'Booking confirmed successfully',
      data: booking,
    });
  } catch (error) {
    console.error('[v0] Confirm booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const { status, userId, scheduleId } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (userId) filter.userId = userId;
    if (scheduleId) filter.scheduleId = scheduleId;

    const bookings = await Booking.find(filter)
      .populate('userId', 'name email')
      .populate('scheduleId')
      .populate('busId', 'busNumber busName')
      .sort('-createdAt');

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('[v0] Get all bookings error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};export const getBookedSeats = async (req, res) => {
  try {
    const { scheduleId } = req.params;

    const bookings = await Booking.find({
      scheduleId,
      status: { $ne: 'cancelled' },
    });

    const bookedSeats = bookings.flatMap(
      booking => booking.seatNumbers
    );

    res.json({
      success: true,
      bookedSeats,
    });
  } catch (error) {
    console.error('[v0] Get booked seats error:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
