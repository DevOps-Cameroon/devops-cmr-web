import { Link } from 'react-router-dom'

export default function ShowcaseFooter({ event }) {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top" data-reveal>
          <div>
            <h2 data-scrub-text>Maximizing Cameroon's DevOps Talent</h2>
            <div className="partner-card">
              <b>Become a partner</b>
              <p>Interested in sponsorship or partnering with DevOps Cameroon? Get in touch.</p>
              <a href="#contact" onClick={(e) => e.preventDefault()} className="btn btn-dark">
                Contact Us →
              </a>
            </div>
          </div>
          <div className="footer-right">
            <div>
              <div className="fr-label">For Help</div>
              <div className="fr-val">info@devopscameroon.com</div>
            </div>
            <div>
              <div className="fr-label">For Media</div>
              <div className="fr-val">press@devopscameroon.com</div>
            </div>
            {event && (
              <div>
                <div className="fr-val" style={{ fontFamily: "'Anton', sans-serif", fontSize: '18px' }}>
                  {event.dateLabel}
                </div>
                <div className="fr-label" style={{ marginTop: '2px' }}>
                  {event.venue}
                </div>
              </div>
            )}
            <div className="btns">
              <a href="#signup" onClick={(e) => e.preventDefault()} className="btn btn-outline-w">
                Sign up
              </a>
              <Link to="/join" className="btn btn-white">
                RSVP
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-divider" />
        <div className="footer-brand-row">
          <h2>Devops Cameroon</h2>
          <div className="socials">
            <a href="#x" onClick={(e) => e.preventDefault()} aria-label="X">𝕏</a>
            <a href="#in" onClick={(e) => e.preventDefault()} aria-label="LinkedIn">in</a>
            <a href="#gh" onClick={(e) => e.preventDefault()} aria-label="GitHub">gh</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright DevOps Cameroon 2026</span>
          <div className="links">
            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}