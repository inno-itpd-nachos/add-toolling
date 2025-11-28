# Sprint 4 Demo Slides

Marp presentation for the Architecture Scoring Tool demo.

## Building the Presentation

### Available Commands

- `npm run build` - Build HTML version (slides.html)
- `npm run build:pdf` - Build PDF version (slides.pdf)
- `npm run build:pptx` - Build PowerPoint version (slides.pptx)
- `npm run build:all` - Build all formats (HTML, PDF, PPTX)
- `npm run preview` - Open live preview in browser

### Usage Examples

```bash
# Build HTML version
npm run build

# Build PDF for printing/sharing
npm run build:pdf

# Build PowerPoint for presentations
npm run build:pptx

# Build all formats at once
npm run build:all

# Preview in browser (auto-reloads on changes)
npm run preview
```

## Files

- `slides.md` - Source markdown file with Marp syntax
- `slides.html` - Generated HTML presentation
- `slides.pdf` - Generated PDF (run `npm run build:pdf`)
- `slides.pptx` - Generated PowerPoint (run `npm run build:pptx`)

## Editing

Edit `slides.md` and rebuild using the commands above. The preview command (`npm run preview`) will automatically reload when you save changes.

