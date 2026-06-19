import mongoose from 'mongoose';

const trackingSchema = new mongoose.Schema(
  {
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: [true, 'Please provide bus ID'],
      unique: true,
    },
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Schedule',
    },
    latitude: {
      type: Number,
      required: [true, 'Please provide latitude'],
    },
    longitude: {
      type: Number,
      required: [true, 'Please provide longitude'],
    },
    speed: {
      type: Number,
      default: 0,
    },
    heading: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['stationary', 'moving', 'delayed', 'offline'],
      default: 'offline',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    address: {
      type: String,
      default: null,
    },
    nextStop: {
      name: String,
      eta: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-update lastUpdated on every save
trackingSchema.pre('save', function () {
  this.lastUpdated = new Date();
});

export default mongoose.model('Tracking', trackingSchema);
