import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import Menu from "./Menu";
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";

import "../styles/restaurants.css";

export default function Restaurants({ user }) {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const snapshot = await getDocs(collection(db, "restaurants"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(data);
    };

    fetchRestaurants();
  }, []);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const clearCart = () => setCart([]);

  const filteredRestaurants = restaurants.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      res.cuisine.toLowerCase().includes(search.toLowerCase());

    const matchesCuisine =
      selectedCuisine === "All" || res.cuisine === selectedCuisine;

    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="restaurants-container">
      <h2 className="section-title">Explore Restaurants Near You 🍽️</h2>

      {selectedRestaurant ? (
        <div className="menu-cart-layout">
          <Menu restaurant={selectedRestaurant} addToCart={addToCart} />
          <Cart cart={cart} user={user} clearCart={clearCart} />
        </div>
      ) : (
        <>
          {/* SEARCH */}
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search restaurant or cuisine"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Italian">Italian</option>
              <option value="Fast Food">Fast Food</option>
              <option value="South Indian">South Indian</option>
            </select>
          </div>

          {/* RESTAURANT GRID */}
          <div className="restaurant-grid">
            {filteredRestaurants.map((res) => (
              <div
                key={res.id}
                className="restaurant-card"
                onClick={() => setSelectedRestaurant(res)}
              >
                <img
                  src={res.image}
                  alt={res.name}
                  className="restaurant-img"
                />

                <div className="restaurant-info">
                  <h3>{res.name}</h3>
                  <p>{res.cuisine}</p>
                  <p>⏱ {res.deliveryTime}</p>
                  <p>₹ {res.minOrder} min</p>
                  <span>⭐ {res.rating}</span>
                </div>
              </div>
            ))}
          </div>

          <OrderHistory user={user} />
        </>
      )}
    </div>
  );
}
