/**
 * NSDA Registration Form - Complete Implementation
 * Handles form validation, password toggle, and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        form: document.getElementById('registrationForm'),
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        status: document.getElementById('status'),
        interest: document.getElementById('interest'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        agree: document.getElementById('agree'),
        newsletter: document.getElementById('newsletter'),
        referral: document.getElementById('referral'),
        submitBtn: document.getElementById('submitBtn'),
        successMessage: document.getElementById('successMessage'),
        togglePassword: document.getElementById('togglePassword'),
        toggleConfirmPassword: document.getElementById('toggleConfirmPassword'),
        themeToggle: document.getElementById('themeToggle'),
        resetBtn: document.getElementById('resetBtn'),
        signInLink: document.getElementById('signInLink'),
        strengthBar: document.getElementById('strengthBar'),
        strengthText: document.getElementById('strengthText'),
        telegramCount: document.getElementById('telegramCount'),
        
        // Error elements
        errors: {
            name: document.getElementById('nameError'),
            email: document.getElementById('emailError'),
            phone: document.getElementById('phoneError'),
            status: document.getElementById('statusError'),
            interest: document.getElementById('interestError'),
            password: document.getElementById('passwordError'),
            confirmPassword: document.getElementById('confirmPasswordError'),
            agree: document.getElementById('agreeError')
        }
    };

    // Validation Functions
    const validators = {
        required: (value) => value && value.trim().length > 0,
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, '')),
        password: (value) => value.length >= 6,
        confirmPassword: (password, confirm) => password === confirm,
        passwordStrength: (password) => {
            let score = 0;
            if (password.length >= 6) score++;
            if (password.length >= 8) score++;
            if (/[A-Z]/.test(password)) score++;
            if (/[0-9]/.test(password)) score++;
            if (/[^A-Za-z0-9]/.test(password)) score++;
            return (score / 5) * 100;
        }
    };

    // UI Helper Functions
    const ui = {
        showError: (element, message) => {
            if (element) {
                element.textContent = message;
                element.classList.add('show');
            }
        },
        
        clearError: (element) => {
            if (element) {
                element.textContent = '';
                element.classList.remove('show');
            }
        },
        
        markValid: (field) => {
            if (field) {
                field.classList.remove('error');
                field.classList.add('valid');
            }
        },
        
        markInvalid: (field) => {
            if (field) {
                field.classList.remove('valid');
                field.classList.add('error');
            }
        },
        
        updatePasswordStrength: (strength) => {
            const percentage = Math.min(100, Math.max(0, strength));
            const strengthBar = elements.strengthBar;
            const strengthText = elements.strengthText;
            
            if (strengthBar && strengthText) {
                strengthBar.style.width = `${percentage}%`;
                
                let strengthClass = 'weak';
                let color = '#ef4444';
                
                if (percentage >= 100) {
                    strengthClass = 'strong';
                    color = '#059669';
                } else if (percentage >= 75) {
                    strengthClass = 'good';
                    color = '#10b981';
                } else if (percentage >= 50) {
                    strengthClass = 'fair';
                    color = '#f59e0b';
                }
                
                strengthBar.style.backgroundColor = color;
                strengthText.textContent = strengthClass.charAt(0).toUpperCase() + strengthClass.slice(1);
                strengthText.className = 'strength-text ' + strengthClass;
            }
        },
        
        checkFormValidity: () => {
            const requiredFields = [
                { field: elements.name, validator: validators.required },
                { field: elements.email, validator: validators.email },
                { field: elements.phone, validator: validators.phone },
                { field: elements.status, validator: validators.required },
                { field: elements.interest, validator: validators.required },
                { field: elements.password, validator: validators.password },
                { field: elements.confirmPassword, 
                  validator: (value) => validators.confirmPassword(elements.password.value, value) }
            ];
            
            const isAgreed = elements.agree.checked;
            
            const allValid = requiredFields.every(({ field, validator }) => {
                return field && validator(field.value);
            }) && isAgreed;
            
            elements.submitBtn.disabled = !allValid;
            return allValid;
        }
    };

    // Field Validation Handlers
    const setupFieldValidation = () => {
        // Name validation
        elements.name?.addEventListener('input', () => {
            if (!validators.required(elements.name.value)) {
                ui.markInvalid(elements.name);
                ui.showError(elements.errors.name, 'Name is required');
            } else {
                ui.markValid(elements.name);
                ui.clearError(elements.errors.name);
            }
            ui.checkFormValidity();
        });

        // Email validation
        elements.email?.addEventListener('input', () => {
            if (!validators.required(elements.email.value)) {
                ui.markInvalid(elements.email);
                ui.showError(elements.errors.email, 'Email is required');
            } else if (!validators.email(elements.email.value)) {
                ui.markInvalid(elements.email);
                ui.showError(elements.errors.email, 'Enter a valid email address');
            } else {
                ui.markValid(elements.email);
                ui.clearError(elements.errors.email);
            }
            ui.checkFormValidity();
        });

        // Phone validation
        elements.phone?.addEventListener('input', () => {
            if (!validators.required(elements.phone.value)) {
                ui.markInvalid(elements.phone);
                ui.showError(elements.errors.phone, 'Phone number is required');
            } else if (!validators.phone(elements.phone.value)) {
                ui.markInvalid(elements.phone);
                ui.showError(elements.errors.phone, 'Enter a valid phone number');
            } else {
                ui.markValid(elements.phone);
                ui.clearError(elements.errors.phone);
            }
            ui.checkFormValidity();
        });

        // Status validation
        elements.status?.addEventListener('change', () => {
            if (!validators.required(elements.status.value)) {
                ui.markInvalid(elements.status);
                ui.showError(elements.errors.status, 'Please select your status');
            } else {
                ui.markValid(elements.status);
                ui.clearError(elements.errors.status);
            }
            ui.checkFormValidity();
        });

        // Interest validation
        elements.interest?.addEventListener('change', () => {
            if (!validators.required(elements.interest.value)) {
                ui.markInvalid(elements.interest);
                ui.showError(elements.errors.interest, 'Please select your interest');
            } else {
                ui.markValid(elements.interest);
                ui.clearError(elements.errors.interest);
            }
            ui.checkFormValidity();
        });

        // Password validation
        elements.password?.addEventListener('input', () => {
            const password = elements.password.value;
            const strength = validators.passwordStrength(password);
            
            ui.updatePasswordStrength(strength);
            
            if (!validators.required(password)) {
                ui.markInvalid(elements.password);
                ui.showError(elements.errors.password, 'Password is required');
            } else if (!validators.password(password)) {
                ui.markInvalid(elements.password);
                ui.showError(elements.errors.password, 'Password must be at least 6 characters');
            } else {
                ui.markValid(elements.password);
                ui.clearError(elements.errors.password);
            }
            
            // Trigger confirm password validation
            if (elements.confirmPassword.value) {
                elements.confirmPassword.dispatchEvent(new Event('input'));
            }
            
            ui.checkFormValidity();
        });

        // Confirm Password validation
        elements.confirmPassword?.addEventListener('input', () => {
            const confirm = elements.confirmPassword.value;
            const password = elements.password.value;
            
            if (!validators.required(confirm)) {
                ui.markInvalid(elements.confirmPassword);
                ui.showError(elements.errors.confirmPassword, 'Please confirm your password');
            } else if (!validators.confirmPassword(password, confirm)) {
                ui.markInvalid(elements.confirmPassword);
                ui.showError(elements.errors.confirmPassword, 'Passwords do not match');
            } else {
                ui.markValid(elements.confirmPassword);
                ui.clearError(elements.errors.confirmPassword);
            }
            ui.checkFormValidity();
        });

        // Agreement validation
        elements.agree?.addEventListener('change', () => {
            if (!elements.agree.checked) {
                ui.showError(elements.errors.agree, 'You must agree to join the community');
            } else {
                ui.clearError(elements.errors.agree);
            }
            ui.checkFormValidity();
        });
    };

    // Password Toggle Functionality
    const setupPasswordToggles = () => {
        elements.togglePassword?.addEventListener('click', () => {
            const type = elements.password.getAttribute('type') === 'password' ? 'text' : 'password';
            elements.password.setAttribute('type', type);
            elements.togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });

        elements.toggleConfirmPassword?.addEventListener('click', () => {
            const type = elements.confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            elements.confirmPassword.setAttribute('type', type);
            elements.toggleConfirmPassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    };

    // Theme Toggle Functionality
    const setupThemeToggle = () => {
        elements.themeToggle?.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            elements.themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            elements.themeToggle.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            elements.themeToggle.title = 'Switch to Light Mode';
        }
    };

    // Form Submission Handler
    const setupFormSubmission = () => {
        elements.form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!ui.checkFormValidity()) {
                alert('Please fill all required fields correctly.');
                return;
            }
            
            // Show loading state
            const originalText = elements.submitBtn.innerHTML;
            elements.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            elements.submitBtn.disabled = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Prepare form data
                const formData = {
                    name: elements.name.value.trim(),
                    email: elements.email.value.trim(),
                    phone: elements.phone.value.trim(),
                    status: elements.status.value,
                    interest: elements.interest.value,
                    referral: elements.referral.value,
                    newsletter: elements.newsletter.checked,
                    timestamp: new Date().toISOString()
                };
                
                console.log('Registration Data:', formData);
                
                // Show success message
                elements.form.style.display = 'none';
                elements.successMessage.hidden = false;
                
                // Update member count
                if (elements.telegramCount) {
                    const current = parseInt(elements.telegramCount.textContent.replace(/[^0-9]/g, ''));
                    elements.telegramCount.textContent = (current + 1).toLocaleString();
                }
                
            } catch (error) {
                console.error('Registration error:', error);
                alert('There was an error submitting your registration. Please try again.');
            } finally {
                // Restore button
                elements.submitBtn.innerHTML = originalText;
                elements.submitBtn.disabled = false;
            }
        });
    };

    // Reset Form Handler
    const setupResetButton = () => {
        elements.resetBtn?.addEventListener('click', () => {
            elements.form.reset();
            elements.form.style.display = 'block';
            elements.successMessage.hidden = true;
            
            // Reset validation states
            Object.values(elements.errors).forEach(error => {
                ui.clearError(error);
            });
            
            // Reset field classes
            const fields = document.querySelectorAll('input, select');
            fields.forEach(field => {
                field.classList.remove('valid', 'error');
            });
            
            // Reset password strength
            ui.updatePasswordStrength(0);
            
            // Reset password toggles
            if (elements.password) {
                elements.password.type = 'password';
                elements.togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
            }
            if (elements.confirmPassword) {
                elements.confirmPassword.type = 'password';
                elements.toggleConfirmPassword.innerHTML = '<i class="fas fa-eye"></i>';
            }
            
            // Disable submit button
            elements.submitBtn.disabled = true;
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // Sign In Link Handler
    const setupSignInLink = () => {
        elements.signInLink?.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Sign in functionality will be available soon!');
        });
    };

    // Initialize Everything
    const init = () => {
        console.log('Initializing NSDA Registration Form...');
        
        setupFieldValidation();
        setupPasswordToggles();
        setupThemeToggle();
        setupFormSubmission();
        setupResetButton();
        setupSignInLink();
        
        // Initialize form state
        ui.checkFormValidity();
        
        console.log('NSDA Registration Form initialized successfully!');
    };

    // Start the application
    init();
});