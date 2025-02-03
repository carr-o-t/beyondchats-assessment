"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { loginUser } from "@/lib/api/auth";
import { loginSchema } from "@/lib/validations/auth";
import { Types } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { AuthWrapper } from "./AuthWrapper";

const LoginForm = () => {
  const form = useForm<Types.loginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData: Types.loginFormType) => {
    try {
      setIsLoading(true);
      const result = await loginUser(formData);
      toast.success("Sign in successful.", {
      });
      console.log("login befire:", result);
      window.location.href = "/chatbot-integration";
      console.log("login successful:", result);
    } catch (error: any) {
      toast.error("Sign in failed.", { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };


  return (
         <AnimatePresence mode="wait">
               <motion.div
            key="login-form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
           className="flex justify-center items-center min-h-screen w-full"
          >
            <AuthWrapper title="Welcome back" subheader="Sign in to continue">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4 w-full max-w-md">
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
                Sign In
              </Button>
            </form>
          </Form>
          </AuthWrapper>
            </motion.div>
            

         </AnimatePresence>
      
  );
};

export default LoginForm;