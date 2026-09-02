const STORAGE_KEY = 'devops-cameroon-testimonials';

function getAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveTestimonial({ eventId, eventName, name, takeaway, photoUrl }) {
  const items = getAll();
  items.unshift({
    id: `${eventId}-${Date.now()}`,
    eventId,
    eventName,
    name,
    takeaway,
    photoUrl,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return items[0];
}

export function getTestimonialsByEvent(eventId) {
  return getAll().filter((t) => t.eventId === eventId);
}

export function getTestimonial(id) {
  return getAll().find((t) => t.id === id) || null;
}

export function deleteTestimonial(id) {
  const items = getAll().filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
