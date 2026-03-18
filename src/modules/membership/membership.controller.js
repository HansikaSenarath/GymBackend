import * as membershipService from "./membership.service.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const getMemberships = async (req, res, next) => {
    try {
        const memberships = await membershipService.getAllMemberships();
        return sendSuccess(res, memberships, "Membership plans fetched successfully");
    } catch (err) {
        next(err);
    }
};

export const getMembership = async (req, res, next) => {
    try {
        const membership = await membershipService.getMembershipById(req.params.id);
        if (!membership) return sendError(res, "Membership plan not found", 404);
        return sendSuccess(res, membership);
    } catch (err) {
        next(err);
    }
};

export const addMembership = async (req, res, next) => {
    try {
        const membership = await membershipService.createMembership(req.body);
        return sendSuccess(res, membership, "Membership plan created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const editMembership = async (req, res, next) => {
    try {
        const membership = await membershipService.updateMembership(req.params.id, req.body);
        return sendSuccess(res, membership, "Membership plan updated successfully");
    } catch (err) {
        next(err);
    }
};

export const removeMembership = async (req, res, next) => {
    try {
        await membershipService.deleteMembership(req.params.id);
        return sendSuccess(res, null, "Membership plan deleted successfully");
    } catch (err) {
        next(err);
    }
};
