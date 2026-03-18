import prisma from "../../config/db.js";

export const getAllTrainers = async () => {
    return prisma.trainer.findMany({ orderBy: { createdAt: "asc" } });
};

export const getTrainerById = async (id) => {
    return prisma.trainer.findUnique({ where: { id: Number(id) } });
};

export const createTrainer = async (data) => {
    return prisma.trainer.create({ data });
};

export const updateTrainer = async (id, data) => {
    return prisma.trainer.update({ where: { id: Number(id) }, data });
};

export const deleteTrainer = async (id) => {
    return prisma.trainer.delete({ where: { id: Number(id) } });
};
