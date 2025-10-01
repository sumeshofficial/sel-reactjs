# Mini E-Commerce Website (React + Redux + Firebase)

**Live Demo:** [sel-resell-application.web.app](https://sel-resell-application.web.app/)

A mini e-commerce web application built as a learning project using React, Redux Toolkit, Firebase, and Tailwind CSS.
The goal of this project was to practice state management, authentication, and checkout flows in a real-world style setup.

## Learning Goals

 - Understand how to integrate Firebase Authentication in React

 - Learn Redux Toolkit for global state management (cart, auth, orders)

 - Practice TailwindCSS for responsive, mobile-first UI

 - Build a basic checkout process (address + shipping + order summary)

 - Store and retrieve data from Firebase Firestore

## Features

 - User authentication (Firebase Auth)

 - Cart management (add/remove, persisted in Redux store)

 - Checkout flow with address form and shipping method

 - Orders page to view placed orders

 - Responsive UI using TailwindCSS

 - State management with Redux Toolkit

## Tech Stack

 - React.js

 - Redux Toolkit

 - Firebase (Auth + Firestore)

 - TailwindCSS

 - React Router

## Project Setup

1. Clone the repo

```bash
git clone https://github.com/sumeshofficial/sel-reactjs.git
cd sel-reactjs
```

2. Install dependencies

```bash
npm install
```

3. Setup Firebase

 - Create a Firebase project → `https://console.firebase.google.com`

 - Enable Auth (Google) and Firestore Database

 - Add your Firebase config to `src/firebase/firebase.js`

4. Run the project

```bash
npm start
```

App runs on → `http://localhost:3000`

## Notes

 - This is not a production-ready project.
 - It was built as part of my learning journey in React, Firebase, and Redux Toolkit.

## Author

**Sumesh J**

GitHub: [sumeshofficial](https://github.com/sumeshofficial)  
LinkedIn: [Sumesh J](https://www.linkedin.com/in/sumesh-j-2a6793359/)