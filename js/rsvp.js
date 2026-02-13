// RSVP Form JavaScript
let guestCount = 1;

// Get DOM elements
const groupToggle = document.getElementById('groupToggle');
const addGuestContainer = document.getElementById('addGuestContainer');
const addGuestBtn = document.getElementById('addGuestBtn');
const guestsContainer = document.getElementById('guestsContainer');
const rsvpForm = document.getElementById('rsvpForm');

// Toggle group mode
groupToggle.addEventListener('change', function() {
    if (this.checked) {
        addGuestContainer.style.display = 'block';
    } else {
        addGuestContainer.style.display = 'none';
        // Remove all guests except the first one
        const guestCards = document.querySelectorAll('.guest-card');
        for (let i = 1; i < guestCards.length; i++) {
            guestCards[i].remove();
        }
        guestCount = 1;
    }
});

// Add guest functionality
addGuestBtn.addEventListener('click', function() {
    const guestCard = createGuestCard(guestCount);
    guestsContainer.insertAdjacentHTML('beforeend', guestCard);
    guestCount++;

    // Add event listeners to the new guest card
    attachGuestCardListeners();
});

// Create guest card HTML
function createGuestCard(index) {
    return `
        <div class="guest-card" data-guest-index="${index}">
            <div class="guest-header">
                <h3>Guest ${index + 1}</h3>
                <button type="button" class="btn-remove-guest" onclick="removeGuest(${index})">
                    Remove
                </button>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="firstName_${index}">First Name *</label>
                    <input type="text" id="firstName_${index}" name="firstName_${index}" required>
                </div>
                <div class="form-group">
                    <label for="lastName_${index}">Last Name *</label>
                    <input type="text" id="lastName_${index}" name="lastName_${index}" required>
                </div>
            </div>

            <div class="form-group">
                <label for="attendance_${index}">Attendance *</label>
                <select id="attendance_${index}" name="attendance_${index}" required>
                    <option value="" disabled selected>Please select...</option>
                    <option value="true">Joyfully accepts</option>
                    <option value="false">Regretfully declines</option>
                </select>
            </div>

            <div class="form-group">
                <label for="dietary_${index}">Dietary Restrictions</label>
                <select id="dietary_${index}" name="dietary_${index}" class="dietary-select">
                    <option value="none">None</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="gluten-free">Gluten-free</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="form-group dietary-other" id="dietaryOther_${index}" style="display: none;">
                <label for="dietaryCustom_${index}">Please specify</label>
                <input type="text" id="dietaryCustom_${index}" name="dietaryCustom_${index}" placeholder="Please specify your dietary restriction">
            </div>

            <div class="form-group">
                <label for="allergies_${index}">Food Allergies/Intolerances</label>
                <textarea id="allergies_${index}" name="allergies_${index}" rows="3" placeholder="Please list any food allergies or intolerances"></textarea>
            </div>

            <div class="form-group">
                <label for="observations_${index}">Additional Comments</label>
                <textarea id="observations_${index}" name="observations_${index}" rows="3" placeholder="Any special requests or notes you'd like to share"></textarea>
            </div>
        </div>
    `;
}

// Remove guest functionality
function removeGuest(index) {
    const guestCard = document.querySelector(`[data-guest-index="${index}"]`);
    if (guestCard) {
        guestCard.remove();
    }
}

// Attach event listeners to dietary selects
function attachGuestCardListeners() {
    const dietarySelects = document.querySelectorAll('.dietary-select');
    dietarySelects.forEach(select => {
        select.removeEventListener('change', handleDietaryChange);
        select.addEventListener('change', handleDietaryChange);
    });
}

// Handle dietary restriction change
function handleDietaryChange(event) {
    const select = event.target;
    const index = select.id.split('_')[1];
    const otherField = document.getElementById(`dietaryOther_${index}`);

    if (select.value === 'other') {
        otherField.style.display = 'block';
        document.getElementById(`dietaryCustom_${index}`).required = true;
    } else {
        otherField.style.display = 'none';
        document.getElementById(`dietaryCustom_${index}`).required = false;
    }
}

// Initialize dietary select listeners
attachGuestCardListeners();

// Form submission
rsvpForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const submitBtn = this.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Collect form data
    const formData = new FormData(this);
    const data = {
        guests: []
    };

    // Process each guest
    const guestCards = document.querySelectorAll('.guest-card');
    guestCards.forEach((card) => {
        const index = card.getAttribute('data-guest-index');
        const guest = {
            firstName: (formData.get(`firstName_${index}`) || '').trim(),
            lastName: (formData.get(`lastName_${index}`) || '').trim(),
            going: formData.get(`attendance_${index}`) === 'true'
        };

        data.guests.push(guest);
    });

    try {
        // Submit to the backend
        const response = await fetch('https://back4app-proxy.vercel.app/api/proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            referrer: 'https://tiagobaiao.github.io/save-the-date/rsvp.html',
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: JSON.stringify(data)
        });

        if (response.ok || response.status === 200) {
            // Success - redirect to confirmation page
            window.location.href = 'confirmation.html';
        } else {
            // Failure - redirect to failure page
            window.location.href = 'failure.html';
        }
    } catch (error) {
        // Network error or other failure - redirect to failure page
        console.error('Error submitting form:', error);
        window.location.href = 'failure.html';
    }
});
