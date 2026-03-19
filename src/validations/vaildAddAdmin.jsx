import z from "zod";

export const addAdminSchema = z.object({
    full_name: z.string().min(1, {message: "This Field is required"}),
    email: z.string().min(1, {message: "This Field is required"}).email({message: "Email is not valid!"}),
    role: z.string().min(1, {message: "This Field is required"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"}).max(20, {message: "Password must be less than 21 characters"})
});