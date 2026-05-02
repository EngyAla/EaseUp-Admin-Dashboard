import z from "zod";

export const profileSchema = z.object({
    name: z.string().min(1, {message: "This Field is required"}),
    email: z.string().email(),
    currentPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(20, { message: "Password must be less than 21 characters" })
        .regex(/[a-z]/, { message: "Password must have at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must have at least one uppercase letter" }),
    newPassword: z
        .string()
        .refine(val => val.length === 0 || (val.length >= 6 && val.length <= 20), {
            message: "Password must be at least 6 characters"
        }).optional(),
    imageUrl: z
    .any()
    .refine((value) => {
        // إذا كانت القيمة نصاً (رابط الصورة القديمة) أو فارغة، نقبلها فوراً
        if (typeof value === "string" || !value) return true;
        // إذا كانت ملفاً (File Object)، نتحقق من الحجم
        return value.size <= 800000;
    }, { message: "Max size is 800KB" })
    .refine((value) => {
        // إذا كانت القيمة نصاً (رابط الصورة القديمة) أو فارغة، نقبلها فوراً
        if (typeof value === "string" || !value) return true;
        // إذا كانت ملفاً (File Object)، نتحقق من النوع
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    }, { message: "Only JPG or PNG allowed" })
    .optional(),
    emailNotifications: z.boolean()
}).refine((data) => {
    // تعديل الشرط ليكون دقيقاً مع النصوص الفارغة
    if (data.newPassword && data.newPassword.length > 0 && (!data.currentPassword || data.currentPassword.length === 0)) {
        return false;
    }
    return true;
}, {
    message: "Current password is required to set a new one",
    path: ["password"], 
});