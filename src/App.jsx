import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  categories,
  features,
  getOpenStatus,
  getTodayIndex,
  openingHours,
  products,
  testimonials,
  visitInfo,
} from "./data";
import aboutImage from "./assets/about.jpg";
import aboutCatImage from "./assets/about-cat.jpg";
import heroImage from "./assets/hero.jpg";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  CoffeeIcon,
  CroissantIcon,
  FacebookIcon,
  HeartIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  PawIcon,
  PhoneIcon,
  QuoteIcon,
  SparkleIcon,
  StarIcon,
  XSocialIcon,
} from "./icons";

const FEATURE_ICONS = {
  croissant: CroissantIcon,
  paw: PawIcon,
  coffee: CoffeeIcon,
  heart: HeartIcon,
};

/* ---------------------------------------------------------------- helpers */

function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function SectionHeading({ label, title, center = false }) {
  return (
    <div className={`section-heading${center ? " is-center" : ""}`}>
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

/* ----------------------------------------------------------------- header */

const NAV_LINKS = [
  { label: "Our Story", target: "about" },
  { label: "Menu", target: "menu" },
  { label: "Reviews", target: "reviews" },
  { label: "Visit Us", target: "visit" },
];

function Header({ favoritesCount, onNavigate, onReserve }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (target) => {
    setMenuOpen(false);
    onNavigate(target);
  };

  return (
    <>
      <div className="topbar">
        <PawIcon className="topbar-paw" />
        <span>
          28 Lavender Lane, Portland&ensp;·&ensp;Open daily from 8:00&ensp;·&ensp;Weekend
          high-tea now booking
        </span>
      </div>

      <header className={`navbar${scrolled ? " is-scrolled" : ""}`}>
        <div className="container navbar-inner">
          <button
            className="brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Happy Paws — back to top"
          >
            <span className="logo-mark">
              <PawIcon />
            </span>
            <span className="brand-text">
              <span className="brand-name">Happy Paws</span>
              <span className="brand-sub">Bakery &amp; Cat Café</span>
            </span>
          </button>

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <button
                key={link.target}
                className="nav-link"
                onClick={() => handleNavigate(link.target)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="fav-pill"
              onClick={() => handleNavigate("menu")}
              aria-label={`Saved favourites: ${favoritesCount}`}
            >
              <HeartIcon />
              {favoritesCount > 0 && (
                <span className="fav-count">{favoritesCount}</span>
              )}
            </button>

            <button className="btn btn-primary btn-sm" onClick={onReserve}>
              Book a Table
            </button>

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <button
                key={link.target}
                className="mobile-link"
                onClick={() => handleNavigate(link.target)}
              >
                {link.label}
                <ArrowRightIcon />
              </button>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}

/* ------------------------------------------------------------------- hero */

function Hero({ onExplore, onReserve }) {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <SparkleIcon />
            Bakery &amp; Cat Café · Est. 2019
          </span>

          <h1>
            Where every visit comes with a <em>purr.</em>
          </h1>

          <p className="hero-lede">
            Hand-finished pastries, small-batch coffee and a room full of rescue
            cats who consider themselves your hosts. Slow mornings start here.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onExplore}>
              Explore the Menu
              <ArrowRightIcon />
            </button>
            <button className="btn btn-ghost" onClick={onReserve}>
              Book a Table
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">
                4.9
                <StarIcon />
              </span>
              <span className="stat-label">1,200+ guest reviews</span>
            </div>
            <div className="stat">
              <span className="stat-value">22</span>
              <span className="stat-label">Rescue cats in residence</span>
            </div>
            <div className="stat">
              <span className="stat-value">7 AM</span>
              <span className="stat-label">First bake, out of the oven</span>
            </div>
          </div>
        </div>

        <div className="hero-media">
          <img
            className="hero-photo"
            src={heroImage}
            alt="A ginger cat asleep on a pink cushion beside a latte and pastries, inside the sunlit Happy Paws café"
          />
          <div className="hero-card">
            <img src={products[0].image} alt="" />
            <div>
              <span>Today&rsquo;s special</span>
              <strong>{products[0].name}</strong>
              <em>{products[0].price}</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- marquee */

const MARQUEE_ITEMS = [
  "Fresh bakes daily",
  "Rescue-cat adoptions",
  "Locally roasted coffee",
  "Vegan & gluten-free options",
  "Weekend high-tea",
  "Free Wi-Fi & slow mornings",
];

function Marquee() {
  const row = (hidden) => (
    <div className="marquee-row" aria-hidden={hidden || undefined}>
      {MARQUEE_ITEMS.map((item) => (
        <span className="marquee-item" key={item}>
          <PawIcon />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- features */

function Features() {
  return (
    <section className="section features">
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = FEATURE_ICONS[feature.icon];
            return (
              <Reveal
                as="article"
                className="feature-card"
                key={feature.title}
                delay={index * 90}
              >
                <span className="feature-icon">
                  <Icon />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ about */

function About({ onMeetCats, onNavigate }) {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <Reveal className="about-media">
          <img
            className="about-photo-main"
            src={aboutImage}
            alt="The Happy Paws counter with a glass display of cakes and blush-pink tiles"
          />
          <img
            className="about-photo-float"
            src={aboutCatImage}
            alt="Mochi, a cream-coloured resident cat, napping beside a latte"
          />
          <span className="about-chip">
            <PawIcon />
            Mochi · Head of Hospitality
          </span>
        </Reveal>

        <Reveal className="about-copy" delay={120}>
          <SectionHeading
            label="Our story"
            title={
              <>
                A café with a heartbeat — <em>and a tail.</em>
              </>
            }
          />
          <p>
            Happy Paws started in 2019 with one oven, two cats and a simple
            idea: the best mornings are the ones you don&rsquo;t rush. Today
            we&rsquo;re a small team of bakers, baristas and professional
            purr-viders — and every cat here was rescued and is ready for a
            forever home.
          </p>
          <p>
            Grab a corner sofa, order the rose latte, and let a
            biscuit-weight kitten rearrange your plans.
          </p>

          <ul className="about-list">
            {[
              "22 rescued cats — vetted, vaccinated, adoptable",
              "Organic flour, local dairy, real fruit",
              "Quiet nooks, fast Wi-Fi and zero judgement",
            ].map((item) => (
              <li key={item}>
                <span className="about-check">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="about-actions">
            <button className="btn btn-primary" onClick={onMeetCats}>
              Meet the Cats
              <ArrowRightIcon />
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate("visit")}>
              Plan a Visit
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- menu */

function MenuSection({
  selectedCategory,
  onSelectCategory,
  favorites,
  onToggleFavorite,
  onQuickView,
}) {
  const filtered =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="menu" className="section menu">
      <div className="container">
        <div className="menu-head">
          <SectionHeading
            label="The menu"
            title={
              <>
                Baked fresh, <em>every morning.</em>
              </>
            }
          />
          <p className="menu-note">
            Everything is made in-house in small batches. When it&rsquo;s gone,
            it&rsquo;s gone — the cats insist on quality control.
          </p>
        </div>

        <div className="filter-row" role="group" aria-label="Filter the menu">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-pill${
                selectedCategory === category.id ? " is-active" : ""
              }`}
              aria-pressed={selectedCategory === category.id}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="menu-grid" key={selectedCategory}>
          {filtered.map((product, index) => {
            const isFavorite = favorites.includes(product.id);
            return (
              <Reveal
                as="article"
                className="menu-card"
                key={product.id}
                delay={index * 70}
              >
                <div className="menu-card-media">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                  />
                  {product.badge && (
                    <span className="menu-badge">{product.badge}</span>
                  )}
                  <button
                    className={`fav-btn${isFavorite ? " is-active" : ""}`}
                    onClick={() => onToggleFavorite(product)}
                    aria-label={
                      isFavorite
                        ? `Remove ${product.name} from favourites`
                        : `Save ${product.name} to favourites`
                    }
                    aria-pressed={isFavorite}
                  >
                    <HeartIcon filled={isFavorite} />
                  </button>
                </div>

                <div className="menu-card-body">
                  <span className="menu-card-kicker">{product.categoryLabel}</span>
                  <div className="menu-card-top">
                    <h3>{product.name}</h3>
                    <span className="price">{product.price}</span>
                  </div>
                  <p>{product.description}</p>
                  <div className="menu-card-foot">
                    <div className="tag-row">
                      {product.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      className="quick-view"
                      onClick={() => onQuickView(product)}
                    >
                      Quick view
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ testimonials */

function Testimonials() {
  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <div className="reviews-head">
          <SectionHeading
            label="Guest love"
            title={
              <>
                Loved by humans.
                <br />
                <em>Adored by cats.</em>
              </>
            }
          />
          <Reveal className="reviews-score">
            <span className="score-number">4.9</span>
            <span className="stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} />
              ))}
            </span>
            <span className="score-caption">
              Based on 1,200+ verified reviews
            </span>
          </Reveal>
        </div>

        <div className="reviews-grid">
          {testimonials.map((testimonial, index) => (
            <Reveal
              as="figure"
              className="review-card"
              key={testimonial.name}
              delay={index * 100}
            >
              <QuoteIcon className="review-quote" />
              <span className="review-stars" aria-hidden="true">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <StarIcon key={i} />
                ))}
              </span>
              <blockquote>{testimonial.text}</blockquote>
              <figcaption className="review-person">
                <span className="avatar">{testimonial.initials}</span>
                <span>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.meta}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ visit */

function Visit({ onReserve }) {
  const status = getOpenStatus();
  const todayIndex = getTodayIndex();

  return (
    <section id="visit" className="section visit">
      <div className="container visit-grid">
        <Reveal>
          <SectionHeading
            label="Visit us"
            title={
              <>
                Come say hi — <em>the kettle&rsquo;s on.</em>
              </>
            }
          />
          <p className="visit-lede">
            We&rsquo;re a five-minute stroll from the Pearl District. No
            reservation needed on weekdays — just push the door and follow the
            smell of croissants.
          </p>

          <div className="info-rows">
            <div className="info-row">
              <span className="info-icon">
                <MapPinIcon />
              </span>
              <div>
                <strong>Find us</strong>
                <p>
                  {visitInfo.address}
                  <br />
                  {visitInfo.addressNote}
                </p>
              </div>
            </div>
            <div className="info-row">
              <span className="info-icon">
                <PhoneIcon />
              </span>
              <div>
                <strong>Call us</strong>
                <p>{visitInfo.phone} — we answer quick</p>
              </div>
            </div>
            <div className="info-row">
              <span className="info-icon">
                <MailIcon />
              </span>
              <div>
                <strong>Write to us</strong>
                <p>{visitInfo.email}</p>
              </div>
            </div>
          </div>

          <div className="visit-actions">
            <button className="btn btn-primary" onClick={onReserve}>
              Book a Table
            </button>
            <a className="btn btn-ghost" href={visitInfo.phoneHref}>
              <PhoneIcon />
              {visitInfo.phone}
            </a>
          </div>
        </Reveal>

        <Reveal className="hours-card" delay={120}>
          <div className="hours-head">
            <h3>Opening hours</h3>
            <span
              className={`open-chip ${status.isOpen ? "is-open" : "is-closed"}`}
            >
              <span className="open-dot" aria-hidden="true" />
              {status.label}
            </span>
          </div>

          <ul className="hours-list">
            {openingHours.map((row, index) => (
              <li
                className={`hours-row${index === todayIndex ? " is-today" : ""}`}
                key={row.day}
              >
                <strong>
                  {row.day}
                  {index === todayIndex && <span className="today-chip">Today</span>}
                </strong>
                <span>
                  {row.open} – {row.close}
                </span>
              </li>
            ))}
          </ul>

          <p className="hours-note">
            <ClockIcon />
            Reservations recommended on weekends — the sofa seats by the window
            go fast.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- newsletter */

function NewsletterCta({ email, onEmailChange, onSubscribe }) {
  return (
    <section className="section cta">
      <div className="container">
        <Reveal className="cta-band">
          <h2>
            Get the Sunday <em>treat box.</em>
          </h2>
          <p>
            Weekly menus, resident-cat photos and first dibs on seasonal bakes.
            No spam — pinky promise.
          </p>
          <form className="cta-form" onSubmit={onSubscribe}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={onEmailChange}
              aria-label="Email address"
            />
            <button type="submit" className="btn btn-invert">
              Subscribe
            </button>
          </form>
          <p className="cta-fineprint">
            Join 2,300 subscribers · Unsubscribe anytime
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- footer */

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <span className="logo-mark">
                <PawIcon />
              </span>
              <span className="brand-text">
                <span className="brand-name">Happy Paws</span>
                <span className="brand-sub">Bakery &amp; Cat Café</span>
              </span>
            </div>
            <p>
              The perfect blend of warm pastries, good coffee and soft, purring
              company — since 2019.
            </p>
            <div className="social-row">
              <button className="social-btn" aria-label="Instagram">
                <InstagramIcon />
              </button>
              <button className="social-btn" aria-label="Facebook">
                <FacebookIcon />
              </button>
              <button className="social-btn" aria-label="X (Twitter)">
                <XSocialIcon />
              </button>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="footer-links">
              {NAV_LINKS.map((link) => (
                <li key={link.target}>
                  <button onClick={() => onNavigate(link.target)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Visit</h4>
            <ul className="footer-links">
              <li>{visitInfo.address}</li>
              <li>
                <a href={visitInfo.phoneHref}>{visitInfo.phone}</a>
              </li>
              <li>{visitInfo.email}</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Hours</h4>
            <ul className="footer-links">
              <li>Mon – Fri · 8:00 – 20:00</li>
              <li>Saturday · 9:00 – 21:00</li>
              <li>Sunday · 9:00 – 18:00</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Happy Paws Bakery &amp; Cat Café. All rights reserved.</span>
          <span className="footer-made">
            Made with <HeartIcon className="footer-heart" /> in Portland
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------- overlays */

function ProductModal({ product, onClose, onAddToOrder }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
        <div className="modal-media">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="modal-body">
          <span className="modal-kicker">{product.categoryLabel}</span>
          <h3 id="product-modal-title">{product.name}</h3>
          <div className="modal-price">{product.price}</div>
          <p className="modal-desc">{product.description}</p>
          <div className="tag-row modal-tags">
            {product.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="modal-actions">
            <button className="btn btn-primary" onClick={onAddToOrder}>
              Add to Order
            </button>
            <button className="btn btn-ghost" onClick={onClose}>
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="toast" key={toast.id} role="alert" aria-live="polite">
      <span className="toast-icon">
        <CheckIcon />
      </span>
      {toast.message}
    </div>
  );
}

/* -------------------------------------------------------------------- app */

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("hp:favorites")) ?? [];
    } catch {
      return [];
    }
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    window.localStorage.setItem("hp:favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", Boolean(selectedProduct));
    return () => document.body.classList.remove("no-scroll");
  }, [selectedProduct]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (message) => {
    setToast({ id: Date.now(), message });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3400);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFavorite = (product) => {
    const isFavorite = favorites.includes(product.id);
    setFavorites((prev) =>
      isFavorite
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id],
    );
    showToast(
      isFavorite
        ? `Removed ${product.name} from favourites`
        : `Saved ${product.name} to favourites`,
    );
  };

  const handleReserve = () =>
    showToast(
      "Online reservations open soon — call (503) 555-0119 and we'll save you a sofa.",
    );

  const handleMeetCats = () =>
    showToast("Full cat bios are on their way — Mochi says hi.");

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email) return;
    showToast("Welcome to the family — check your inbox.");
    setEmail("");
  };

  return (
    <>
      <Header
        favoritesCount={favorites.length}
        onNavigate={scrollTo}
        onReserve={handleReserve}
      />

      <main>
        <Hero
          onExplore={() => scrollTo("menu")}
          onReserve={handleReserve}
        />
        <Marquee />
        <Features />
        <About onMeetCats={handleMeetCats} onNavigate={scrollTo} />
        <MenuSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onQuickView={setSelectedProduct}
        />
        <Testimonials />
        <Visit onReserve={handleReserve} />
        <NewsletterCta
          email={email}
          onEmailChange={(event) => setEmail(event.target.value)}
          onSubscribe={handleSubscribe}
        />
      </main>

      <Footer onNavigate={scrollTo} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToOrder={() => {
            showToast(`Added ${selectedProduct.name} to your order.`);
            setSelectedProduct(null);
          }}
        />
      )}

      <Toast toast={toast} />
    </>
  );
}
