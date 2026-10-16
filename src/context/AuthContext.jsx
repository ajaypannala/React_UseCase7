import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = (name, email, password, role) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((existingUser) => existingUser.email === email)) {
      return { success: false, message: "Email already registered" };
    }

    users.push({ id: Date.now(), name, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true, message: "Registration successful" };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((registeredUser) =>
      registeredUser.email === email && registeredUser.password === password
    );
    if (!foundUser) return { success: false, message: "Invalid email or password" };

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role
    };
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
