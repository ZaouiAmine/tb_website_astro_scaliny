// Navbar scroll effect
export function initNavbar() {
	const navbar = document.getElementById('navbar');
	const navLinks = document.querySelectorAll('.nav-link');
	
	if (!navbar) return;
	
	window.addEventListener('scroll', function() {
		const logo = document.getElementById('navbar-logo');
		const hamburgerIcons = document.querySelectorAll('.hamburger-icon');
		const mobileMenu = document.getElementById('mobile-menu');
		if (window.scrollY > 50) {
			navbar.style.backgroundColor = '#ffffff';
			if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
				mobileMenu.style.backgroundColor = '#ffffff';
			}
			if (logo) {
				logo.style.filter = 'brightness(0)';
			}
			hamburgerIcons.forEach(icon => {
				(icon as HTMLElement).style.color = '#31906A';
			});
			navLinks.forEach(link => {
				link.classList.remove('text-white');
				link.classList.add('text-gray-800');
			});
		} else {
			navbar.style.backgroundColor = 'transparent';
			if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
				mobileMenu.style.backgroundColor = '#0F1419';
			}
			if (logo) {
				logo.style.filter = 'brightness(1)';
			}
			hamburgerIcons.forEach(icon => {
				(icon as HTMLElement).style.color = 'white';
			});
			navLinks.forEach(link => {
				link.classList.remove('text-gray-800');
				link.classList.add('text-white');
			});
		}
	});
	
	// Mobile menu toggle
	const mobileMenuButton = document.getElementById('mobile-menu-button');
	const mobileMenu = document.getElementById('mobile-menu');
	const menuIcon = document.getElementById('menu-icon');
	const closeIcon = document.getElementById('close-icon');
	
	if (mobileMenuButton && mobileMenu && menuIcon && closeIcon) {
		mobileMenuButton.addEventListener('click', function() {
			const isHidden = mobileMenu.classList.contains('hidden');
			mobileMenu.classList.toggle('hidden');
			menuIcon.classList.toggle('hidden');
			closeIcon.classList.toggle('hidden');
			
			// Prevent body scroll when menu is open
			if (isHidden) {
				document.body.style.overflow = 'hidden';
				// Update background color and link colors based on scroll position
				const mobileMenuLinks = mobileMenu.querySelectorAll('.nav-link');
				if (window.scrollY > 50) {
					mobileMenu.style.backgroundColor = '#ffffff';
					mobileMenuLinks.forEach(link => {
						link.classList.remove('text-white');
						link.classList.add('text-gray-800');
					});
				} else {
					mobileMenu.style.backgroundColor = '#0F1419';
					mobileMenuLinks.forEach(link => {
						link.classList.remove('text-gray-800');
						link.classList.add('text-white');
					});
				}
			} else {
				document.body.style.overflow = '';
			}
		});
	}
	
	// Close menu and restore scroll when clicking outside
	if (mobileMenu && menuIcon && closeIcon) {
		mobileMenu.addEventListener('click', function(e) {
			if (e.target === mobileMenu) {
				mobileMenu.classList.add('hidden');
				menuIcon.classList.remove('hidden');
				closeIcon.classList.add('hidden');
				document.body.style.overflow = '';
			}
		});
		
		// Close mobile menu when clicking on a link
		const mobileLinks = mobileMenu.querySelectorAll('a');
		mobileLinks.forEach(link => {
			link.addEventListener('click', function() {
				mobileMenu.classList.add('hidden');
				menuIcon.classList.remove('hidden');
				closeIcon.classList.add('hidden');
				document.body.style.overflow = '';
			});
		});
	}
}
