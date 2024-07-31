# Syoft UI Dashboard Assignment

## About

This project is part of an assignment from Syoft to test my UI and integration skills. The task involved creating three main pages:

1. Sign Up
2. Log In
3. Dashboard

## Project Overview

### Sign Up

The Sign Up page collects user details and registers them through the provided API.

**API Endpoint:**
```
https://syoft.dev/Api/user_registeration/api/user_registeration
```

**Sample Payload:**
```json
{
    "user_firstname": "mani",
    "user_email": "mail@gmail.com",
    "user_phone": "9876543210",
    "user_password": "123456",
    "user_lastname": "ni",
    "user_city": "Hyderabad",
    "user_zipcode": "500072"
}
```

**Implementation:**

- Collect `user_firstname`, `user_email`, `user_password`, and `user_phone` from the form.
- Send static data for `user_lastname`, `user_city`, and `user_zipcode`.

### Log In

The Log In page authenticates users and stores their information in local storage upon successful login.

**API Endpoint:**
```
https://syoft.dev/Api/userlogin/api/userlogin
```

**Sample Payload:**
```json
{
    "user_email": "mail@gmail.com",
    "user_password": "123456"
}
```

### Dashboard

After successful login, users are redirected to the Dashboard page, which displays their information. This page is designed to showcase creativity in presenting user details.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harikrishnaalvala/syoft_react_assignement.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ui-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

- Open your browser and navigate to `http://localhost:3004`.
- Register a new user on the Sign Up page.
- Log in with the registered user credentials.
- View the user's information on the Dashboard.