# Deployment Guide for andrewphung.com

## Step 1: Push to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   cd /Users/andrewphung/Desktop/Portfolio
   git init
   git add .
   git commit -m "Initial portfolio website"
   ```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it something like `portfolio` or `andrewphung-portfolio`
   - Don't initialize with README (you already have files)
   - Click "Create repository"

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

1. **Sign up/Login to Vercel**:
   - Go to https://vercel.com
   - Sign up with your GitHub account (recommended for easy integration)

2. **Import your project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Vercel will auto-detect it's a static site

3. **Configure deployment**:
   - **Framework Preset**: Other (or leave as default)
   - **Root Directory**: `./` (root)
   - **Build Command**: Leave empty (no build needed for static site)
   - **Output Directory**: Leave empty (serves from root)
   - Click "Deploy"

4. **Wait for deployment**:
   - Vercel will deploy your site
   - You'll get a URL like `your-project.vercel.app`

## Step 3: Set up Custom Domain (andrewphung.com)

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Click "Add Domain"
   - Enter: `andrewphung.com`
   - Also add: `www.andrewphung.com` (optional but recommended)

2. **Configure DNS** (at your domain registrar):
   
   You need to add these DNS records at your domain registrar (where you bought andrewphung.com):
   
   **For andrewphung.com:**
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)
   
   **For www.andrewphung.com:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com` (or the CNAME Vercel provides)
   
   **OR use Vercel's nameservers** (easier):
   - Vercel will provide nameservers like `ns1.vercel-dns.com`, `ns2.vercel-dns.com`
   - Update nameservers at your domain registrar to point to Vercel's nameservers

3. **Wait for DNS propagation**:
   - Can take a few minutes to 48 hours
   - Vercel will automatically issue SSL certificate once DNS is configured

## Step 4: Verify Everything Works

1. Check your site at `https://andrewphung.com`
2. Test all links and functionality
3. Make sure images load correctly
4. Test on mobile devices

## Future Updates

- Just push to GitHub: `git push`
- Vercel automatically deploys on every push
- Updates go live in ~1-2 minutes

## Important Notes

- **Keep your repository public** (or add Vercel as collaborator if private)
- **All image paths are relative** - they'll work on Vercel
- **PDF files** will work fine (scooter-slides.pdf)
- **No server-side code needed** - perfect for static sites

## Alternative: GitHub Pages (if you prefer)

If you want to use GitHub Pages instead:

1. Go to repository Settings → Pages
2. Select source branch (main)
3. Custom domain: `andrewphung.com`
4. Add CNAME file with `andrewphung.com`
5. Configure DNS at your registrar

**But Vercel is recommended** for better performance and easier custom domain setup.

