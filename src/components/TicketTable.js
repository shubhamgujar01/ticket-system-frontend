// src/components/TicketTable.js
import React, { useState } from "react";

import { Table, Button, Modal, Form } from "react-bootstrap";

const TicketTable = ({ tickets, onDelete, onRefresh }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editedTicket, setEditedTicket] = useState({});
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleEdit = (ticket) => {
    setEditedTicket(ticket);
    setEditedTitle(ticket.title);
    setEditedDescription(ticket.description);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedTicket({});
    setEditedTitle("");
    setEditedDescription("");
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewTitle("");
    setNewDescription("");
  };

  const handleDelete = (id) => {
    // Retrieve the token from localStorage or wherever it is stored
    const token = localStorage.getItem("token");

    // Make a DELETE request to the backend API with the token in the headers
    fetch(
      `https://ticketing-system-backend-eight.vercel.app/api/tickets/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle successful deletion
        console.log("Ticket deleted:", data);
        onDelete(id);
        onRefresh();
        alert("Data deleted successfully ");
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
      });
  };

  const handleSaveChanges = () => {
    // Retrieve the token from localStorage or wherever it is stored
    const token = localStorage.getItem("token");

    // Make a PUT request to update the ticket with the edited information
    fetch(
      `https://ticketing-system-backend-eight.vercel.app/api/tickets/${editedTicket._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle successful update
        console.log("Ticket updated:", data);
        handleCloseEditModal();
        onRefresh();
        alert("Ticket updated successfully");
      })
      .catch((error) => {
        console.error("Error updating ticket:", error);
      });
  };

  const handleSaveNewTicket = () => {
    // Retrieve the token from localStorage or wherever it is stored
    const token = localStorage.getItem("token");

    // Make a POST request to add a new ticket
    fetch(`https://ticketing-system-backend-eight.vercel.app/api/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful addition
        console.log("New Ticket added:", data);
        handleCloseAddModal();
        onRefresh();
        alert("New Ticket added successfully");
      })
      .catch((error) => {
        console.error("Error adding new ticket:", error);
      });
  };

  return (
    <>
      <h1 className="mt-5 mb-4">Ticketing System Application</h1>
      <h4 className="mb-3">Active Tickets</h4>
      <Button variant="success" onClick={handleAdd} className="mb-3">
        Add Ticket
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <React.Fragment key={ticket.id}>
              <tr>
                <td>{ticket._id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>{ticket.status}</td>
                <td style={{ padding: "10px", margin: "5px" }}>
                  <Button
                    variant="info"
                    size="sm"
                    className="mr-2"
                    style={{ margin: "5px", padding: "5px" }}
                    onClick={() => handleEdit(ticket)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ margin: "5px", padding: "5px" }}
                    onClick={() => handleDelete(ticket._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
              {/* Additional row for spacing and styling */}
              <tr>
                <td colSpan="5" style={{ height: "10px" }}></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formNewDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveNewTicket}>
            Save Ticket
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TicketTable;
