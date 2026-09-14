// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            updateActiveNav(this.getAttribute('href'));
        }
    });
});

// Update active navigation link
function updateActiveNav(id) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="${id}"]`).classList.add('active');
}

// Track scroll for navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }

    // Update active nav based on scroll position
    updateActiveNavByScroll();
});

function updateActiveNavByScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`a[href="#${sectionId}"]`)?.classList.add('active');
        }
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe story cards and gallery items
document.querySelectorAll('.story-card, .gallery-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Story card click animation
document.querySelectorAll('.story-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });

    card.addEventListener('click', function() {
        const link = this.querySelector('.read-more');
        if (link) {
            window.location.href = link.getAttribute('href');
        }
    });
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for stats animation
const statCards = document.querySelectorAll('.stat-card h3');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const isNumber = !isNaN(finalValue.replace(/\D/g, ''));

            if (isNumber) {
                animateCounter(target, finalValue);
                statObserver.unobserve(target);
            }
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => statObserver.observe(card));

function animateCounter(element, finalValue) {
    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
    let currentValue = 0;
    const increment = Math.ceil(numericValue / 50);
    const suffix = finalValue.replace(/[0-9]/g, '');

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            element.textContent = numericValue + suffix;
            clearInterval(counter);
        } else {
            element.textContent = currentValue + suffix;
        }
    }, 30);
}

// Add stars animation
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;

    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '3px';
        star.style.height = '3px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.5 + 0.5;
        star.style.animation = `twinkle ${2 + Math.random() * 2}s infinite`;
        starsContainer.appendChild(star);
    }
}

createStars();

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add click ripple effect
document.querySelectorAll('.cta-button, .story-card, .gallery-item').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    });
});

console.log('🎭 Welcome to FunckyLarps - Where truths go to die! 🎭');
