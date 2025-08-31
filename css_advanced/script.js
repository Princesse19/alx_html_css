// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(7, 22, 41, 0.9)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'transparent';
    header.style.backdropFilter = 'none';
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.pro-card, .tutorial-card, .membership-item, .faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Play button hover effects
document.querySelectorAll('.play-button').forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'translate(-50%, -50%) scale(1.2)';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// Button click effects
document.querySelectorAll('.btn-primary').forEach(button => {
  button.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
  .btn-primary {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// FAQ accordion functionality (if needed in future)
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', function() {
    const answer = this.nextElementSibling;
    const isOpen = answer.style.maxHeight;
    
    // Close all other answers
    document.querySelectorAll('.faq-answer').forEach(ans => {
      ans.style.maxHeight = null;
      ans.previousElementSibling.classList.remove('active');
    });
    
    // Toggle current answer
    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      this.classList.add('active');
    }
  });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
  const nav = document.querySelector('.nav');
  const navMenu = document.querySelector('.nav-menu');
  
  if (window.innerWidth <= 768) {
    if (!document.querySelector('.mobile-menu-toggle')) {
      const toggle = document.createElement('button');
      toggle.classList.add('mobile-menu-toggle');
      toggle.innerHTML = '☰';
      toggle.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        display: block;
      `;
      
      toggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
      });
      
      nav.insertBefore(toggle, navMenu);
    }
  }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Performance optimization: Debounce scroll events
let ticking = false;

function updateScrollEffects() {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(7, 22, 41, 0.9)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'transparent';
    header.style.backdropFilter = 'none';
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
});
