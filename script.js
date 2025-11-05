// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80; // Account for fixed navbar
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  // Show/hide back to top button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  // Scroll to top when clicked
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Contact form handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      // Submit to webhook
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Success message
        submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
        submitButton.classList.remove('from-blue-500', 'to-purple-600');
        submitButton.classList.add('from-green-500', 'to-green-600');

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.innerHTML = originalButtonText;
          submitButton.classList.remove('from-green-500', 'to-green-600');
          submitButton.classList.add('from-blue-500', 'to-purple-600');
          submitButton.disabled = false;
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);

      // Error message
      submitButton.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>Error - Try Again';
      submitButton.classList.remove('from-blue-500', 'to-purple-600');
      submitButton.classList.add('from-red-500', 'to-red-600');

      // Reset button after 3 seconds
      setTimeout(() => {
        submitButton.innerHTML = originalButtonText;
        submitButton.classList.remove('from-red-500', 'to-red-600');
        submitButton.classList.add('from-blue-500', 'to-purple-600');
        submitButton.disabled = false;
      }, 3000);
    }
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for fade-in effect
document.addEventListener('DOMContentLoaded', () => {
  // Add initial styles to sections
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    if (index > 0) { // Skip hero section
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(section);
    }
  });

  // Animate service cards on hover with stagger effect
  const serviceCards = document.querySelectorAll('#services .group');
  serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // Animate benefit cards on scroll
  const benefitCards = document.querySelectorAll('#why-us > div > div > div');
  benefitCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
  });

  const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  benefitCards.forEach(card => benefitObserver.observe(card));

  // Animate case study cards
  const caseStudyCards = document.querySelectorAll('#case-studies .grid > div');
  caseStudyCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
  });

  const caseStudyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  caseStudyCards.forEach(card => caseStudyObserver.observe(card));
});

// Add parallax effect to hero background elements
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('#hero');

  if (heroSection) {
    const backgroundElements = heroSection.querySelectorAll('.absolute.w-96');
    backgroundElements.forEach((element, index) => {
      const speed = (index + 1) * 0.3;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
};

// Observe stats and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('div:first-child');
      const text = statNumber.textContent.trim();

      if (text.includes('+')) {
        const number = parseInt(text.replace('+', ''));
        statNumber.textContent = '0+';
        animateCounter(statNumber, number);
      } else if (text.includes('%')) {
        const number = parseInt(text.replace('%', ''));
        statNumber.textContent = '0%';
        setTimeout(() => {
          statNumber.textContent = text;
        }, 500);
      }

      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Observe stat cards
document.addEventListener('DOMContentLoaded', () => {
  const statCards = document.querySelectorAll('#hero .grid > div');
  statCards.forEach(card => statsObserver.observe(card));
});

// Add custom animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow {
    from {
      transform: rotate(45deg);
    }
    to {
      transform: rotate(405deg);
    }
  }

  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }

  .bg-grid-pattern {
    background-image:
      linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
