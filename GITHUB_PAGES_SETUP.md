# GitHub Pages Setup for andrewphung.com

## Step 1: Push to GitHub

```bash
cd /Users/andrewphung/Desktop/Portfolio
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in left sidebar)
3. Under "Source", select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Step 3: Set up Custom Domain (andrewphung.com)

1. **In GitHub repository**:
   - Go to Settings → Pages
   - Under "Custom domain", enter: `andrewphung.com`
   - Check "Enforce HTTPS" (after DNS is configured)

2. **GitHub will create a CNAME file** - this is good!

3. **Configure DNS at your domain registrar**:
   
   Add these DNS records:
   
   **For andrewphung.com (root domain):**
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `185.199.108.153`
   - Add 3 more A records with:
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   
   **For www.andrewphung.com:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `YOUR_USERNAME.github.io` (your GitHub username)

4. **Wait for DNS propagation** (can take a few hours)
5. **GitHub will automatically issue SSL certificate**

## That's it!

- Push changes: `git push` → Site updates automatically
- Free hosting forever
- Custom domain works perfectly
- SSL certificate included

## Notes

- The CNAME file GitHub creates must stay in your repo
- Don't delete it or your custom domain will break
- HTTPS will be enabled automatically once DNS propagates

