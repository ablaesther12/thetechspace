// Delivers a contact-form submission somewhere a human will read it.
//
// `message` shape (all strings, optional fields may be ""):
//   { firstName, lastName, email, phone, projectType, budget, details }
//
// Resolve when the message is on its way; throw to make the form show its
// error state (which points visitors to hello@thetechspace.com as a fallback).
export async function sendContactMessage(message) {
  // TODO(you): choose how messages are delivered and implement it here.
  throw new Error("Contact delivery is not wired up yet");
}
