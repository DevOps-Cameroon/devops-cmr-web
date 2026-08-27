import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav, site } from "../data/community";
import Container from "./ui/container";
import SweepButton from "./ui/SweepButton";

function NavLinkItem({ item, onNavigate }) {
  return (
    <li>
      <NavLink
        to={item.path}
        end={item.path === "/"}
        onClick={onNavigate}
        className={({ isActive }) =>
          `group inline-flex items-center gap-1.5 px-3 py-2 font-sans font-medium text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            isActive ? "text-accent" : "text-ink-2 hover:text-ink"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              aria-hidden="true"
              className={`mr-2 inline-block transform transition-transform duration-200 ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-3 opacity-0"
              }`}
            >
              &gt;
            </span>
            {item.label.toLowerCase()}
          </>
        )}
      </NavLink>
    </li>
  );
}

function JoinNavButton({ item, onNavigate, mobile = false }) {
  if (mobile) {
    return (
      <li>
        <SweepButton
          as={Link}
          to={item.path}
          onClick={onNavigate}
          contentClassName="px-4 py-2.5"
          className="my-1 ml-3 inline-flex justify-start text-xs font-semibold uppercase tracking-wide"
        >
          join our community
        </SweepButton>
      </li>
    );
  }

  return (
    <li>
      <SweepButton
        as={Link}
        to={item.path}
        aria-label="Join our community"
        onClick={onNavigate}
        contentClassName="px-3 py-2 text-xs"
        className="join-nav-button inline-flex w-[58px] justify-start text-xs font-semibold uppercase tracking-wide transition-[width] duration-300 hover:w-[170px] focus-visible:w-[170px]"
      >
        <span className="join-label-short">join</span>
        <span className="join-label-long">join our community</span>
      </SweepButton>
    </li>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-base backdrop-blur-sm">
      <nav aria-label="Primary">
        <Container className="flex items-center justify-between py-3">
          <Link
            to="/"
            className="group flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="transition-colors group-hover:text-accent">
              {site.shortName}
            </span>
            <span className="hidden text-ink-3 sm:inline">/ {site.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.label === "Join" ? (
                <JoinNavButton key={item.path} item={item} />
              ) : (
                <NavLinkItem key={item.path} item={item} />
              ),
            )}
          </ul>

          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center border border-line bg-surface font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          >
            <span aria-hidden="true">{open ? "✕" : "≡"}</span>
          </button>
        </Container>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="border-t border-line bg-base lg:hidden"
        >
          <Container as="ul" className="flex flex-col py-2">
            {nav.map((item) =>
              item.label === "Join" ? (
                <JoinNavButton
                  key={item.path}
                  item={item}
                  onNavigate={() => setOpen(false)}
                  mobile
                />
              ) : (
                <NavLinkItem
                  key={item.path}
                  item={item}
                  onNavigate={() => setOpen(false)}
                />
              ),
            )}
          </Container>
        </div>
      )}

      <style>{`
        .join-nav-button .join-label-long { display: none; }
        .join-nav-button:hover .label-default .join-label-short,
        .join-nav-button:focus-visible .label-default .join-label-short { display: none; }
        .join-nav-button:hover .label-default .join-label-long,
        .join-nav-button:focus-visible .label-default .join-label-long { display: inline; }
        .join-nav-button .btn-overlay .join-label-short { display: none; }
        .join-nav-button .btn-overlay .join-label-long { display: inline; }
      `}</style>
    </header>
  );
}
