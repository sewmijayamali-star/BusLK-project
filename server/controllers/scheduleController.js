import Schedule from '../models/Schedule.js';
import Bus from '../models/Bus.js';

export const getAllSchedules = async (req, res) => {
  try {
    const { busId, routeId, date, status } = req.query;
    const filter = {};

    if (busId) filter.busId = busId;
    if (routeId) filter.routeId = routeId;
    if (status) filter.status = status;
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const schedules = await Schedule.find(filter)
      .populate('busId', 'busNumber busName type totalSeats')
      .populate('routeId', 'origin destination distance')
      .sort({ date: 1, departureTime: 1 });

    res.json({
      success: true,
      count: schedules.length,
      data: schedules,
    });
  } catch (error) {
    console.error('[v0] Get schedules error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('busId')
      .populate('routeId');

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found',
      });
    }

    res.json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    console.error('[v0] Get schedule error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const { busId, routeId, departureTime, arrivalTime, date, fare } = req.body;

    if (!busId || !routeId || !departureTime || !arrivalTime || !date || !fare) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found',
      });
    }

    const schedule = new Schedule({
      busId,
      routeId,
      departureTime,
      arrivalTime,
      date: new Date(date),
      fare,
      availableSeats: bus.totalSeats,
      totalSeats: bus.totalSeats,
      status: 'scheduled',
      occupancyRate: 0,
    });

    await schedule.save();
    await schedule.populate(['busId', 'routeId']);

    res.status(201).json({
      success: true,
      message: 'Schedule created successfully',
      data: schedule,
    });
  } catch (error) {
    console.error('[v0] Create schedule error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { departureTime, arrivalTime, fare, status } = req.body;

    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { departureTime, arrivalTime, fare, status },
      { new: true, runValidators: true }
    ).populate(['busId', 'routeId']);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found',
      });
    }

    res.json({
      success: true,
      message: 'Schedule updated successfully',
      data: schedule,
    });
  } catch (error) {
    console.error('[v0] Update schedule error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found',
      });
    }

    res.json({
      success: true,
      message: 'Schedule deleted successfully',
    });
  } catch (error) {
    console.error('[v0] Delete schedule error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const searchSchedules = async (req, res) => {
  try {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        message: 'Please provide origin and destination',
      });
    }

    const schedules = await Schedule.find({
      status: { $in: ['scheduled', 'running'] },
    })
      .populate({
        path: 'routeId',
        match: {
          origin: { $regex: origin, $options: 'i' },
          destination: { $regex: destination, $options: 'i' },
        },
      })
      .populate(
        'busId',
        'busNumber busName type totalSeats'
      );

    const filteredSchedules = schedules.filter(
      (schedule) => schedule.routeId !== null
    );

    res.json({
      success: true,
      count: filteredSchedules.length,
      data: filteredSchedules,
    });
  } catch (error) {
    console.error('[v0] Search schedules error:', error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

