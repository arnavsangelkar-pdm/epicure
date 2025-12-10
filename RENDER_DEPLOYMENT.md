# Render Deployment Guide

This guide will walk you through deploying the Epicure Chatbot to Render.

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com) (free tier available)
3. **OpenAI API Key**: Get one from [platform.openai.com](https://platform.openai.com/api-keys)

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
# If not already done, initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit - Epicure Chatbot"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Create a New Web Service on Render

1. **Log in to Render**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Sign in or create an account

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub account if not already connected
   - Select your repository

3. **Configure the Service**

   **Basic Settings:**
   - **Name**: `epicure-chatbot` (or your preferred name)
   - **Region**: Choose closest to your users (e.g., `Oregon (US West)`)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or `.` if needed)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: 
     - **Free**: For testing (spins down after inactivity)
     - **Starter ($7/month)**: Always on, better for production
     - **Standard ($25/month)**: More resources

   **Environment Variables:**
   Click "Add Environment Variable" and add:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-`)
   - **Key**: `NODE_ENV`
   - **Value**: `production`

4. **Advanced Settings (Optional)**
   - **Health Check Path**: `/` (default)
   - **Auto-Deploy**: `Yes` (deploys on every push to main)

5. **Create Web Service**
   - Click "Create Web Service"
   - Render will start building your application

### 3. Monitor the Build

- Watch the build logs in real-time
- The first build may take 5-10 minutes
- If build fails, check the logs for errors

### 4. Access Your Deployed App

Once the build completes:
- Your app will be available at: `https://epicure-chatbot.onrender.com` (or your custom name)
- The URL will be shown in the Render dashboard

## Troubleshooting

### Build Fails

**Common Issues:**

1. **Missing Dependencies**
   - Check `package.json` has all required packages
   - Ensure `node_modules` is in `.gitignore`

2. **TypeScript Errors**
   - Fix any TypeScript errors locally first
   - Run `npm run build` locally to test

3. **Environment Variables**
   - Make sure `OPENAI_API_KEY` is set in Render dashboard
   - Check it's not in your code (should be in env vars only)

### App Crashes After Deployment

1. **Check Logs**
   - Go to Render dashboard → Your service → Logs
   - Look for error messages

2. **Common Causes:**
   - Missing `OPENAI_API_KEY`
   - Port configuration (Next.js handles this automatically)
   - Memory issues (upgrade plan if needed)

### Free Tier Limitations

- **Spins down after 15 minutes of inactivity**
- First request after spin-down takes ~30 seconds
- Consider upgrading to Starter plan for always-on service

## Updating Your Deployment

### Automatic Updates (Recommended)

If "Auto-Deploy" is enabled:
1. Push changes to your `main` branch
2. Render automatically rebuilds and redeploys

### Manual Updates

1. Go to Render dashboard
2. Click "Manual Deploy"
3. Select branch/commit to deploy

## Custom Domain (Optional)

1. In Render dashboard → Your service → Settings
2. Scroll to "Custom Domains"
3. Add your domain
4. Follow DNS configuration instructions

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key |
| `NODE_ENV` | Yes | Set to `production` |

## Cost Estimation

- **Free Tier**: $0/month (spins down when inactive)
- **Starter**: $7/month (always on, 512MB RAM)
- **Standard**: $25/month (always on, 2GB RAM)

For production use, Starter plan is recommended.

## Security Notes

- ✅ Never commit `.env.local` or API keys to git
- ✅ Use Render's environment variables for secrets
- ✅ Enable HTTPS (automatic on Render)
- ✅ Consider rate limiting for production

## Next Steps

1. Test your deployed app
2. Monitor usage and costs
3. Set up custom domain (optional)
4. Configure monitoring/alerts (optional)

## Support

- Render Docs: [render.com/docs](https://render.com/docs)
- Render Support: [community.render.com](https://community.render.com)

---

**Your app should now be live!** 🎉

Visit your Render URL to test the Epicure Chatbot.

