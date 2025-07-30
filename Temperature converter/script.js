// Get DOM elements
const temperatureInput = document.getElementById('temperature-input');
const convertBtn = document.getElementById('convert-btn');
const errorMessage = document.getElementById('error-message');
const results = document.getElementById('results');

// Conversion functions
const conversions = {
    celsius: {
        fahrenheit: (c) => (c * 9/5) + 32,
        kelvin: (c) => c + 273.15
    },
    fahrenheit: {
        celsius: (f) => (f - 32) * 5/9,
        kelvin: (f) => (f - 32) * 5/9 + 273.15
    },
    kelvin: {
        celsius: (k) => k - 273.15,
        fahrenheit: (k) => (k - 273.15) * 9/5 + 32
    }
};

// Validation
function validateInput(value, unit) {
    if (value === '' || isNaN(value)) {
        return { valid: false, error: 'Please enter a valid number' };
    }
    
    const num = parseFloat(value);
    
    // Check absolute zero
    if (unit === 'celsius' && num < -273.15) {
        return { valid: false, error: 'Temperature below absolute zero' };
    }
    if (unit === 'fahrenheit' && num < -459.67) {
        return { valid: false, error: 'Temperature below absolute zero' };
    }
    if (unit === 'kelvin' && num < 0) {
        return { valid: false, error: 'Kelvin cannot be negative' };
    }
    
    return { valid: true, value: num };
}

// Convert temperature
function convert() {
    const inputValue = temperatureInput.value;
    const selectedUnit = document.querySelector('input[name="unit"]:checked').value;
    
    // Clear previous errors
    errorMessage.textContent = '';
    
    // Validate
    const validation = validateInput(inputValue, selectedUnit);
    if (!validation.valid) {
        errorMessage.textContent = validation.error;
        results.innerHTML = '<div class="result-placeholder">Enter a temperature to convert</div>';
        return;
    }
    
    const temp = validation.value;
    let resultHTML = '';
    
    // Perform conversions
    switch (selectedUnit) {
        case 'celsius':
            resultHTML = `
                <div class="result-item">
                    <span class="result-value">${conversions.celsius.fahrenheit(temp).toFixed(2)}</span>
                    <span class="result-unit">°F</span>
                </div>
                <div class="result-item">
                    <span class="result-value">${conversions.celsius.kelvin(temp).toFixed(2)}</span>
                    <span class="result-unit">K</span>
                </div>
            `;
            break;
        case 'fahrenheit':
            resultHTML = `
                <div class="result-item">
                    <span class="result-value">${conversions.fahrenheit.celsius(temp).toFixed(2)}</span>
                    <span class="result-unit">°C</span>
                </div>
                <div class="result-item">
                    <span class="result-value">${conversions.fahrenheit.kelvin(temp).toFixed(2)}</span>
                    <span class="result-unit">K</span>
                </div>
            `;
            break;
        case 'kelvin':
            resultHTML = `
                <div class="result-item">
                    <span class="result-value">${conversions.kelvin.celsius(temp).toFixed(2)}</span>
                    <span class="result-unit">°C</span>
                </div>
                <div class="result-item">
                    <span class="result-value">${conversions.kelvin.fahrenheit(temp).toFixed(2)}</span>
                    <span class="result-unit">°F</span>
                </div>
            `;
            break;
    }
    
    results.innerHTML = resultHTML;
}

// Event listeners
convertBtn.addEventListener('click', convert);
temperatureInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') convert();
});

// Auto-convert on unit change if there's a value
document.querySelectorAll('input[name="unit"]').forEach(radio => {
    radio.addEventListener('change', () => {
        if (temperatureInput.value) convert();
    });
});
