<<<<<<< HEAD
# Wayanad Problem Platform (`problems.astragecw.tech`)

> A community-driven platform to report, discuss, upvote, and track public infrastructure, environmental, healthcare, and social issues in Wayanad district. Hosted as a subdomain of [astragecw.tech](https://astragecw.tech/).

---

## 🎨 Tech Stack & Architecture

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Design System**: Styled to match `astragecw.tech`'s dark cyber aesthetic (`bg-zinc-950`, `bg-black`, cyan/emerald/teal gradients, glassmorphism, JetBrains Mono typography).
- **Backend & API**: Next.js App Router API Routes (`/api/problems`, `/api/problems/[id]`, `/api/problems/[id]/upvote`, `/api/problems/[id]/comments`, `/api/upload`, `/api/stats`).
- **Database**: SQLite with Prisma ORM (`prisma/schema.prisma`).

---

## 🚀 Quick Start (Local Development)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Initialize & Seed Database**:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 🌐 Publishing to `problems.astragecw.tech`

### Method 1: Deploying to Vercel (Recommended & Free)

1. Push this repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Wayanad Problem Platform"
   git remote add origin git@github.com:YOUR_USERNAME/wayanad-problems.git
   git push -u origin main
   ```

2. Go to [Vercel](https://vercel.com/) → **Add New Project** → Import `wayanad-problems`.

3. In Vercel Project Settings → **Domains**:
   - Add custom domain: `problems.astragecw.tech`

4. Log into your domain registrar / DNS provider for `astragecw.tech` (e.g. Cloudflare / GoDaddy / Namecheap):
   - Add a new **CNAME Record**:
     - **Name/Host**: `problems`
     - **Target/Value**: `cname.vercel-dns.com`
     - **TTL**: Auto / 300s

Vercel will automatically provision SSL certificates and your site will be live at `https://problems.astragecw.tech`!

---

### Method 2: Self-Hosting on VPS (Ubuntu / Nginx + PM2)

1. Clone repo to server & install dependencies:
   ```bash
   git clone git@github.com:YOUR_USERNAME/wayanad-problems.git
   cd wayanad-problems
   npm install
   npx prisma db push
   npx tsx prisma/seed.ts
   npm run build
   ```

2. Start with PM2 process manager:
   ```bash
   pm2 start npm --name "wayanad-problems" -- start
   ```

3. Configure Nginx (`/etc/nginx/sites-available/problems.astragecw.tech`):
   ```nginx
   server {
       listen 80;
       server_name problems.astragecw.tech;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. Enable site & SSL:
   ```bash
   sudo ln -s /etc/nginx/sites-available/problems.astragecw.tech /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d problems.astragecw.tech
   ```

---

## 🛠️ Project Structure

```
wayanad-problems/
├── prisma/
│   ├── schema.prisma       # Database models (Problem, Comment)
│   ├── dev.db              # SQLite Database
│   └── seed.ts             # Sample Wayanad problems seed data
├── src/
│   ├── app/
│   │   ├── globals.css     # Design tokens & custom CSS keyframes
│   │   ├── layout.tsx      # App shell with dark theme
│   │   ├── page.tsx        # Homepage hero & recent issues feed
│   │   ├── problems/       # Browse all problems & problem detail page
│   │   ├── submit/         # Report a problem form page
│   │   └── api/            # API handlers for CRUD, upvotes & uploads
│   ├── components/         # Reusable UI components (Header, Footer, ProblemCard, etc.)
│   └── lib/                # Prisma client & category configurations
```
=======
# wayanad-problems
"A community-driven web platform to report, discuss, upvote, and track public issues across Wayanad district (problems.astragecw.tech)."
>>>>>>> 1c281602d472d381a385ba65b7ed89e74d0d2883
