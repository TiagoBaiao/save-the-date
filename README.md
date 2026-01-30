# Wedding Website - Eleanor & Thomas

An elegant, mobile-responsive wedding website built with HTML, CSS, and JavaScript, designed to be hosted on GitHub Pages.

## Features

### Interactive Envelope Animation
- The website opens with an interactive envelope that users can click
- Smooth opening animation reveals the main wedding content
- Already implemented and integrated

### Main Website (index.html)
- **Hero Section**: Features couple names, placeholder image, and RSVP button
- **Event Details**: Date, venue location, and reception information
- **Schedule**: Timeline of events throughout the wedding day
- **Accommodation**: Recommended hotels near the venue with contact information
- **Elegant Design**: Olive green and white color palette with sophisticated typography

### RSVP Form (rsvp.html)
- Individual or group/family RSVP submission toggle
- Dynamic form fields that allow adding/removing guests
- For each guest:
  - First and last name (required)
  - Attendance status (attending/not sure/declined)
  - Dietary restrictions with custom "Other" option
  - Food allergies/intolerances
  - Additional comments
- Form validation
- Submits to configurable endpoint (currently set to example.com)

### Response Pages
- **Confirmation Page**: Warm thank you message with link back to homepage
- **Failure Page**: Considerate error message with link to retry RSVP form

## Design Details

### Color Palette
- Primary: Olive Green (#8B9D83)
- Secondary: Dark Olive (#6B7D63)
- Accent: Light Olive (#A8B99F)
- Base: White (#FFFFFF) and Off-white (#FAFAFA)

### Typography
- Headings: Cormorant Garamond (serif)
- Body: Montserrat (sans-serif)

### Mobile Responsiveness
- Fully responsive design
- Breakpoints at 768px and 480px
- Optimized for mobile, tablet, and desktop viewing

## File Structure

```
save-the-date/
├── index.html              # Main wedding website
├── rsvp.html              # RSVP form page
├── confirmation.html      # Success message page
├── failure.html          # Error message page
├── css/
│   ├── styles.css        # Main website styles
│   ├── rsvp-styles.css   # RSVP form styles
│   └── message-styles.css # Confirmation/failure page styles
├── js/
│   ├── script.js         # Envelope animation logic
│   └── rsvp.js          # RSVP form functionality
└── images/
    └── couple-placeholder.png # Placeholder couple image
```

## Setup Instructions

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. No build process or dependencies required!

### Customization

#### Replace Placeholder Image
Replace `images/couple-placeholder.png` with your actual couple photo (recommended size: 1200x800px)

#### Update Content
Edit `index.html` to update:
- Couple names (line 23)
- Wedding date and venue details (lines 29-48)
- Event schedule (lines 54-86)
- Accommodation information (lines 94-120)

#### Configure RSVP Backend
Update the form submission endpoint in `js/rsvp.js` (line 147):
```javascript
const response = await fetch('https://your-backend-endpoint.com', {
```

### Deployment to GitHub Pages

1. Push the repository to GitHub
2. Go to repository Settings → Pages
3. Select the branch (usually `main`) and root folder
4. Save and wait for deployment
5. Your site will be available at `https://yourusername.github.io/repository-name/`

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- IE11 and older browsers are not supported

## Future Enhancements

- [ ] Add photo gallery section
- [ ] Include wedding registry links
- [ ] Add countdown timer to wedding date
- [ ] Integrate with Google Maps for venue location
- [ ] Add animations on scroll

## License

This project is free to use for personal wedding websites.

---

Made with ❤️ for Eleanor & Thomas's special day

