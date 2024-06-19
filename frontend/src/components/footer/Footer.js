import React from 'react';
import 'boxicons/css/boxicons.min.css'; // Ensure you have boxicons installed and imported if you're using icons from it
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>About Us</h5>
            <p>We are committed to delivering the best online learning experiences. Explore courses, tutorials, and more.</p>
          </div>
          <div className="col-md-3">
            <h5>Contact</h5>
            <p>Email: contact@elearn.com<br/>Phone: +1 234 567 890</p>
          </div>
          <div className="col-md-3">
            <h5>FAQs</h5>
            <ul>
              <li><a href="#" className="text-white">How to start a course?</a></li>
              <li><a href="#" className="text-white">What's the refund policy?</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Follow Us</h5>
            {/* Social Media Icons */}
            <a href="https://www.facebook.com/" className="text-white me-2"><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com/i/flow/login" className="text-white me-2"><i className="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/" className="text-white"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
