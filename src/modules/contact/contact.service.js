import prisma from "../../config/db.js";
import { sendContactMail } from "../../utils/sendContactMail.js";

export const createContact = async ({ name, email, message }) => {
  // Save to DB first
  const contact = await prisma.contact.create({
    data: { name, email, message },
  });

  // Send emails — non-blocking so DB save always succeeds even if mail fails
  sendContactMail({ name, email, message }).catch((err) => {
    console.error("[MAIL ERROR]", err.message, err.stack);
  });

  return contact;
};

export const getAllContacts = async () => {
  return prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const deleteContact = async (id) => {
  return prisma.contact.delete({ where: { id: Number(id) } });
};
