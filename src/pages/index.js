import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaBus, FaUsers, FaShieldAlt, FaClock, FaGraduationCap, FaBriefcase, FaHeart, FaTrophy, FaCalendarAlt, FaMapMarkedAlt } from "react-icons/fa";
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

  const [showAgent, setShowAgent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const AGENT_EMBED_URL = "https://agent-bus.netlify.app/";

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
      setFormValues({
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
    } catch (error) {
      alert("There was an issue submitting your form. Please try again.");
    }
  }

  const renderAgentIframe = mounted && showAgent && AGENT_EMBED_URL;

  const services = [
    { icon: FaGraduationCap, title: "School Trips", description: "Safe, reliable transport for educational excursions and school events" },
    { icon: FaBriefcase, title: "Corporate Events", description: "Professional transport solutions for conferences, team building, and company events" },
    { icon: FaHeart, title: "Weddings", description: "Elegant group transport for your special day, ensuring guests arrive on time" },
    { icon: FaTrophy, title: "Sporting Events", description: "Team transport to matches, tournaments, and sporting venues" },
    { icon: FaCalendarAlt, title: "Day Tours", description: "Comfortable coaches for sightseeing and group day trips around Auckland" },
    { icon: FaMapMarkedAlt, title: "Transfers", description: "Group airport pickups and drop-offs with professional service" },
  ];

  const features = [
    { icon: FaBus, title: "Modern Fleet", description: "Well-maintained, comfortable coaches with premium amenities" },
    { icon: FaShieldAlt, title: "Fully Licensed", description: "All drivers are professionally trained and fully licensed" },
    { icon: FaClock, title: "Always On Time", description: "Punctual service you can rely on for every journey" },
    { icon: FaUsers, title: "Any Group Size", description: "From small groups to large events, we have the right vehicle" },
  ];

  return (
    <Layout>
      <div style={{ background: "#fff", minHeight: "100vh" }}>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .hero-section {
            background: linear-gradient(135deg, #0f2847 0%, #1a4d7a 50%, #2563eb 100%);
            color: white;
            padding: 100px 0 120px;
            position: relative;
            overflow: hidden;
          }

          .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
            opacity: 0.5;
          }

          .hero-content {
            position: relative;
            z-index: 2;
            animation: fadeInUp 1s ease-out;
          }

          .section-padding {
            padding: 80px 0;
          }

          .service-card {
            border: none;
            border-radius: 16px;
            padding: 32px 24px;
            transition: all 0.3s ease;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            height: 100%;
          }

          .service-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }

          .service-icon {
            width: 64px;
            height: 64px;
            border-radius: 12px;
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            font-size: 28px;
            color: white;
          }

          .feature-card {
            text-align: center;
            padding: 40px 20px;
            border-radius: 12px;
            background: #f8fafc;
            transition: all 0.3s ease;
          }

          .feature-card:hover {
            background: white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }

          .feature-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
            font-size: 32px;
            color: white;
          }

          .cta-section {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 80px 0;
            text-align: center;
          }

          .btn-primary-custom {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            border: none;
            padding: 16px 40px;
            font-size: 18px;
            font-weight: 600;
            border-radius: 12px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }

          .btn-primary-custom:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
            background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          }

          .btn-secondary-custom {
            background: white;
            color: #2563eb;
            border: 2px solid white;
            padding: 16px 40px;
            font-size: 18px;
            font-weight: 600;
            border-radius: 12px;
            transition: all 0.3s ease;
          }

          .btn-secondary-custom:hover {
            background: transparent;
            color: white;
            transform: translateY(-2px);
          }

          .section-title {
            font-size: 42px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #1e293b;
          }

          .section-subtitle {
            font-size: 20px;
            color: #64748b;
            margin-bottom: 60px;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
          }

          .agent-chat-button {
            position: fixed;
            right: 24px;
            bottom: 24px;
            z-index: 1050;
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            border: none;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 600;
            transition: all 0.3s ease;
            color: white;
          }

          .agent-chat-button:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 32px rgba(37, 99, 235, 0.5);
            background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
          }

          .agent-iframe {
            width: 100%;
            height: 70vh;
            min-height: 480px;
            border: 0;
          }

          @media (max-width: 768px) {
            .hero-section {
              padding: 60px 0 80px;
            }

            .section-padding {
              padding: 50px 0;
            }

            .section-title {
              font-size: 32px;
            }

            .section-subtitle {
              font-size: 18px;
            }

            .agent-iframe {
              height: 60vh;
              min-height: 360px;
            }
          }

          .stats-section {
            background: #f8fafc;
            padding: 60px 0;
          }

          .stat-item {
            text-align: center;
            padding: 20px;
          }

          .stat-number {
            font-size: 48px;
            font-weight: 700;
            color: #2563eb;
            margin-bottom: 8px;
          }

          .stat-label {
            font-size: 16px;
            color: #64748b;
            font-weight: 500;
          }
        `}</style>

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
          <input type="text" name="bot-field" />
        </form>

        <section className="hero-section">
          <Container>
            <div className="hero-content">
              <h1 style={{ fontSize: "56px", fontWeight: "700", marginBottom: "24px", lineHeight: "1.2" }}>
                Auckland Bus Charters
              </h1>
              <p style={{ fontSize: "24px", marginBottom: "40px", maxWidth: "700px", lineHeight: "1.6", opacity: "0.95" }}>
                Reliable, modern and comfortable group transport across South and East Auckland. From school trips and corporate events to weddings and special occasions.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Button className="btn-primary-custom" onClick={openEnquiry}>
                  Get a Quote
                </Button>
                <Button className="btn-secondary-custom" onClick={() => setShowAgent(true)}>
                  Chat With Us
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="stats-section">
          <Container>
            <Row>
              <Col md={3} sm={6} className="mb-4 mb-md-0">
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
              </Col>
              <Col md={3} sm={6} className="mb-4 mb-md-0">
                <div className="stat-item">
                  <div className="stat-number">10,000+</div>
                  <div className="stat-label">Happy Passengers</div>
                </div>
              </Col>
              <Col md={3} sm={6} className="mb-4 mb-md-0">
                <div className="stat-item">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">On-Time Rate</div>
                </div>
              </Col>
              <Col md={3} sm={6}>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support Available</div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section-padding">
          <Container>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 className="section-title">Our Charter Services</h2>
              <p className="section-subtitle">
                Professional transport solutions for every occasion across Auckland
              </p>
            </div>
            <Row>
              {services.map((service, index) => (
                <Col key={index} lg={4} md={6} className="mb-4">
                  <Card className="service-card">
                    <div className="service-icon">
                      <service.icon />
                    </div>
                    <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "12px", color: "#1e293b" }}>
                      {service.title}
                    </h3>
                    <p style={{ color: "#64748b", marginBottom: "0", lineHeight: "1.6" }}>
                      {service.description}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section className="section-padding" style={{ background: "#f8fafc" }}>
          <Container>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2 className="section-title">Why Choose NextBus</h2>
              <p className="section-subtitle">
                Safe, reliable, and comfortable transport you can trust
              </p>
            </div>
            <Row>
              {features.map((feature, index) => (
                <Col key={index} lg={3} md={6} className="mb-4">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <feature.icon />
                    </div>
                    <h4 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px", color: "#1e293b" }}>
                      {feature.title}
                    </h4>
                    <p style={{ color: "#64748b", marginBottom: "0", fontSize: "15px" }}>
                      {feature.description}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section className="cta-section">
          <Container>
            <h2 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "20px" }}>
              Ready to Book Your Charter?
            </h2>
            <p style={{ fontSize: "20px", marginBottom: "40px", opacity: "0.9", maxWidth: "600px", margin: "0 auto 40px" }}>
              Get a free quote today and experience the best in group transport across Auckland
            </p>
            <Button className="btn-primary-custom" onClick={openEnquiry}>
              Request a Quote Now
            </Button>
          </Container>
        </section>

        <Modal show={showEnquiry} onHide={closeEnquiry} centered size="lg">
          <Modal.Header closeButton style={{ borderBottom: "2px solid #f1f5f9", padding: "24px" }}>
            <Modal.Title style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b" }}>
              Charter Booking Enquiry
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "32px" }}>
            <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "16px" }}>
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
                  <Form.Label style={{ fontWeight: "500", color: "#475569", marginBottom: "8px" }}>Your Name</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="John Smith"
                    value={formValues.name}
                    onChange={handleFormChange}
                    required
                    style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e2e8f0" }}
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label style={{ fontWeight: "500", color: "#475569", marginBottom: "8px" }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formValues.email}
                    onChange={handleFormChange}
                    required
                    style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e2e8f0" }}
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label style={{ fontWeight: "500", color: "#475569", marginBottom: "8px" }}>Phone Number</Form.Label>
                  <Form.Control
                    name="phone"
                    placeholder="021 123 4567"
                    value={formValues.phone}
                    onChange={handleFormChange}
                    required
                    style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e2e8f0" }}
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label style={{ fontWeight: "500", color: "#475569", marginBottom: "8px" }}>Number of Passengers</Form.Label>
                  <Form.Control
                    type="number"
                    name="groupSize"
                    placeholder="25"
                    value={formValues.groupSize}
                    onChange={handleFormChange}
                    required
                    style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e2e8f0" }}
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label style={{ fontWeight: "500", color: "#475569", marginBottom: "8px" }}>Pickup Location</Form.Label>
                  <Form.Control
                    name="pickupLocation"
                    placeholder="Manukau, Auckland"
                    value={formValues.pickupLocation}
                    onChange={handleFormChange}
                    required
                    style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e2e8f0" }}
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label style={{ fontWeight: "500", color: "#475569", marginBottom: "8px" }}>Drop-off Location</Form.Label>
                  <Form.Control
                    name="dropoffLocation"
                    placeholder="Auckland CBD"
                    value={formValues.dropoffLocation}
                    onChange={handleFormChange}
                    required
                    style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e2e8f0" }}
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label style={{ fontWeight: "500", color: "#475569", marginBottom: "8px" }}>Travel Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleFormChange}
                    required
                    style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e2e8f0" }}
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label style={{ fontWeight: "500", color: "#475569", marginBottom: "8px" }}>Pickup Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    value={formValues.time}
                    onChange={handleFormChange}
                    required
                    style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e2e8f0" }}
                  />
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Label style={{ fontWeight: "500", color: "#475569", marginBottom: "8px" }}>Trip Type</Form.Label>
                  <Form.Select
                    name="tripType"
                    value={formValues.tripType}
                    onChange={handleFormChange}
                    required
                    style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e2e8f0" }}
                  >
                    <option value="">Select trip type</option>
                    <option value="oneway">One-way</option>
                    <option value="return">Return Trip</option>
                    <option value="multi">Multi-stop / Custom</option>
                  </Form.Select>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Label style={{ fontWeight: "500", color: "#475569", marginBottom: "8px" }}>Additional Notes</Form.Label>
                  <Form.Control
                    name="notes"
                    as="textarea"
                    rows={4}
                    placeholder="Any special requirements or additional information..."
                    value={formValues.notes}
                    onChange={handleFormChange}
                    style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e2e8f0" }}
                  />
                </Col>
              </Row>

              <Button
                type="submit"
                className="w-100"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                  border: "none",
                  padding: "16px",
                  fontSize: "18px",
                  fontWeight: "600",
                  borderRadius: "8px"
                }}
              >
                Submit Enquiry
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        <Button
          className="agent-chat-button"
          onClick={() => setShowAgent(true)}
          aria-label="Open chat assistant"
        >
          💬
        </Button>

        <Modal
          show={showAgent}
          onHide={() => setShowAgent(false)}
          centered
          size="xl"
          dialogClassName="agent-modal"
        >
          <Modal.Header closeButton style={{ borderBottom: "2px solid #f1f5f9" }}>
            <Modal.Title style={{ fontSize: "20px", fontWeight: "600" }}>Chat Assistant</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 0 }}>
            {renderAgentIframe ? (
              <iframe
                className="agent-iframe"
                title="Agent Assistant"
                src="https://agent-bus.netlify.app/"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                allow="microphone; clipboard-read; clipboard-write; encrypted-media"
              />
            ) : (
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

export const Head = () => <Seo title="NextBus - Auckland Bus Charters" />;
