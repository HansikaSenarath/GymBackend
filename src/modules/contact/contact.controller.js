import * as contactService from "./contact.service.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const submitContact = async (req, res, next) => {
    try {
        const contact = await contactService.createContact(req.body);
        return sendSuccess(res, contact, "Your message has been received. We'll be in touch soon!", 201);
    } catch (err) {
        next(err);
    }
};

export const getContacts = async (req, res, next) => {
    try {
        const contacts = await contactService.getAllContacts();
        return sendSuccess(res, contacts, "Contacts fetched successfully");
    } catch (err) {
        next(err);
    }
};

export const removeContact = async (req, res, next) => {
    try {
        await contactService.deleteContact(req.params.id);
        return sendSuccess(res, null, "Contact deleted successfully");
    } catch (err) {
        next(err);
    }
};
