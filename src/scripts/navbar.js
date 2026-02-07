// Professional Navbar Implementation
export function initNavbar() {
	const navbar = document.getElementById('navbar');
	const navLinks = document.querySelectorAll('.nav-link');
	const mobileMenuButton = document.getElementById('mobile-menu-button');
	const mobileCloseButton = document.getElementById('mobile-close-button');
	const mobileMenu = document.getElementById('mobile-menu');
	const menuIcon = document.getElementById('menu-icon');
	const closeIcon = document.getElementById('close-icon');
	const logo = document.getElementById('navbar-logo');
	
	if (!navbar) return;
	
	// Smooth scroll behavior for anchor links
	const handleSmoothScroll = (e) => {
		const href = e.currentTarget.getAttribute('href');
		if (href && href.startsWith('#')) {
			e.preventDefault();
			const target = document.querySelector(href);
			if (target) {
				const offsetTop = target.offsetTop - 64; // Account for navbar height
				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth'
				});
			}
		}
	};
	
	// Add smooth scroll to all nav links
	navLinks.forEach(link => {
		link.addEventListener('click', handleSmoothScroll);
	});
	
	// Navbar scroll effect with backdrop blur
	let lastScrollY = window.scrollY;
	
	const updateNavbar = () => {
		const scrollY = window.scrollY;
		const isScrolled = scrollY > 20;
		
		if (isScrolled) {
			navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
			navbar.style.backdropFilter = 'blur(10px)';
			navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
			
			if (logo) {
				logo.style.filter = 'brightness(0)';
			}
			
			// Update hamburger icon color
			if (mobileMenuButton) {
				mobileMenuButton.classList.remove('text-white');
				mobileMenuButton.classList.add('text-gray-800');
			}
			
			// Update desktop nav links
			navLinks.forEach(link => {
				if (!link.closest('#mobile-menu')) {
					link.classList.remove('text-white');
					link.classList.add('text-gray-800');
				}
			});
		} else {
			navbar.style.backgroundColor = 'transparent';
			navbar.style.backdropFilter = 'blur(0px)';
			navbar.style.boxShadow = 'none';
			
			if (logo) {
				logo.style.filter = 'brightness(1)';
			}
			
			// Update hamburger icon color
			if (mobileMenuButton) {
				mobileMenuButton.classList.remove('text-gray-800');
				mobileMenuButton.classList.add('text-white');
			}
			
			// Update desktop nav links
			navLinks.forEach(link => {
				if (!link.closest('#mobile-menu')) {
					link.classList.remove('text-gray-800');
					link.classList.add('text-white');
				}
			});
		}
		
		lastScrollY = scrollY;
	};
	
	// Throttle scroll events for better performance
	let ticking = false;
	window.addEventListener('scroll', () => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				updateNavbar();
				ticking = false;
			});
			ticking = true;
		}
	});
	
	// Initial navbar state
	updateNavbar();
	
	// Mobile menu toggle function
	const toggleMobileMenu = (isOpen) => {
		if (!mobileMenu || !menuIcon || !closeIcon) return;
		
		if (isOpen) {
			mobileMenu.classList.remove('hidden');
			menuIcon.classList.add('hidden');
			closeIcon.classList.remove('hidden');
			document.body.style.overflow = 'hidden';
			if (mobileMenuButton) {
				mobileMenuButton.setAttribute('aria-expanded', 'true');
			}
		} else {
			mobileMenu.classList.add('hidden');
			menuIcon.classList.remove('hidden');
			closeIcon.classList.add('hidden');
			document.body.style.overflow = '';
			if (mobileMenuButton) {
				mobileMenuButton.setAttribute('aria-expanded', 'false');
			}
		}
	};
	
	// Open mobile menu
	if (mobileMenuButton) {
		mobileMenuButton.addEventListener('click', (e) => {
			e.stopPropagation();
			const isHidden = mobileMenu.classList.contains('hidden');
			toggleMobileMenu(isHidden);
		});
	}
	
	// Close mobile menu
	if (mobileCloseButton) {
		mobileCloseButton.addEventListener('click', () => {
			toggleMobileMenu(false);
		});
	}
	
	// Close mobile menu when clicking outside
	if (mobileMenu) {
		mobileMenu.addEventListener('click', (e) => {
			if (e.target === mobileMenu) {
				toggleMobileMenu(false);
			}
		});
	}
	
	// Close mobile menu when clicking on a link
	if (mobileMenu) {
		const mobileLinks = mobileMenu.querySelectorAll('a');
		mobileLinks.forEach(link => {
			link.addEventListener('click', () => {
				toggleMobileMenu(false);
			});
		});
	}
	
	// Close mobile menu on escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
			toggleMobileMenu(false);
		}
	});
	
	// Prevent body scroll when mobile menu is open
	const observer = new MutationObserver(() => {
		if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
	
	if (mobileMenu) {
		observer.observe(mobileMenu, {
			attributes: true,
			attributeFilter: ['class']
		});
	}
}
