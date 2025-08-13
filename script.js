// Konfigurasi Google Apps Script
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyr4X1F3BAU8e4_zQBVlM44git2NTv90FEgOrr3oZAn0LmLqfxz_aa_O542xhQurxcx2g/exec"; // Ganti dengan ID script Anda

// Form submission handler
document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Disable submit button
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    
    // Hide previous messages
    hideMessages();
    
    try {
        // Collect form data
        const formData = collectFormData();
        
        // Send to Google Sheets
        const response = await sendToGoogleSheets(formData);
        
        if (response.success) {
            showSuccessMessage();
            resetForm();
        } else {
            throw new Error(response.message || 'Gagal mengirim data');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showErrorMessage(error.message || 'Terjadi kesalahan saat mengirim data');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
    }
});

// Collect form data
function collectFormData() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    
    // Get checkbox values
    const sertifikatCheckboxes = document.querySelectorAll('input[name="sertifikat"]:checked');
    const sertifikatValues = Array.from(sertifikatCheckboxes).map(cb => cb.value);
    
    // Get radio value
    const daerahKapal = document.querySelector('input[name="daerahKapal"]:checked')?.value || '';
    
    return {
        nama: formData.get('nama'),
        tanggalLahir: formData.get('tanggalLahir'),
        lokasiStandby: formData.get('lokasiStandby'),
        nomorTelepon: formData.get('nomorTelepon'),
        ijazah: formData.get('ijazah'),
        jabatan: formData.get('jabatan'),
        kapal: formData.get('kapal'),
        sertifikat: sertifikatValues.join(', '),
        daerahKapal: daerahKapal
    };
}

// Send data to Google Sheets via Google Apps Script
async function sendToGoogleSheets(data) {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// Show success message
function showSuccessMessage() {
    const messageContainer = document.getElementById('messageContainer');
    const successMessage = document.getElementById('successMessage');
    
    messageContainer.style.display = 'block';
    successMessage.style.display = 'block';
    
    // Scroll to message
    messageContainer.scrollIntoView({ behavior: 'smooth' });
}

// Show error message
function showErrorMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    const errorMessage = document.getElementById('errorMessage');
    
    messageContainer.style.display = 'block';
    errorMessage.style.display = 'block';
    
    // Scroll to message
    messageContainer.scrollIntoView({ behavior: 'smooth' });
}

// Hide all messages
function hideMessages() {
    const messageContainer = document.getElementById('messageContainer');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    messageContainer.style.display = 'none';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
}

// Reset form
function resetForm() {
    document.getElementById('registrationForm').reset();
    
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    // Uncheck all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    // Add real-time validation
    const inputs = document.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
});

// Validate individual input
function validateInput(input) {
    const value = input.value.trim();
    const fieldName = input.previousElementSibling.textContent;
    
    if (!value) {
        showFieldError(input, `${fieldName} wajib diisi`);
        return false;
    }
    
    // Specific validations
    if (input.type === 'tel') {
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(value)) {
            showFieldError(input, 'Nomor telepon tidak valid');
            return false;
        }
    }
    
    return true;
}

// Show field error
function showFieldError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.field-error');
    
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Clear field error
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
}

// Prevent form submission on Enter key
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// Add loading animation to form submission
function addLoadingAnimation() {
    const form = document.getElementById('registrationForm');
    form.classList.add('loading');
}

function removeLoadingAnimation() {
    const form = document.getElementById('registrationForm');
    form.classList.remove('loading');
}

// Auto-resize textarea if needed
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Format phone number as user types
document.getElementById('nomorTelepon').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 4) {
            value = value;
        } else if (value.length <= 8) {
            value = value.slice(0, 4) + '-' + value.slice(4);
        } else {
            value = value.slice(0, 4) + '-' + value.slice(4, 8) + '-' + value.slice(8, 12);
        }
    }
    e.target.value = value;
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    // Set max date for birth date (18 years ago)
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    document.getElementById('tanggalLahir').max = maxDate.toISOString().split('T')[0];
    
    // Set min date (reasonable range)
    const minDate = new Date(today.getFullYear() - 70, today.getMonth(), today.getDate());
    document.getElementById('tanggalLahir').min = minDate.toISOString().split('T')[0];
    
    console.log('Form initialized successfully');
});
