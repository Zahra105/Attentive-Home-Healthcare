// ==========================================
// Attentive  Homecare 
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  // Toggle menu
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    hamburger.classList.toggle("active");
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      hamburger.classList.remove("active");
    });
  });

  // Highlight active nav link based on page URL
  const currentPath = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
    // ================================
    // Contact Form Handling
    // ================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateForm(contactForm)) return;

            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);

            console.log('Form submitted:', formObject);
            alert('Thank you for your message! We will contact you within 24 hours.');

            contactForm.reset();
        });
    }

    // ================================
    // FAQ Accordion
    // ================================
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            faqToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.classList.remove('active');
                    otherToggle.nextElementSibling.style.maxHeight = null;
                }
            });

            if (isActive) {
                this.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // ================================
    // Smooth Scrolling
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // adjust for fixed navbar
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ================================
    // Intersection Observer Animations
    // ================================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.care-card, .feature-card, .value-card, .testimonial-card, .service-item'
    );
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ================================
    // Active Navigation Highlight
    // ================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // ================================
    // Hero Carousel
    // ================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
        const heroCarousel = document.querySelector('.hero-carousel');
        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', stopAutoSlide);
            heroCarousel.addEventListener('mouseleave', startAutoSlide);
        }
    }

    // ================================
    // Navbar Background on Scroll
    // ================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // ================================
    // Button Loading Effect
    // ================================
    document.querySelectorAll('button, .btn-hero, .btn-secondary, .btn-secondary-outline')
        .forEach(button => {
            button.addEventListener('click', function () {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => (this.style.transform = ''), 150);
            });
        });
});

// ==========================================
// Utility Functions
// ==========================================
function formatPhoneNumber(input) {
    const numbers = input.replace(/\D/g, '');
    if (numbers.length >= 10) {
        return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
    return input;
}

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function () {
        this.value = formatPhoneNumber(this.value);
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ef4444';
        } else {
            field.style.borderColor = '';
            if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                field.style.borderColor = '#ef4444';
            }
        }
    });

    return isValid;
}

// ==========================================
// Preload Images
// ==========================================
function preloadImages() {
    const imageUrls = [
        'assets/hero-slide-1.jpg',
        'assets/hero-slide-2.jpg',
        'assets/hero-slide-3.jpg',
        'assets/companionship.jpg',
        'assets/team-photo.jpg',
        'assets/services.jpg'
    ];
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

window.addEventListener('load', () => {
    preloadImages();
    document.body.classList.add('loaded');
});
