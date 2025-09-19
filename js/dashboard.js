// SENDIFY Dashboard JavaScript

// Dashboard State
const DashboardState = {
  currentView: 'main',
  shipments: [
    { 
      id: 'SND-001', 
      client: 'TechStore SA', 
      destination: 'Lima', 
      status: 'En tránsito', 
      date: '2024-01-15',
      sender: 'TechStore SA',
      receiver: 'Juan Pérez',
      courier: 'CourierExpress',
      progress: 60,
      timeline: [
        { status: 'Registrado', description: 'Envío registrado en el sistema', date: '15 Ene 2024, 10:30 AM', location: 'Lima, Perú', completed: true },
        { status: 'Recogido', description: 'Paquete recogido por courier', date: '15 Ene 2024, 3:45 PM', location: 'Lima, Perú', completed: true },
        { status: 'En Tránsito', description: 'En camino a destino', date: '16 Ene 2024, 8:20 AM', location: 'Terminal Lima', active: true },
        { status: 'En Reparto', description: 'Salió para entrega', date: 'Pendiente', location: 'Lima, Perú', completed: false },
        { status: 'Entregado', description: 'Paquete entregado exitosamente', date: 'Pendiente', location: 'Lima, Perú', completed: false }
      ]
    },
    { id: 'SND-002', client: 'Moda Express', destination: 'Cusco', status: 'Entregado', date: '2024-01-15' },
    { id: 'SND-003', client: 'Electro Mundial', destination: 'Arequipa', status: 'En reparto', date: '2024-01-14' },
    { id: 'SND-004', client: 'Librería Central', destination: 'Trujillo', status: 'Registrado', date: '2024-01-14' }
  ],
  frequentClients: [
    { name: 'TechStore SA', email: 'envios@techstore.com', phone: '+51 999 123 456', address: 'Av. Javier Prado 123, Lima' },
    { name: 'Moda Express', email: 'logistica@modaexpress.com', phone: '+51 987 654 321', address: 'Jr. de la Unión 456, Lima' },
    { name: 'Electro Mundial', email: 'envios@electromundial.com', phone: '+51 976 543 210', address: 'Av. Arequipa 789, Lima' }
  ],
  couriers: [
    { name: 'CourierExpress', price: 25.50, time: '2-3 días', rating: 4.5 },
    { name: 'FastDelivery', price: 35.00, time: '1-2 días', rating: 4.8 },
    { name: 'UltraSpeed', price: 45.75, time: '24 horas', rating: 4.9 }
  ]
};

// Dashboard Navigation
const DashboardNav = {
  init() {
    this.bindEvents();
    this.loadUserData();
  },

  bindEvents() {
    // Handle browser back button
    window.addEventListener('popstate', () => {
      this.handleBackButton();
    });
  },

  loadUserData() {
    // Load user data from localStorage if available
    const userData = localStorage.getItem('sendify_user');
    if (userData) {
      try {
        DashboardState.userData = JSON.parse(userData);
        console.log('User data loaded:', DashboardState.userData);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  },

  handleBackButton() {
    // Handle browser back button to navigate between views
    if (DashboardState.currentView !== 'main') {
      showMainDashboard();
    } else {
      goBackToLanding();
    }
  }
};

// Shipment Management
const ShipmentManager = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    const shipmentForm = document.getElementById('shipmentForm');
    if (shipmentForm) {
      shipmentForm.addEventListener('submit', (e) => {
        this.handleCreateShipment(e);
      });

      // Auto-fill from frequent clients
      this.setupClientAutofill();
    }
  },

  setupClientAutofill() {
    const senderNameInput = document.getElementById('senderName');
    if (senderNameInput) {
      // Create datalist for autocomplete
      const datalist = document.createElement('datalist');
      datalist.id = 'frequentClients';
      
      DashboardState.frequentClients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.name;
        datalist.appendChild(option);
      });
      
      senderNameInput.setAttribute('list', 'frequentClients');
      senderNameInput.parentNode.appendChild(datalist);

      // Auto-fill other fields when client is selected
      senderNameInput.addEventListener('change', (e) => {
        this.autoFillClientData(e.target.value);
      });
    }
  },

  autoFillClientData(clientName) {
    const client = DashboardState.frequentClients.find(c => c.name === clientName);
    if (client) {
      document.getElementById('senderEmail').value = client.email;
      document.getElementById('senderPhone').value = client.phone;
      document.getElementById('senderAddress').value = client.address;
      document.getElementById('senderCompany').value = client.name;
    }
  },

  async handleCreateShipment(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const shipmentData = Object.fromEntries(formData.entries());
    
    // Validate required fields
    const requiredFields = [
      'senderName', 'senderEmail', 'senderPhone', 'senderAddress',
      'receiverName', 'receiverPhone', 'receiverAddress',
      'packageWeight', 'packageDescription'
    ];
    
    const errors = {};
    requiredFields.forEach(field => {
      if (!shipmentData[field] || shipmentData[field].trim() === '') {
        errors[field] = 'Este campo es requerido';
      }
    });

    // Email validation
    if (shipmentData.senderEmail && !Utils.isValidEmail(shipmentData.senderEmail)) {
      errors.senderEmail = 'Email inválido';
    }
    if (shipmentData.receiverEmail && !Utils.isValidEmail(shipmentData.receiverEmail)) {
      errors.receiverEmail = 'Email inválido';
    }

    // Weight validation
    if (shipmentData.packageWeight && parseFloat(shipmentData.packageWeight) <= 0) {
      errors.packageWeight = 'El peso debe ser mayor a 0';
    }

    if (Object.keys(errors).length > 0) {
      Utils.displayFormErrors(errors);
      return;
    }

    // Show loading
    showLoading('Creando envío...');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate shipment code
      const shipmentCode = 'SND-' + String(Math.floor(Math.random() * 9000) + 1000);
      
      // Add to shipments list
      const newShipment = {
        id: shipmentCode,
        client: shipmentData.senderCompany || shipmentData.senderName,
        destination: this.extractCity(shipmentData.receiverAddress),
        status: 'Registrado',
        date: new Date().toISOString().split('T')[0],
        ...shipmentData
      };
      
      DashboardState.shipments.unshift(newShipment);
      
      hideLoading();
      showSuccessModal(`¡Envío creado exitosamente!\nCódigo: ${shipmentCode}`);
      
      // Clear form
      e.target.reset();
      
      // Redirect to tracking
      setTimeout(() => {
        closeSuccessModal();
        trackShipment(shipmentCode);
      }, 3000);
      
    } catch (error) {
      hideLoading();
      Utils.showAlert('Error al crear el envío. Inténtalo de nuevo.', 'error');
      console.error('Shipment creation error:', error);
    }
  },

  extractCity(address) {
    // Simple city extraction from address
    const cities = ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Chiclayo', 'Piura', 'Iquitos', 'Huancayo', 'Tacna', 'Ica'];
    for (const city of cities) {
      if (address.toLowerCase().includes(city.toLowerCase())) {
        return city;
      }
    }
    return 'Perú';
  }
};

// Tracking System
const TrackingSystem = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Auto-search on load if there's a tracking code in URL or state
    const urlParams = new URLSearchParams(window.location.search);
    const trackingCode = urlParams.get('track');
    if (trackingCode) {
      document.getElementById('trackingCode').value = trackingCode;
      this.searchShipment(trackingCode);
    }
  },

  async searchShipment(code = null) {
    const trackingCode = code || document.getElementById('trackingCode').value.trim();
    
    if (!trackingCode) {
      Utils.showAlert('Ingresa un código de envío', 'warning');
      return;
    }

    showLoading('Buscando envío...');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const shipment = DashboardState.shipments.find(s => 
        s.id.toLowerCase() === trackingCode.toLowerCase()
      );

      hideLoading();

      if (shipment) {
        this.displayTrackingResults(shipment);
      } else {
        this.displayNotFound(trackingCode);
      }
    } catch (error) {
      hideLoading();
      Utils.showAlert('Error al buscar el envío', 'error');
    }
  },

  displayTrackingResults(shipment) {
    const resultsContainer = document.getElementById('trackingResults');
    if (!resultsContainer) return;

    // Update tracking info
    resultsContainer.querySelector('.tracking-header h3').textContent = `Envío ${shipment.id}`;
    
    const statusBadge = resultsContainer.querySelector('.badge');
    statusBadge.textContent = shipment.status;
    statusBadge.className = `badge ${this.getStatusBadgeClass(shipment.status)}`;

    // Update details
    const details = resultsContainer.querySelectorAll('.detail-item .value');
    if (details.length >= 4) {
      details[0].textContent = shipment.sender || shipment.client;
      details[1].textContent = shipment.receiver || 'Cliente';
      details[2].textContent = shipment.destination;
      details[3].textContent = shipment.courier || 'CourierExpress';
    }

    // Update progress
    const progressBar = resultsContainer.querySelector('.progress-bar');
    const progressText = resultsContainer.querySelector('.progress-text');
    if (progressBar && progressText) {
      const progress = shipment.progress || this.calculateProgress(shipment.status);
      progressBar.style.width = progress + '%';
      progressText.textContent = progress + '% Completado';
    }

    // Update timeline if available
    if (shipment.timeline) {
      this.updateTimeline(shipment.timeline);
    } else {
      this.updateTimelineFromStatus(shipment);
    }

    resultsContainer.style.display = 'block';
  },

  displayNotFound(code) {
    const resultsContainer = document.getElementById('trackingResults');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
      <div class="text-center" style="padding: 3rem;">
        <div style="font-size: 4rem; opacity: 0.3; margin-bottom: 1rem;">📦</div>
        <h3>Envío no encontrado</h3>
        <p>No se encontró ningún envío con el código: <strong>${code}</strong></p>
        <p>Verifica que el código sea correcto e intenta nuevamente.</p>
      </div>
    `;
    resultsContainer.style.display = 'block';
  },

  getStatusBadgeClass(status) {
    const statusMap = {
      'Registrado': 'badge-secondary',
      'Recogido': 'badge-warning',
      'En tránsito': 'badge-warning', 
      'En Tránsito': 'badge-warning',
      'En reparto': 'badge-warning',
      'Entregado': 'badge-success'
    };
    return statusMap[status] || 'badge-secondary';
  },

  calculateProgress(status) {
    const progressMap = {
      'Registrado': 20,
      'Recogido': 40,
      'En tránsito': 60,
      'En Tránsito': 60,
      'En reparto': 80,
      'Entregado': 100
    };
    return progressMap[status] || 0;
  },

  updateTimeline(timelineData) {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    timeline.innerHTML = timelineData.map(item => `
      <div class="timeline-item ${item.completed ? 'completed' : ''} ${item.active ? 'active' : ''}">
        <div class="timeline-icon">
          <i data-lucide="${this.getTimelineIcon(item.status)}"></i>
        </div>
        <div class="timeline-content">
          <h4>${item.status}</h4>
          <p>${item.description}</p>
          <span class="timestamp">${item.date}</span>
          <span class="location">${item.location}</span>
        </div>
      </div>
    `).join('');

    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  updateTimelineFromStatus(shipment) {
    // Create basic timeline from status
    const basicTimeline = [
      { status: 'Registrado', description: 'Envío registrado en el sistema', completed: true },
      { status: 'Recogido', description: 'Paquete recogido por courier', completed: shipment.status !== 'Registrado' },
      { status: 'En Tránsito', description: 'En camino a destino', active: shipment.status === 'En tránsito' || shipment.status === 'En Tránsito' },
      { status: 'En Reparto', description: 'Salió para entrega', completed: shipment.status === 'Entregado' },
      { status: 'Entregado', description: 'Paquete entregado exitosamente', completed: shipment.status === 'Entregado' }
    ];

    this.updateTimeline(basicTimeline);
  },

  getTimelineIcon(status) {
    const iconMap = {
      'Registrado': 'check',
      'Recogido': 'truck',
      'En Tránsito': 'map-pin',
      'En Reparto': 'home',
      'Entregado': 'check-circle'
    };
    return iconMap[status] || 'circle';
  }
};

// Quotation System
const QuotationSystem = {
  init() {
    // Initialize quotation system when implemented
  },

  async getQuotes(weight, origin, destination) {
    // Simulate API call to get courier quotes
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return DashboardState.couriers.map(courier => ({
      ...courier,
      finalPrice: this.calculatePrice(courier.price, weight)
    }));
  },

  calculatePrice(basePrice, weight) {
    // Simple price calculation based on weight
    return basePrice + (weight > 1 ? (weight - 1) * 5 : 0);
  }
};

// Reports System
const ReportsSystem = {
  init() {
    // Initialize reports when implemented
  },

  generateReport(dateFrom, dateTo, type) {
    // Generate reports based on shipment data
    const filteredShipments = DashboardState.shipments.filter(shipment => {
      const shipmentDate = new Date(shipment.date);
      return shipmentDate >= new Date(dateFrom) && shipmentDate <= new Date(dateTo);
    });

    return {
      totalShipments: filteredShipments.length,
      deliveredShipments: filteredShipments.filter(s => s.status === 'Entregado').length,
      averageDeliveryTime: 2.5, // Mock data
      totalCost: filteredShipments.length * 45.50 // Mock data
    };
  }
};

// Global Navigation Functions
function showView(viewName) {
  // Hide all views
  document.querySelectorAll('.dashboard-view').forEach(view => {
    view.classList.remove('active');
  });

  // Show selected view
  const targetView = document.getElementById(viewName + 'View');
  if (targetView) {
    targetView.classList.add('active');
    DashboardState.currentView = viewName;
    
    // Update URL without page reload
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('view', viewName);
    window.history.pushState({ view: viewName }, '', newUrl);
  }
}

function showMainDashboard() {
  document.querySelectorAll('.dashboard-view').forEach(view => {
    view.classList.remove('active');
  });
  document.getElementById('mainDashboard').classList.add('active');
  DashboardState.currentView = 'main';
  
  // Clear URL parameters
  window.history.pushState({}, '', window.location.pathname);
}

function goBackToLanding() {
  window.location.href = 'index.html';
}

function trackShipment(code) {
  showView('tracking');
  
  // Set tracking code and search
  setTimeout(() => {
    if (code) {
      document.getElementById('trackingCode').value = code;
      TrackingSystem.searchShipment(code);
    }
  }, 100);
}

function searchShipment() {
  TrackingSystem.searchShipment();
}

// Loading and Modal Functions
function showLoading(message = 'Procesando...') {
  const overlay = document.getElementById('loadingOverlay');
  const messageElement = overlay.querySelector('p');
  if (messageElement) {
    messageElement.textContent = message;
  }
  overlay.classList.add('show');
}

function hideLoading() {
  document.getElementById('loadingOverlay').classList.remove('show');
}

function showSuccessModal(message) {
  const modal = document.getElementById('successModal');
  const messageElement = document.getElementById('successMessage');
  if (messageElement) {
    messageElement.textContent = message;
  }
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
  document.getElementById('successModal').classList.remove('show');
  document.body.style.overflow = '';
}

// Form Utilities (reuse from app.js)
const Utils = {
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  showAlert(message, type = 'info', duration = 5000) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insert at top of dashboard container
    const container = document.querySelector('.dashboard-container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto remove
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, duration);
  },

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

// Animation and UI Enhancements
const DashboardAnimations = {
  init() {
    this.observeElements();
    this.addHoverEffects();
  },

  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeIn 0.5s ease forwards';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stat-card, .action-card, .epic-card').forEach(el => {
      observer.observe(el);
    });
  },

  addHoverEffects() {
    // Add dynamic hover effects for better UX
    document.querySelectorAll('.action-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }
};

// Performance Monitoring
const DashboardPerformance = {
  init() {
    this.trackLoadTime();
    this.optimizeImages();
  },

  trackLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Dashboard loaded in ${loadTime.toFixed(2)}ms`);
    });
  },

  optimizeImages() {
    // Lazy load images if needed
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
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
    }
  }
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 SENDIFY Dashboard Initialized');
  
  // Check if user should be here
  const currentPath = window.location.pathname;
  if (currentPath.includes('dashboard.html')) {
    // Initialize all dashboard modules
    DashboardNav.init();
    ShipmentManager.init();
    TrackingSystem.init();
    QuotationSystem.init();
    ReportsSystem.init();
    DashboardAnimations.init();
    DashboardPerformance.init();
    
    // Handle initial view from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialView = urlParams.get('view');
    if (initialView && document.getElementById(initialView + 'View')) {
      showView(initialView);
    }
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden, pause any animations or auto-refresh
    console.log('Dashboard hidden');
  } else {
    // Page is visible, resume operations
    console.log('Dashboard visible');
    // Refresh data if needed
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + specific keys for quick actions
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case '1':
        e.preventDefault();
        showView('createShipment');
        break;
      case '2':
        e.preventDefault();
        showView('tracking');
        break;
      case '3':
        e.preventDefault();
        showView('quotation');
        break;
      case 'h':
        e.preventDefault();
        showMainDashboard();
        break;
    }
  }
});

// Export for global access
window.DashboardState = DashboardState;
window.showView = showView;
window.showMainDashboard = showMainDashboard;
window.trackShipment = trackShipment;
window.searchShipment = searchShipment;