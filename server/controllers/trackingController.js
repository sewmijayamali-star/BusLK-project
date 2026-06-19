import Tracking from '../models/Tracking.js';
import Bus from '../models/Bus.js';

export const getBusTracking = async (req, res) => {
  try {
    const tracking = await Tracking.findOne({ busId: req.params.busId }).populate(
      'busId',
      'busNumber busName type'
    );

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: 'Tracking data not found',
      });
    }

    res.json({
      success: true,
      data: tracking,
    });
  } catch (error) {
    console.error('[v0] Get tracking error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBusLocation = async (req, res) => {
  try {
    const { latitude, longitude, speed, heading, status, address, nextStop } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude',
      });
    }

    let tracking = await Tracking.findOne({ busId: req.params.busId });

    if (!tracking) {
      tracking = new Tracking({
        busId: req.params.busId,
        latitude,
        longitude,
        speed: speed || 0,
        heading: heading || 0,
        status: status || 'moving',
        address: address || null,
        nextStop: nextStop || null,
      });
    } else {
      tracking.latitude = latitude;
      tracking.longitude = longitude;
      tracking.speed = speed || tracking.speed;
      tracking.heading = heading || tracking.heading;
      tracking.status = status || tracking.status;
      tracking.address = address || tracking.address;
      tracking.nextStop = nextStop || tracking.nextStop;
    }

    await tracking.save();

    res.json({
      success: true,
      message: 'Location updated successfully',
      data: tracking,
    });
  } catch (error) {
    console.error('[v0] Update location error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTracking = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) filter.status = status;

    const trackings = await Tracking.find(filter)
      .populate('busId', 'busNumber busName type status')
      .sort('-lastUpdated');

    res.json({
      success: true,
      count: trackings.length,
      data: trackings,
    });
  } catch (error) {
    console.error('[v0] Get all tracking error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBusesOnMap = async (req, res) => {
  try {
    const trackings = await Tracking.find({ status: { $in: ['moving', 'stationary'] } })
      .populate('busId', 'busNumber busName type')
      .select('busId latitude longitude speed status lastUpdated');

    const mapData = trackings.map((t) => ({
      busId: t.busId._id,
      busNumber: t.busId.busNumber,
      busName: t.busId.busName,
      latitude: t.latitude,
      longitude: t.longitude,
      speed: t.speed,
      status: t.status,
      lastUpdated: t.lastUpdated,
    }));

    res.json({
      success: true,
      count: mapData.length,
      data: mapData,
    });
  } catch (error) {
    console.error('[v0] Get map data error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTrackingHistory = async (req, res) => {
  try {
    const tracking = await Tracking.findOne({ busId: req.params.busId }).populate(
      'busId scheduleId'
    );

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: 'No tracking data found',
      });
    }

    res.json({
      success: true,
      data: tracking,
    });
  } catch (error) {
    console.error('[v0] Get history error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
