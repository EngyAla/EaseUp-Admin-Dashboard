import z from "zod";

export const addAdminSchema = z.object({
    fullName: z.string().min(1, {message: "This Field is required"}),
    email: z.string().min(1, {message: "This Field is required"}).email({message: "Email is not valid!"}),
    role: z.string().min(1, {message: "This Field is required"}),
    password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters" })
            .max(20, { message: "Password must be less than 21 characters" })
            .regex(/[a-z]/, { message: "Password must have at least one lowercase letter" })
            .regex(/[A-Z]/, { message: "Password must have at least one uppercase letter" })
});