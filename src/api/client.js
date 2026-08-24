// -----------------------------------------------------------------------------
// API LAYER
// Swap these implementations for real Django endpoints when the backend is ready.
//
// The Django REST API will serve these same shapes. To go live:
//   1. Set USE_MOCK = false (or delete this file's fallback and use fetchApi).
//   2. Point API_BASE_URL at your Django host.
//   3. Ensure DRF serializers return the exact field names below.
// No component needs to change.
// -----------------------------------------------------------------------------

import { communityStats } from '../data/community'
import { events } from '../data/events'
import { projects } from '../data/projects'
import { resources } from '../data/resources'
import { team } from '../data/team'
import { milestones } from '../data/milestones'
import { showcaseEvents, showcaseFaqs, showcasePhotos } from '../data/showcaseEvents'

const USE_MOCK = true

// Django will live here eventually.
const API_BASE_URL = '/api/v1'

// Generic fetch wrapper for the real backend.
async function fetchApi(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.json()
}

// Simulated latency so loading states are exercised during development.
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))

async function mock(shape) {
  await delay()
  return shape
}

// -----------------------------------------------------------------------------
// The public client. Both modes return Promises of identical shapes.
// -----------------------------------------------------------------------------
export const api = {
  async getStats() {
    if (!USE_MOCK) return fetchApi('/stats/')
    return mock(communityStats)
  },
  async getEvents() {
    if (!USE_MOCK) return fetchApi('/events/')
    return mock(events)
  },
  async getEvent(id) {
    if (!USE_MOCK) return fetchApi(`/events/${id}/`)
    return mock(events.find((e) => e.id === id))
  },
  async getProjects() {
    if (!USE_MOCK) return fetchApi('/projects/')
    return mock(projects)
  },
  async getResources() {
    if (!USE_MOCK) return fetchApi('/resources/')
    return mock(resources)
  },
  async getTeam() {
    if (!USE_MOCK) return fetchApi('/team/')
    return mock(team)
  },
  async getMilestones() {
    if (!USE_MOCK) return fetchApi('/milestones/')
    return mock(milestones)
  },
  async getShowcaseEvents() {
    if (!USE_MOCK) return fetchApi('/showcase/events/')
    return mock(showcaseEvents)
  },
  async getShowcaseEvent(id) {
    if (!USE_MOCK) return fetchApi(`/showcase/events/${id}/`)
    return mock(showcaseEvents.find((e) => e.id === id) || showcaseEvents[0])
  },
  async getShowcaseFaqs() {
    if (!USE_MOCK) return fetchApi('/showcase/faqs/')
    return mock(showcaseFaqs)
  },
  async getShowcasePhotos() {
    if (!USE_MOCK) return fetchApi('/showcase/photos/')
    return mock(showcasePhotos)
  },
}
