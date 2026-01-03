import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/cart.css";

export default function Cart({ cart, user, clearCart, removeFromCart, onNavigateToOrders }) {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Promo codes
  const promoCodes = {
    SAVE10: { discount: 10, type: "percentage" },
    SAVE20: { discount: 20, type: "percentage" },
    FLAT100: { discount: 100, type: "flat" }
  };

  // Calculate total
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  
  let discount = 0;
  if (appliedPromo) {
    const promo = promoCodes[appliedPromo];
    if (promo.type === "percentage") {
      discount = Math.floor((subtotal * promo.discount) / 100);
    } else {
      discount = promo.discount;
    }
  }

  const deliveryFee = subtotal > 500 ? 0 : 50;
  const tax = Math.floor((subtotal - discount + deliveryFee) * 0.05);
  const total = subtotal - discount + deliveryFee + tax;

  const applyPromo = () => {
    if (!promoCode.trim()) return;
    if (promoCodes[promoCode.toUpperCase()]) {
      setAppliedPromo(promoCode.toUpperCase());
      setPromoCode("");
    } else {
      alert("Invalid promo code!");
    }
  };

  const placeOrder = async () => {
    if (!user) {
      alert("User not logged in");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cart,
        subtotal: subtotal,
        discount: discount,
        deliveryFee: deliveryFee,
        tax: tax,
        total: total,
        address: address,
        paymentMethod: paymentMethod,
        promoCode: appliedPromo,
        status: "Confirmed",
        createdAt: serverTimestamp(),
      });

      alert("✅ Order placed successfully! Redirecting to My Orders...");

      clearCart();
      setAddress("");
      setPaymentMethod("Cash on Delivery");
      setAppliedPromo(null);
      
      // Navigate to My Orders after successful order placement
      setTimeout(() => {
        onNavigateToOrders();
      }, 1500);
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Cart</h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛍️</div>
          <p>Your cart is empty</p>
          <p style={{ fontSize: "12px" }}>Add items to get started!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-details">
                  <div className="item-name">{item.itemName}</div>
                  <div className="item-price">₹{item.price}</div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* PROMO CODE */}
          <div className="promo-section">
            <div className="promo-label">Promo Code</div>
            <div className="promo-input-group">
              <input
                type="text"
                className="promo-input"
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="promo-btn" onClick={applyPromo}>
                Apply
              </button>
            </div>
            {appliedPromo && (
              <div className="promo-applied">✅ {appliedPromo} applied</div>
            )}
            <div style={{ fontSize: "11px", color: "#999", marginTop: "8px" }}>
              Try: SAVE10, SAVE20, FLAT100
            </div>
          </div>

          {/* BILL DETAILS */}
          <div className="bill-section">
            <div className="bill-title">Bill Details</div>
            <div className="bill-row">
              <span className="bill-label">Subtotal</span>
              <span className="bill-value">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="bill-row">
                <span className="bill-label">Discount</span>
                <span className="bill-value" style={{ color: "#00a86b" }}>
                  -₹{discount}
                </span>
              </div>
            )}
            <div className="bill-row">
              <span className="bill-label">Delivery Fee</span>
              <span className="bill-value">
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="bill-row">
              <span className="bill-label">Tax (5%)</span>
              <span className="bill-value">₹{tax}</span>
            </div>
            <div className="bill-row">
              <span className="bill-label">Total</span>
              <span className="bill-value">₹{total}</span>
            </div>
          </div>

          {/* CHECKOUT */}
          <div className="checkout-section">
            <div className="checkout-label">Delivery Address</div>
            <input
              type="text"
              className="checkout-input"
              placeholder="Enter your complete address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="payment-method">
              <div className="checkout-label">Payment Method</div>
              <select
                className="payment-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>💰 Cash on Delivery</option>
                <option>📱 UPI</option>
                <option>💳 Card</option>
                <option>📲 Mobile Wallet</option>
              </select>
            </div>

            <div className="cart-buttons">
              <button className="place-order-btn" onClick={placeOrder}>
                Place Order
              </button>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
