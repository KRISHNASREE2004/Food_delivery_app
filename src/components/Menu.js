import React, { useState } from 'react';
import '../styles/menu.css';

function Menu({ restaurant, onAddToCart, onBack }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedItems, setAddedItems] = useState(new Set());

  // Food emoji mapping function
  const getFoodEmoji = (itemName) => {
    const foodEmojis = {
      // Indian dishes
      "Butter Chicken": "🍗",
      "Palak Paneer": "🥬",
      "Naan": "🫓",
      "Chicken Tikka": "🍖",
      "Paneer Tikka": "🧀",
      "Sheekh Kebab": "🍢",
      "Masala Dosa": "🥞",
      "Idli Sambar": "🍙",
      "Uthappam": "🥞",
      "Vegetable Dosa": "🥞",
      "Paneer Dosa": "🥞",
      "Idli": "🍙",
      
      // Chinese dishes
      "Egg Fried Rice": "🍚",
      "Chow Mein": "🍜",
      "Spring Roll": "🥟",
      "Hakka Noodles": "🍜",
      "Schezwan Noodles": "🌶️",
      "Veg Fried Rice": "🍚",
      
      // Italian dishes
      "Margherita Pizza": "🍕",
      "Pepperoni Pizza": "🍕",
      "Spaghetti": "🍝",
      "Alfredo Pasta": "🍝",
      "Carbonara": "🍝",
      "Penne Arrabbiata": "🍝",
      
      // Fast food
      "Cheeseburger": "🍔",
      "French Fries": "🍟",
      "Chicken Burger": "🍔",
      "Gourmet Burger": "🍔",
      "Loaded Fries": "🍟",
      "Chicken Wings": "🍗",
      
      // Japanese dishes
      "California Roll": "🍱",
      "Dragon Roll": "🍱",
      "Spicy Tuna Roll": "🍱",
      
      // Salads and healthy
      "Caesar Salad": "🥗",
      "Greek Salad": "🥗",
      "Fruit Bowl": "🍎",
      
      // Default emoji for any other food
      default: "🍽️"
    };
    
    return foodEmojis[itemName] || foodEmojis.default;
  };

  if (!restaurant || !restaurant.menuItems || restaurant.menuItems.length === 0) {
    return <div className="menu-container"><p>No menu items available</p></div>;
  }

  const categories = [...new Set(restaurant.menuItems.map(item => item.category))];
  const filteredMenu = activeCategory === "All"
    ? restaurant.menuItems
    : restaurant.menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item) => {
    onAddToCart(item, restaurant.id);
    setAddedItems(new Set([...addedItems, item.id]));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 1500);
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <button className="back-btn" onClick={onBack}>← Back to Restaurants</button>
        <div className="restaurant-header">
          <img src={restaurant.image} alt={restaurant.name} className="menu-restaurant-img" />
          <div className="restaurant-details">
            <h1>{restaurant.name}</h1>
            <p className="cuisine">{restaurant.cuisine}</p>
            <div className="rating-info">
              <span>⭐ {restaurant.rating}</span>
              <span>🚚 {restaurant.deliveryTime}</span>
              <span>Min: ₹{restaurant.minOrder}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-content">
        <div className="category-sidebar">
          <h3>Categories</h3>
          <div className="category-list">
            <button
              className={`category-btn ${activeCategory === "All" ? 'active' : ''}`}
              onClick={() => setActiveCategory("All")}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-items">
          <h2>{activeCategory}</h2>
          <div className="items-grid">
            {filteredMenu.map(item => (
              <div key={item.id} className="menu-item-card">
                <div className="food-emoji">
                  {getFoodEmoji(item.itemName)}
                </div>
                <div className="item-info">
                  <h4>{item.itemName}</h4>
                  <span className="category-badge">{item.category}</span>
                  <p className="price">₹{item.price}</p>
                  <button
                    className={`add-to-cart-btn ${addedItems.has(item.id) ? 'added' : ''}`}
                    onClick={() => handleAddToCart(item)}
                  >
                    {addedItems.has(item.id) ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
