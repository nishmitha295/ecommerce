import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAllMenuOpen, setIsAllMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const allMenuRef = useRef(null);
  const cartRef = useRef(null);
  const featuredProducts = [
    {
      id: 1,
      name: 'Samsung Galaxy S25 Ultra',
      image: 'https://th.bing.com/th/id/OIP.V4OxxH0wS8zdaFLrnQzVcAHaEA?w=290&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      price: '$199.99',
    },
    {
      id: 2,
      name: ' Sony Bluetooth Headphones',
      image: 'https://www.bhphotovideo.com/images/images2500x2500/sony_mdrzx330bt_b_on_ear_bluetooth_headphones_1126537.jpg',
      price: '$49.99',
    },
    {
      id: 3,
      name: 'Nike Jordon Shoes',
      image: 'https://th.bing.com/th/id/OIP.yU8mCO9HJequGI8nQCRLLwHaE8?w=298&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      price: '$79.99',
    },
    {
      id: 4,
      name: 'Fastrack Watch',
      image: 'https://th.bing.com/th/id/OIP.eNQhp4lTmB7ecebG1oV5gQHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      price: '$149.99',
    },
    {
      id: 5,
      name: 'Safari Backpack',
      image: 'https://th.bing.com/th/id/OIP.afhw6Htm5b5V78BS3JoeFgHaLf?w=138&h=214&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      price: '$29.99',
    },
    {
      id: 6,
      name: 'IPhone 16',
      image: 'https://th.bing.com/th/id/OIP.-yfxFb4SLrPfwwn9HAannAHaEK?w=322&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      price: '$19.99',
    },
    {
      id: 7,
      name: 'Google pixel Tablet',
      image: 'https://th.bing.com/th/id/OIP.PEsQso2z3afDyw7-hAUgHwHaE8?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      price: '$299.99',
    },
    {
      id: 8,
      name: 'Sony Camera',
      image: 'https://th.bing.com/th/id/OIP.KuV_0x3wqNMCosFMWuQFfAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      price: '$399.99',
    }
  ];
  const todaysDeals = [
    {
      id: 1,
      name: 'Wireless Mouse',
      image: 'https://ts3.mm.bing.net/th?id=OIP.QCjSsnf_LZxV4YDJIeYf_QHaHa&pid=15.1',
      currentPrice: '$24.99',
      originalPrice: '$29.99',
      claimed: 60
    },
    {
      id: 2,
      name: 'Bluetooth Speaker',
      image: 'https://th.bing.com/th/id/OIP.rNxkdzB6EsyKwx3tG_OZvAHaHa?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      currentPrice: '$49.99',
      originalPrice: '$69.99',
      claimed: 80
    },
    {
      id: 3,
      name: 'Gaming Keyboard',
      image: 'https://th.bing.com/th/id/OIP.3356hN50TtATZwkIBo6oxgHaFh?w=244&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      currentPrice: '$89.99',
      originalPrice: '$109.99',
      claimed: 50
    },
    {
      id: 4,
      name: 'Smart LED Bulb',
      image: 'https://th.bing.com/th/id/OIP.GTumpdy6_5g9XvSV9HrwEAHaHa?w=219&h=220&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      currentPrice: '$9.99',
      originalPrice: '$19.99',
      claimed: 90
    }
  ];
  

  useEffect(() => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }

    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (allMenuRef.current && !allMenuRef.current.contains(event.target)) {
        setIsAllMenuOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const toggleAllMenu = () => {
    setIsAllMenuOpen(!isAllMenuOpen);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const heroSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      title: 'Welcome to ShopEase',
      description: 'Discover amazing deals on top brands',
      buttonText: 'Shop Now'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      title: 'Summer Collection',
      description: 'New arrivals for the season',
      buttonText: 'Explore More'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      title: 'Special Offers',
      description: 'Up to 50% off on selected items',
      buttonText: 'View Deals'
    }
  ];

  return (
    <div className="dashboard">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">
            <h1>ShopEase</h1>
          </div>
          <div className="delivery-info">
            <i className="fas fa-map-marker-alt"></i>
            <div className="delivery-text">
              <span className="deliver-to">Deliver to</span>
              <span className="location">Your Location</span>
            </div>
          </div>
        </div>

        <div className="nav-center">
          <div className={`search-bar ${isSearchFocused ? 'focused' : ''}`}>
            <select className="search-categories">
              <option>All</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Fashion</option>
            </select>
            <input 
              type="text" 
              placeholder="Search products..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div className="lang-selector">
      <a
        href="/change-language"
        aria-label="Choose a language for shopping. Current selection is English (EN)"
      >
        <span
          className="flag-icon"
          role="img"
          aria-label="India"
        ></span>
        <span className="lang-code">EN</span>
      </a>
      <button
        className="lang-dropdown-toggle"
        aria-label="Expand to change language or country"
        aria-expanded="false"
      ></button>
    </div>
        <div className="nav-right">
          <div className="nav-item">
            <span className="nav-line-1">Hello, {user?.name}</span>
            <span className="nav-line-2">Account & Lists</span>
          </div>
          <div className="nav-item">
            <span className="nav-line-1">Returns</span>
            <span className="nav-line-2">& Orders</span>
          </div>
          <div className="cart" ref={cartRef} onClick={() => setIsCartOpen(!isCartOpen)}>
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
            {isCartOpen && (
              <div className="cart-dropdown">
                <div className="cart-header">
                  <h3>Shopping Cart</h3>
                  <button onClick={() => setIsCartOpen(false)} className="close-btn">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                {cart.length === 0 ? (
                  <div className="empty-cart">
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="cart-items">
                      {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                          <img src={item.image} alt={item.name} />
                          <div className="item-details">
                            <h4>{item.name}</h4>
                            <div className="item-price">{item.price}</div>
                            <div className="quantity-controls">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                          </div>
                          <button 
                            className="remove-item"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="cart-footer">
                      <div className="cart-total">
                        <span>Total:</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                      </div>
                      <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </nav>

      {/* Secondary Navigation */}
      <div className="secondary-nav">
        <ul>
          <li ref={allMenuRef} className="all-menu-item" onClick={toggleAllMenu}>
            <i className="fas fa-bars"></i> All
            {isAllMenuOpen && (
              <div className="all-menu-dropdown">
                <div className="menu-categories">
                  <div className="menu-category">
                    <h3>Electronics</h3>
                    <ul>
                      <li>Computers</li>
                      <li>Cell Phones</li>
                      <li>TV & Video</li>
                      <li>Audio & Home Theater</li>
                      <li>Camera & Photo</li>
                    </ul>
                  </div>
                  <div className="menu-category">
                    <h3>Computers</h3>
                    <ul>
                      <li>Laptops</li>
                      <li>Desktops</li>
                      <li>Monitors</li>
                      <li>Computer Components</li>
                      <li>Tablets</li>
                    </ul>
                  </div>
                  <div className="menu-category">
                    <h3>Smart Home</h3>
                    <ul>
                      <li>Amazon Echo</li>
                      <li>Smart Lighting</li>
                      <li>Security Systems</li>
                      <li>Plugs and Outlets</li>
                      <li>Smart Speakers</li>
                    </ul>
                  </div>
                  <div className="menu-category">
                    <h3>Arts & Crafts</h3>
                    <ul>
                      <li>Painting</li>
                      <li>Drawing</li>
                      <li>Sewing</li>
                      <li>Scrapbooking</li>
                      <li>Knitting & Crochet</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>
          <li>Today's Deals</li>
          <li>Customer Service</li>
          <li>Home Appliances</li>
          <li>Mobiles</li>
          <li>Gift Cards</li>
          <li>Sell</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Banner */}
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
              >
                <div
                  className="hero-banner"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`
                  }}
                >
                  <div className="banner-content">
                    <h2>{slide.title}</h2>
                    <p>{slide.description}</p>
                    <button className="shop-now-btn">{slide.buttonText}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Featured Categories */}
        <div className="featured-categories">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            <div className="category-card">
              <img src="https://th.bing.com/th/id/OIP.PzMqmRgjpb3EO6vG2kK5hgHaE7?w=259&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Electronics" />
              <h3>Electronics</h3>
            </div>
            <div className="category-card">
              <img src="https://th.bing.com/th/id/OIP.nhfQC7WRYjfEJGUCIJL20QHaLH?w=202&h=303&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Fashion" />
              <h3>Fashion</h3>
            </div>
            <div className="category-card">
              <img src="https://th.bing.com/th/id/OIP.WZIkVhVq61sEzbEjfxA6hgHaE7?w=260&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Home" />
              <h3>Home & Kitchen</h3>
            </div>
            <div className="category-card">
              <img src="https://th.bing.com/th/id/OIP.VZ1i6-8b99LtqZBwTq4XugHaEK?w=277&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Beauty" />
              <h3>Beauty</h3>
            </div>
          </div>
        </div>

        <div className="todays-deals">
  <div className="section-header">
    <h2>Today's Deals</h2>
    <a href="#" className="see-all">See all deals</a>
  </div>
  <div className="deals-grid">
    {todaysDeals.map((deal) => (
      <div key={deal.id} className="deal-card">
        <div className="discount-badge">-20%</div>
        <img src={deal.image} alt={deal.name} />
        <div className="deal-info">
          <h3>{deal.name}</h3>
          <div className="price">
            <span className="current-price">{deal.currentPrice}</span>
            <span className="original-price">{deal.originalPrice}</span>
          </div>
          <div className="deal-progress">
            <div
              className="progress-bar"
              style={{ width: `${deal.claimed}%` }}
            ></div>
            <span>{deal.claimed}% claimed</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


        <div className="featured-products">
  <div className="section-header">
    <h2>Featured Products</h2>
    <a href="#" className="see-all">See all products</a>
  </div>
  <div className="products-grid">
    {featuredProducts.map((product) => (
      <div key={product.id} className="product-card">
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <h3>{product.name}</h3>
          <div className="rating">
            <span className="stars">★★★★☆</span>
            <span className="count">(123)</span>
          </div>
          <div className="price">{product.price}</div>
          <button 
            className="add-to-cart"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* Newsletter */}
        <div className="newsletter">
          <div className="newsletter-content">
            <h2>Subscribe to our Newsletter</h2>
            <p>Get the latest updates on new products and upcoming sales</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Get to Know Us</h3>
              <ul>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">About MyStore</a></li>
                <li><a href="#">Investor Relations</a></li>
                <li><a href="#">MyStore Devices</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Make Money with Us</h3>
              <ul>
                <li><a href="#">Sell products on MyStore</a></li>
                <li><a href="#">Sell on MyStore Business</a></li>
                <li><a href="#">Sell apps on MyStore</a></li>
                <li><a href="#">Become an Affiliate</a></li>
                <li><a href="#">Advertise Your Products</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>MyStore Payment Products</h3>
              <ul>
                <li><a href="#">MyStore Business Card</a></li>
                <li><a href="#">Shop with Points</a></li>
                <li><a href="#">Reload Your Balance</a></li>
                <li><a href="#">MyStore Currency Converter</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Let Us Help You</h3>
              <ul>
                <li><a href="#">MyStore and COVID-19</a></li>
                <li><a href="#">Your Account</a></li>
                <li><a href="#">Your Orders</a></li>
                <li><a href="#">Shipping Rates & Policies</a></li>
                <li><a href="#">Returns & Replacements</a></li>
                <li><a href="#">Help</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-logo">
              <h2>MyStore</h2>
            </div>
            <div className="footer-links">
              <a href="#">Conditions of Use</a>
              <a href="#">Privacy Notice</a>
              <a href="#">Interest-Based Ads</a>
            </div>
            <div className="footer-copyright">
              © 1996-{new Date().getFullYear()}, MyStore.com, Inc. or its affiliates
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
