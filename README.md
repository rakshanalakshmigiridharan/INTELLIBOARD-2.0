# 🎯 IntelliBoard - AI Analytics Platform

> A modern, AI-powered analytics dashboard with intelligent insights, data cleaning, and predictive modeling.

![IntelliBoard](https://img.shields.io/badge/IntelliBoard-AI%20Analytics-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ecf8e?style=for-the-badge&logo=supabase)

---

## ✨ Features

### 🔐 **Secure Authentication**
- Real email verification via Supabase
- Restricted access (4 authorized emails only)
- Session management with auto-refresh
- Protected routes

### 📊 **Three AI-Powered Modules**

#### 1. **Smart Data Cleaning** 🧹
- Automatic detection of missing values, duplicates, and format issues
- One-click auto-fix functionality
- Real-time data preview
- Visual issue severity indicators

#### 2. **AI Data Insights** 🧠
- Automatic insight generation from uploaded data
- 6 types of insights: Performance, Trends, Anomalies, Opportunities, Seasonal, Retention
- Interactive insight cards with impact levels (High/Medium/Low)
- Trend visualization charts

#### 3. **AI Prediction Model** 🔮
- Forecast future trends (3, 6, or 12 months)
- Confidence interval visualization
- Historical vs predicted data comparison
- AI-generated recommendations

#### 4. **AI Chatbot** 💬
- Interactive Q&A about your uploaded dataset
- Natural language queries for instant insights
- Statistical analysis (averages, min, max, median)
- Anomaly detection and trend analysis
- Dataset summaries and recommendations
- Quick question buttons for common queries

### 📈 **Additional Features**
- CSV file upload and parsing
- Comprehensive reports management
- User settings and preferences
- Modern, responsive design
- Animated loading states
- Interactive charts (Recharts)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or pnpm
- Supabase account (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd intelliboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase** (2 minutes)
   
   Follow the quick setup in [QUICK_REFERENCE.md](./QUICK_REFERENCE.md):
   
   - Go to: https://supabase.com/dashboard/project/esdhxkpqyeyvztcigsuk
   - Enable email confirmation: **Authentication → Providers → Email**
   - Add redirect URL: `http://localhost:3000/verify-email`

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Access the app**
   ```
   http://localhost:3000
   ```

---

## 🔑 Authorized Emails

Only these emails can sign up:
```
ramanilakshmipriya26@gmail.com
rakshanalakshmi.g.cse.2022@snsct.org
ramanesh.k.cse.2022@snsct.org
ravichandran.v.cse.2022@snsct.org
```

---

## 📁 Project Structure

```
/src/app/
├── components/
│   ├── Layout.tsx              # Main layout with sidebar
│   ├── Sidebar.tsx             # Navigation sidebar
│   ├── TopNav.tsx              # Top navigation bar
│   └── ui/                     # Reusable UI components
├── pages/
│   ├── DashboardPage.tsx       # Main dashboard
│   ├── DataCleaningPage.tsx    # Smart data cleaning module
│   ├── AIInsightsPage.tsx      # AI insights generator
│   ├── AIPredictionPage.tsx    # AI prediction model
│   ├── UploadPage.tsx          # CSV upload
│   ├── ReportsPage.tsx         # Reports management
│   ├── SettingsPage.tsx        # User settings
│   ├── LoginPage.tsx           # Authentication
│   └── SignupPage.tsx          # Registration
├── context/
│   └── AuthContext.tsx         # Authentication state
├── lib/
│   └── supabase.ts             # Supabase client
└── App.tsx                     # Main app with routing
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#6366f1)
- **Secondary**: Purple (#8b5cf6)
- **Accents**: Blue, Green, Pink, Orange gradients
- **Background**: Light gray (#f9fafb)

### UI Principles
- ✅ Clean and minimalist
- ✅ Professional analytics aesthetic
- ✅ Soft shadows and rounded corners
- ✅ Gradient accents for AI features
- ✅ Responsive grid layouts
- ✅ Smooth animations

---

## 🔧 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18.3.1 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4.x |
| **Routing** | React Router 7.x |
| **Authentication** | Supabase Auth |
| **Charts** | Recharts |
| **CSV Parsing** | PapaParse |
| **Icons** | Lucide React |
| **UI Components** | Radix UI + shadcn/ui |

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| **[INTELLIBOARD_GUIDE.md](./INTELLIBOARD_GUIDE.md)** | Complete platform guide |
| **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** | 2-minute setup guide |
| **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** | Detailed Supabase configuration |
| **[README_SUPABASE.md](./README_SUPABASE.md)** | Supabase overview |

---

## 🎯 User Flow

### New User Registration
```
1. Visit /signup
2. Enter name, email (authorized), and password
3. Submit form
4. Check email for verification link
5. Click verification link
6. Return to /login
7. Login with credentials
8. Access dashboard
```

### Data Analysis Workflow
```
1. Upload CSV → /upload or /data-cleaning
2. Clean data → /data-cleaning (auto-fix issues)
3. View insights → /ai-insights (automated analysis)
4. Predict trends → /ai-prediction (forecast future)
5. Generate report → /reports (download PDF/CSV)
```

---

## 🎮 Key Pages

### Dashboard (`/dashboard`)
Main overview with analytics summary

### Upload Data (`/upload`)
CSV file upload with preview

### Smart Data Cleaning (`/data-cleaning`)
- Upload CSV
- Detect issues (missing values, duplicates, format)
- Auto-fix with one click
- Preview cleaned data

### AI Data Insights (`/ai-insights`)
- Auto-generate 6 types of insights
- Visual insight cards with impact levels
- Trend and category charts
- Regenerate insights on demand

### AI Prediction Model (`/ai-prediction`)
- Select time range (3, 6, 12 months)
- View historical data
- See predicted trends with confidence intervals
- AI recommendations

### Reports (`/reports`)
- Generate comprehensive reports
- Download in multiple formats
- Filter and search

### Settings (`/settings`)
- Profile management
- Notification preferences
- Security settings
- Data & storage

---

## 🔒 Security Features

✅ Email verification required  
✅ Authorized emails only (4 specific emails)  
✅ Supabase authentication (JWT tokens)  
✅ Protected routes  
✅ Session management  
✅ Password hashing (Supabase handles)  
✅ HTTPS in production  

---

## 🚦 Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Environment Variables
No `.env` file needed! Supabase credentials are in `/utils/supabase/info.tsx`

---

## 📊 Features Breakdown

### Smart Data Cleaning
- ✅ CSV upload
- ✅ Missing value detection
- ✅ Duplicate detection
- ✅ Format issue detection
- ✅ Auto-fix functionality
- ✅ Data preview table
- ✅ Issue severity badges

### AI Insights
- ✅ 6 insight types
- ✅ Impact level classification
- ✅ Interactive cards
- ✅ Trend charts
- ✅ Category analysis
- ✅ Auto-regeneration
- ✅ Animated loading

### AI Prediction
- ✅ 3 time range options
- ✅ Historical visualization
- ✅ Forecast line chart
- ✅ Confidence intervals
- ✅ Growth metrics
- ✅ AI recommendations
- ✅ Upper/lower bounds

---

## 🐛 Troubleshooting

### "Failed to fetch" error
✅ Fixed! Using Supabase now (no backend needed)

### Email not sending
1. Check Supabase dashboard → Authentication → Email Settings
2. Verify email confirmation is enabled
3. Check spam folder

### Login issues
1. Verify email is in authorized list
2. Check email is verified (click link in email)
3. Try password reset if needed

### Need help?
Read [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for instant solutions

---

## 🎉 Success Checklist

After setup, you should have:

- [x] IntelliBoard platform running locally
- [x] Supabase email verification configured
- [x] All 7 pages functional
- [x] Smart Data Cleaning working
- [x] AI Insights generating
- [x] AI Predictions forecasting
- [x] Beautiful modern UI
- [x] Protected routes
- [x] Session management

---

## 📸 Screenshots

### Login Page
Modern authentication with IntelliBoard branding

### Dashboard
Clean overview with navigation sidebar

### Smart Data Cleaning
Upload CSV, detect issues, auto-fix

### AI Data Insights
Colorful insight cards with charts

### AI Prediction
Historical trends + future forecasts

---

## 🤝 Contributing

This is a private project with restricted access. Only authorized emails can use the platform.

---

## 📄 License

Private project - All rights reserved

---

## 🌟 Highlights

🎯 **Modern Design** - Professional analytics dashboard UI  
🧠 **AI-Powered** - Intelligent insights and predictions  
🔐 **Secure** - Real email verification with Supabase  
📊 **Comprehensive** - Complete data analysis workflow  
⚡ **Fast** - Client-side CSV parsing, instant insights  
📱 **Responsive** - Works on mobile, tablet, and desktop  

---

## 🚀 Next Steps

1. **Setup Supabase** - Follow [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
2. **Test signup** - Use an authorized email
3. **Upload CSV** - Try the data cleaning module
4. **Generate insights** - See AI in action
5. **Create predictions** - Forecast future trends

---

**IntelliBoard** - Transforming data into intelligent insights 🚀

*Built with React, TypeScript, Tailwind CSS, and Supabase*