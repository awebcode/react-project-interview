import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3, "Name is required"),
  fatherMotherName: z.string().min(3, "Father/Mother Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(3, "Phone No is required"),
  jobTitle: z.string().min(3, "Job Title is required"),
  nidNo: z.string().min(3, "NID No is required"),
  gender: z.enum(["male", "female", "other"], "Gender is required"),
  presentAddress: z.string().min(3, "Present Address is required"),
  studentPhoto: z.instanceof(File).optional(), // Assuming file upload
  fatherMotherPhone: z.string().min(3, "Father/Mother Phone is required"),
  schoolCollegeName: z.string().min(3, "School/College Name is required"),
  localGuardianName: z.string().min(3, "Local Guardian Name is required"),
  localGuardianPhone: z.string().min(3, "Local Guardian Phone is required"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date format should be YYYY-MM-DD"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
    errorMap: () => ({ message: "Select Blood Group" }),
  }),
  permanentAddress: z.string().min(3, "Permanent Address is required"),
});


export const searchFormSchema = z.object({
  form_no: z.string().min(3,"Form number is required"),
  phone_no: z
    .string()
    .min(10,"Phone number is required")
    .regex(/^01[3-9]\d{8}$/, "Invalid phone number format"),
});
