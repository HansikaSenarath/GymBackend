import * as serviceService from "./service.service.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const getServices = async (req, res, next) => {
    try {
        const services = await serviceService.getAllServices();
        return sendSuccess(res, services, "Services fetched successfully");
    } catch (err) {
        next(err);
    }
};

export const getService = async (req, res, next) => {
    try {
        const service = await serviceService.getServiceById(req.params.id);
        if (!service) return sendError(res, "Service not found", 404);
        return sendSuccess(res, service);
    } catch (err) {
        next(err);
    }
};

export const addService = async (req, res, next) => {
    try {
        const service = await serviceService.createService(req.body);
        return sendSuccess(res, service, "Service created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const editService = async (req, res, next) => {
    try {
        const service = await serviceService.updateService(req.params.id, req.body);
        return sendSuccess(res, service, "Service updated successfully");
    } catch (err) {
        next(err);
    }
};

export const removeService = async (req, res, next) => {
    try {
        await serviceService.deleteService(req.params.id);
        return sendSuccess(res, null, "Service deleted successfully");
    } catch (err) {
        next(err);
    }
};
