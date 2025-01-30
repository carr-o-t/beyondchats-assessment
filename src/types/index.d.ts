import { registerSchema, verifyOtpSchema } from "@/lib/validations/auth";
import { z } from "zod";

declare namespace Types {
    type registerFormType = z.infer<typeof registerSchema>;
    type verifyOtpType = z.infer<typeof verifyOtpSchema>;
}