"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "@/components/icons";

export function BookingForm() {
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const required = ["name", "email", "event", "city", "date"];
    if (required.some((field) => !String(form.get(field) ?? "").trim())) {
      setStatus("Please complete every required field.");
      return;
    }

    const brief = [
      `SHEF booking enquiry — ${form.get("event")} — ${form.get("city")}`,
      "",
      `Name: ${form.get("name")}`,
      `Email: ${form.get("email")}`,
      `Company: ${form.get("company") || "—"}`,
      `Event: ${form.get("event")}`,
      `City / country: ${form.get("city")}`,
      `Date: ${form.get("date")}`,
      `Capacity: ${form.get("capacity") || "—"}`,
      `Budget: ${form.get("budget") || "—"}`,
      "",
      String(form.get("message") || "No additional notes."),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(brief);
      setStatus("Booking brief copied. Send it to @shef.dj through the official Instagram profile.");
    } catch {
      setStatus("Copying was blocked by your browser. Select the details above and send them to @shef.dj.");
    }
  }

  return (
    <form className="booking-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label><span>Your name *</span><input name="name" autoComplete="name" required placeholder="Full name" /></label>
        <label><span>Email *</span><input name="email" type="email" autoComplete="email" required placeholder="name@company.com" /></label>
        <label><span>Company / promoter</span><input name="company" autoComplete="organization" placeholder="Organization" /></label>
        <label><span>Event type *</span><select name="event" required defaultValue=""><option value="" disabled>Select one</option><option>Club</option><option>Festival</option><option>Fashion show</option><option>Private event</option><option>Brand event</option><option>Other</option></select></label>
        <label><span>City / country *</span><input name="city" required placeholder="Berlin, Germany" /></label>
        <label><span>Event date *</span><input name="date" type="date" required /></label>
        <label><span>Venue capacity</span><input name="capacity" inputMode="numeric" placeholder="1,200" /></label>
        <label><span>Budget range</span><input name="budget" placeholder="Currency + range" /></label>
      </div>
      <label className="form-message"><span>Tell us about the room</span><textarea name="message" rows={5} placeholder="Venue, lineup, set time, audience, and anything we should know." /></label>
      <div className="form-submit-row">
        <p role="status" aria-live="polite">{status || "This form keeps your details on your device until you choose where to send them."}</p>
        <button className="button button-light" type="submit">Copy booking brief <ArrowUpRight /></button>
      </div>
    </form>
  );
}
