import { loginSchema, registerSchema, verifyOtpSchema } from "@/lib/validations/auth";
import { organisationSchema } from "@/lib/validations/org";
import { z } from "zod";

declare namespace Types {
    type registerFormType = z.infer<typeof registerSchema>;
    type loginFormType = z.infer<typeof loginSchema>;
    type verifyOtpType = z.infer<typeof verifyOtpSchema>;
    type organisationFormType = z.infer<typeof organisationSchema>;
}