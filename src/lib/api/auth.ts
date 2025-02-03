import { Types } from "@/types";
import { signIn } from "next-auth/react";

export const registerUser = async (data: Types.registerFormType) => {
    try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
    
        // Check if the response is not OK (status >= 400)
        if (!response.ok) {
          const errorResponse = await response.json(); // Parse the response to get the error message
          // Throw the error with the message from the API response
          throw new Error(errorResponse.error || "Failed to register user");
        }
    
        // Return the response data if registration is successful
        return await response.json();
      } catch (error) {
        // Log the error and throw it to be handled in the calling component
        console.error("Registration error:", error);
        throw error; // This will rethrow the error to be handled elsewhere
      }
  };

  export const loginUser = async (data: { email: string; password: string }) => {
    try {
      const response = await signIn("credentials", {
        redirect: false, // Prevents automatic redirection
        email: data.email,
        password: data.password,
      });

      console.log("hello 1")
  
      if (!response) {
        throw new Error("No response from server. Please try again.");
      }
      console.log("hello 2", response)
  
      if (response.error) {
        throw new Error(response.error); // Throw the error message from NextAuth
      }

      console.log("hello 3")
  
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error; // This will rethrow the error to be handled elsewhere
    }
  };
  
  export const resendOtp = async (email: string) => {
    try {
      const response = await fetch("/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to resend OTP");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw error;
    }
  };


  export const verifyOtp = async (email: string, otp: string) => {
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "OTP verification failed.");
      }
      return await response.json(); // Return the response if OTP is verified successfully
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error; // Re-throw error to be handled in UI
    }
  };
  