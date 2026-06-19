import Bus from '../models/Bus.js';
import Tracking from '../models/Tracking.js';

export const getAllBuses = async (req, res) => {
  try {
    const { status, type, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (type) filter.type = type;
    if (search) {
      filter.$or = [
        { busNumber: { $regex: search, $options: 'i' } },
        { busName: { $regex: search, $options: 'i' } },
      ];
    }

    const buses = await Bus.find(filter).populate('operator', 'name email').sort('-createdAt');

    res.json({
      success: true,
      count: buses.length,
      data: buses,
    });
  } catch (error) {
    console.error('[v0] Get buses error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).populate('operator', 'name email');

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found',
      });
    }

    res.json({
      success: true,
      data: bus,
    });
  } catch (error) {
    console.error('[v0] Get bus error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createBus = async (req, res) => {
  try {
    const { busNumber, busName, type, totalSeats, status, amenities } = req.body;

    if (!busNumber || !busName || !type || !totalSeats) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const bus = new Bus({
      busNumber,
      busName,
      type,
      totalSeats,
      status: status || 'active',
      amenities: amenities || [],
      operator: req.userId,
    });

    await bus.save();

    // Create tracking record for the bus
    await Tracking.create({
      busId: bus._id,
      latitude: 6.9271,
      longitude: 79.8612,
      status: 'offline',
    });

    res.status(201).json({
      success: true,
      message: 'Bus created successfully',
      data: bus,
    });
  } catch (error) {
    console.error('[v0] Create bus error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBus = async (req, res) => {
  try {
    const { busNumber, busName, type, totalSeats, status, amenities } = req.body;

    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { busNumber, busName, type, totalSeats, status, amenities },
      { new: true, runValidators: true }
    );

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found',
      });
    }

    res.json({
      success: true,
      message: 'Bus updated successfully',
      data: bus,
    });
  } catch (error) {
    console.error('[v0] Update bus error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found',
      });
    }

    // Delete tracking record
    await Tracking.deleteOne({ busId: req.params.id });

    res.json({
      success: true,
      message: 'Bus deleted successfully',
    });
  } catch (error) {
    console.error('[v0] Delete bus error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
