import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Protected from "./components/Protected";
import ErrorToken from "./error/ErrorToken";
import Nav from "./components/comman/Nav";
import Dashboard from "./components/Dashboard";
import AuthProtector from "./protected/AuthProtector";
import AuthChecker from "./protected/AuthChecker";
// Define a Zod schema for the form data

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Nav/>
      <main className="h-screen bg-slate-600 pt-16 text-3xl text-center">
        <Routes>
          <Route path="*" element={<div className="flex justify-center items-center"><h1 className="text-slate-100 text-4xl ">Page Not Found!</h1></div>}/>
          <Route path="/" element={<h1>hello</h1>} />
          <Route
            path="/protected"
            element={token ? <Protected /> : <ErrorToken />}
          />
          <Route
            path="/signin"
            element={
              <AuthChecker token={token}>
                <SignUp/>
              </AuthChecker>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthProtector token={token}>
                <Dashboard token={token}/>
              </AuthProtector>
            }
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
