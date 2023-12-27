import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Login from "./components/Login";
import TicketTable from "./components/TicketTable";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      fetch("https://ticketing-system-backend-eight.vercel.app/api/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setTickets(data))
        .catch((error) => console.error("Error fetching tickets:", error));
    }
  }, [token]);

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await fetch(
        "https://ticketing-system-backend-eight.vercel.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem("role", data.userRole);
        localStorage.setItem("user_name", username);
        localStorage.setItem("token", data.token);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsername(null);
    setUserRole(null);
  };

  const handleRefresh = () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Make a GET request to fetch all tickets
    fetch("https://ticketing-system-backend-eight.vercel.app/api/tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error("Error fetching tickets:", error));
  };

  return (
    <Container>
      <div className="d-flex justify-content-end align-items-center mt-2">
        {token && (
          <div>
            <p>
              Welcome, {localStorage.getItem("username")}
              <br />
              Role: {localStorage.getItem("role")}
            </p>
            <Button
              variant="danger"
              style={{ marginRight: "8px" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button
              variant="primary"
              style={{ marginRight: "8px" }}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          </div>
        )}
      </div>

      {token ? (
        <div>
          <TicketTable tickets={tickets} />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Container>
  );
};

export default App;
