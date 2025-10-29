import React, { useState } from "react";

/**
 * TripRequestCard
 * - Ready-to-drop React component for a Gatsby site
 * - Place in: src/components/TripRequestCard.jsx
 * - Usage: import TripRequestCard from "~/components/TripRequestCard" and embed <TripRequestCard />
 *
 * Notes:
 * - Uses only React (no external UI libs) so it works in Gatsby without extra dependencies.
 * - Controlled inputs, simple validation, and handlers for "Review details" and "Discard".
 */

export default function TripRequestCard({
  title = "Request a trip",
  helper = "Tell us the details and we'll get quotes from local operators.",
  placeholders = {
    pickup: "Where from?",
    destination: "Where to?",
    startTime: "HH:MM",
    returnTime: "HH:MM",
    passengers: "Number of passengers",
    notes: "Any special requirements"
  },
  tripTypeOptions = [
    { label: "One way", value: "oneway" },
    { label: "Return", value: "return" },
    { label: "Multiday", value: "multiday" }
  ],
  initialTripType = "oneway"
}) {
  // yyyy-mm-dd for input[type=date]
  const today = new Date().toISOString().slice(0, 10);

  const [tripType, setTripType] = useState(initialTripType);
  const [form, setForm] = useState({
    pickup: "",
    destination: "",
    startDate: today,
    startTime: "",
    passengers: 1,
    returnDate: "",
    returnTime: "",
    endDate: "",
    notes: ""
  });

  function handleChange(e) {
    const { name, value, type } = e.target;
    const parsed = type === "number" ? (value === "" ? "" : Number(value)) : value;
    setForm(prev => ({ ...prev, [name]: parsed }));
  }

  function handleTripTypeChange(e) {
    const newType = e.target.value;
    setTripType(newType);
    // Clear fields not relevant for the selected type
    setForm(prev => ({
      ...prev,
      returnDate: newType === "return" ? prev.returnDate : "",
      returnTime: newType === "return" ? prev.returnTime : "",
      endDate: newType === "multiday" ? prev.endDate : ""
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Basic client-side validation
    if (!form.pickup.trim() || !form.destination.trim()) {
      alert("Pickup and destination are required.");
      return;
    }
    if (!form.startDate) {
      alert("Please choose a travel date.");
      return;
    }
    if (!form.passengers || form.passengers < 1) {
      alert("Please enter a valid number of passengers.");
      return;
    }

    const payload = {
      trip: {
        pickup: form.pickup,
        destination: form.destination,
        startDate: form.startDate,
        startTime: form.startTime,
        passengers: form.passengers,
        type: tripType,
        returnDate: form.returnDate,
        returnTime: form.returnTime,
        endDate: form.endDate,
        notes: form.notes
      }
    };

    // Replace this with your real submit logic (server/API call, state management, etc.)
    console.log("Review action payload:", payload);
    // Example: navigate to a review page, call an API, or dispatch an action
    // For now, show a small confirmation to the user
    alert("Submitted for review — check console for payload.");
  }

  function handleDiscard() {
    if (!window.confirm("Discard this request?")) return;
    setTripType(initialTripType);
    setForm({
      pickup: "",
      destination: "",
      startDate: today,
      startTime: "",
      passengers: 1,
      returnDate: "",
      returnTime: "",
      endDate: "",
      notes: ""
    });
    console.log("Request discarded (action: request.discard)");
  }

  // Simple inline styles so you can drop in without extra CSS files.
  const styles = {
    container: {
      maxWidth: 720,
      border: "1px solid #e3e3e3",
      borderRadius: 8,
      padding: 16,
      background: "#fff"
    },
    heading: { margin: 0 },
    helper: { margin: "6px 0 0", color: "#666" },
    hr: { border: 0, borderTop: "1px solid #eee", margin: "12px 0" },
    input: { width: "100%", padding: 8, boxSizing: "border-box" },
    row: { display: "flex", gap: 12 },
    infoBox: {
      width: 36,
      height: 36,
      borderRadius: 6,
      background: "#f4f5f7",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    actions: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <div style={{ marginBottom: 12 }}>
        <h3 style={styles.heading}>{title}</h3>
        <p style={styles.helper}>{helper}</p>
      </div>

      <div style={styles.hr} />

      <div style={{ display: "grid", gap: 12 }}>
        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Pickup location</div>
          <input
            name="pickup"
            value={form.pickup}
            onChange={handleChange}
            placeholder={placeholders.pickup}
            required
            style={styles.input}
          />
        </label>

        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Destination</div>
          <input
            name="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder={placeholders.destination}
            required
            style={styles.input}
          />
        </label>

        <div style={styles.row}>
          <div style={{ flex: 1 }}>
            <label>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Travel date</div>
              <input
                name="startDate"
                type="date"
                value={form.startDate}
                min={today}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>
          </div>

          <div style={{ flex: 1 }}>
            <label>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Pickup time</div>
              <input
                name="startTime"
                type="time"
                value={form.startTime}
                placeholder={placeholders.startTime}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
          </div>
        </div>

        <div style={styles.row}>
          <div style={{ flex: 1 }}>
            <label>
              <div style={{ fontSize: 13, marginBottom: 6 }}>Passengers</div>
              <input
                name="passengers"
                type="number"
                min={1}
                value={form.passengers}
                onChange={handleChange}
                placeholder={placeholders.passengers}
                required
                style={styles.input}
              />
            </label>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, marginBottom: 6 }}>Trip type</div>
            <div role="radiogroup" aria-label="Trip type" style={{ display: "flex", gap: 8 }}>
              {tripTypeOptions.map(opt => (
                <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="radio"
                    name="tripType"
                    value={opt.value}
                    checked={tripType === opt.value}
                    onChange={handleTripTypeChange}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {tripType === "return" && (
          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label>
                <div style={{ fontSize: 13, marginBottom: 6 }}>Return date</div>
                <input
                  name="returnDate"
                  type="date"
                  value={form.returnDate}
                  min={today}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </label>
            </div>

            <div style={{ flex: 1 }}>
              <label>
                <div style={{ fontSize: 13, marginBottom: 6 }}>Return time</div>
                <input
                  name="returnTime"
                  type="time"
                  value={form.returnTime}
                  placeholder={placeholders.returnTime}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
            </div>
          </div>
        )}

        {tripType === "multiday" && (
          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label>
                <div style={{ fontSize: 13, marginBottom: 6 }}>End date</div>
                <input
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  min={today}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </label>
            </div>
          </div>
        )}

        <label>
          <div style={{ fontSize: 13, marginBottom: 6 }}>Special requirements</div>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder={placeholders.notes}
            rows={3}
            style={styles.input}
          />
        </label>
      </div>

      <div style={styles.hr} />

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={styles.infoBox}>
          <span aria-hidden>i</span>
        </div>

        <div>
          <div style={{ fontSize: 13 }}>We’ll share your request with trusted NZ operators.</div>
          <div style={{ fontSize: 13, color: "#666" }}>They’ll reply with their best quotes on NextBus.</div>
          <div style={{ fontSize: 13, color: "#666" }}>Compare all offers in one place — no chasing.</div>
        </div>
      </div>

      <div style={styles.actions}>
        <button type="button" onClick={handleDiscard} style={{ padding: "8px 12px" }}>
          Discard
        </button>
        <button type="submit" style={{ padding: "8px 12px" }}>
          Review details
        </button>
      </div>
    </form>
  );
}
