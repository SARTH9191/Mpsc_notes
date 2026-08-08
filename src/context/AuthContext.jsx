import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Store current user in localStorage for persistent state across reloads
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("examvault_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      id: "user-001",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      mobile: "+91 98230 11234",
      role: "student", // 'student' or 'admin'
      avatar: "PS"
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("examvault_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("examvault_user");
    }
  }, [user]);

  const login = (email, password, role = "student") => {
    const nameFromEmail = email.split("@")[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    
    const newUser = {
      id: `user-${Date.now()}`,
      name: role === "admin" ? "Admin Moderator" : formattedName,
      email: email,
      mobile: "+91 98765 43210",
      role: role,
      avatar: formattedName.substring(0, 2).toUpperCase()
    };
    setUser(newUser);
    return newUser;
  };

  const signup = (name, email, mobile) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      mobile,
      role: "student",
      avatar: name.substring(0, 2).toUpperCase()
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  // Switch role helper for smooth demo presentation
  const switchRole = (newRole) => {
    if (newRole === "admin") {
      setUser({
        id: "user-010",
        name: "Admin Moderator",
        email: "admin@examvault.in",
        mobile: "+91 98000 00000",
        role: "admin",
        avatar: "AD"
      });
    } else {
      setUser({
        id: "user-001",
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        mobile: "+91 98230 11234",
        role: "student",
        avatar: "PS"
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, switchRole, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
