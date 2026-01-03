import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./components/Login";
import Restaurants from "./components/Restaurants";
import OrderHistory from "./components/OrderHistory";

import "./styles/global.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSearchFilters, setShowSearchFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setShowSearchFilters(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setShowSearchFilters(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToOrders = () => {
    setCurrentPage("orders");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
        color: "white",
        fontSize: "24px",
        fontWeight: "600"
      }}>
        🍕 Loading your food...
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <>
          {/* ================= HERO SECTION ================= */}
          <div className="hero-section">
            <div className="hero-overlay">
              {/* TOP BAR */}
              <div className="hero-topbar">
                <div className="hero-logo">🍽️ FoodHub</div>

                <div className="hero-actions">
                  <button className="nav-btn" onClick={() => handleNavigation("home")}>Home</button>
                  <button className="nav-btn" onClick={() => handleNavigation("liked")}>Liked Restaurants</button>
                  <button className="nav-btn" onClick={() => handleNavigation("orders")}>My Orders</button>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>

              {/* HERO CONTENT */}
              <div className="hero-content">
                <h1 className="hero-main-text">
                  Food Cravings? 🍕
                </h1>

                <h2 className="hero-sub-text">
                  We Deliver Fast & Fresh!
                </h2>

                <p className="hero-desc">
                  Order from your favorite restaurants & get food delivered to your doorstep
                </p>

                <button
                  className="hero-cta-btn"
                  onClick={() => {
                    document
                      .getElementById("restaurants-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                    setShowSearchFilters(true);
                  }}
                >
                  🍽️ Explore Restaurants
                </button>
              </div>

            </div>
          </div>

          {/* ================= CONTENT SECTION ================= */}
          {currentPage === "home" && (
            <>
              {/* HERO CONTENT */}
              <div className="hero-content">
                <h1 className="hero-main-text">
                  Food Cravings? 🍕
                </h1>

                <h2 className="hero-sub-text">
                  We Deliver Fast & Fresh!
                </h2>

                <p className="hero-desc">
                  Order from your favorite restaurants & get food delivered to your doorstep
                </p>

                <button
                  className="hero-cta-btn"
                  onClick={() => {
                    document
                      .getElementById("restaurants-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                    setShowSearchFilters(true);
                  }}
                >
                  🍽️ Explore Restaurants
                </button>
              </div>

              {/* RESTAURANTS SECTION - Always visible on home page */}
              <div id="restaurants-section">
                <Restaurants user={user} showSearchFilters={showSearchFilters} setShowSearchFilters={setShowSearchFilters} onNavigateToOrders={handleNavigateToOrders} />
              </div>
            </>
          )}

          {currentPage === "liked" && (
            <div className="page-content">
              <h2 className="page-title">❤️ Liked Restaurants</h2>
              <Restaurants user={user} showSearchFilters={false} setShowSearchFilters={setShowSearchFilters} showOnlyFavorites={true} onBackToHome={handleBackToHome} />
            </div>
          )}

          {currentPage === "orders" && (
            <div className="page-content">
              <OrderHistory user={user} onBackToHome={handleBackToHome} />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
