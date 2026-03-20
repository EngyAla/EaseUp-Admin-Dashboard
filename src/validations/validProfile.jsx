import z from "zod";


export const profileSchema = z.object({
    full_name: z.string().min(1, {message: "This Field is required"}),
    email: z.string().email(),
    password: z
        .string()
        .refine(val => val.length === 0 || (val.length >= 6 && val.length <= 20), {
            message: "Password must be at least 6 characters"
        }).optional(),
    newPassword: z
        .string()
        .refine(val => val.length === 0 || (val.length >= 6 && val.length <= 20), {
            message: "Password must be at least 6 characters"
        }).optional(),
    avatar: z
    .any()
    .refine((file) => !file || file.size <= 800000, {message: "Max size is 800KB"})
    .refine(
        (file) => !file || ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
        {message: "Only JPG or PNG allowed"}
    ).optional(),
    emailNotifications: z.boolean()
}).refine((data) => {
    // تعديل الشرط ليكون دقيقاً مع النصوص الفارغة
    if (data.newPassword && data.newPassword.length > 0 && (!data.password || data.password.length === 0)) {
        return false;
    }
    return true;
}, {
    message: "Current password is required to set a new one",
    path: ["password"], 
});