function validateInputs() {
    let ph = parseFloat(document.getElementById("ph").value);
    let nitrogen = parseInt(document.getElementById("nitrogen").value);
    let phosphorus = parseInt(document.getElementById("phosphorus").value);
    let potassium = parseInt(document.getElementById("potassium").value);

    if (isNaN(ph) || isNaN(nitrogen) || isNaN(phosphorus) || isNaN(potassium)) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    if (ph < 4 || ph > 9) {
        alert("pH should be between 4.0 and 9.0");
        return;
    }
    if (nitrogen < 0 || nitrogen > 100) {
        alert("Nitrogen should be between 0 and 100 mg/kg");
        return;
    }
    if (phosphorus < 0 || phosphorus > 100) {
        alert("Phosphorus should be between 0 and 100 mg/kg");
        return;
    }
    if (potassium < 0 || potassium > 500) {
        alert("Potassium should be between 0 and 500 mg/kg");
        return;
    }

    analyzeSoil(ph, nitrogen, phosphorus, potassium);
}

function analyzeSoil(ph, nitrogen, phosphorus, potassium) {
    let result = "";

    if (ph < 5.5) {
        result += "Soil is too acidic. Consider adding lime. ";
    } else if (ph > 7.5) {
        result += "Soil is too alkaline. Consider adding sulfur. ";
    } else {
        result += "Soil pH is optimal. ";
    }

    if (nitrogen < 20) result += "Nitrogen is low. Add compost or manure. ";
    if (phosphorus < 15) result += "Phosphorus is low. Consider phosphate fertilizers. ";
    if (potassium < 200) result += "Potassium is low. Consider potash fertilizers. ";

    document.getElementById("result").innerText = result || "Soil is healthy!";
}
document.getElementById('soilTestForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const soilType = document.getElementById('soilType').value;
    const phLevel = parseFloat(document.getElementById('phLevel').value);
    const moisture = parseInt(document.getElementById('moisture').value);
    const nutrients = parseInt(document.getElementById('nutrients').value);

    // Initialize recommendations
    let phRecommendation = '';
    let moistureRecommendation = '';
    let nutrientRecommendation = '';
    let soilTypeRecommendation = '';

    // pH Level Recommendations
    if (phLevel < 6) {
        phRecommendation = 'Your soil is too acidic. Add lime to raise the pH level.';
    } else if (phLevel > 7.5) {
        phRecommendation = 'Your soil is too alkaline. Add sulfur to lower the pH level.';
    } else {
        phRecommendation = 'Your soil pH is optimal for most crops.';
    }

    // Moisture Level Recommendations
    if (moisture < 30) {
        moistureRecommendation = 'Your soil is too dry. Consider irrigation to improve moisture levels.';
    } else if (moisture > 70) {
        moistureRecommendation = 'Your soil is too wet. Improve drainage to avoid waterlogging.';
    } else {
        moistureRecommendation = 'Your soil moisture level is optimal.';
    }

    // Nutrient Level Recommendations
    if (nutrients < 100) {
        nutrientRecommendation = 'Your soil lacks nutrients. Add organic compost or fertilizers.';
    } else if (nutrients > 300) {
        nutrientRecommendation = 'Your soil has excessive nutrients. Reduce fertilizer use.';
    } else {
        nutrientRecommendation = 'Your soil nutrient level is optimal.';
    }

    // Soil Type Recommendations
    switch (soilType) {
        case 'clay':
            soilTypeRecommendation = 'Clay soil retains water well but drains poorly. Add sand and organic matter to improve drainage.';
            break;
        case 'sandy':
            soilTypeRecommendation = 'Sandy soil drains quickly but lacks nutrients. Add compost and mulch to improve fertility.';
            break;
        case 'loamy':
            soilTypeRecommendation = 'Loamy soil is ideal for most crops. Maintain its quality with regular organic additions.';
            break;
        case 'peaty':
            soilTypeRecommendation = 'Peaty soil is rich in organic matter but may be too acidic. Add lime to balance pH.';
            break;
        case 'chalky':
            soilTypeRecommendation = 'Chalky soil is alkaline and may lack nutrients. Add organic matter and acidic fertilizers.';
            break;
    }

    // Display recommendations
    document.getElementById('phRecommendation').textContent = phRecommendation;
    document.getElementById('moistureRecommendation').textContent = moistureRecommendation;
    document.getElementById('nutrientRecommendation').textContent = nutrientRecommendation;
    document.getElementById('soilTypeRecommendation').textContent = soilTypeRecommendation;
});

// Crop Price Prediction Module to be added to the existing Agritech application

// Add this code to the existing JavaScript section before the closing </script> tag

// Function to predict crop prices based on key parameters
function predictCropPrice(cropType, quality, quantity, location, season) {
    // Base prices in Indian Rupees (INR) per quintal (100kg)
    // These are approximations based on recent market trends as of data cutoff
    const basePrices = {
        'rice': {
            'basmati': 3500,
            'nonBasmati': 1900
        },
        'wheat': 2015,
        'maize': 1850,
        'sugarcane': 285, // per quintal
        'cotton': 6000, // per quintal of cotton lint
        'vegetables': {
            'potato': 1200,
            'onion': 1500,
            'tomato': 1800,
            'cauliflower': 1300,
            'cabbage': 1000
        },
        'fruits': {
            'apple': 5000,
            'banana': 2000,
            'mango': 4500,
            'orange': 3000,
            'grapes': 6000
        },
        'pulses': {
            'chickpea': 5000,
            'pigeonPea': 6200,
            'blackGram': 5800,
            'greenGram': 7200
        },
        'oilseeds': {
            'mustard': 5000,
            'soybean': 3800,
            'groundnut': 5500,
            'sunflower': 5800
        }
    };
    
    // Quality multipliers
    const qualityMultipliers = {
        'excellent': 1.2,
        'good': 1.0,
        'average': 0.85,
        'poor': 0.7
    };
    
    // Location factors (state-wise adjustment based on transportation, demand, etc.)
    const locationFactors = {
        'punjab': 1.1,
        'haryana': 1.05,
        'uttarpradesh': 1.0,
        'maharashtra': 1.05,
        'madhyapradesh': 0.95,
        'bihar': 0.9,
        'westbengal': 1.0,
        'gujarat': 1.05,
        'rajasthan': 0.95,
        'andhrapradesh': 1.0,
        'karnataka': 1.05,
        'tamilnadu': 1.0,
        'kerala': 1.1,
        'odisha': 0.9,
        'telangana': 1.0
    };
    
    // Season factors (based on supply-demand dynamics)
    const seasonFactors = {
        'harvest': 0.85, // Prices typically lower during harvest due to abundant supply
        'postHarvest': 1.0,
        'offSeason': 1.2,
        'preSowing': 1.1
    };
    
    // Quantity factors (bulk discount)
    function getQuantityFactor(quantity) {
        if (quantity >= 100) return 0.95; // 5% discount for large quantities
        if (quantity >= 50) return 0.97; // 3% discount for medium quantities
        if (quantity >= 25) return 0.99; // 1% discount for smaller quantities
        return 1.0; // No discount for very small quantities
    }
    
    // Clean up location input (remove spaces, make lowercase)
    const locationKey = location.toLowerCase().replace(/\s+/g, '');
    
    // Extract state from location string (assuming format: Village, District, State, Country)
    const locationParts = location.split(',');
    let state = '';
    if (locationParts.length >= 3) {
        state = locationParts[2].trim().toLowerCase().replace(/\s+/g, '');
    }
    
    // Get base price
    let basePrice = 0;
    if (typeof basePrices[cropType] === 'object') {
        // For crops with varieties, use the average price if specific variety not provided
        const varietyPrices = Object.values(basePrices[cropType]);
        basePrice = varietyPrices.reduce((sum, price) => sum + price, 0) / varietyPrices.length;
    } else {
        basePrice = basePrices[cropType] || 2000; // Default price if crop not found
    }
    
    // Apply multipliers
    const qualityMultiplier = qualityMultipliers[quality] || 1.0;
    const locationFactor = locationFactors[state] || 1.0;
    const seasonFactor = seasonFactors[season] || 1.0;
    const quantityFactor = getQuantityFactor(quantity);
    
    // Calculate predicted price
    const predictedPrice = basePrice * qualityMultiplier * locationFactor * seasonFactor * quantityFactor;
    
    // Calculate price range (±10% to account for market fluctuations)
    const minPrice = Math.round(predictedPrice * 0.9);
    const maxPrice = Math.round(predictedPrice * 1.1);
    
    // Return the prediction details
    return {
        cropType: cropType,
        basePrice: basePrice,
        predictedPrice: Math.round(predictedPrice),
        priceRange: {
            min: minPrice,
            max: maxPrice
        },
        factors: {
            quality: qualityMultiplier,
            location: locationFactor,
            season: seasonFactor,
            quantity: quantityFactor
        }
    };
}

// Add the following UI elements to the HTML form
document.addEventListener('DOMContentLoaded', function() {
    // Add a new fieldset for crop price prediction to the form
    const form = document.getElementById('soilTestForm');
    
    // Create the price prediction fieldset
    const pricePredictionFieldset = document.createElement('fieldset');
    pricePredictionFieldset.innerHTML = `
        <legend>Crop Price Prediction</legend>
        <div class="form-grid">
            <div class="form-group">
                <label for="cropQuality">Crop Quality:</label>
                <div class="input-wrapper">
                    <i class="input-icon fas fa-star"></i>
                    <select id="cropQuality" name="cropQuality">
                        <option value="">Select quality</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="poor">Poor</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="cropQuantity">Expected Yield (Quintals):</label>
                <div class="input-wrapper">
                    <i class="input-icon fas fa-weight-scale"></i>
                    <input type="number" id="cropQuantity" name="cropQuantity" min="1" step="1">
                </div>
            </div>
            
            <div class="form-group">
                <label for="harvestSeason">Harvest Season:</label>
                <div class="input-wrapper">
                    <i class="input-icon fas fa-calendar-days"></i>
                    <select id="harvestSeason" name="harvestSeason">
                        <option value="">Select season</option>
                        <option value="harvest">Harvest Season</option>
                        <option value="postHarvest">Post-Harvest</option>
                        <option value="offSeason">Off-Season</option>
                        <option value="preSowing">Pre-Sowing</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="cropVariety">Crop Variety (Optional):</label>
                <div class="input-wrapper">
                    <i class="input-icon fas fa-seedling"></i>
                    <input type="text" id="cropVariety" name="cropVariety">
                </div>
            </div>
        </div>
    `;
    
    // Insert the fieldset before the submit button
    const submitButton = document.getElementById('analyzeButton');
    form.insertBefore(pricePredictionFieldset, submitButton);
    
    // Add price prediction section to the results area
    const resultSection = document.getElementById('resultSection');
    const recommendationsList = document.getElementById('recommendationsList');
    
    // Create price prediction results section
    const pricePredictionResults = document.createElement('div');
    pricePredictionResults.innerHTML = `
        <h3>Crop Price Prediction</h3>
        <div class="recommendation-item">
            <p>Estimated market price for your crop: <span id="predictedPrice" style="font-weight: bold; color: var(--primary-color);"></span></p>
        </div>
        <div class="recommendation-item">
            <p>Price range: ₹<span id="minPrice"></span> - ₹<span id="maxPrice"></span> per quintal</p>
        </div>
        <div class="recommendation-item">
            <p>Factors affecting your crop price:</p>
            <ul id="priceFactors" style="margin-top: 10px; margin-left: 20px;"></ul>
        </div>
        <div class="recommendation-item">
            <p><strong>Note:</strong> These predictions are based on recent market trends and may vary based on actual market conditions, demand-supply dynamics, and government policies.</p>
        </div>
    `;
    
    // Insert the price prediction results before the back button
    const backButton = document.getElementById('backButton');
    resultSection.insertBefore(pricePredictionResults, backButton);
    
    // Modify the processResults function to include price prediction
    const originalProcessResults = processResults;
    window.processResults = function() {
        // Call the original function first
        originalProcessResults();
        
        // Get additional form values for price prediction
        const cropType = document.getElementById('cropType').value;
        const cropQuality = document.getElementById('cropQuality').value || 'average';
        const cropQuantity = parseFloat(document.getElementById('cropQuantity').value || 10);
        const location = document.getElementById('location').value;
        const harvestSeason = document.getElementById('harvestSeason').value || 'postHarvest';
        
        // Get price prediction
        const pricePrediction = predictCropPrice(cropType, cropQuality, cropQuantity, location, harvestSeason);
        
        // Update UI with price prediction
        document.getElementById('predictedPrice').textContent = '₹' + pricePrediction.predictedPrice.toLocaleString() + ' per quintal';
        document.getElementById('minPrice').textContent = pricePrediction.priceRange.min.toLocaleString();
        document.getElementById('maxPrice').textContent = pricePrediction.priceRange.max.toLocaleString();
        
        // Add price factors
        const priceFactors = document.getElementById('priceFactors');
        priceFactors.innerHTML = '';
        
        const factorDescriptions = {
            quality: `Crop quality (${cropQuality}): ${Math.round((pricePrediction.factors.quality - 1) * 100)}% ${pricePrediction.factors.quality > 1 ? 'premium' : 'discount'}`,
            location: `Your location: ${Math.round((pricePrediction.factors.location - 1) * 100)}% ${pricePrediction.factors.location > 1 ? 'higher' : 'lower'} than national average`,
            season: `Harvest timing (${harvestSeason}): ${Math.round((pricePrediction.factors.season - 1) * 100)}% ${pricePrediction.factors.season > 1 ? 'premium' : 'discount'}`,
            quantity: cropQuantity >= 25 ? `Quantity discount for ${cropQuantity} quintals: ${Math.round((1 - pricePrediction.factors.quantity) * 100)}%` : 'No quantity discount applied'
        };
        
        for (const factor in factorDescriptions) {
            const li = document.createElement('li');
            li.textContent = factorDescriptions[factor];
            priceFactors.appendChild(li);
        }
        
        // Add market tips based on current price
        addMarketTips(cropType, pricePrediction.predictedPrice, harvestSeason);
    };
    
    // Function to provide market tips
    function addMarketTips(cropType, predictedPrice, season) {
        const priceFactors = document.getElementById('priceFactors');
        
        // Add a heading for market tips
        const tipHeading = document.createElement('li');
        tipHeading.innerHTML = '<strong>Market tip:</strong>';
        priceFactors.appendChild(tipHeading);
        
        // Create market tip based on season and predicted price
        const marketTip = document.createElement('li');
        marketTip.style.marginLeft = '20px';
        
        if (season === 'harvest') {
            marketTip.textContent = 'Consider storing your crop if you have proper storage facilities, as prices typically rise 2-3 months after harvest season.';
        } else if (season === 'offSeason') {
            marketTip.textContent = 'Current off-season prices are typically higher. This may be a good time to sell if you have stored produce.';
        } else if (season === 'preSowing') {
            marketTip.textContent = 'Pre-sowing prices are often higher due to lower supply. If you have stored crops, consider selling now.';
        } else {
            marketTip.textContent = 'Monitor market trends closely and consider selling when prices reach your target level.';
        }
        
        priceFactors.appendChild(marketTip);
        
        // Add government scheme information if available
        const schemeInfo = getGovernmentSchemeInfo(cropType);
        if (schemeInfo) {
            const schemeLi = document.createElement('li');
            schemeLi.innerHTML = `<strong>Government support:</strong> ${schemeInfo}`;
            priceFactors.appendChild(schemeLi);
        }
    }
    
    // Function to provide information about government schemes
    function getGovernmentSchemeInfo(cropType) {
        const schemes = {
            'rice': 'Check MSP (Minimum Support Price) rates announced by the government. Current MSP for common paddy is ₹2,040 per quintal.',
            'wheat': 'Wheat MSP is currently set at ₹2,015 per quintal. Check local procurement centers for government purchasing.',
            'maize': 'MSP for maize is ₹1,850 per quintal. Also explore the PM-AASHA scheme for price support.',
            'sugarcane': 'The Fair and Remunerative Price (FRP) for sugarcane is set by the government. Check with local sugar mills.',
            'pulses': 'Pulses are covered under the Price Stabilization Fund (PSF) and PM-AASHA scheme with MSP support.',
            'oilseeds': 'Oilseeds are eligible for MSP under the PM-AASHA scheme. Check NAFED for procurement opportunities.'
        };
        
        return schemes[cropType] || 'Check with your local agriculture department for current government support schemes applicable to your crop.';
    }
});