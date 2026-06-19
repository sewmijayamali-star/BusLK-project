import Route from '../models/Route.js';

export const getAllRoutes = async (req, res) => {
  try {
    const { origin, destination, search } = req.query;
    const filter = { isActive: true };

    if (origin) filter.origin = { $regex: origin, $options: 'i' };
    if (destination) filter.destination = { $regex: destination, $options: 'i' };
    if (search) {
      filter.$or = [
        { origin: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { routeNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const routes = await Route.find(filter).sort('origin destination');

    res.json({
      success: true,
      count: routes.length,
      data: routes,
    });
  } catch (error) {
    console.error('[v0] Get routes error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    }

    res.json({
      success: true,
      data: route,
    });
  } catch (error) {
    console.error('[v0] Get route error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createRoute = async (req, res) => {
  try {
    const { origin, destination, distance, duration, stops } = req.body;

    if (!origin || !destination || !distance || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const route = new Route({
      origin,
      destination,
      distance,
      duration,
      stops: stops || [],
      isActive: true,
    });

    await route.save();

    res.status(201).json({
      success: true,
      message: 'Route created successfully',
      data: route,
    });
  } catch (error) {
    console.error('[v0] Create route error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRoute = async (req, res) => {
  try {
    const { origin, destination, distance, duration, stops, isActive } = req.body;

    const route = await Route.findByIdAndUpdate(
      req.params.id,
      { origin, destination, distance, duration, stops, isActive },
      { new: true, runValidators: true }
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    }

    res.json({
      success: true,
      message: 'Route updated successfully',
      data: route,
    });
  } catch (error) {
    console.error('[v0] Update route error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    }

    res.json({
      success: true,
      message: 'Route deleted successfully',
    });
  } catch (error) {
    console.error('[v0] Delete route error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
