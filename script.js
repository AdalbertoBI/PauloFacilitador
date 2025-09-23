// Utility Functions
function formatCurrency(value) {
    return value.replace(/\D/g, '').replace(/(\d)(\d{2})$/, '$1,$2').replace(/(?=(\d{3})+(\D))\B/g, '.');
}

function formatPhone(value) {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function validateCPF(cpf) {
    // Remove formatting
    cpf = cpf.replace(/\D/g, '');
    
    // Check if has 11 digits or is a sequence
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    // Validate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit1 = (sum * 10) % 11;
    if (digit1 === 10) digit1 = 0;
    if (digit1 !== parseInt(cpf.charAt(9))) return false;
    
    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digit2 = (sum * 10) % 11;
    if (digit2 === 10) digit2 = 0;
    if (digit2 !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

function validateCNPJ(cnpj) {
    // Remove formatting
    cnpj = cnpj.replace(/\D/g, '');
    
    // Check if has 14 digits or is a sequence
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }
    
    // Validate first digit
    let sum = 0;
    let weight = 2;
    for (let i = 11; i >= 0; i--) {
        sum += parseInt(cnpj.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
    }
    let digit1 = sum % 11;
    digit1 = digit1 < 2 ? 0 : 11 - digit1;
    if (digit1 !== parseInt(cnpj.charAt(12))) return false;
    
    // Validate second digit
    sum = 0;
    weight = 2;
    for (let i = 12; i >= 0; i--) {
        sum += parseInt(cnpj.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
    }
    let digit2 = sum % 11;
    digit2 = digit2 < 2 ? 0 : 11 - digit2;
    if (digit2 !== parseInt(cnpj.charAt(13))) return false;
    
    return true;
}

function formatCpfCnpj(value) {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 11) {
        // Format as CPF
        return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
        // Format as CNPJ
        return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Form Input Formatting
function setupInputFormatting() {
    // Format currency inputs
    const currencyInputs = document.querySelectorAll('#valorImovel, #valorEntrada, #rendaFaturamento');
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

    // Format CPF/CNPJ input
    const cpfCnpjInput = document.getElementById('cpfCnpj');
    if (cpfCnpjInput) {
        cpfCnpjInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 14) {
                e.target.value = formatCpfCnpj(value);
            } else {
                e.target.value = e.target.value.slice(0, -1);
            }
        });
    }

    // Auto-calculate age from birth date
    const birthDateInput = document.getElementById('dataNascimento');
    const ageInput = document.getElementById('idade');
    if (birthDateInput && ageInput) {
        birthDateInput.addEventListener('change', function(e) {
            const birthDate = new Date(e.target.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            // Simply calculate and set the age without validation
            if (age >= 0) {
                ageInput.value = age;
            }
        });
    }
}

// Form Validation (Optional - only validates filled fields)
function validateForm() {
    const form = document.getElementById('preAnaliseForm');
    let isValid = true;
    
    // Reset all field borders
    const allFields = form.querySelectorAll('input, select, textarea');
    allFields.forEach(field => {
        field.style.borderColor = '';
    });

    // Validate email only if filled
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        email.style.borderColor = '#ef4444';
        alert('E-mail inválido. Por favor, verifique o formato.');
        isValid = false;
    }

    // Validate CPF/CNPJ only if filled
    const cpfCnpj = document.getElementById('cpfCnpj');
    if (cpfCnpj.value) {
        const numbers = cpfCnpj.value.replace(/\D/g, '');
        const isValidCpfCnpj = numbers.length === 11 ? validateCPF(numbers) : numbers.length === 14 ? validateCNPJ(numbers) : false;
        
        if (!isValidCpfCnpj) {
            cpfCnpj.style.borderColor = '#ef4444';
            alert('CPF/CNPJ inválido. Por favor, verifique o número digitado.');
            isValid = false;
        }
    }

    // Validate phone only if filled
    const phone = document.getElementById('telefone');
    if (phone.value && phone.value.replace(/\D/g, '').length < 10) {
        phone.style.borderColor = '#ef4444';
        alert('Telefone inválido. Por favor, insira um número válido.');
        isValid = false;
    }

    // Validate email fields only if filled
    const contatoCorretor = document.getElementById('contatoCorretor');
    if (contatoCorretor.value && contatoCorretor.value.includes('@') && !emailRegex.test(contatoCorretor.value)) {
        contatoCorretor.style.borderColor = '#ef4444';
        alert('Formato de e-mail inválido no contato da corretora. Por favor, verifique o formato.');
        isValid = false;
    }

    return isValid;
}

// Generate WhatsApp Message
function generateWhatsAppMessage() {
    const formData = new FormData(document.getElementById('preAnaliseForm'));
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value.trim();
    }

    let message = `🏠 *PRÉ-ANÁLISE DE CRÉDITO IMOBILIÁRIO*\n\n`;
    
    // Helper function to add field only if not empty
    const addField = (label, value, unit = '') => {
        if (value && value !== '') {
            message += `• ${label}: ${value}${unit}\n`;
        }
    };

    // Dados Pessoais - only add if at least one field is filled
    const personalFields = [data.nome, data.email, data.telefone, data.dataNascimento, data.idade, data.estadoCivil];
    const hasPersonalData = personalFields.some(field => field && field !== '');
    
    if (hasPersonalData) {
        message += `👤 *DADOS PESSOAIS*\n`;
        addField('Nome', data.nome);
        addField('E-mail', data.email);
        addField('WhatsApp', data.telefone);
        addField('Data de Nascimento', data.dataNascimento);
        addField('Idade', data.idade, ' anos');
        addField('Estado Civil', data.estadoCivil);
        message += `\n`;
    }
    
    // Dados Profissionais - only add if at least one field is filled
    const professionalFields = [data.profissao, data.tempoEmprego, data.tipoContrato];
    const hasProfessionalData = professionalFields.some(field => field && field !== '');
    
    if (hasProfessionalData) {
        message += `💼 *DADOS PROFISSIONAIS*\n`;
        addField('Profissão', data.profissao);
        addField('Tempo no Emprego', data.tempoEmprego);
        addField('Tipo de Contrato', data.tipoContrato);
        message += `\n`;
    }
    
    // Dados do Imóvel - only add if at least one field is filled
    const propertyFields = [data.valorImovel, data.valorEntrada, data.tipoImovel, data.cidade];
    const hasPropertyData = propertyFields.some(field => field && field !== '');
    
    if (hasPropertyData) {
        message += `🏡 *DADOS DO IMÓVEL*\n`;
        addField('Valor do Imóvel', data.valorImovel);
        addField('Valor da Entrada', data.valorEntrada);
        addField('Tipo do Imóvel', data.tipoImovel);
        addField('Cidade', data.cidade);
        message += `\n`;
    }
    
    // Situação Financeira - only add if at least one field is filled
    const financialFields = [data.primeiroImovel, data.fgts, data.score, data.negativado];
    const hasFinancialData = financialFields.some(field => field && field !== '');
    
    if (hasFinancialData) {
        message += `💰 *SITUAÇÃO FINANCEIRA*\n`;
        addField('Primeiro Imóvel', data.primeiroImovel);
        addField('Tem FGTS', data.fgts);
        addField('Score', data.score);
        addField('Pendências Financeiras', data.negativado);
        message += `\n`;
    }

    // Dados do Corretor/Imobiliária - only add if at least one field is filled
    const brokerFields = [data.atendidoCorretor, data.nomeCorretor, data.contatoCorretor];
    const hasBrokerData = brokerFields.some(field => field && field !== '');
    
    if (hasBrokerData) {
        message += `🏢 *CORRETOR/IMOBILIÁRIA*\n`;
        addField('Atendido por corretor', data.atendidoCorretor);
        addField('Nome do Corretor/Imobiliária', data.nomeCorretor);
        addField('Contato da Corretora', data.contatoCorretor);
        message += `\n`;
    }

    // Tipo de Operação - only add if at least one field is filled
    const operationFields = [data.tipoOperacao, data.tipoComprador, data.cpfCnpj, data.rendaFaturamento];
    const hasOperationData = operationFields.some(field => field && field !== '');
    
    if (hasOperationData) {
        message += `📋 *TIPO DE OPERAÇÃO*\n`;
        addField('Tipo de Imóvel', data.tipoOperacao);
        addField('Comprador', data.tipoComprador);
        addField('CPF/CNPJ', data.cpfCnpj);
        addField('Renda/Faturamento', data.rendaFaturamento);
        message += `\n`;
    }

    // Dados Bancários - only add if at least one field is filled
    const bankFields = [data.bancoPrincipal, data.agencia, data.conta, data.outrosBancos];
    const hasBankData = bankFields.some(field => field && field !== '');
    
    if (hasBankData) {
        message += `🏦 *DADOS BANCÁRIOS*\n`;
        addField('Banco Principal', data.bancoPrincipal);
        addField('Agência', data.agencia);
        addField('Conta', data.conta);
        addField('Outros Bancos', data.outrosBancos);
        message += `\n`;
    }

    // Perfil Adicional - only add if at least one field is filled
    const profileFields = [data.servidorPublico, data.residenciaAtual];
    const hasProfileData = profileFields.some(field => field && field !== '');
    
    if (hasProfileData) {
        message += `👨‍💼 *PERFIL ADICIONAL*\n`;
        addField('Servidor Público', data.servidorPublico);
        addField('Residência Atual', data.residenciaAtual);
        message += `\n`;
    }
    
    if (data.observacoes && data.observacoes !== '') {
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
        const whatsappUrl = `https://wa.me/5511978601796?text=${message}`;
        
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

// Header Scroll Effect - Hide on scroll down, don't reappear
function setupHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Hide header when scrolling down past 100px
        if (currentScrollY > 100 && currentScrollY > lastScrollY) {
            header.classList.add('hidden');
        }
        // Only show header when at the very top (less than 50px)
        else if (currentScrollY <= 50) {
            header.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
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

    // Init testimonials carousel
    initTestimonialsCarousel();

    // Ajustar deslocamento da área principal conforme a altura do header
    adjustMainTopOffset();
    window.addEventListener('resize', adjustMainTopOffset);

    // Header compacto sem logo não precisa de padding adaptativo

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

    // Performance optimization - Lazy loading commented out to fix image visibility issues
    /*
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
    */
});

// Global Functions for Inline Event Handlers
window.scrollToSection = scrollToSection;

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Hide Navigation on Scroll
let lastScrollTop = 0;
const header = document.querySelector('.header');

function hideNavOnScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only hide when scrolling down and past the initial threshold
    if (scrollTop > 100 && scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add('hidden');
    }
    
    lastScrollTop = scrollTop;
}

// Add scroll event listener
window.addEventListener('scroll', hideNavOnScroll);

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

// Testimonials Carousel Logic
function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const viewport = carousel.querySelector('.carousel-viewport');
    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.querySelectorAll('.testimonial-item'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    if (!viewport || !track || items.length === 0) return;

    let index = 0;

    function update() {
        const itemWidth = items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
        const offset = -(index * itemWidth);
        track.style.transform = `translateX(${offset}px)`;
    }

    function next() {
        index = (index + 1) % items.length;
        update();
    }

    function prev() {
        index = (index - 1 + items.length) % items.length;
        update();
    }

    nextBtn && nextBtn.addEventListener('click', next);
    prevBtn && prevBtn.addEventListener('click', prev);

    // Keyboard accessibility
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    // Resize handling to recalc widths
    window.addEventListener('resize', update);

    // Initialize position
    update();
}
// Ajusta a margem-top da main para não ficar coberta pelo header fixo
function adjustMainTopOffset() {
    const headerEl = document.querySelector('.header');
    const mainEl = document.querySelector('.main');
    if (!headerEl || !mainEl) return;
    const headerHeight = headerEl.getBoundingClientRect().height;
    mainEl.style.marginTop = `${Math.ceil(headerHeight)}px`;
}

