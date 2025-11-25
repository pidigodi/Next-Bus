import React, { useState } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import Layout from "../components/layout";

export default function NextBusLanding() {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    groupSize: "",
    pickupLocation: "",
    dropoffLocation: "",
    date: "",
    time: "",
    tripType: "",
    notes: "",
  });

  function openEnquiry() {
    setShowEnquiry(true);
  }

  function closeEnquiry() {
    setShowEnquiry(false);
  }

  function handleFormChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  // ⭐ Netlify-compatible submit handler
  async function submitEnquiry(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        body: formData,
      });

      alert("Thanks — your enquiry has been received. We'll get back to you shortly.");
      closeEnquiry();
    } catch (error) {
      alert("There was an issue submitting your form. Please try again.");
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-200 to-white flex flex-col justify-center text-left py-5">
        <Container>
          <h1
            className="fw-bold display-2 text-indigo-900 mb-4"
            style={{ opacity: 0, animation: "fadeIn 1.2s ease-in forwards" }}
          >
            Next<b>Bus</b><br />Charter Services
          </h1>

          <p className="text-dark fs-4 mb-5" style={{ maxWidth: "700px" }}>
            Reliable, modern and comfortable group transport across South and East Auckland.
            From school trips and corporate events to weddings and special occasions — 
            Next<b>Bus</b> delivers safe, smooth and stress-free charter travel.
          </p>

          <Button
            size="lg"
            className="px-5 py-3 fw-bold shadow-xl rounded-4 bg-indigo-700 border-0 hover:bg-indigo-800"
            onClick={openEnquiry}
            style={{ fontSize: "1.4rem" }}
          >
            Enquire Now
          </Button>
        </Container>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* ⭐ Hidden Netlify "dummy" form (required for detection) */}
        <form name="contact" data-netlify="true" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="phone" />
          <input type="text" name="groupSize" />
          <input type="text" name="pickupLocation" />
          <input type="text" name="dropoffLocation" />
          <input type="date" name="date" />
          <input type="time" name="time" />
          <input type="text" name="tripType" />
          <textarea name="notes"></textarea>

          {/* ⭐ Honeypot field (dummy) */}
          <input type="text" name="bot-field" />
        </form>

        {/* Enquiry Modal */}
        <Modal show={showEnquiry} onHide={closeEnquiry} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold fs-3">Charter Booking Enquiry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted mb-4">
              Tell us the details of your trip and we'll be in touch with the perfect transport option.
            </p>

            {/* ⭐ Actual Netlify form */}
            <form
              name="contact"
              method="POST"
              netlify-honeypot="bot-field"
              data-netlify="true"
              onSubmit={submitEnquiry}
            >
              {/* Required hidden Netlify field */}
              <input type="hidden" name="form-name" value="contact" />

              {/* Required honeypot field */}
              <input type="hidden" name="bot-field" />

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Control
                    name="name"
                    placeholder="Your Name"
                    value={formValues.name}
                    onChange={handleFormChange}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleFormChange}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Control
                    name="phone"
                    placeholder="Phone Number"
                    value={formValues.phone}
                    onChange={handleFormChange}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Control
                    type="number"
                    name="groupSize"
                    placeholder="Number of Passengers"
                    value={formValues.groupSize}
                    onChange={handleFormChange}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Control
                    name="pickupLocation"
                    placeholder="Pickup Location"
                    value={formValues.pickupLocation}
                    onChange={handleFormChange}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Control
                    name="dropoffLocation"
                    placeholder="Drop-off Location"
                    value={formValues.dropoffLocation}
                    onChange={handleFormChange}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Control
                    type="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleFormChange}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Control
                    type="time"
                    name="time"
                    value={formValues.time}
                    onChange={handleFormChange}
                    required
                  />
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Select
                    name="tripType"
                    value={formValues.tripType}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Trip Type</option>
                    <option value="oneway">One-way</option>
                    <option value="return">Return Trip</option>
                    <option value="multi">Multi-stop / Custom</option>
                  </Form.Select>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Control
                    name="notes"
                    as="textarea"
                    rows={4}
                    placeholder="Additional notes (optional)"
                    value={formValues.notes}
                    onChange={handleFormChange}
                  />
                </Col>
              </Row>

              <Button
                type="submit"
                className="w-100 py-3 fw-bold bg-indigo-700 border-0 rounded-4 hover:bg-indigo-800"
              >
                Submit Enquiry
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
}
