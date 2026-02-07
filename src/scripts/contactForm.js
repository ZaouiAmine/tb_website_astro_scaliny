import emailjs from '@emailjs/browser';

// EmailJS configuration
// TODO: Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export function initContactForm() {
	const form = document.getElementById('contact-form');
	if (!form) return;

	const submitButton = form.querySelector('button[type="submit"]');
	const originalButtonText = submitButton?.innerHTML;

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		if (!submitButton) return;

		// Disable button and show loading state
		submitButton.disabled = true;
		submitButton.innerHTML = `
			<svg class="animate-spin h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
			Sending...
		`;

		// Remove any existing messages
		const existingMessage = form.querySelector('.form-message');
		if (existingMessage) {
			existingMessage.remove();
		}

		try {
			// Initialize EmailJS
			emailjs.init(EMAILJS_PUBLIC_KEY);

			// Get form data
			const formData = new FormData(form);
			const templateParams = {
				from_name: formData.get('name') || '',
				from_email: formData.get('email') || '',
				phone: formData.get('phone') || '',
				company: formData.get('company') || '',
				service: formData.get('service') || '',
				message: formData.get('details') || '',
			};

			// Send email
			await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

			// Show success message
			const successMessage = document.createElement('div');
			successMessage.className = 'form-message mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm text-center';
			successMessage.innerHTML = '✓ Thank you! We\'ll get back to you within 24 hours.';
			form.appendChild(successMessage);

			// Reset form
			form.reset();

			// Scroll to message
			successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		} catch (error) {
			console.error('EmailJS error:', error);
			
			// Show error message
			const errorMessage = document.createElement('div');
			errorMessage.className = 'form-message mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm text-center';
			errorMessage.innerHTML = '✗ Something went wrong. Please try again or contact us directly.';
			form.appendChild(errorMessage);

			// Scroll to message
			errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		} finally {
			// Re-enable button
			if (submitButton) {
				submitButton.disabled = false;
				submitButton.innerHTML = originalButtonText || 'Request Free Consultation';
			}
		}
	});
}
