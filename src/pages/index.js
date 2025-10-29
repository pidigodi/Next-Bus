import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import Layout from "../components/layout"

export default function NextBusLanding() {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    // Placeholder: OpenAI Agent Kit initialization will go here later.
  }, [showEnquiry]);

  function openEnquiry() {
    setShowEnquiry(true);
  }

  function closeEnquiry() {
    setShowEnquiry(false);
  }

  function handleFormChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function submitBasicEnquiry(e) {
    e.preventDefault();
    console.log("Enquiry submitted", formValues);
    alert("Thanks — your enquiry was received. The agent will guide you next.");
  }

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white d-flex flex-column justify-content-left text-left">
      <Container>
        <h1
          className="fw-bold display-4 text-indigo-800 mb-3 text-left"
          style={{
            opacity: 0,
            animation: "fadeIn 1.8s ease-in forwards",
            animationDelay: "0.2s",
          }}
        >
          NextBus
        </h1>
        <p className="text-muted mb-4 fs-5 text-start">Whether you need group transport for a corporate event, school excursion, day tour, wedding, or major sporting event, NextBus makes it simple.</p>
        <p className="text-muted mb-4 fs-5 text-start">Just post your trip once, and your request is instantly shared with trusted bus and coach operators across New Zealand. They’ll respond with their best quotes directly on our platform, so you can compare offers side by side and choose the one that suits you best — no more chasing quotes or endless phone calls.</p>
        <Button size="lg" className="px-5 py-3 fw-bold shadow-lg" onClick={openEnquiry}>
          Enquire Now
        </Button>
      </Container>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Enquiry Modal */}
      <Modal show={showEnquiry} onHide={closeEnquiry} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enquiry & Booking Assistant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">Enter your details to begin the booking process. The OpenAI Agent will take over here soon.</p>
          <Form onSubmit={submitBasicEnquiry}>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Control name="name" placeholder="Your name" value={formValues.name} onChange={handleFormChange} required />
              </Col>
              <Col md={12} className="mb-3">
                <Form.Control type="email" name="email" placeholder="Email" value={formValues.email} onChange={handleFormChange} required />
              </Col>
              <Col md={12} className="mb-3">
                <Form.Control name="phone" placeholder="Phone" value={formValues.phone} onChange={handleFormChange} required />
              </Col>
            </Row>
            <Button type="submit" className="w-100 py-2">Start Enquiry</Button>
          </Form>
          <div id="openai-agent-container" className="border rounded mt-4 p-3 text-center text-muted" style={{ minHeight: 200 }}>
            OpenAI Agent Kit will appear here when integrated.
          </div>
        </Modal.Body>
      </Modal>
    </div>
    </Layout>
  );
}
