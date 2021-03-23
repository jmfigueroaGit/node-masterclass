const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

// @desc    GET all bootcamps
// @route   GET /api/v1/bootcamps
// @access  PUBLIC
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    GET single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  PUBLIC
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return next(
                new ErrorResponse(
                    `Bootcamp not found with id of ${req.params.id}`,
                    404
                )
            );
        }

        res.status(200).json({ success: true, data: bootcamp });
    } catch (error) {
        next(error);
    }
};

// @desc    CREATE new bootcamp
// @route   POST /api/v1/bootcamps/
// @access  PRIVATE
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    UPDATE bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  PRIVATE
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!bootcamp) {
            return next(
                new ErrorResponse(
                    `Bootcamp not found with id of ${req.params.id}`,
                    404
                )
            );
        }

        res.status(200).json({ success: true, data: bootcamp });
    } catch (error) {
        next(error);
    }
};

// @desc    DELETE bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  PRIVATE
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return next(
                new ErrorResponse(
                    `Bootcamp not found with id of ${req.params.id}`,
                    404
                )
            );
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};
