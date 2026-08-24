import React, { useState, useEffect, useRef } from "react";

const products = [
  {
    id: 1,
    name: "Strawberry Cake",
    price: "$5.50",
    category: "cakes",
    description: "Fresh strawberries layered with cream",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 2,
    name: "Pink Cupcake",
    price: "$4.50",
    category: "cupcakes",
    description: "Vanilla cupcake with buttercream",
    image:
      "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 3,
    name: "Rose Latte",
    price: "$4.00",
    category: "drinks",
    description: "Aromatic rose-infused latte",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 4,
    name: "Macarons",
    price: "$4.50",
    category: "pastries",
    description: "Assorted French macarons",
    image:
      "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=500&q=85",
  },
  {
    id: 5,
    name: "Cat Tea Time",
    price: "$7.00",
    category: "drinks",
    description: "Special tea set with treats",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=500&q=85",
  },
];

const features = [
  {
    icon: "🍰",
    title: "Delicious Treats",
    text: "Freshly baked cakes, pastries and sweet treats.",
  },
  {
    icon: "🐈",
    title: "Adorable Cats",
    text: "Play, relax and spend time with our lovely cats.",
  },
  {
    icon: "☕",
    title: "Cozy Café",
    text: "A warm and peaceful place for everyone.",
  },
  {
    icon: "♥",
    title: "Memorable Experience",
    text: "The perfect place for your sweetest moments.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    text: "The most adorable café! The cats are so friendly and the pastries are divine.",
    rating: 5,
  },
  {
    name: "Michael T.",
    text: "Perfect spot for a relaxing afternoon. Great coffee and even better company!",
    rating: 5,
  },
  {
    name: "Emma L.",
    text: "I come here every week. The atmosphere is unmatched and the treats are delicious!",
    rating: 5,
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "cakes", label: "Cakes" },
  { id: "cupcakes", label: "Cupcakes" },
  { id: "pastries", label: "Pastries" },
  { id: "drinks", label: "Drinks" },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent scroll when modal is open
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    
    const product = products.find(p => p.id === productId);
    showToastMessage(
      favorites.includes(productId)
        ? `Removed ${product.name} from favorites`
        : `Added ${product.name} to favorites ♡`
    );
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      showToastMessage("Thank you for subscribing! ♡");
      setEmail("");
    }
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          background: #fffdfc;
          color: #4b3032;
          overflow-x: hidden;
        }

        button {
          font-family: inherit;
        }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 10% 15%, rgba(250, 215, 218, .25), transparent 25%),
            #fffdfc;
        }

        .container {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
        }

        /* FLOATING NAV */
        .floating-nav {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%) translateY(${scrolled ? '0' : '-120px'});
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 12px 25px;
          border-radius: 50px;
          box-shadow: 0 8px 32px rgba(117, 67, 74, .15);
          z-index: 1000;
          display: flex;
          gap: 20px;
          transition: transform 0.3s ease;
          border: 1px solid rgba(240, 223, 224, 0.6);
          max-width: calc(100% - 40px);
        }

        .nav-link {
          background: none;
          border: none;
          color: #68494c;
          cursor: pointer;
          font-size: 13px;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.2s ease;
          white-space: nowrap;
          min-height: 44px;
          display: flex;
          align-items: center;
        }

        .nav-link:hover {
          background: #fff0f1;
          color: #ed8c98;
        }

        .favorites-badge {
          position: relative;
        }

        .badge-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ed8c98;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
        }

        /* HERO */
        .hero {
          min-height: 610px;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          border-radius: 0 0 30px 30px;
          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.97) 0%,
              rgba(255,249,248,.92) 38%,
              rgba(255,255,255,.15) 72%
            ),
            url("https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1800&q=90")
            center/cover;
        }

        .hero-content {
          width: 100%;
          max-width: 520px;
          padding: 65px 0;
          position: relative;
          z-index: 2;
          animation: fadeInUp 0.8s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .eyebrow {
          font-family: cursive;
          color: #db8792;
          font-size: 22px;
          margin-bottom: 5px;
          animation: fadeIn 1s ease 0.2s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .hero h1 {
          font-size: clamp(42px, 8vw, 78px);
          line-height: .95;
          font-weight: 500;
          margin: 0 0 22px;
          letter-spacing: -3px;
          color: #43282d;
          animation: fadeInUp 0.8s ease 0.3s both;
        }

        .hero-description {
          max-width: 400px;
          font-family: Arial, sans-serif;
          color: #74585a;
          line-height: 1.7;
          font-size: clamp(13px, 2vw, 14px);
          margin-bottom: 28px;
          animation: fadeInUp 0.8s ease 0.4s both;
        }

        .buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s ease 0.5s both;
        }

        .btn {
          border: none;
          padding: 13px 22px;
          border-radius: 30px;
          cursor: pointer;
          font-size: 13px;
          transition: all .25s ease;
          position: relative;
          overflow: hidden;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn:active::before {
          width: 300px;
          height: 300px;
        }

        .btn-primary {
          color: white;
          background: linear-gradient(135deg, #ed8c98 0%, #df7784 100%);
          box-shadow: 0 7px 20px rgba(220, 123, 135, .25);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(220, 123, 135, .35);
        }

        .btn-secondary {
          color: #68494c;
          background: rgba(255,255,255,.85);
          border: 1px solid #e8cacc;
        }

        .btn-secondary:hover {
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(117, 67, 74, .1);
        }

        /* FEATURES */
        .features {
          position: relative;
          z-index: 4;
          margin-top: -70px;
          margin-bottom: 80px;
        }

        .feature-grid {
          background: rgba(255, 249, 249, .97);
          border: 1px solid #f0dfe0;
          border-radius: 20px;
          padding: 25px 15px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          box-shadow: 0 15px 35px rgba(117, 67, 74, .08);
        }

        .feature {
          text-align: center;
          padding: 8px 20px;
          transition: transform 0.3s ease;
        }

        .feature:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          width: 42px;
          height: 42px;
          margin: 0 auto 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #fff0f1;
          font-size: 19px;
          transition: all 0.3s ease;
        }

        .feature:hover .feature-icon {
          transform: scale(1.2) rotate(10deg);
          background: #ffe5e7;
        }

        .feature h3 {
          margin: 0 0 7px;
          font-size: clamp(14px, 2vw, 15px);
          font-weight: 600;
        }

        .feature p {
          margin: 0;
          color: #927274;
          font-family: Arial, sans-serif;
          font-size: clamp(10px, 1.5vw, 11px);
          line-height: 1.6;
        }

        /* ABOUT */
        .about {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: center;
          margin-bottom: 100px;
        }

        .section-label {
          color: #db8792;
          font-family: cursive;
          font-size: clamp(16px, 2vw, 18px);
          margin-bottom: 5px;
        }

        .about h2,
        .products h2,
        .testimonials h2 {
          margin: 0;
          color: #4a292d;
          font-weight: 500;
          font-size: clamp(32px, 5vw, 54px);
          line-height: 1.1;
        }

        .about-text {
          color: #765b5d;
          font-family: Arial, sans-serif;
          font-size: clamp(12px, 1.8vw, 13px);
          line-height: 1.8;
          max-width: 480px;
          margin: 20px 0 25px;
        }

        .about-image {
          height: 360px;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(97, 55, 61, .12);
          position: relative;
        }

        .about-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(237, 140, 152, 0.1) 0%, transparent 100%);
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .about-image:hover::before {
          opacity: 1;
        }

        .about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .about-image:hover img {
          transform: scale(1.05);
        }

        /* CATEGORY FILTER */
        .category-filter {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .category-btn {
          background: white;
          border: 1px solid #e9cfd1;
          color: #795457;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.3s ease;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }

        .category-btn:hover {
          background: #fff0f1;
          border-color: #ed8c98;
        }

        .category-btn.active {
          background: linear-gradient(135deg, #ed8c98 0%, #df7784 100%);
          color: white;
          border-color: #ed8c98;
          box-shadow: 0 4px 12px rgba(220, 123, 135, .25);
        }

        /* PRODUCTS */
        .products {
          padding-bottom: 90px;
        }

        .products-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 28px;
          gap: 20px;
          flex-wrap: wrap;
        }

        .view-menu {
          border: 1px solid #e9cfd1;
          background: white;
          color: #795457;
          padding: 10px 17px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.3s ease;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }

        .view-menu:hover {
          background: #fff0f1;
          transform: translateY(-2px);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
          gap: 14px;
        }

        .product {
          overflow: hidden;
          border-radius: 16px;
          background: white;
          border: 1px solid #f0e3e3;
          transition: all .3s ease;
          position: relative;
          animation: fadeInScale 0.5s ease both;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .product:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(105, 61, 67, .15);
          border-color: #ed8c98;
        }

        .product-image-wrapper {
          position: relative;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 155px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .product:hover .product-image {
          transform: scale(1.1);
        }

        .favorite-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          width: 36px;
          height: 36px;
          min-width: 36px;
          min-height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: all 0.3s ease;
          z-index: 2;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .favorite-btn:hover {
          transform: scale(1.1);
          background: white;
        }

        .favorite-btn.active {
          background: #ed8c98;
        }

        .product-info {
          padding: 13px;
        }

        .product-name {
          font-size: clamp(12px, 2vw, 13px);
          margin-bottom: 6px;
          color: #583a3e;
          font-weight: 500;
        }

        .product-description {
          font-size: clamp(9px, 1.5vw, 10px);
          color: #927274;
          font-family: Arial, sans-serif;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .price {
          color: #df7f8c;
          font-family: Arial, sans-serif;
          font-size: clamp(12px, 2vw, 13px);
          font-weight: bold;
        }

        .quick-view-btn {
          width: 100%;
          padding: 8px;
          background: #fff0f1;
          border: none;
          border-radius: 8px;
          color: #ed8c98;
          font-size: 11px;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.3s ease;
          font-weight: 600;
          min-height: 36px;
        }

        .quick-view-btn:hover {
          background: #ed8c98;
          color: white;
        }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(75, 48, 50, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
          overflow-y: auto;
        }

        .modal {
          background: white;
          border-radius: 25px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(75, 48, 50, 0.3);
          animation: slideUp 0.3s ease;
          margin: auto;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          position: relative;
        }

        .modal-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: white;
          border: none;
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          transform: rotate(90deg);
          background: #ed8c98;
          color: white;
        }

        .modal-body {
          padding: 25px;
        }

        .modal-title {
          font-size: clamp(20px, 4vw, 24px);
          color: #43282d;
          margin: 0 0 10px;
        }

        .modal-price {
          font-size: clamp(18px, 3vw, 20px);
          color: #ed8c98;
          font-weight: bold;
          margin-bottom: 15px;
          font-family: Arial, sans-serif;
        }

        .modal-description {
          color: #765b5d;
          font-family: Arial, sans-serif;
          font-size: clamp(13px, 2vw, 14px);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .modal-actions .btn {
          flex: 1;
          min-width: 120px;
        }

        /* TESTIMONIALS */
        .testimonials {
          background: linear-gradient(135deg, #fff5f6 0%, #ffffff 100%);
          padding: 80px 20px;
          margin-bottom: 80px;
          border-radius: 30px;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
          gap: 25px;
        }

        .testimonial {
          background: white;
          padding: 25px;
          border-radius: 20px;
          border: 1px solid #f0e3e3;
          box-shadow: 0 5px 20px rgba(105, 61, 67, .08);
          transition: all 0.3s ease;
        }

        .testimonial:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(105, 61, 67, .12);
        }

        .stars {
          color: #ed8c98;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .testimonial-text {
          color: #765b5d;
          font-family: Arial, sans-serif;
          font-size: clamp(12px, 2vw, 13px);
          line-height: 1.7;
          margin-bottom: 15px;
          font-style: italic;
        }

        .testimonial-name {
          color: #43282d;
          font-size: clamp(12px, 2vw, 13px);
          font-weight: 600;
        }

        /* NEWSLETTER */
        .newsletter {
          background: linear-gradient(135deg, #ed8c98 0%, #df7784 100%);
          padding: 60px 40px;
          border-radius: 25px;
          text-align: center;
          margin-bottom: 80px;
          box-shadow: 0 15px 40px rgba(220, 123, 135, .25);
        }

        .newsletter h3 {
          color: white;
          font-size: clamp(24px, 4vw, 32px);
          margin: 0 0 10px;
          font-weight: 500;
        }

        .newsletter p {
          color: rgba(255, 255, 255, 0.95);
          font-family: Arial, sans-serif;
          font-size: clamp(13px, 2vw, 14px);
          margin-bottom: 25px;
        }

        .newsletter-form {
          display: flex;
          gap: 10px;
          max-width: 450px;
          margin: 0 auto;
          flex-wrap: wrap;
          justify-content: center;
        }

        .newsletter-input {
          flex: 1;
          min-width: min(250px, 100%);
          padding: 14px 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 30px;
          font-size: 14px;
          font-family: Arial, sans-serif;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          transition: all 0.3s ease;
          min-height: 48px;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .newsletter-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.3);
          border-color: white;
        }

        .newsletter-btn {
          padding: 14px 30px;
          background: white;
          color: #ed8c98;
          border: none;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 48px;
        }

        .newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        /* TOAST */
        .toast {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: white;
          padding: 16px 24px;
          border-radius: 50px;
          box-shadow: 0 10px 40px rgba(75, 48, 50, 0.2);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 3000;
          animation: slideInRight 0.3s ease;
          border: 1px solid #f0dfe0;
          max-width: calc(100% - 60px);
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .toast-icon {
          font-size: 18px;
          flex-shrink: 0;
        }

        .toast-message {
          color: #583a3e;
          font-family: Arial, sans-serif;
          font-size: clamp(12px, 2vw, 13px);
          font-weight: 500;
        }

        /* FOOTER */
        .footer {
          border-top: 1px solid #f0dfe0;
          padding: 40px 0;
          text-align: center;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
          gap: 40px;
          margin-bottom: 30px;
          text-align: left;
        }

        .footer-section h4 {
          color: #43282d;
          font-size: clamp(13px, 2vw, 14px);
          margin: 0 0 15px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 8px;
        }

        .footer-links a {
          color: #927274;
          font-family: Arial, sans-serif;
          font-size: clamp(11px, 1.8vw, 12px);
          text-decoration: none;
          transition: color 0.3s ease;
          display: inline-block;
          min-height: 32px;
          line-height: 32px;
        }

        .footer-links a:hover {
          color: #ed8c98;
        }

        .social-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .social-btn {
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          border-radius: 50%;
          background: #fff0f1;
          border: none;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-btn:hover {
          background: #ed8c98;
          transform: translateY(-3px);
        }

        .footer-bottom {
          color: #a27e81;
          font-family: Arial, sans-serif;
          font-size: clamp(11px, 1.8vw, 12px);
          padding-top: 20px;
          border-top: 1px solid #f0e3e3;
        }

        /* RESPONSIVE BREAKPOINTS */
        
        /* Large Tablets and Small Laptops */
        @media (max-width: 1024px) {
          .container {
            width: calc(100% - 48px);
          }

          .hero {
            min-height: 580px;
          }

          .about {
            gap: 50px;
          }

          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr));
          }
        }

        /* Tablets */
        @media (max-width: 900px) {
          .floating-nav {
            gap: 12px;
            padding: 10px 20px;
          }

          .nav-link {
            padding: 8px 14px;
            font-size: 12px;
          }

          .hero {
            min-height: 560px;
            background:
              linear-gradient(
                90deg,
                rgba(255,255,255,.96) 0%,
                rgba(255,255,255,.70) 60%
              ),
              url("https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1400&q=85")
              center/cover;
          }

          .feature-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            padding: 20px 15px;
          }

          .about {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .about-image {
            height: 320px;
          }

          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));
          }

          .testimonials {
            padding: 60px 20px;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        /* Small Tablets */
        @media (max-width: 768px) {
          .container {
            width: calc(100% - 32px);
          }

          .floating-nav {
            gap: 8px;
            padding: 8px 15px;
            top: 15px;
          }

          .nav-link {
            font-size: 11px;
            padding: 6px 10px;
          }

          .hero h1 {
            letter-spacing: -2px;
          }

          .buttons {
            width: 100%;
          }

          .btn {
            flex: 1;
            min-width: calc(50% - 6px);
            font-size: 12px;
            padding: 12px 18px;
          }

          .features {
            margin-top: -60px;
          }

          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .modal-image {
            height: 250px;
          }

          .newsletter {
            padding: 50px 30px;
          }
        }

        /* Mobile Devices */
        @media (max-width: 600px) {
          .container {
            width: calc(100% - 24px);
          }

          .floating-nav {
            top: 10px;
            width: calc(100% - 24px);
            gap: 6px;
            padding: 8px 12px;
          }

          .nav-link {
            font-size: 10px;
            padding: 6px 8px;
            min-height: 36px;
          }

          .badge-count {
            width: 16px;
            height: 16px;
            font-size: 9px;
          }

          .hero {
            min-height: 580px;
            border-radius: 0 0 20px 20px;
            background:
              linear-gradient(
                180deg,
                rgba(255,255,255,.98) 0%,
                rgba(255,255,255,.85) 70%
              ),
              url("https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=800&q=85")
              center/cover;
          }

          .hero-content {
            padding: 45px 0;
          }

          .eyebrow {
            font-size: 18px;
          }

          .features {
            margin-top: -50px;
            margin-bottom: 60px;
          }

          .feature-grid {
            grid-template-columns: 1fr 1fr;
            padding: 15px 10px;
            gap: 12px;
          }

          .feature {
            padding: 12px 8px;
          }

          .feature-icon {
            width: 38px;
            height: 38px;
            font-size: 17px;
          }

          .about {
            margin-bottom: 70px;
          }

          .about-image {
            height: 280px;
          }

          .products {
            padding-bottom: 70px;
          }

          .products-heading {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .category-filter {
            gap: 8px;
          }

          .category-btn {
            font-size: 11px;
            padding: 8px 16px;
          }

          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .product-image {
            height: 140px;
          }

          .modal {
            max-height: 85vh;
            border-radius: 20px;
          }

          .modal-image {
            height: 200px;
          }

          .modal-close {
            width: 36px;
            height: 36px;
            min-width: 36px;
            min-height: 36px;
            font-size: 18px;
            top: 10px;
            right: 10px;
          }

          .modal-body {
            padding: 20px;
          }

          .modal-actions {
            flex-direction: column;
          }

          .modal-actions .btn {
            width: 100%;
          }

          .testimonials {
            padding: 50px 15px;
            margin-bottom: 60px;
          }

          .testimonials-header {
            margin-bottom: 35px;
          }

          .newsletter {
            padding: 40px 20px;
            margin-bottom: 60px;
          }

          .newsletter-form {
            gap: 10px;
          }

          .newsletter-input,
          .newsletter-btn {
            width: 100%;
            min-width: 100%;
          }

          .toast {
            bottom: 20px;
            right: 12px;
            left: 12px;
            max-width: calc(100% - 24px);
            padding: 14px 20px;
          }

          .footer {
            padding: 35px 0;
          }

          .footer-content {
            gap: 30px;
            text-align: center;
          }

          .social-links {
            justify-content: center;
          }
        }

        /* Extra Small Mobile */
        @media (max-width: 480px) {
          .hero {
            min-height: 550px;
          }

          .hero h1 {
            letter-spacing: -1.5px;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }

          .product-grid {
            grid-template-columns: 1fr;
          }

          .product-image {
            height: 200px;
          }
        }

        /* Large Screens */
        @media (min-width: 1400px) {
          .container {
            max-width: 1200px;
          }

          .hero {
            min-height: 650px;
          }

          .product-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        /* Ultra Wide Screens */
        @media (min-width: 1800px) {
          .container {
            max-width: 1400px;
          }

          .product-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }

        /* Landscape Mobile */
        @media (max-height: 600px) and (orientation: landscape) {
          .hero {
            min-height: 450px;
          }

          .hero-content {
            padding: 40px 0;
          }

          .features {
            margin-top: -40px;
          }

          .modal {
            max-height: 95vh;
          }

          .modal-image {
            height: 180px;
          }
        }

        /* Print Styles */
        @media print {
          .floating-nav,
          .favorite-btn,
          .quick-view-btn,
          .toast,
          .modal-overlay {
            display: none !important;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* High Contrast Mode */
        @media (prefers-contrast: high) {
          .btn-primary {
            border: 2px solid currentColor;
          }

          .product {
            border-width: 2px;
          }
        }
      `}</style>

      <div className="page">
        {/* FLOATING NAV */}
        <nav className="floating-nav">
          <button className="nav-link" onClick={() => scrollToSection(heroRef)}>
            Home
          </button>
          <button className="nav-link" onClick={() => scrollToSection(aboutRef)}>
            About
          </button>
          <button className="nav-link" onClick={() => scrollToSection(productsRef)}>
            Menu
          </button>
          <button className="nav-link favorites-badge">
            Favorites
            {favorites.length > 0 && (
              <span className="badge-count">{favorites.length}</span>
            )}
          </button>
        </nav>

        {/* HERO */}
        <section className="hero" ref={heroRef}>
          <div className="container">
            <div className="hero-content">
              <div className="eyebrow">Sweet Treats ♡</div>

              <h1>Happy Paws</h1>

              <p className="hero-description">
                Enjoy delicious bakery treats, aromatic coffee, and heartwarming
                moments with our adorable cats. A special place to relax and
                make memories.
              </p>

              <div className="buttons">
                <button 
                  className="btn btn-primary"
                  onClick={() => showToastMessage("Reservation system coming soon! ♡")}
                >
                  Reserve Your Table ♡
                </button>

                <button 
                  className="btn btn-secondary"
                  onClick={() => scrollToSection(productsRef)}
                >
                  Explore Menu →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features" ref={featuresRef}>
          <div className="container">
            <div className="feature-grid">
              {features.map((feature, index) => (
                <div 
                  className="feature" 
                  key={feature.title}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="container about" ref={aboutRef}>
          <div>
            <div className="section-label">Welcome to</div>

            <h2>
              Pawfect Bakery
              <br />
              & Cat Café
            </h2>

            <p className="about-text">
              Where delicious treats meet adorable companions. Our cozy little
              café is designed for cat lovers, coffee enthusiasts, and anyone
              looking for a peaceful and memorable experience.
            </p>

            <button 
              className="btn btn-primary"
              onClick={() => showToastMessage("Learn more page coming soon! ♡")}
            >
              Learn More About Us →
            </button>
          </div>

          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1516978101789-720eacb59e79?auto=format&fit=crop&w=1000&q=90"
              alt="Cozy cat cafe"
            />
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="container products" ref={productsRef}>
          <div className="products-heading">
            <div>
              <div className="section-label">Made with Love</div>
              <h2>Our Favorites</h2>
            </div>

            <button 
              className="view-menu"
              onClick={() => showToastMessage("Full menu coming soon! ♡")}
            >
              View Full Menu ♡
            </button>
          </div>

          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <div 
                className="product" 
                key={product.id}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="product-image-wrapper">
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                  />
                  <button
                    className={`favorite-btn ${
                      favorites.includes(product.id) ? "active" : ""
                    }`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    {favorites.includes(product.id) ? "❤️" : "♡"}
                  </button>
                </div>

                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-description">{product.description}</div>
                  <div className="price">{product.price}</div>
                  <button
                    className="quick-view-btn"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Quick View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials">
          <div className="container">
            <div className="testimonials-header">
              <div className="section-label">What People Say</div>
              <h2>Customer Reviews</h2>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div 
                  className="testimonial" 
                  key={index}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="stars">
                    {"★".repeat(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-name">{testimonial.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="container">
          <div className="newsletter">
            <h3>Stay Updated ♡</h3>
            <p>Subscribe to receive special offers, updates, and cat pictures!</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h4>Happy Paws Café</h4>
                <p style={{ color: '#927274', fontFamily: 'Arial, sans-serif', fontSize: 'clamp(11px, 1.8vw, 12px)', lineHeight: '1.7' }}>
                  The perfect blend of delicious treats and adorable feline friends.
                </p>
              </div>

              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul className="footer-links">
                  <li><a href="#menu">Menu</a></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#reservations">Reservations</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <button className="social-btn" aria-label="Instagram">📷</button>
                  <button className="social-btn" aria-label="Twitter">🐦</button>
                  <button className="social-btn" aria-label="Facebook">📘</button>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              © 2026 Happy Paws · Bakery & Cat Café ♡
            </div>
          </div>
        </footer>

        {/* PRODUCT MODAL */}
        {selectedProduct && (
          <div 
            className="modal-overlay" 
            onClick={() => setSelectedProduct(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <img
                  className="modal-image"
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />
                <button
                  className="modal-close"
                  onClick={() => setSelectedProduct(null)}
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <h2 className="modal-title" id="modal-title">{selectedProduct.name}</h2>
                <div className="modal-price">{selectedProduct.price}</div>
                <p className="modal-description">
                  {selectedProduct.description}. Made fresh daily with premium
                  ingredients and lots of love. Perfect for enjoying in our cozy
                  café or taking home to share.
                </p>
                <div className="modal-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      showToastMessage(`Added ${selectedProduct.name} to cart! ♡`);
                      setSelectedProduct(null);
                    }}
                  >
                    Add to Order
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOAST NOTIFICATION */}
        {showToast && (
          <div className="toast" role="alert" aria-live="polite">
            <span className="toast-icon">✨</span>
            <span className="toast-message">{toastMessage}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;