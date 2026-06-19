import mongoose from 'mongoose';

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: [true, 'Please provide bus number'],
      unique: true,
      trim: true,
    },
    busName: {
      type: String,
      required: [true, 'Please provide bus name'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'],
      required: true,
    },
    totalSeats: {
      type: Number,
      required: [true, 'Please provide total seats'],
      min: [1, 'Bus must have at least 1 seat'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'maintenance'],
      default: 'active',
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    registrationNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    capacity: {
      type: Number,
    },
    amenities: {
      type: [String],
      default: [],
    },
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Bus', busSchema);
