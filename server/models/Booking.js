import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user ID'],
    },
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Schedule',
      required: [true, 'Please provide schedule ID'],
    },
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
      required: true,
    },
    seatNumbers: {
      type: [String],
      required: [true, 'Please provide seat numbers'],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: 'At least one seat must be selected',
      },
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    travelDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled', 'completed'],
      default: 'pending',
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    qrCode: {
      type: String,
      default: null,
    },
    passengerDetails: [
      {
        name: String,
        email: String,
        phone: String,
        seatNumber: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Booking', bookingSchema);
