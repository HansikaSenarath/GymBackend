import prisma from "../../config/db.js";

export const getAllServices = async () => {
    return prisma.service.findMany({ orderBy: { createdAt: "asc" } });
};

export const getServiceById = async (id) => {
    return prisma.service.findUnique({ where: { id: Number(id) } });
};

export const createService = async (data) => {
    return prisma.service.create({ data });
};

export const updateService = async (id, data) => {
    return prisma.service.update({ where: { id: Number(id) }, data });
};

export const deleteService = async (id) => {
    return prisma.service.delete({ where: { id: Number(id) } });
};
