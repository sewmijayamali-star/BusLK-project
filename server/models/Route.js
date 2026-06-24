import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
      required: [true, 'Please provide origin'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Please provide destination'],
      trim: true,
    },
    distance: {
      type: Number,
      required: [true, 'Please provide distance in km'],
      min: [1, 'Distance must be at least 1 km'],
    },
    duration: {
      type: Number,
      required: [true, 'Please provide duration in minutes'],
    },
    routeNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    stops: [
      {
        name: String,
        latitude: Number,
        longitude: Number,
        arrivalTime: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Route', routeSchema);
