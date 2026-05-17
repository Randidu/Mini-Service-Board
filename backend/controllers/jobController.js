const JobRequest = require("../models/JobRequest");
const { ApiError } = require("../middleware/errorMiddleware");

/**
 * @desc    Get all jobs with optional filters
 * @route   GET /api/jobs
 * @query   ?category=Plumbing&status=Open&search=keyword
 */
const getJobs = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single job by ID
 * @route   GET /api/jobs/:id
 */
const getJobById = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      throw new ApiError(404, "Job request not found");
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new job request
 * @route   POST /api/jobs
 */
const createJob = async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail } =
      req.body;

    const job = await JobRequest.create({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    });

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update job status only
 * @route   PATCH /api/jobs/:id
 */
const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      throw new ApiError(400, "Status field is required");
    }

    const validStatuses = ["Open", "In Progress", "Closed"];
    if (!validStatuses.includes(status)) {
      throw new ApiError(
        400,
        `Invalid status. Must be one of: ${validStatuses.join(", ")}`
      );
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) {
      throw new ApiError(404, "Job request not found");
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a job request
 * @route   DELETE /api/jobs/:id
 */
const deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);

    if (!job) {
      throw new ApiError(404, "Job request not found");
    }

    res.status(200).json({
      success: true,
      message: "Job request deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
};
