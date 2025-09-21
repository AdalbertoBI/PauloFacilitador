// Utility Functions
function formatCurrency(value) {
    return value.replace(/\D/g, '').replace(/(\d)(\d{2})$/, '$1,$2').replace(/(?=(\d{3})+(\D))\B/g, '.');
}

function formatPhone(value) {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Tab Navigation
function switchTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Show selected tab content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to selected nav item
    const selectedNavItem = document.querySelector(`[data-tab="${tabId}"]`);
    if (selectedNavItem) {
        selectedNavItem.classList.add('active');
    }
}

// Form Input Formatting
function setupInputFormatting() {
    // Format currency inputs
    const currencyInputs = document.querySelectorAll('#rendaBruta, #valorImovel, #valorEntrada');
    currencyInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value) {
                value = (parseInt(value) / 100).toFixed(2).replace('.', ',');
                value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                e.target.value = 'R$ ' + value;
            }
        });

        input.addEventListener('focus', function(e) {
            if (e.target.value === 'R$ 0,00') {
                e.target.value = '';
            }
        });
    });

    // Format phone input
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                if (value.length <= 2) {
                    e.target.value = value;
                } else if (value.length <= 7) {
                    e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                    e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                }
            } else {
                e.target.value = e.target.value.slice(0, -1);
            }
        });
    }
}

// Form Validation
function validateForm() {
    const form = document.getElementById('preAnaliseForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#10b981';
        }
    });

    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        email.style.borderColor = '#ef4444';
        isValid = false;
    }

    // Validate phone
    const phone = document.getElementById('telefone');
    if (phone.value && phone.value.replace(/\D/g, '').length < 11) {
        phone.style.borderColor = '#ef4444';
        isValid = false;
    }

    return isValid;
}

// Generate WhatsApp Message
function generateWhatsAppMessage() {
    const formData = new FormData(document.getElementById('preAnaliseForm'));
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    let message = `🏠 *PRÉ-ANÁLISE DE CRÉDITO IMOBILIÁRIO*\n\n`;
    
    // Dados Pessoais
    message += `👤 *DADOS PESSOAIS*\n`;
    message += `• Nome: ${data.nome}\n`;
    message += `• E-mail: ${data.email}\n`;
    message += `• WhatsApp: ${data.telefone}\n`;
    message += `• Idade: ${data.idade} anos\n`;
    message += `• Estado Civil: ${data.estadoCivil}\n\n`;
    
    // Dados Profissionais
    message += `💼 *DADOS PROFISSIONAIS*\n`;
    message += `• Profissão: ${data.profissao}\n`;
    message += `• Renda Bruta Mensal: ${data.rendaBruta}\n`;
    message += `• Tempo no Emprego: ${data.tempoEmprego}\n`;
    message += `• Tipo de Contrato: ${data.tipoContrato}\n\n`;
    
    // Dados do Imóvel
    message += `🏡 *DADOS DO IMÓVEL*\n`;
    message += `• Valor do Imóvel: ${data.valorImovel}\n`;
    message += `• Valor da Entrada: ${data.valorEntrada}\n`;
    message += `• Tipo do Imóvel: ${data.tipoImovel}\n`;
    message += `• Cidade: ${data.cidade}\n\n`;
    
    // Situação Financeira
    message += `💰 *SITUAÇÃO FINANCEIRA*\n`;
    message += `• Primeiro Imóvel: ${data.primeiroImovel}\n`;
    message += `• Tem FGTS: ${data.fgts}\n`;
    message += `• Score: ${data.score}\n`;
    message += `• Pendências Financeiras: ${data.negativado}\n\n`;
    
    if (data.observacoes) {
        message += `📝 *OBSERVAÇÕES*\n`;
        message += `${data.observacoes}\n\n`;
    }
    
    message += `Olá Paulo! Gostaria de receber sua análise especializada sobre minha situação para financiamento imobiliário. 🏠✨`;
    
    return encodeURIComponent(message);
}

// Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        return false;
    }

    // Show loading state
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando mensagem...';
    submitButton.disabled = true;

    // Generate WhatsApp message
    setTimeout(() => {
        const message = generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/5512991425017?text=${message}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showSuccessMessage();
    }, 1000);
}

// Success Message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #10b981;
        color: white;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        text-align: center;
        z-index: 10000;
        max-width: 400px;
        width: 90%;
    `;
    
    successDiv.innerHTML = `
        <i class="fab fa-whatsapp" style="font-size: 2rem; margin-bottom: 1rem;"></i>
        <h3>Redirecionando para o WhatsApp!</h3>
        <p>Sua pré-análise foi preparada e será enviada para o Paulo.</p>
        <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.9;">
            Se o WhatsApp não abrir automaticamente, clique no botão flutuante.
        </p>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        document.body.removeChild(successDiv);
    }, 5000);
}

// Smooth Scrolling for Navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const elementsToAnimate = document.querySelectorAll(
        '.benefit-item, .testimonial-item, .form-section, .stat-item'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Header Scroll Effect
function setupHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }

        // Hide/show header on scroll
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    });
}

// Track WhatsApp Button Clicks
function trackWhatsAppClicks() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track analytics if needed
            console.log('WhatsApp button clicked:', this.href);
        });
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    // Setup tab navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Setup form
    const form = document.getElementById('preAnaliseForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        setupInputFormatting();
    }

    // Setup other features
    setupSmoothScrolling();
    setupAnimations();
    setupHeaderScroll();
    trackWhatsAppClicks();

    // Add loading protection
    window.addEventListener('beforeunload', function(e) {
        const form = document.getElementById('preAnaliseForm');
        if (form) {
            let hasData = false;
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (input.value.trim() && input.value.trim() !== 'R$ 0,00') {
                    hasData = true;
                }
            });
            
            if (hasData) {
                e.preventDefault();
                e.returnValue = 'Você tem dados não salvos. Tem certeza que deseja sair?';
                return e.returnValue;
            }
        }
    });

    // Performance optimization
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Global Functions for Inline Event Handlers
window.scrollToSection = scrollToSection;
window.switchTab = switchTab;

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }).catch(function(error) {
            console.log('ServiceWorker registration failed');
        });
    });
}