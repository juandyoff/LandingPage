// SENDIFY Landing Page JavaScript

// State management
const AppState = {
  currentView: 'landing',
  isLoading: false,
  userData: null,
  errors: {}
};

// Utility functions
const Utils = {
  // Smooth scroll to element
  smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  },

  // Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Show/hide loading state
  setLoading(element, isLoading = true) {
    if (isLoading) {
      element.classList.add('loading');
      element.disabled = true;
    } else {
      element.classList.remove('loading');
      element.disabled = false;
    }
  },

  // Show alert message
  showAlert(message, type = 'info', duration = 5000) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insert at top of body
    document.body.insertBefore(alertDiv, document.body.firstChild);
    
    // Auto remove
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, duration);
  },

  // Validate form data
  validateForm(formData, rules) {
    const errors = {};
    
    for (const [field, value] of Object.entries(formData)) {
      const rule = rules[field];
      if (!rule) continue;
      
      // Required validation
      if (rule.required && (!value || value.trim() === '')) {
        errors[field] = `${rule.label} es requerido`;
        continue;
      }
      
      // Email validation
      if (rule.type === 'email' && value && !this.isValidEmail(value)) {
        errors[field] = 'Email inválido';
        continue;
      }
      
      // Min length validation
      if (rule.minLength && value && value.length < rule.minLength) {
        errors[field] = `${rule.label} debe tener al menos ${rule.minLength} caracteres`;
        continue;
      }
      
      // Custom validation
      if (rule.validate && value) {
        const customError = rule.validate(value, formData);
        if (customError) {
          errors[field] = customError;
        }
      }
    }
    
    return errors;
  },

  // Display form errors
  displayFormErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.form-group.error').forEach(group => {
      group.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(msg => {
      msg.remove();
    });
    
    // Display new errors
    for (const [field, message] of Object.entries(errors)) {
      const input = document.getElementById(field);
      if (input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
          formGroup.classList.add('error');
          
          const errorDiv = document.createElement('div');
          errorDiv.className = 'error-message';
          errorDiv.textContent = message;
          formGroup.appendChild(errorDiv);
        }
      }
    }
  }
};

// Navigation functionality
const Navigation = {
  init() {
    this.bindEvents();
    this.handleHashChange();
  },

  bindEvents() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
      });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        if (target && target !== '#') {
          Utils.smoothScroll(target);
          
          // Close mobile menu if open
          if (mobileMenu) {
            mobileMenu.classList.remove('show');
          }
        }
      });
    });

    // Handle hash changes
    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileMenu && mobileMenu.classList.contains('show')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          mobileMenu.classList.remove('show');
        }
      }
    });
  },

  handleHashChange() {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        Utils.smoothScroll(hash);
      }, 100);
    }
  }
};

// Modal functionality
const Modal = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Close modal when clicking backdrop
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        this.closeAll();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAll();
      }
    });
  },

  open(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  },

  close(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  },

  closeAll() {
    document.querySelectorAll('.modal.show').forEach(modal => {
      modal.classList.remove('show');
    });
    document.body.style.overflow = '';
  }
};

// Registration functionality
const Registration = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    const form = document.querySelector('.register-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        this.handleSubmit(e);
      });

      // Real-time validation
      form.addEventListener('input', (e) => {
        this.clearFieldError(e.target);
      });
    }
  },

  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Add checkbox value
    data.acceptTerms = document.getElementById('acceptTerms').checked;
    
    // Validation rules
    const rules = {
      firstName: { 
        required: true, 
        label: 'Nombre' 
      },
      lastName: { 
        required: true, 
        label: 'Apellido' 
      },
      email: { 
        required: true, 
        type: 'email', 
        label: 'Email' 
      },
      password: { 
        required: true, 
        minLength: 6, 
        label: 'Contraseña' 
      },
      confirmPassword: { 
        required: true, 
        label: 'Confirmar contraseña',
        validate: (value, formData) => {
          if (value !== formData.password) {
            return 'Las contraseñas no coinciden';
          }
        }
      },
      company: { 
        required: true, 
        label: 'Empresa' 
      },
      businessType: { 
        required: true, 
        label: 'Tipo de negocio' 
      },
      acceptTerms: { 
        required: true, 
        label: 'Términos y condiciones',
        validate: (value) => {
          if (!value) {
            return 'Debes aceptar los términos y condiciones';
          }
        }
      }
    };
    
    // Validate form
    const errors = Utils.validateForm(data, rules);
    
    if (Object.keys(errors).length > 0) {
      Utils.displayFormErrors(errors);
      return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    Utils.setLoading(submitBtn, true);
    
    try {
      // Simulate API call
      await this.simulateRegistration(data);
      
      // Success
      Utils.showAlert('¡Cuenta creada exitosamente! Redirigiendo al dashboard...', 'success');
      
      // Store user data
      AppState.userData = {
        ...data,
        plan: 'Free',
        createdAt: new Date().toISOString()
      };
      
      // Redirect to dashboard after delay
      setTimeout(() => {
        goToDashboard();
      }, 2000);
      
    } catch (error) {
      Utils.showAlert('Error al crear la cuenta. Inténtalo de nuevo.', 'error');
      console.error('Registration error:', error);
    } finally {
      Utils.setLoading(submitBtn, false);
    }
  },

  async simulateRegistration(data) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random success/failure for demo
    if (Math.random() > 0.1) { // 90% success rate
      return { success: true, user: data };
    } else {
      throw new Error('Registration failed');
    }
  },

  clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    if (formGroup && formGroup.classList.contains('error')) {
      formGroup.classList.remove('error');
      const errorMsg = formGroup.querySelector('.error-message');
      if (errorMsg) {
        errorMsg.remove();
      }
    }
  }
};

// Animation utilities
const Animations = {
  init() {
    this.observeElements();
    this.initPackageAnimations();
  },

  observeElements() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe cards and sections
    document.querySelectorAll('.feature-card, .benefit-item, .testimonial-card, .team-card, .pricing-card').forEach(el => {
      observer.observe(el);
    });
  },

  initPackageAnimations() {
    // Add CSS variables for package rotations
    const packages = document.querySelectorAll('.package');
    packages.forEach((pkg, index) => {
      const rotations = ['12deg', '-6deg', '6deg', '-12deg'];
      pkg.style.setProperty('--rotation', rotations[index] || '0deg');
    });
  }
};

// Global functions (called from HTML)
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('show');
  }
}

function goToDashboard() {
  // Store current state
  localStorage.setItem('sendify_user', JSON.stringify(AppState.userData));
  
  // Redirect to dashboard
  window.location.href = 'dashboard.html';
}

function openRegisterModal() {
  Modal.open('registerModal');
}

function closeRegisterModal() {
  Modal.close('registerModal');
}

function handleRegister(event) {
  // This is handled by the Registration class
  // Function exists for HTML compatibility
}

// Theme management
const Theme = {
  init() {
    this.setTheme();
  },

  setTheme() {
    // Always use dark theme for SENDIFY
    document.documentElement.classList.add('dark');
  }
};

// Analytics and tracking
const Analytics = {
  init() {
    this.trackPageView();
    this.bindEvents();
  },

  trackPageView() {
    // Track page view (implement with your analytics service)
    console.log('Page view tracked:', window.location.pathname);
  },

  bindEvents() {
    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.textContent.trim();
        this.trackEvent('Button Click', { action });
      });
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      this.trackEvent('Form Submit', { form: e.target.className });
    });
  },

  trackEvent(event, properties = {}) {
    // Implement with your analytics service
    console.log('Event tracked:', event, properties);
  }
};

// Performance optimizations
const Performance = {
  init() {
    this.lazyLoadImages();
    this.preloadCritical();
  },

  lazyLoadImages() {
    // Implement lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  },

  preloadCritical() {
    // Preload critical resources
    const criticalResources = [
      'dashboard.html',
      'css/dashboard.css',
      'js/dashboard.js'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });
  }
};

// Error handling
const ErrorHandler = {
  init() {
    this.bindGlobalHandlers();
  },

  bindGlobalHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      this.logError('Promise Rejection', e.reason);
    });

    // Handle JavaScript errors
    window.addEventListener('error', (e) => {
      console.error('JavaScript error:', e.error);
      this.logError('JavaScript Error', e.error);
    });
  },

  logError(type, error) {
    // Log to your error tracking service
    console.log('Error logged:', type, error);
  }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 SENDIFY Landing Page Initialized');
  
  // Initialize all modules
  Navigation.init();
  Modal.init();
  Registration.init();
  Animations.init();
  Theme.init();
  Analytics.init();
  Performance.init();
  ErrorHandler.init();
  
  // Initialize Lucide icons if available
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// Service Worker registration (if needed)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}