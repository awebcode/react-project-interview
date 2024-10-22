import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    mobile: z.string().min(10, "Mobile number is required"),
    email: z.string().email("Invalid email format").min(2, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    role: z.enum(["user", "admin"], "Role is required"),
    gender: z.enum(["male", "female", "other"], "Gender is required"),
    address: z.string().nonempty("Address is required"),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password is not the same as confirm password',
        path: ['confirmPassword'],
      })
    }
  });

export const otpSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  verify_code: z.string().nonempty("Verification code is required"),
});
