"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { registerUser } from "@/lib/api/auth";
import { registerSchema } from "@/lib/validations/auth";
import { Types } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { AuthWrapper } from "./AuthWrapper";

const RegisterForm = () => {
  const form = useForm<Types.registerFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (formData: Types.registerFormType) => {
    try {
      setIsLoading(true);
      const result = await registerUser(formData);
      toast.success("Registration successful.", {
        description: "Please check your email for the verification code.",
      });
      console.log("Registration successful:", result);
      router.push("/login")
    } catch (error: any) {
      toast.error("Registration failed.", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AnimatePresence mode="wait">
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

    </AnimatePresence>

  );
};

export default RegisterForm;