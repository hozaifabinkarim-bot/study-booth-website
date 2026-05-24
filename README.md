# Study Booth Portfolio Website

This is a complete React + TypeScript + Vite website for **Study Booth**. It is ready to upload to GitHub and deploy for free on Netlify or Vercel.

## What is included

- React TypeScript single-page website
- Study Booth branding
- Vite project setup
- SEO-friendly `index.html`
- Netlify deployment configuration
- GitHub-ready folder structure

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal, usually:

```text
http://localhost:5173/
```

## Build for production

```bash
npm run build
```

The production files will be created inside the `dist` folder.

## Deploy on Netlify

### Easy method

1. Run `npm install`
2. Run `npm run build`
3. Go to Netlify
4. Choose **Add new site**
5. Choose **Deploy manually**
6. Drag and drop the `dist` folder

### GitHub method

1. Upload this full project folder to GitHub
2. Connect the GitHub repository to Netlify
3. Use these settings:

```text
Build command: npm run build
Publish directory: dist
```

## Deploy on Vercel

1. Upload this full project folder to GitHub
2. Import the repository into Vercel
3. Vercel should auto-detect Vite
4. Use these settings if needed:

```text
Framework: Vite
Build command: npm run build
Output directory: dist
```

## Recommended repository name

```text
study-booth-website
```

## Suggested free live URL

```text
study-booth.netlify.app
```

or

```text
study-booth.vercel.app
```
