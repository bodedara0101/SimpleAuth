import React, { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:5000/login", {
      formData,
    });
    const data = await response.data;

    // Use Zod to validate form data
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.format();
      setFormErrors({
        username: errors.username?._errors[0] || "",
        email: errors.email?._errors[0] || "",
        password: errors.password?._errors[0] || "",
      });
    } else {
      // If validation is successful, handle form submission
      console.log("Form submitted successfully", data);
      localStorage.setItem("token", data.token);
      setFormErrors({ username: "", email: "", password: "" });
      setTimeout(() => {
        navigate("/dashboard")
      }, 2000);
    }
  };

  const token = localStorage.getItem("token");
  console.log(token)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          {formErrors.username && <p>{formErrors.username}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {formErrors.email && <p>{formErrors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {formErrors.password && <p>{formErrors.password}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;
