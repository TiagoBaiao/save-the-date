# Testing Guide

## Manual Testing Checklist

### 1. Envelope Animation (index.html)
- [ ] Page loads with envelope visible
- [ ] Envelope has hover effect (scales up slightly)
- [ ] Clicking envelope triggers opening animation
- [ ] Seal rotates and fades out
- [ ] Flap opens smoothly
- [ ] Envelope fades out after animation
- [ ] Main website content appears with white background

### 2. Main Website Content
- [ ] Hero section displays with couple names "Eleanor & Thomas"
- [ ] Placeholder image loads correctly
- [ ] RSVP button is visible and styled correctly
- [ ] Event details section shows date, venue, and reception info
- [ ] Schedule timeline displays all 5 events with proper formatting
- [ ] Accommodation section shows 3 hotel cards
- [ ] Footer displays with olive green background

### 3. Responsive Design
**Desktop (>768px)**
- [ ] All sections display in multi-column layouts
- [ ] Timeline has side-by-side time and content
- [ ] Hotel cards display in grid (up to 3 columns)

**Tablet (768px)**
- [ ] Sections adjust to single column where appropriate
- [ ] Timeline maintains readable format
- [ ] Hotel cards stack appropriately

**Mobile (480px)**
- [ ] All text is readable
- [ ] Buttons are easily tappable
- [ ] Timeline displays vertically
- [ ] No horizontal scrolling

### 4. RSVP Form (rsvp.html)
**Initial State**
- [ ] Form loads with olive green header
- [ ] Single guest form is visible
- [ ] Individual/Group toggle is present and unchecked
- [ ] Add guest button is hidden
- [ ] All required fields are marked with *

**Individual Mode**
- [ ] Can fill out single guest information
- [ ] Dietary dropdown works correctly
- [ ] Selecting "Other" in dietary shows custom input field
- [ ] Selecting any other option hides custom input
- [ ] All fields accept input correctly

**Group Mode**
- [ ] Toggle shows "Add Another Guest" button
- [ ] Clicking + button adds new guest card
- [ ] Each guest card is numbered (Guest 1, Guest 2, etc.)
- [ ] Each guest card has a "Remove" button (except possibly first)
- [ ] Remove button deletes the guest card
- [ ] Dietary "Other" option works for each guest independently

**Form Validation**
- [ ] Submit button is present
- [ ] Required fields (First Name, Last Name, Attendance) are enforced
- [ ] Cannot submit without filling required fields
- [ ] Custom dietary field is required when "Other" is selected

**Form Submission**
- [ ] Clicking submit changes button text to "Submitting..."
- [ ] Button is disabled during submission
- [ ] On success (200 OK), redirects to confirmation.html
- [ ] On failure (non-200), redirects to failure.html
- [ ] On network error, redirects to failure.html

### 5. Confirmation Page (confirmation.html)
- [ ] Green checkmark icon displays
- [ ] "Thank You!" heading is visible
- [ ] Welcoming message displays
- [ ] Olive green divider shows
- [ ] "Return to Wedding Website" button is present
- [ ] Button links back to index.html
- [ ] Button has hover effect
- [ ] Page is mobile responsive

### 6. Failure Page (failure.html)
- [ ] Red X icon displays
- [ ] "Oops!" heading is visible
- [ ] Considerate error message displays
- [ ] Olive green divider shows
- [ ] "Try Again" button is present
- [ ] Button links back to rsvp.html
- [ ] Button has hover effect
- [ ] Page is mobile responsive

### 7. Navigation
- [ ] RSVP button on main page opens rsvp.html in new tab
- [ ] Back link on RSVP form returns to index.html
- [ ] Confirmation page button returns to index.html
- [ ] Failure page button returns to rsvp.html

### 8. Cross-Browser Testing
Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 9. Accessibility
- [ ] All images have alt text
- [ ] Form labels are associated with inputs
- [ ] Sufficient color contrast
- [ ] Keyboard navigation works
- [ ] Focus states are visible

### 10. Performance
- [ ] Page loads quickly
- [ ] Images are optimized
- [ ] No console errors
- [ ] Animations are smooth
- [ ] No layout shift on load

## Known Issues / Limitations

1. **RSVP Endpoint**: Currently points to example.com - needs to be updated with actual backend URL
2. **Placeholder Image**: Generic placeholder - replace with actual couple photo
3. **Sample Data**: Event details, venue, and hotels are placeholder content
4. **Form Persistence**: Form data is not saved locally (refreshing loses data)
5. **Network-Only Submission**: No offline support or retry mechanism

## Future Testing Considerations

- Load testing with high traffic
- Backend integration testing
- Email notification testing (when backend is implemented)
- Data validation on server side
- GDPR/privacy compliance
- Analytics integration testing

