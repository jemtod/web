// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add some lag to the outline for a fluid effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active'); // Close mobile menu on click
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation if it's the stats container
            if (entry.target.classList.contains('stats-container')) {
                animateNumbers();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-on-scroll').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.stat-card').forEach(el => {
    // Add fade class to stat cards parent instead or handle individually
    // Here we handle the parent stats-container in HTML for scroll trigger
});

const statsContainer = document.querySelector('.stats-container');
if(statsContainer) observer.observe(statsContainer);

// Number Counter Animation
let hasAnimated = false;
function animateNumbers() {
    if (hasAnimated) return;
    hasAnimated = true;
    
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const increment = target / 50; // Speed of counter
        
        const updateCount = () => {
            const count = +stat.innerText;
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 40);
            } else {
                stat.innerText = target + "+";
            }
        };
        updateCount();
    });
}

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});
