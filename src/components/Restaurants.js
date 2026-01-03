import { useEffect, useState, useRef } from "react";
import Menu from "./Menu";
import Cart from "./Cart";
import "../styles/restaurants.css";

// Sample restaurant data with 12 restaurants - UNIQUE IMAGES
const restaurantsData = [
  {
    id: "1",
    name: "Spice Palace",
    cuisine: "Indian",
    deliveryTime: "30",
    minOrder: 250,
    rating: 4.5,
    reviews: 1250,
    image: "https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?w=500&h=350&fit=crop",
    description: "Authentic North & South Indian cuisine",
    menuItems: [
      { id: "1-1", itemName: "Butter Chicken", category: "Curries", price: 320, image: "https://images.unsplash.com/photo-1608040998175-9a9c5d8e6c8?w=400&h=300&fit=crop" },
      { id: "1-2", itemName: "Palak Paneer", category: "Vegetarian", price: 280, image: "https://images.unsplash.com/photo-1567623835796-5ca891a5c8c8?w=400&h=300&fit=crop" },
      { id: "1-3", itemName: "Naan", category: "Bread", price: 60, image: "https://images.unsplash.com/photo-1565958011504-4b852e45e851?w=400&h=300&fit=crop" },
    ]
  },
  {
    id: "2",
    name: "Dragon Garden",
    cuisine: "Chinese",
    deliveryTime: "25",
    minOrder: 300,
    rating: 4.3,
    reviews: 890,
    image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?w=500&h=350&fit=crop",
    description: "Best Chinese food in town",
    menuItems: [
      { id: "2-1", itemName: "Egg Fried Rice", category: "Rice", price: 200, image: "https://images.unsplash.com/photo-1569675842053-2f8d6df4c3e3?w=400&h=300&fit=crop" },
      { id: "2-2", itemName: "Chow Mein", category: "Noodles", price: 220, image: "https://images.unsplash.com/photo-1569917393398-6d8651d45c47?w=400&h=300&fit=crop" },
      { id: "2-3", itemName: "Spring Roll", category: "Appetizers", price: 150, image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=300&fit=crop" },
    ]
  },
  {
    id: "3",
    name: "Pizza Paradise",
    cuisine: "Italian",
    deliveryTime: "20",
    minOrder: 200,
    rating: 4.7,
    reviews: 2100,
    image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?w=500&h=350&fit=crop",
    description: "Authentic Italian pizzas & pasta",
    menuItems: [
      { id: "3-1", itemName: "Margherita Pizza", category: "Pizza", price: 350, image: "https://images.unsplash.com/photo-1614049162883-3a90f67fb0b0?w=400&h=300&fit=crop" },
      { id: "3-2", itemName: "Pepperoni Pizza", category: "Pizza", price: 400, image: "https://images.unsplash.com/photo-15343043467895-aae0302c0f74?w=400&h=300&fit=crop" },
      { id: "3-3", itemName: "Spaghetti", category: "Pasta", price: 320, image: "https://images.unsplash.com/photo-1551183053-7699ca1f5c6f?w=400&h=300&fit=crop" },
    ]
  },
  {
    id: "4",
    name: "Fast Bites",
    cuisine: "Fast Food",
    deliveryTime: "15",
    minOrder: 150,
    rating: 4.2,
    reviews: 1560,
    image: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?w=500&h=350&fit=crop",
    description: "Quick & delicious burgers & fries",
    menuItems: [
      { id: "4-1", itemName: "Cheeseburger", category: "Burgers", price: 200, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
      { id: "4-2", itemName: "French Fries", category: "Sides", price: 80, image: "https://images.unsplash.com/photo-1571093440678-bd3f7e4f871?w=400&h=300&fit=crop" },
      { id: "4-3", itemName: "Chicken Burger", category: "Burgers", price: 220, image: "https://images.unsplash.com/photo-1562547256-1dd1e549ad01?w=400&h=300&fit=crop" },
    ]
  },
  {
    id: "5",
    name: "South Masala",
    cuisine: "South Indian",
    deliveryTime: "30",
    minOrder: 200,
    rating: 4.4,
    reviews: 980,
    image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?w=500&h=350&fit=crop",
    description: "Dosas, idli & sambar",
    menuItems: [
      { id: "5-1", itemName: "Masala Dosa", category: "Dosa", price: 180, image: "https://images.unsplash.com/photo-1586200403932-2f8f6e7e7e41?w=400&h=300&fit=crop" },
      { id: "5-2", itemName: "Idli Sambar", category: "Idli", price: 150, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
      { id: "5-3", itemName: "Uthappam", category: "Dosa", price: 200, image: "https://images.unsplash.com/photo-1626082927389-6cd097cda1ec?w=400&h=300&fit=crop" },
    ]
  },
  {
    id: "6",
    name: "Kebab House",
    cuisine: "Indian",
    deliveryTime: "25",
    minOrder: 280,
    rating: 4.6,
    reviews: 1420,
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?w=500&h=350&fit=crop",
    description: "Grilled kebabs & tandoori",
    menuItems: [
      { id: "6-1", itemName: "Chicken Tikka", category: "Kebab", price: 350, image: "https://images.unsplash.com/photo-1567623835796-5ca891a5c8c8?w=400&h=300&fit=crop" },
      { id: "6-2", itemName: "Paneer Tikka", category: "Kebab", price: 320, image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=300&fit=crop" },
      { id: "6-3", itemName: "Sheekh Kebab", category: "Kebab", price: 380, image: "https://images.unsplash.com/photo-1626082927389-6cd097cda1ec?w=400&h=300&fit=crop" },
    ]
  },
  {
    id: "7",
    name: "Noodle Kingdom",
    cuisine: "Chinese",
    deliveryTime: "20",
    minOrder: 250,
    rating: 4.1,
    reviews: 750,
    image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?w=500&h=350&fit=crop",
    description: "Fresh noodles & fried rice",
    menuItems: [
      { id: "7-1", itemName: "Hakka Noodles", category: "Noodles", price: 200, image: "https://images.unsplash.com/photo-1589521471054-8d8651d45c47?w=400&h=300&fit=crop" },
      { id: "7-2", itemName: "Schezwan Noodles", category: "Noodles", price: 220, image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b8?w=400&h=300&fit=crop" },
      { id: "7-3", itemName: "Veg Fried Rice", category: "Rice", price: 180, image: "https://images.unsplash.com/photo-1585518119738-15be0b32e9f2?w=400&h=300&fit=crop" },
    ]
  },
  {
    id: "8",
    name: "Burger Bash",
    cuisine: "Fast Food",
    deliveryTime: "15",
    minOrder: 180,
    rating: 4.3,
    reviews: 1100,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=350&fit=crop",
    description: "Gourmet burgers & loaded fries",
    menuItems: [
      { id: "8-1", itemName: "Gourmet Burger", category: "Burgers", price: 280, image: "https://images.unsplash.com/photo-1563629076175-6d8651d45c47?w=400&h=300&fit=crop" },
      { id: "8-2", itemName: "Loaded Fries", category: "Sides", price: 150, image: "https://images.unsplash.com/photo-1585080876339-d870ee2e7e41?w=400&h=300&fit=crop" },
      { id: "8-3", itemName: "Chicken Wings", category: "Appetizers", price: 250, image: "https://images.unsplash.com/photo-1562547256-1dd1e549ad01?w=400&h=300&fit=crop" },
    ]
  },
  {
    id: "9",
    name: "Pasta Perfetto",
    cuisine: "Italian",
    deliveryTime: "25",
    minOrder: 300,
    rating: 4.5,
    reviews: 950,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=350&fit=crop",
    description: "Handmade pasta & Italian sauces",
    menuItems: [
      { id: "9-1", itemName: "Alfredo Pasta", category: "Pasta", price: 350, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop" },
      { id: "9-2", itemName: "Carbonara", category: "Pasta", price: 380, image: "https://images.unsplash.com/photo-1612874742237-415146069a8d?w=400&h=300&fit=crop" },
      { id: "9-3", itemName: "Penne Arrabbiata", category: "Pasta", price: 340, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop" },
    ]
  },
  {
    id: "10",
    name: "Salad Station",
    cuisine: "Healthy",
    deliveryTime: "10",
    minOrder: 100,
    rating: 4.4,
    reviews: 650,
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?w=500&h=350&fit=crop",
    description: "Fresh salads & healthy bowls",
    menuItems: [
      { id: "10-1", itemName: "Caesar Salad", category: "Salads", price: 180, image: "https://images.unsplash.com/photo-15569093329-009879c6e7cf6?w=400&h=300&fit=crop" },
      { id: "10-2", itemName: "Greek Salad", category: "Salads", price: 200, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
      { id: "10-3", itemName: "Fruit Bowl", category: "Salads", price: 220, image: "https://images.unsplash.com/photo-1490474417599-cd02175532d4?w=400&h=300&fit=crop" },
    ]
  },
  {
    id: "11",
    name: "Sushi Station",
    cuisine: "Japanese",
    deliveryTime: "20",
    minOrder: 400,
    rating: 4.8,
    reviews: 2300,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=350&fit=crop",
    description: "Fresh sushi & Japanese cuisine",
    menuItems: [
      { id: "11-1", itemName: "California Roll", category: "Sushi", price: 500, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop" },
      { id: "11-2", itemName: "Dragon Roll", category: "Sushi", price: 550, image: "https://images.unsplash.com/photo-1612874742237-415146069a8d?w=400&h=300&fit=crop" },
      { id: "11-3", itemName: "Spicy Tuna Roll", category: "Sushi", price: 480, image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=300&fit=crop" },
    ]
  },
  {
    id: "12",
    name: "Veg Heaven",
    cuisine: "South Indian",
    deliveryTime: "25",
    minOrder: 180,
    rating: 4.2,
    reviews: 620,
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=350&fit=crop",
    description: "100% vegetarian South Indian",
    menuItems: [
      { id: "12-1", itemName: "Vegetable Dosa", category: "Dosa", price: 160, image: "https://images.unsplash.com/photo-1586200403932-2f8f6e7e7e41?w=400&h=300&fit=crop" },
      { id: "12-2", itemName: "Paneer Dosa", category: "Dosa", price: 200, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop" },
      { id: "12-3", itemName: "Idli", category: "Idli", price: 120, image: "https://images.unsplash.com/photo-1626082927389-6cd097cda1ec?w=400&h=300&fit=crop" },
    ]
  }
];

export default function Restaurants({ user, showSearchFilters, setShowSearchFilters, showOnlyFavorites = false, onBackToHome, onNavigateToOrders }) {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // Ref for scrolling to liked restaurants section
  const likedRestaurantsRef = useRef(null);

  useEffect(() => {
    setRestaurants(restaurantsData);
  }, []);

  // Auto-scroll to liked restaurants when showOnlyFavorites is true
  useEffect(() => {
    if (showOnlyFavorites && likedRestaurantsRef.current) {
      setTimeout(() => {
        likedRestaurantsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showOnlyFavorites]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fid) => fid !== id));
    } else {
      setFavorites([...favorites, id]);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const handleNavigateToOrders = () => {
    // Use the passed navigation function
    if (onNavigateToOrders) {
      onNavigateToOrders();
    }
  };

  const filteredRestaurants = restaurants.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      res.cuisine.toLowerCase().includes(search.toLowerCase());

    const matchesCuisine =
      selectedCuisine === "All" || res.cuisine === selectedCuisine;

    const matchesFavorites = !showOnlyFavorites || favorites.includes(res.id);

    return matchesSearch && matchesCuisine && matchesFavorites;
  });

  return (
    <div className="restaurants-container">
      <div className="main-content">
        {selectedRestaurant ? (
          <div className="menu-layout">
            <div>
              <button 
                className="back-btn"
                onClick={() => setSelectedRestaurant(null)}
              >
                ← Back to Restaurants
              </button>
              <Menu 
                restaurant={selectedRestaurant} 
                onAddToCart={addToCart}
                onBack={() => setSelectedRestaurant(null)}
              />
            </div>
            
            {/* SHOW CART ONLY WHEN INSIDE MENU */}
            <div className="cart-sidebar">
              <Cart 
                cart={cart} 
                user={user} 
                clearCart={clearCart}
                removeFromCart={removeFromCart}
                onNavigateToOrders={handleNavigateToOrders}
              />
            </div>
          </div>
        ) : (
          <>
            {/* SHOW SEARCH FILTERS FOR HOME PAGE */}
            {showSearchFilters && !showOnlyFavorites && (
              <>
                <h2 className="section-title">🍽️ Explore Restaurants Near You</h2>

                {/* FILTER BAR */}
                <div className="filter-bar">
                  <input
                    type="text"
                    placeholder="🔍 Search restaurant or cuisine..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                  />

                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="cuisine-select"
                  >
                    <option value="All">All Cuisines</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Italian">Italian</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="South Indian">South Indian</option>
                  </select>
                </div>

                {/* BACK TO HOME BUTTON - In Explore Restaurants */}
                <div className="back-to-home-container">
                  <button 
                    className="back-to-home-btn"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setShowSearchFilters(false);
                    }}
                  >
                    🏠 Back to Home Page
                  </button>
                </div>
              </>
            )}

            {/* BACK TO RESTAURANTS BUTTON - Show when specific cuisine is selected */}
            {showSearchFilters && selectedCuisine !== "All" && !showOnlyFavorites && (
              <div className="back-to-restaurants-container">
                <button 
                  className="back-to-restaurants-btn"
                  onClick={() => setSelectedCuisine("All")}
                >
                  🍽️ Back to All Restaurants
                </button>
              </div>
            )}

            {/* RESTAURANT GRID - Always visible on home page */}
            <div className="restaurant-grid" ref={showOnlyFavorites ? likedRestaurantsRef : null}>
              {filteredRestaurants.map((res) => (
                <div
                  key={res.id}
                  className="restaurant-card"
                >
                  <div 
                    className="restaurant-img-container"
                    onClick={() => setSelectedRestaurant(res)}
                  >
                    <img
                      src={res.image}
                      alt={res.name}
                      className="restaurant-img"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/500x350?text=' + res.name}
                    />
                    <button
                      className="favorite-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(res.id);
                      }}
                    >
                      {favorites.includes(res.id) ? "❤️" : "🤍"}
                    </button>
                    <div className="rating-badge">{res.rating} ⭐</div>
                  </div>

                  <div className="restaurant-info">
                    <h3 className="restaurant-name">{res.name}</h3>
                    <p className="restaurant-cuisine">{res.cuisine}</p>
                    <p className="restaurant-desc">{res.description}</p>
                    
                    <div className="restaurant-details">
                      <span>⏱ {res.deliveryTime} mins</span>
                      <span>₹{res.minOrder}+ min</span>
                    </div>

                    <button
                      className="explore-btn"
                      onClick={() => setSelectedRestaurant(res)}
                    >
                      Explore Menu →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* BACK TO HOME BUTTON FOR LIKED RESTAURANTS */}
            {showOnlyFavorites && (
              <div className="back-to-home-container">
                <button 
                  className="back-to-home-btn"
                  onClick={onBackToHome}
                >
                  🏠 Back to Home Page
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
