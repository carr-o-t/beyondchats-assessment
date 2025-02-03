"use client"

import { verifyOtp } from "@/lib/api/auth";
import { verifyOtpSchema } from "@/lib/validations/auth";
import { Types } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/Form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/InputOTP";
import { AuthWrapper } from "./AuthWrapper";

const VerifyEmailForm = ({ session, email }: { session: Session | null, email?: string }) => {
  const router = useRouter();
  console.log("session :: ", session)
  const form = useForm<Types.verifyOtpType>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleOtpVerification = async (formData: Types.verifyOtpType) => {
    try {
      setIsLoading(true);

      const result = await verifyOtp((session?.user?.email || email)!, formData.otp);

      toast.success("OTP verified successfully.");

      console.log("OTP Verification Success:", result);


      // Redirect user to dashboard or any other page after successful OTP verification
      router.push("/setup-organisation");
      console.log("hello 6")
    } catch (error: any) {
      toast.error("OTP verification failed.", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="verify-email-form"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center items-center min-h-screen w-full"
      >
        <AuthWrapper title="Verify your email" subheader="Enter the OTP sent to your email" showFooter={false}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOtpVerification)} className="space-y-6 w-full max-w-md">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your registered email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Verify Email
              </Button>
            </form>
          </Form>
        </AuthWrapper>

      </motion.div>
    </AnimatePresence>

  )
}

export default VerifyEmailForm