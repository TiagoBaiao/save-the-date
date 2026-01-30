# Quick Start Guide

## 🎉 Your Wedding Website is Ready!

Follow these simple steps to get your website up and running.

---

## Step 1: View Your Website Locally

Open the website in your browser:

```bash
# Navigate to the project folder
cd /Users/tbt7214/Development/save-the-date

# Open in your default browser
open index.html
```

Or simply double-click `index.html` in Finder.

---

## Step 2: Test the Features

### Test the Envelope Animation
1. Click on the envelope
2. Watch it open with animation
3. See the main website appear

### Test the RSVP Form
1. Click the "RSVP" button on the main page
2. Try filling out the form for a single guest
3. Toggle "Submit as a group/family"
4. Click "+ Add Another Guest"
5. Try the dietary restrictions dropdown
6. Select "Other" and watch the custom field appear

**Note:** Form submission will fail since the backend isn't set up yet (this is expected).

---

## Step 3: Customize Your Content

### Update Couple Names
Edit `index.html`, line 23:
```html
<h1 class="couple-names">Your Names Here</h1>
```

### Update Wedding Details
Edit `index.html`, lines 29-48:
- Date and time
- Venue name and address
- Reception details

### Update Schedule
Edit `index.html`, lines 54-86:
- Modify times and events as needed
- Add or remove timeline items

### Update Hotels
Edit `index.html`, lines 94-120:
- Replace with actual hotels near your venue
- Update addresses and phone numbers

---

## Step 4: Add Your Photo

1. Get your couple photo ready (recommended: 1200x800px)
2. Name it something like `couple-photo.jpg` or `couple-photo.png`
3. Place it in the `images/` folder
4. Update `index.html`, line 24:
   ```html
   <img src="images/couple-photo.jpg" alt="Your Names">
   ```

---

## Step 5: Set Up RSVP Backend (Later)

When you're ready to accept real RSVPs:

1. Create a backend endpoint that accepts POST requests
2. Edit `js/rsvp.js`, line 147:
   ```javascript
   const response = await fetch('https://your-backend-url.com/rsvp', {
   ```
3. Make sure your backend returns HTTP 200 for success

---

## Step 6: Deploy to GitHub Pages

### First Time Setup

1. **Create a GitHub repository**
   ```bash
   # If not already a git repo
   git init
   git add .
   git commit -m "Initial wedding website"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/wedding-website.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings"
   - Scroll to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Wait a few minutes

4. **Access your live site**
   - Your site will be at: `https://yourusername.github.io/wedding-website/`

### Update Your Live Site

After making changes:
```bash
git add .
git commit -m "Update wedding details"
git push
```

Changes appear live in a few minutes!

---

## Step 7: Share with Guests

Once your site is live, share the URL:
- Include it in your save-the-date cards
- Add it to your wedding invitations
- Share on social media
- Send via email

---

## Troubleshooting

### Envelope doesn't open
- Check browser console for JavaScript errors
- Make sure `js/script.js` is loaded correctly

### RSVP form doesn't submit
- This is expected until you set up a backend
- Check `js/rsvp.js` for the endpoint URL

### Styles don't load
- Make sure all CSS files are in the `css/` folder
- Check that file paths in HTML are correct

### Image doesn't show
- Verify the image exists in `images/` folder
- Check the filename matches exactly (case-sensitive)
- Check browser console for 404 errors

### Site looks broken on mobile
- Test in Chrome DevTools mobile view
- Clear browser cache
- Check if CSS files are loading

---

## Need Help?

### File Structure Overview
```
save-the-date/
├── index.html          ← Main website
├── rsvp.html          ← RSVP form
├── confirmation.html  ← Success page
├── failure.html       ← Error page
├── css/               ← All stylesheets
├── js/                ← All JavaScript
└── images/            ← Your photos
```

### Documentation Files
- **README.md** - Full project documentation
- **TESTING.md** - Testing checklist
- **IMPLEMENTATION_SUMMARY.md** - Technical details
- **QUICK_START.md** - This guide

---

## Customization Tips

### Change Colors
Edit `css/styles.css` and `css/rsvp-styles.css`:
```css
:root {
    --olive-green: #8B9D83;  /* Change this */
    --dark-olive: #6B7D63;   /* And this */
}
```

### Change Fonts
Edit the `@import` line in CSS files:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont...');
```

### Add More Sections
Edit `index.html` and add new sections between existing ones:
```html
<section class="section your-section">
    <div class="section-content">
        <h2 class="section-title">Section Title</h2>
        <div class="divider"></div>
        <!-- Your content -->
    </div>
</section>
```

---

## What's Next?

✅ Website is built and ready
✅ Envelope animation works
✅ RSVP form is functional
✅ Mobile responsive

**Your tasks:**
1. [ ] Review and test the website
2. [ ] Customize content with your details
3. [ ] Add your couple photo
4. [ ] Set up backend for RSVP (when ready)
5. [ ] Deploy to GitHub Pages
6. [ ] Share with your guests!

---

**Congratulations! Your wedding website is complete!** 🎊

Enjoy your special day! 💑

