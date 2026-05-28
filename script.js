// Smooth scroll navigation
function setupNavigation() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const navbar = document.getElementById('navbar');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Setup Intersection Observer for scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-animate').forEach(element => {
    observer.observe(element);
  });
}

// Parallax effect for hero section
function setupParallax() {
  const parallaxBg = document.querySelector('.parallax-bg');
  if (!parallaxBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroSection = document.querySelector('.hero-section');

    if (scrollY < window.innerHeight) {
      parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
  });
}

// Floating elements on scroll
function setupFloatingElements() {
  const floatingElements = document.querySelectorAll('.scroll-animate[style*="animation-delay"]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    floatingElements.forEach((el, index) => {
      const offset = (scrollY + index * 50) * 0.3;
      el.style.transform = `translateY(${Math.sin(offset / 100) * 10}px)`;
    });
  });
}

// Responsive animations
function setupResponsiveAnimations() {
  if (window.innerWidth < 768) {
    // Reduce animation complexity on mobile
    document.querySelectorAll('.scroll-animate').forEach(el => {
      el.style.animationDuration = '0.6s';
    });
  }
}

// Initialize all animations
function initializeAnimations() {
  setupNavigation();
  setupScrollAnimations();
  setupParallax();
  setupFloatingElements();
  setupResponsiveAnimations();
}

// Run on page load
window.addEventListener('load', () => {
  initializeAnimations();
});

// Fallback for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
});

// Re-setup on window resize
window.addEventListener('resize', () => {
  setupResponsiveAnimations();
});
