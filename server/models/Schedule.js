import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
  {
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: [true, 'Please provide bus ID'],
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
      required: [true, 'Please provide route ID'],
    },
    departureTime: {
      type: String,
      required: [true, 'Please provide departure time'],
    },
    arrivalTime: {
      type: String,
      required: [true, 'Please provide arrival time'],
    },
    date: {
      type: Date,
     
    },
    fare: {
      type: Number,
      required: [true, 'Please provide fare'],
      min: [0, 'Fare cannot be negative'],
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'running', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    occupancyRate: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Schedule', scheduleSchema);
