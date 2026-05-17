const mongoose = require("mongoose");

const jobRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      trim: true,
      enum: {
        values: [
          "Plumbing",
          "Electrical",
          "Carpentry",
          "Joinery",
          "Painting",
          "Cleaning",
          "Landscaping",
          "HVAC",
          "General",
          "Other",
        ],
        message: "{VALUE} is not a valid category",
      },
      default: "General",
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    contactName: {
      type: String,
      trim: true,
      maxlength: [100, "Contact name cannot exceed 100 characters"],
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    status: {
      type: String,
      enum: {
        values: ["Open", "In Progress", "Closed"],
        message: "{VALUE} is not a valid status",
      },
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

// Text index for keyword search
jobRequestSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("JobRequest", jobRequestSchema);
