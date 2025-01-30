import { Types } from "@/types";

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
        throw new Error("Invalid or expired OTP");
      }
  
      return await response.json();
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  };
  