import { useEffect, useState } from 'react'
import { api } from '../api/client'

// Single data-access seam for the event showcase.
// Pages consume this hook (never the data/ or api/ modules directly), so when the
// dashboard backend goes live the swap happens here — or in api/client.js — with no
// page rewrites.

const initialState = {
  events: [],
  faqs: [],
  photos: {},
  loading: true,
  error: null,
}

export function useShowcase() {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let cancelled = false

    Promise.all([api.getShowcaseEvents(), api.getShowcaseFaqs(), api.getShowcasePhotos()])
      .then(([events, faqs, photos]) => {
        if (cancelled) return
        setState({ events, faqs, photos, loading: false, error: null })
      })
      .catch((error) => {
        if (cancelled) return
        setState({ ...initialState, loading: false, error })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}

export function useShowcaseEvent(id) {
  const [state, setState] = useState(initialState)
  const [event, setEvent] = useState(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    Promise.all([api.getShowcaseEvent(id), api.getShowcasePhotos()])
      .then(([ev, photos]) => {
        if (cancelled) return
        setEvent(ev)
        setState({ events: [], faqs: [], photos, loading: false, error: null })
      })
      .catch((error) => {
        if (cancelled) return
        setState({ ...initialState, loading: false, error })
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return { event, photos: state.photos, loading: state.loading, error: state.error }
}