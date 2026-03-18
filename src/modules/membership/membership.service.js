import prisma from "../../config/db.js";

export const getAllMemberships = async () => {
    return prisma.membership.findMany({ orderBy: { price: "asc" } });
};

export const getMembershipById = async (id) => {
    return prisma.membership.findUnique({ where: { id: Number(id) } });
};

export const createMembership = async (data) => {
    return prisma.membership.create({ data });
};

export const updateMembership = async (id, data) => {
    return prisma.membership.update({ where: { id: Number(id) }, data });
};

export const deleteMembership = async (id) => {
    return prisma.membership.delete({ where: { id: Number(id) } });
};
