# Render Deployment Checklist

## ✅ Pre-Deployment Checklist

- [x] Project builds successfully (`npm run build`)
- [x] All dependencies are in `package.json`
- [x] `.gitignore` excludes `.env` files
- [x] `render.yaml` created for configuration
- [x] Node.js version specified in `package.json` (>=18.0.0)

## 🚀 Quick Deploy Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Deploy on Render

**Option A: Using render.yaml (Recommended)**
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repo
4. Render will auto-detect `render.yaml`
5. Add `OPENAI_API_KEY` environment variable
6. Deploy!

**Option B: Manual Setup**
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub and select your repo
4. Configure:
   - **Name**: `epicure-chatbot`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add environment variable:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
6. Click "Create Web Service"

### 3. Wait for Build
- First build: ~5-10 minutes
- Subsequent builds: ~2-5 minutes

### 4. Test Your App
- Visit your Render URL (e.g., `https://epicure-chatbot.onrender.com`)
- Test the chatbot functionality

## 📝 Required Environment Variables

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `OPENAI_API_KEY` | `sk-...` | [platform.openai.com](https://platform.openai.com/api-keys) |
| `NODE_ENV` | `production` | Auto-set by Render |

## 🔧 Build Configuration

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18+ (specified in `package.json`)

## 💰 Pricing

- **Free**: $0/month (spins down after 15 min inactivity)
- **Starter**: $7/month (always on, 512MB RAM) ← Recommended
- **Standard**: $25/month (always on, 2GB RAM)

## 🐛 Troubleshooting

**Build fails?**
- Check logs in Render dashboard
- Verify `package.json` has all dependencies
- Ensure Node version is 18+

**App crashes?**
- Verify `OPENAI_API_KEY` is set
- Check logs for error messages
- Ensure API key is valid

**Slow first request?**
- Normal on Free tier (spins down after inactivity)
- Upgrade to Starter for always-on service

## 📚 Full Documentation

See `RENDER_DEPLOYMENT.md` for detailed step-by-step instructions.

