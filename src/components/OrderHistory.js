import React, { useRef } from "react";

export default function OrderHistory({ user, onBackToHome }) {
  const ordersRef = useRef(null);

  // Static orders - guaranteed to show
  const orders = [
    {
      id: "ORD-001",
      items: [
        { itemName: "Margherita Pizza", price: 350 },
        { itemName: "Veg Burger", price: 200 }
      ],
      total: 550,
      status: "Confirmed",
      date: new Date().toLocaleDateString(),
      address: "123 Main Street, Bengaluru",
      payment: "Cash on Delivery"
    },
    {
      id: "ORD-002", 
      items: [
        { itemName: "Pasta Alfredo", price: 280 },
        { itemName: "Caesar Salad", price: 150 }
      ],
      total: 430,
      status: "Preparing",
      date: new Date().toLocaleDateString(),
      address: "456 Park Road, Bengaluru",
      payment: "Online Payment"
    },
    {
      id: "ORD-003",
      items: [
        { itemName: "Grilled Sandwich", price: 180 },
        { itemName: "Fresh Juice", price: 120 }
      ],
      total: 300,
      status: "Delivered",
      date: new Date().toLocaleDateString(),
      address: "789 Garden Avenue, Bengaluru",
      payment: "Cash on Delivery"
    },
    {
      id: "ORD-004",
      items: [
        { itemName: "Chicken Pizza", price: 450 },
        { itemName: "French Fries", price: 180 }
      ],
      total: 630,
      status: "Out for Delivery",
      date: new Date().toLocaleDateString(),
      address: "321 Tech Park, Bengaluru",
      payment: "Online Payment"
    },
    {
      id: "ORD-005",
      items: [
        { itemName: "Veg Biryani", price: 320 },
        { itemName: "Raita", price: 80 }
      ],
      total: 400,
      status: "Confirmed",
      date: new Date().toLocaleDateString(),
      address: "654 Corporate Hub, Bengaluru",
      payment: "Cash on Delivery"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToOrders = () => {
    if (ordersRef.current) {
      ordersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div style={{ 
      padding: '20px', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#ff6b00', 
        fontSize: '2.5rem', 
        marginBottom: '30px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
      }}>
        📦 My Orders
      </h2>

      {/* BACK TO HOME BUTTON */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button 
          style={{
            background: 'linear-gradient(135deg, #ff6b00, #ff8c00)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onClick={onBackToHome}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🏠 Back to Home Page
        </button>
      </div>

      {/* SUCCESS MESSAGE */}
      <div style={{
        background: 'rgba(39, 174, 96, 0.2)',
        padding: '15px',
        borderRadius: '8px',
        margin: '20px 0',
        color: 'white',
        border: '2px solid #27ae60',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#27ae60', marginBottom: '10px' }}>
          ✅ ORDERS LOADED SUCCESSFULLY!
        </h3>
        <p style={{ fontSize: '16px', marginBottom: '10px' }}>
          Showing {orders.length} orders below
        </p>
        <p style={{ fontSize: '14px', color: '#27ae60' }}>
          Use scroll buttons or mouse wheel to navigate
        </p>
      </div>

      {/* SCROLL BUTTONS */}
      <div style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 1000
      }}>
        <button
          style={{
            background: 'linear-gradient(135deg, #ff6b00, #ff8c00)',
            color: 'white',
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={scrollToTop}
          title="Scroll to Top"
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          ⬆️
        </button>

        <button
          style={{
            background: 'linear-gradient(135deg, #ff6b00, #ff8c00)',
            color: 'white',
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={scrollToOrders}
          title="Scroll to Orders"
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          📦
        </button>

        <button
          style={{
            background: 'linear-gradient(135deg, #ff6b00, #ff8c00)',
            color: 'white',
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={scrollToBottom}
          title="Scroll to Bottom"
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          ⬇️
        </button>
      </div>

      {/* ORDERS LIST - SIMPLE APPROACH */}
      <div ref={ordersRef} style={{ maxWidth: '800px', margin: '0 auto' }}>
        {orders.map((order, index) => (
          <div 
            key={order.id}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '25px',
              marginBottom: '25px',
              color: '#333',
              border: '2px solid #ff6b00',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {/* ORDER HEADER */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '20px', 
              paddingBottom: '15px', 
              borderBottom: '2px solid #ff6b00' 
            }}>
              <div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '700', 
                  color: '#ff6b00', 
                  marginBottom: '5px' 
                }}>
                  Order #{order.id}
                </div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#666' 
                }}>
                  📅 {order.date}
                </div>
              </div>
              <div style={{
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                background: order.status === 'Confirmed' ? '#f39c12' :
                           order.status === 'Preparing' ? '#3498db' :
                           order.status === 'Out for Delivery' ? '#9b59b6' :
                           '#27ae60',
                color: 'white',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
              }}>
                {order.status}
              </div>
            </div>

            {/* ORDER ITEMS */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                fontSize: '1.1rem', 
                marginBottom: '12px', 
                color: '#333',
                fontWeight: '600'
              }}>
                🍽️ Items
              </h4>
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px 0',
                  borderBottom: '1px solid #ddd'
                }}>
                  <span style={{ 
                    fontSize: '1rem', 
                    color: '#333' 
                  }}>
                    {item.itemName}
                  </span>
                  <span style={{ 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    color: '#ff6b00' 
                  }}>
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* ORDER DETAILS */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '10px' 
              }}>
                <span style={{ 
                  fontSize: '1.1rem', 
                  color: '#333',
                  fontWeight: '600'
                }}>
                  💰 Total:
                </span>
                <span style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: '700', 
                  color: '#ff6b00' 
                }}>
                  ₹{order.total}
                </span>
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#666',
                marginBottom: '5px'
              }}>
                📍 {order.address}
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#666'
              }}>
                💳 {order.payment}
              </div>
            </div>

            {/* ORDER ACTIONS */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                style={{
                  background: order.status === 'Preparing' ? '#3498db' : '#f0f0f0',
                  color: order.status === 'Preparing' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => alert(`✅ Order ${order.id} status updated to Preparing!`)}
              >
                ⏳ Preparing
              </button>

              <button
                style={{
                  background: order.status === 'Out for Delivery' ? '#9b59b6' : '#f0f0f0',
                  color: order.status === 'Out for Delivery' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => alert(`🚚 Order ${order.id} status updated to Out for Delivery!`)}
              >
                🚚 Out for Delivery
              </button>

              <button
                style={{
                  background: order.status === 'Delivered' ? '#27ae60' : '#f0f0f0',
                  color: order.status === 'Delivered' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => alert(`🎉 Order ${order.id} status updated to Delivered!`)}
              >
                ✅ Delivered
              </button>
            </div>

            {/* RATING SECTION - Show only for delivered orders */}
            {order.status === 'Delivered' && (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                background: '#fff9e6', 
                borderRadius: '8px', 
                textAlign: 'center',
                border: '2px solid #ff6b00'
              }}>
                <h4 style={{ 
                  fontSize: '0.9rem', 
                  marginBottom: '10px', 
                  color: '#333',
                  fontWeight: '600'
                }}>
                  ⭐ Rate this restaurant:
                </h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                        padding: '5px',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => alert(`⭐ You rated ${star} stars for Order ${order.id}!`)}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BOTTOM INFO */}
      <div style={{
        background: 'rgba(255, 107, 0, 0.1)',
        padding: '20px',
        borderRadius: '8px',
        margin: '30px 0',
        color: 'white',
        border: '2px solid #ff6b00',
        textAlign: 'center',
        marginBottom: '50px'
      }}>
        <h3 style={{ color: '#ff6b00', marginBottom: '15px' }}>
          🎉 Thank You for Your Orders!
        </h3>
        <p style={{ fontSize: '14px', color: '#ff6b00', marginBottom: '10px' }}>
          🍕 Fresh Ingredients • Delicious Taste • Fast Delivery
        </p>
      </div>
    </div>
  );
}
