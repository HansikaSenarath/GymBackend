import * as trainerService from "./trainer.service.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const getTrainers = async (req, res, next) => {
    try {
        const trainers = await trainerService.getAllTrainers();
        return sendSuccess(res, trainers, "Trainers fetched successfully");
    } catch (err) {
        next(err);
    }
};

export const getTrainer = async (req, res, next) => {
    try {
        const trainer = await trainerService.getTrainerById(req.params.id);
        if (!trainer) return sendError(res, "Trainer not found", 404);
        return sendSuccess(res, trainer);
    } catch (err) {
        next(err);
    }
};

export const addTrainer = async (req, res, next) => {
    try {
        const trainer = await trainerService.createTrainer(req.body);
        return sendSuccess(res, trainer, "Trainer created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const editTrainer = async (req, res, next) => {
    try {
        const trainer = await trainerService.updateTrainer(req.params.id, req.body);
        return sendSuccess(res, trainer, "Trainer updated successfully");
    } catch (err) {
        next(err);
    }
};

export const removeTrainer = async (req, res, next) => {
    try {
        await trainerService.deleteTrainer(req.params.id);
        return sendSuccess(res, null, "Trainer deleted successfully");
    } catch (err) {
        next(err);
    }
};
