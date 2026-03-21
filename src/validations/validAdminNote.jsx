import z from "zod";

export const updatedNoteSchema = z.object({
    updatedNote: z.string().min(1, {message: "This Field is required"}),
});