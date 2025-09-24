// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
  });
  
  // Variables
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const menuToggle = document.getElementById('mobile-menu');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const backToTopBtn = document.querySelector('.back-to-top');
  const progressBars = document.querySelectorAll('.progress');
  
  // Theme Toggle Functionality
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    
    // Change icon based on theme
    if (body.classList.contains('dark')) {
      toggleBtn.innerHTML = '<i class="ri-sun-line"></i>';
    } else {
      toggleBtn.innerHTML = '<i class="ri-moon-line"></i>';
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  });
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    toggleBtn.innerHTML = '<i class="ri-sun-line"></i>';
  }
  
  // Mobile Menu Toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
      
      // Animate hamburger menu
      const bars = menuToggle.querySelectorAll('.bar');
      bars.forEach(bar => bar.classList.toggle('animate'));
    });
  }
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle && window.innerWidth <= 768) {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
      }
    });
  });
  
  // Back to Top Button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
    
    // Add sticky class to navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
    
    // Animate skill bars on scroll
    animateSkillBars();
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form submission handling with validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      let valid = true;
      const formInputs = this.querySelectorAll('input, textarea');
      
      formInputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      // Email validation
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
          valid = false;
          emailInput.classList.add('error');
        }
      }
      
      if (valid) {
        // Here you would typically send the form data to a server
        // For now, just show a success message
        contactForm.innerHTML = '<div class="success-message"><i class="ri-check-line"></i><h3>Message Sent!</h3><p>Thank you for your message. I will get back to you soon!</p></div>';
      }
    });
  }
  
  // Animate skill bars when in viewport
  function animateSkillBars() {
    progressBars.forEach(bar => {
      const parent = bar.parentElement.parentElement;
      const position = parent.getBoundingClientRect();
      
      // Check if element is in viewport
      if (position.top < window.innerHeight && position.bottom >= 0) {
        // Set the width to the data-width value
        const width = bar.style.width;
        if (width === '0px' || width === '') {
          // Only animate once
          bar.style.width = bar.parentElement.nextElementSibling.textContent;
        }
      }
    });
  }
  
  // Initialize testimonials slider if exists
  const testimonials = document.querySelectorAll('.testimonial-card');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      if (i === index) {
        testimonial.classList.add('active');
      } else {
        testimonial.classList.remove('active');
      }
    });
  }
  
  if (testimonials.length > 1) {
    // Auto advance testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }
  
  // Handle preloader
  window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 500);
  });
  
  // Add animation classes on load
  const animateElements = document.querySelectorAll('[data-animation]');
  animateElements.forEach(element => {
    const animationClass = element.getAttribute('data-animation');
    element.classList.add(animationClass);
  });
});

// Animation for mobile menu toggle
if (document.querySelector('.menu-toggle')) {
  document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    
    const bars = this.querySelectorAll('.bar');
    if (this.classList.contains('active')) {
      bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });
}