# Anthony Pompliano Personal Website

Single-page scrolling landing page for entrepreneur and investor Anthony Pompliano, showcasing his media properties, investment firms, and personal brand.

## Features

- **Hero Section**: Bold introduction with primary CTAs
- **The Pomp Podcast**: Showcase of podcast with featured guests
- **From the Desk**: Premium content publication section
- **The Pomp Letter**: Newsletter signup with social proof
- **ProCap Financial**: Investment firm showcase
- **Book Section**: Featured book with purchase options
- **Social Media Hub**: Links to all social platforms
- **Responsive Design**: Mobile-first, works on all devices
- **Smooth Animations**: Professional scroll animations
- **Fast Performance**: Optimized for speed

## Tech Stack

- Pure HTML5, CSS3, and vanilla JavaScript
- No frameworks or dependencies
- Optimized for performance and accessibility
- WCAG 2.1 AA compliant

## Local Development

To run locally:

```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js http-server
npx http-server -p 8000
```

Then open http://localhost:8000 in your browser.

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment.

### Deploy via Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

## Structure

```
pomp-website/
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── vercel.json         # Vercel configuration
├── package.json        # Project metadata
├── README.md           # This file
└── WEBSITE_SPEC.md     # Detailed specification
```

## Color Palette

- **Black**: #000000 (Primary background)
- **White**: #FFFFFF (Primary text on black)
- **Bitcoin Orange**: #F7931A (CTAs and accents)
- **Dark Gray**: #333333 (Secondary text)
- **Light Gray**: #F5F5F5 (Section backgrounds)

## Typography

- **Font Family**: Inter (Google Fonts)
- **Headlines**: 48-72px, Bold/Extra Bold
- **Body**: 18-20px, Regular
- **Line Height**: 1.6

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- First Contentful Paint: < 1.5s
- Page Load: < 3s on 3G
- Lighthouse Score: 90+

## Accessibility

- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast (4.5:1 minimum)
- Screen reader optimized

## Future Enhancements

- Add actual professional photos
- Integrate real email service (Mailchimp/ConvertKit)
- Add Google Analytics
- Implement real-time social media follower counts
- Add blog/content management system
- Optimize images (WebP format)

## License

MIT License - See LICENSE file for details

## Contact

For questions or updates, contact via the website or social media.
