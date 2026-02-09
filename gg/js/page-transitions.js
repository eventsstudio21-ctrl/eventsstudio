// Simple preloader animations
document.addEventListener('DOMContentLoaded', function() {
    // Add transition class to body
    document.body.classList.add('page-transition');
    
    // Trigger fade in animation after page load
    setTimeout(() => {
        document.body.classList.add('fade-in-active');
    }, 100);
    
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link, .btn[href*=".html"], .footer-column a, .quick-links a, .navbar-nav .nav-link, .offcanvas .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal page links
            if (href && href.includes('.html') && !href.includes('#')) {
                e.preventDefault();
                
                // Add click ripple effect
                createClickRipple(e);
                
                // Close mobile menu if open
                const offcanvas = document.querySelector('.offcanvas');
                if (offcanvas && offcanvas.classList.contains('show')) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                    if (bsOffcanvas) {
                        bsOffcanvas.hide();
                    }
                }
                
                // Start fade out animation
                document.body.classList.remove('fade-in-active');
                document.body.classList.add('fade-out');
                
                // Create extreme pro preloader
                const preloader = createSimplePreloader();
                document.body.appendChild(preloader);
                
                // Show preloader
                setTimeout(() => {
                    preloader.classList.add('active');
                }, 300);
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 1500);
            }
        });
    });
    
    // Create click ripple effect
    function createClickRipple(e) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.classList.add('active');
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Create extreme pro preloader
    function createSimplePreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'simple-preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="extreme-pro-spinner">
                    <div class="spinner-ring ring-1"></div>
                    <div class="spinner-ring ring-2"></div>
                    <div class="spinner-ring ring-3"></div>
                    <div class="spinner-ring ring-4"></div>
                    <div class="spinner-core"></div>
                    <div class="spinner-particles">
                        <div class="particle particle-1"></div>
                        <div class="particle particle-2"></div>
                        <div class="particle particle-3"></div>
                        <div class="particle particle-4"></div>
                        <div class="particle particle-5"></div>
                        <div class="particle particle-6"></div>
                        <div class="particle particle-7"></div>
                        <div class="particle particle-8"></div>
                    </div>
                </div>
            </div>
        `;
        return preloader;
    }
});

// Add simple preloader styles
const style = document.createElement('style');
style.textContent = `
    body.page-transition {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    body.page-transition.fade-in-active {
        opacity: 1;
        transform: translateY(0);
    }
    
    body.page-transition.fade-out {
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.5s ease;
    }
    
    /* Extreme Pro Preloader */
    .simple-preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(10, 10, 10, 0.98) 0%, rgba(0, 0, 0, 1) 100%);
        backdrop-filter: blur(20px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .simple-preloader.active {
        opacity: 1;
        visibility: visible;
    }
    
    .preloader-content {
        text-align: center;
    }
    
    .extreme-pro-spinner {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto;
        animation: spinner-rotate 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    
    .spinner-ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 4px solid transparent;
        border-radius: 50%;
        animation: ring-orbit 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    
    .ring-1 {
        border-top-color: #ff6b35;
        animation-delay: 0s;
        transform: scale(1);
    }
    
    .ring-2 {
        border-right-color: #ff8c42;
        animation-delay: 0.3s;
        transform: scale(0.85);
    }
    
    .ring-3 {
        border-bottom-color: #ffa947;
        animation-delay: 0.6s;
        transform: scale(0.7);
    }
    
    .ring-4 {
        border-left-color: #ffc957;
        animation-delay: 0.9s;
        transform: scale(0.55);
    }
    
    .spinner-core {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #ff6b35, #ff8c42);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: core-pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    
    .spinner-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    
    .particle {
        position: absolute;
        width: 6px;
        height: 6px;
        background: #ff6b35;
        border-radius: 50%;
        animation: particle-orbit 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    
    .particle-1 { top: 0; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
    .particle-2 { top: 50%; right: 0; transform: translateY(-50%); animation-delay: 0.375s; }
    .particle-3 { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 0.75s; }
    .particle-4 { top: 50%; left: 0; transform: translateY(-50%); animation-delay: 1.125s; }
    .particle-5 { top: 15%; right: 15%; animation-delay: 1.5s; }
    .particle-6 { bottom: 15%; right: 15%; animation-delay: 1.875s; }
    .particle-7 { bottom: 15%; left: 15%; animation-delay: 2.25s; }
    .particle-8 { top: 15%; left: 15%; animation-delay: 2.625s; }
    
    @keyframes spinner-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes ring-orbit {
        0% { transform: rotate(0deg) translateX(10px) rotate(0deg); }
        100% { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
    }
    
    @keyframes core-pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.7; }
    }
    
    @keyframes particle-orbit {
        0% { transform: rotate(0deg) translateX(40px) rotate(0deg) scale(1); opacity: 1; }
        50% { transform: rotate(180deg) translateX(40px) rotate(-180deg) scale(1.5); opacity: 0.5; }
        100% { transform: rotate(360deg) translateX(40px) rotate(-360deg) scale(1); opacity: 1; }
    }
    
    /* Simple button animations */
    .btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
    }
    
    /* Clean Navigation Animations */
    .nav-link, .btn[href*=".html"], .footer-column a, .quick-links a, .navbar-nav .nav-link, .offcanvas .nav-link {
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
        z-index: 1;
    }
    
    .nav-link::before, .btn[href*=".html"]::before, .footer-column a::before, .quick-links a::before, .navbar-nav .nav-link::before, .offcanvas .nav-link::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, #ff6b35, #ff8c42, #ffa947, #ffc957, #ffd966);
        transform: translateX(-50%);
        transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: -1;
    }
    
    .nav-link:hover::before, .btn[href*=".html"]:hover::before, .footer-column a:hover::before, .quick-links a:hover::before, .navbar-nav .nav-link:hover::before, .offcanvas .nav-link:hover::before {
        width: 120%;
    }
    
    .nav-link:hover, .btn[href*=".html"]:hover, .footer-column a:hover, .quick-links a:hover, .navbar-nav .nav-link:hover, .offcanvas .nav-link:hover {
        color: #ff8c42 !important;
        transform: translateY(-3px) scale(1.05) rotate(-1deg);
        text-shadow: 0 4px 8px rgba(255, 107, 53, 0.4);
        box-shadow: 0 8px 16px rgba(255, 107, 53, 0.3);
    }
    
    .nav-link:active, .btn[href*=".html"]:active, .footer-column a:active, .quick-links a:active, .navbar-nav .nav-link:active, .offcanvas .nav-link:active {
        transform: translateY(-1px) scale(0.98) rotate(0deg);
        transition: all 0.1s ease;
    }
    
    /* Mobile Menu Special */
    .offcanvas .nav-link {
        padding: 15px 20px;
        margin: 5px 0;
        border-radius: 10px;
        background: rgba(255, 107, 53, 0.05);
        border: 2px solid transparent;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .offcanvas .nav-link:hover {
        background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 140, 66, 0.1));
        border-color: #ff6b35;
        transform: translateX(10px) scale(1.02);
    }
    
    .offcanvas .nav-link::before {
        bottom: 5px;
        height: 2px;
    }
    
    /* Hamburger Menu Button Animation */
    .navbar-toggler {
        position: relative;
        width: 50px;
        height: 50px;
        border: none;
        background: transparent;
        transition: all 0.3s ease;
        outline: none;
    }
    
    .navbar-toggler:hover {
        transform: scale(1.1) rotate(5deg);
    }
    
    .navbar-toggler:active {
        transform: scale(0.95);
    }
    
    .navbar-toggler .navbar-toggler-icon {
        background: linear-gradient(45deg, #ff6b35, #ff8c42);
        width: 25px;
        height: 3px;
        position: relative;
        transition: all 0.3s ease;
    }
    
    .navbar-toggler .navbar-toggler-icon::before,
    .navbar-toggler .navbar-toggler-icon::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 3px;
        background: linear-gradient(45deg, #ff6b35, #ff8c42);
        transition: all 0.3s ease;
        left: 0;
    }
    
    .navbar-toggler .navbar-toggler-icon::before {
        top: -8px;
    }
    
    .navbar-toggler .navbar-toggler-icon::after {
        top: 8px;
    }
    
    .navbar-toggler:hover .navbar-toggler-icon {
        transform: scale(1.1);
        background: linear-gradient(45deg, #ff8c42, #ffa947);
    }
    
    .navbar-toggler:hover .navbar-toggler-icon::before {
        transform: translateY(-2px);
        background: linear-gradient(45deg, #ff8c42, #ffa947);
    }
    
    .navbar-toggler:hover .navbar-toggler-icon::after {
        transform: translateY(2px);
        background: linear-gradient(45deg, #ff8c42, #ffa947);
    }
    
    /* Click Ripple Effect */
    .click-ripple {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 107, 53, 0.6), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 99999;
        opacity: 0;
    }
    
    .click-ripple.active {
        animation: ripple-expand 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes ripple-expand {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
    
    /* Button Glow Effect */
    .btn {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, #ff6b35, #ff8c42);
        border: none;
        color: white;
        padding: 12px 30px;
        border-radius: 50px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    }
    
    .btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
        border-radius: 50%;
    }
    
    .btn:hover::after {
        width: 300px;
        height: 300px;
    }
    
    .btn:hover {
        transform: translateY(-5px) scale(1.05) rotate(1deg);
        box-shadow: 0 12px 30px rgba(255, 107, 53, 0.5);
        background: linear-gradient(135deg, #ff8c42, #ffa947);
    }
    
    /* Footer Links Special */
    .footer-column a {
        color: var(--color-text-muted);
        text-decoration: none;
        padding: 5px 0;
        display: inline-block;
        position: relative;
        transition: all 0.3s ease;
    }
    
    .footer-column a::after {
        content: '→';
        position: absolute;
        right: -20px;
        top: 50%;
        transform: translateY(-50%) translateX(-5px);
        opacity: 0;
        transition: all 0.3s ease;
        color: #ff6b35;
    }
    
    .footer-column a:hover::after {
        transform: translateY(-50%) translateX(0);
        opacity: 1;
    }
    
    .footer-column a:hover {
        color: #ff8c42;
        transform: translateX(5px);
    }
    
    /* Quick Links Special */
    .quick-links a {
        color: var(--color-text-muted);
        text-decoration: none;
        padding: 8px 15px;
        margin: 5px;
        border: 2px solid transparent;
        border-radius: 25px;
        background: rgba(255, 107, 53, 0.1);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        display: inline-block;
    }
    
    .quick-links a:hover {
        background: linear-gradient(135deg, #ff6b35, #ff8c42);
        color: white;
        border-color: #ff6b35;
        transform: translateY(-3px) scale(1.1) rotate(2deg);
        box-shadow: 0 8px 20px rgba(255, 107, 53, 0.4);
    }
    
    /* Simple page content animations */
    .hero, .page-header, section, .package-card, .gallery-item, .team-member {
        opacity: 0;
        transform: translateY(30px);
        animation: simple-fade-in 0.8s ease forwards;
    }
    
    .hero { animation-delay: 0.1s; }
    .page-header { animation-delay: 0.2s; }
    section:nth-child(1) { animation-delay: 0.3s; }
    section:nth-child(2) { animation-delay: 0.4s; }
    .package-card:nth-child(1) { animation-delay: 0.2s; }
    .package-card:nth-child(2) { animation-delay: 0.3s; }
    .package-card:nth-child(3) { animation-delay: 0.4s; }
    .gallery-item:nth-child(1) { animation-delay: 0.1s; }
    .gallery-item:nth-child(2) { animation-delay: 0.2s; }
    .gallery-item:nth-child(3) { animation-delay: 0.3s; }
    
    @keyframes simple-fade-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Simple hover effects */
    img:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
    
    .package-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(255, 107, 53, 0.2);
        transition: all 0.3s ease;
    }
    
    .gallery-item:hover {
        transform: translateY(-3px);
        transition: transform 0.3s ease;
    }
    
    .team-member:hover {
        transform: translateY(-4px);
        transition: transform 0.3s ease;
    }
`;

document.head.appendChild(style);
