// Fade In Animation
document.addEventListener("DOMContentLoaded", function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Countdown Timer
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 1); // Set to 7 days from now
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("countdown-days").innerText = days.toString().padStart(2, '0');
        document.getElementById("countdown-hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("countdown-minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("countdown-seconds").innerText = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown-days").innerText = "00";
            document.getElementById("countdown-hours").innerText = "00";
            document.getElementById("countdown-minutes").innerText = "00";
            document.getElementById("countdown-seconds").innerText = "00";
        }
    }
    
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });
    
    // Mobile menu close on click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        });
    });
    
    // Menu animations
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.menu-img img').style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.menu-img img').style.transform = 'scale(1)';
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                alert('Obrigado por se inscrever! Você receberá nossas promoções em breve.');
                emailInput.value = '';
            } else {
                alert('Por favor, insira um email válido.');
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Auto carousel for testimonials
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 8000,
            wrap: true
        });
    }
    
    // Add some parallax effect to hero section
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const scrollValue = window.scrollY;
            // Move background slightly to create parallax
            heroSection.style.backgroundPosition = `center ${50 + scrollValue * 0.05}%`;
        }
    });
    
    // Menu tabs animation
    const menuTabs = document.querySelectorAll('#menuTabs button[data-bs-toggle="pill"]');
    menuTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function() {
            // Retrigger fade-in animations on tab change
            const activeTabContent = document.querySelector(this.getAttribute('data-bs-target'));
            if (activeTabContent) {
                const fadeItems = activeTabContent.querySelectorAll('.fade-in:not(.active)');
                fadeItems.forEach(item => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 100);
                });
            }
        });
    });
    
    // Mobile detection and optimization
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        // Adjust some styles for mobile
        document.querySelectorAll('.testimonial-item').forEach(item => {
            item.style.padding = '20px';
        });
        
        // Disable some heavy animations on mobile
        document.querySelectorAll('.hero').forEach(hero => {
            hero.style.backgroundAttachment = 'scroll';
        });
    }
    
    // Add hover effect to social media icons
    document.querySelectorAll('.footer-social a, .social-links a').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Preload images for better performance
    function preloadImages() {
        const imagesToPreload = document.querySelectorAll('img');
        imagesToPreload.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }
    
    // Call preload after short delay to not block page rendering
    setTimeout(preloadImages, 1000);
    
    // Initialize all tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Add animation to the special offer section
    const specialOffer = document.querySelector('.special-offer');
    if (specialOffer) {
        specialOffer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        specialOffer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add lazy loading to images for better performance
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Add accessibility improvements
    document.querySelectorAll('a, button').forEach(element => {
        if (!element.getAttribute('aria-label') && !element.innerText.trim()) {
            const icon = element.querySelector('i');
            if (icon) {
                const iconClass = icon.className;
                let label = '';
                
                if (iconClass.includes('facebook')) label = 'Facebook';
                else if (iconClass.includes('instagram')) label = 'Instagram';
                else if (iconClass.includes('twitter')) label = 'Twitter';
                else if (iconClass.includes('tiktok')) label = 'TikTok';
                else if (iconClass.includes('arrow-up')) label = 'Voltar ao topo';
                
                if (label) {
                    element.setAttribute('aria-label', label);
                }
            }
        }
    });
});