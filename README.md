# BeyondChats Assessment - Authentication & Email Verification Flow

# Live Link: https://beyondchats-assessment-652pmitza-carrots-projects-20c95ccf.vercel.app/login

## Overview

This project focuses on user registration, email verification, login functionality (both via credentials and Google), and chatbot integration. The following features have been implemented:

1. **User Registration**: New users can sign up with their name, email, and password.
2. **OTP-Based Email Verification**: After registration, a One-Time Password (OTP) is sent to the user's email for verification. This OTP is valid indefinitely.
3. **Login**: Users can log in using their credentials or via Google login.
4. **Protected Routes**: Access to protected pages (like chatbot integration) is restricted until the user has verified their email.
5. **Google Login**: If the user logs in using Google, they are taken directly to the chatbot integration page if their email is already verified.

## Features

### 1. **User Registration Flow**:
- Users can register by providing their **name**, **email**, and **password**.
- Upon successful registration, an OTP is sent to their registered email for verification. The OTP is stored in the database with **no expiry**.

### 2. **Email Verification**:
- The user is required to enter the OTP received in their email on the **email verification page**.
- If the OTP matches, the user's **`isActive`** status is updated to **`true`**, and they are granted access to protected pages like the chatbot integration page.
- Until the user verifies their email, they cannot access any protected routes.

### 3. **Login Flow**:
- After registration, users can log in using their **email** and **password**.
- Upon successful login, if the user has not verified their email, they are taken to the **verify-email** page.
- **Google login** is also supported, and users who authenticate via Google are taken directly to the **chatbot integration page** if their email is verified.

### 4. **Google Login**:
- Users can log in using their **Google account**.
- If the email associated with the Google account is already verified, the user is automatically redirected to the **chatbot integration page**.
- If the user has not verified their email, they are redirected to the **verify-email** page.

### 5. **Access Control**:
- Until the user verifies their email, they cannot access any protected pages such as the **chatbot integration** page.
- If the user is not logged in, they will be redirected to the **login** page.

## Flow

1. **User Registration**:
   - User provides **name**, **email**, and **password**.
   - An OTP is sent to the provided email address (valid indefinitely).
   
2. **OTP Verification**:
   - User enters the OTP received in their email.
   - If the OTP is valid, the user's **`isActive`** status is updated, allowing them to access protected pages.
   
3. **Login**:
   - User logs in using their **email** and **password**.
   - If the user has not verified their email, they are redirected to the **verify-email** page.
   
4. **Google Login**:
   - User logs in using their **Google account**.
   - If the email is verified, they are redirected directly to the **chatbot integration** page.
   - If the email is not verified, they are redirected to the **verify-email** page.

5. **Protected Pages**:
   - Users who have not verified their email cannot access protected pages (like **chatbot integration**).
   - Users who have verified their email are granted access.

## Setup Instructions

### 1. **Clone the Repository**

```bash
git clone https://github.com/carr-o-t/beyondchats-assessment.git
cd beyondchats-assessment
```

### 2. **Install Dependencies**
Install the required dependencies:

```bash
npm install
```

### 3. **Set Up Environment Variables**
Run the following command to create a `.env` file with the required variables:

```bash
cp .env.example .env
```

### 4. **Run the Application**
Start the application locally:

```bash
npm run dev
```
The application will be running at http://localhost:3000.

## Testing the Flow

1. Register a new user with name, email, and password.
2. Check your email for the OTP and verify it on the verify-email page.
3. Login with the registered email and password (you’ll be redirected to verify your email if not already verified).
4. Google login: Try logging in with your Google account.
    - If the email is verified, you’ll be taken to the chatbot integration page directly.
    - If the email is not verified, you’ll be redirected to the verify-email page.

## Technologies Used

- Next.js: The React framework for building the application.
- NextAuth.js: Authentication system for handling login, Google login, and session management.
- Prisma ORM: Used to interact with the database and manage user data.
bcryptjs: Used for hashing passwords.
- Tailwind CSS: For styling the UI.
- NodeMailer: Used to send verification emails.

## Future Enhancements

- Organization Registration: Ability for users to register and set up their organization with relevant details (e.g., company name, website).
- Chatbot Integration: Complete the chatbot integration process for users to configure their bots.
- Admin Dashboard: Build an admin panel for managing users and chatbot configurations.
- OTP Expiry: Add an optional expiry for OTP in the future if needed.


---

This README should cover all the aspects of your application flow and setup instructions in a concise and organized manner.



