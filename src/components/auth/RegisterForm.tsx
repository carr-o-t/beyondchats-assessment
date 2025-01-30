"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { registerSchema } from "@/lib/validations/auth";
import { Types } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { AuthWrapper } from "./AuthWrapper";
import { useState } from "react";
import { registerUser } from "@/lib/api/auth";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import VerifyEmailForm from "./VerifyEmailForm";

const RegisterForm = () => {
  const form = useForm<Types.registerFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (formData: Types.registerFormType) => {
    try {
      setIsLoading(true);
      const result = await registerUser(formData);
      setIsOtpSent(true);
      toast.success("Registration successful.", {
        description: "Please check your email for the verification code.",
      });
      console.log("Registration successful:", result);
    } catch (error: any) {
      setError(error.message);
      toast.error("Registration failed.", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };


  return (
         <AnimatePresence mode="wait">
         {
           !isOtpSent ? (
               <motion.div
            key="register-form"
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
           className="flex justify-center items-center min-h-screen w-full"
          >
            <AuthWrapper title="Create an account" subheader="Sign up to continue">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4 w-full max-w-md">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Continue
              </Button>
            </form>
          </Form>
          </AuthWrapper>
            </motion.div>
            
        ): (
<motion.div
              key="verify-email-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center items-center min-h-screen w-full"
            >
                <AuthWrapper title="Verify your email" subheader="Enter the OTP sent to your email" showFooter={false}>
              <VerifyEmailForm />
              </AuthWrapper>
            </motion.div>
        )
       }
         </AnimatePresence>
      
  );
};

export default RegisterForm;