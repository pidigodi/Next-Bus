// src/pages/next-bus-landing.jsx  (or wherever the file lives)
import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import Layout from "../components/layout";
import Seo from "../components/seo";

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

  // New: control agent/chat modal + SSR-safe render
  const [showAgent, setShowAgent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // client-only rendering for Gatsby SSR safety
    setMounted(true);
  }, []);

  // IMPORTANT: Replace this with the exact embed URL OpenAI gave you.
  // It might be a full URL like "https://chatkit.openai.com/embed/<WORKFLOW_ID>"
  // or similar. Do NOT hardcode any API keys here.
  const AGENT_EMBED_URL = "https://YOUR_AGENT_EMBED_URL_FROM_OPENAI";

  function openEnquiry() {
    setShowEnquiry(true);
  }

  function closeEnquiry() {
    setShowEnquiry(false);
  }

  function handleFormChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

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

  // When the agent modal is closed we unmount the iframe (by not rendering it)
  // to stop active websocket / microphone states etc.
  const renderAgentIframe = mounted && showAgent && AGENT_EMBED_URL;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-200 to-white flex flex-col justify-center text-left py-5">
        <Container>
          <h1
            className="fw-bold display-2 text-indigo-900 mb-4"
            style={{ opacity: 0, animation: "fadeIn 1.2s ease-in forwards" }}
          >
            Auckland<br /><b>Bus</b> Charters 
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

          /* Floating chat button (bottom-right) */
          .agent-chat-button {
            position: fixed;
            right: 22px;
            bottom: 22px;
            z-index: 1050;
            border-radius: 999px;
            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);
          }

          /* Make iframe in modal fill area */
          .agent-iframe {
            width: 100%;
            height: 70vh;
            min-height: 480px;
            border: 0;
          }

          @media (max-width: 576px) {
            .agent-iframe { height: 60vh; min-height: 360px; }
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

        {/* Enquiry Modal (unchanged) */}
        <Modal show={showEnquiry} onHide={closeEnquiry} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold fs-3">Charter Booking Enquiry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted mb-4">
              Tell us the details of your trip and we'll be in touch with the perfect transport option.
            </p>

            <form
              name="contact"
              method="POST"
              netlify-honeypot="bot-field"
              data-netlify="true"
              onSubmit={submitEnquiry}
            >
              <input type="hidden" name="form-name" value="contact" />
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

        {/* Floating chat button */}
        <div>
          <Button
            className="agent-chat-button bg-dark-600 text-white p-3"
            onClick={() => setShowAgent(true)}
            aria-label="Open chat assistant"
          >
            Chat
          </Button>
        </div>

        {/* Agent Modal (iframe). We only render iframe when mounted && showAgent */}
        <Modal
          show={showAgent}
          onHide={() => setShowAgent(false)}
          centered
          size="xl"
          dialogClassName="agent-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Assistant</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 0 }}>
            {renderAgentIframe ? (
              <iframe
                className="agent-iframe"
                title="Agent Assistant"
                src="https://chatgpt.com/embed/wf_6905a7f5db9c8190b311b6f813cfd29404ea078b79939865"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                // allow microphone/clipboard if the embed supports it:
                allow="microphone; clipboard-read; clipboard-write; encrypted-media"
              />
            ) : (
              // lightweight placeholder while iframe not mounted
              <div style={{ padding: "3rem", textAlign: "center" }}>
                Loading assistant…
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
}

/**
 * Head export to define metadata for the page
 */
export const Head = () => <Seo title="NextBus" />;
