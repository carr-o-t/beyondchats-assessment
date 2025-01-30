"use client"

import { verifyOtpSchema } from "@/lib/validations/auth";
import { Types } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/Form";
import { Button } from "../ui/Button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/InputOTP";

const VerifyEmailForm = () => {
    const form = useForm<Types.verifyOtpType>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
          otp: "",
        },
      });
    
      const onSubmit = async (data: Types.verifyOtpType) => {
        const response = await fetch("/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
      };

      return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
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
          
          <Button type="submit" className="w-full">
            Verify Email
          </Button>
        </form>
      </Form>
      )
}

export default VerifyEmailForm