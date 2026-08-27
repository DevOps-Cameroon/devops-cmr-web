import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import About from './pages/About'
import EventsOverview from './pages/EventsOverview'
import EventDetail from './pages/EventDetail'
import Projects from './pages/Projects'
import Join from './pages/Join'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<EventsOverview />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="join" element={<Join />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
