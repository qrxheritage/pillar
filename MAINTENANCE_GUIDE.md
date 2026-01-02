# 📋 Maintenance Guide - Rumah Penghulu Abu Seman Quiz & Dashboard

Complete guide for stakeholders on maintaining the Quiz application and Admin Dashboard.

---

## 📑 Table of Contents
1. [Admin Credentials & Security](#admin-credentials--security)
2. [Dashboard Features](#dashboard-features)
3. [Quiz Management](#quiz-management)
4. [Content Updates](#content-updates)
5. [Analytics & Data](#analytics--data)
6. [3D Models Management](#3d-models-management)
7. [Troubleshooting](#troubleshooting)
8. [Support & Contact](#support--contact)

---

## 🔐 Admin Credentials & Security

### Dashboard Access
- **Dashboard URL:** `/dashboard.html`
- **Login Page:** `/login.html`
- **Default Username:** `admin`
- **Default Password:** `pillar2024`

### ⚠️ CRITICAL: Change Default Credentials

The default credentials are for initial setup only. **You MUST change them before going live.**

#### How to Change Admin Credentials:

1. Navigate to `api/admin-login.js`
2. Locate lines 1-5:
   ```javascript
   const ADMIN_USERNAME = 'admin';
   const ADMIN_PASSWORD = 'pillar2024';
   ```
3. Replace with your secure credentials:
   ```javascript
   const ADMIN_USERNAME = 'your-new-username';
   const ADMIN_PASSWORD = 'your-secure-password-here';
   ```
4. Save the file
5. Restart the server

#### Password Security Best Practices:
✅ Use at least 12 characters  
✅ Include uppercase letters, lowercase letters, numbers, and symbols  
✅ Avoid common words, dates, or patterns  
✅ Change password every 90 days  
✅ Never share credentials via email or chat  
✅ Store credentials securely (e.g., password manager)

---

## 📊 Dashboard Features

### What the Dashboard Shows

**1. Quiz Button Clicks**
- Number of times visitors clicked "Take the Quiz" button
- Indicates interest level in the quiz

**2. Quiz Completions**
- Number of visitors who fully completed and submitted the quiz
- Shows actual engagement (not just clicks)

**3. Completion Rate**
- Percentage: (Quiz Completed ÷ Quiz Button Clicks) × 100%
- Indicates how many interested visitors actually complete the quiz
- Target: Aim for 50%+ completion rate

**4. Average Score**
- Average score out of 4 points across all completed quizzes
- Shown as: `X.X/4`
- Helps assess knowledge level of participants

**5. Recent Quiz Scores**
- Display of last 10 quiz submissions with:
  - Individual scores (0-4)
  - Percentage achieved
  - Timestamp
  - Visual indicators (🏆, ⭐, 👍, 📚)

### Dashboard Functionality

- **Auto-refresh:** Updates automatically every 30 seconds
- **Manual refresh:** Click "Refresh Data" button for immediate update
- **Last Updated:** Shows timestamp of most recent data
- **Logout:** Securely log out and invalidate session

### Accessing the Dashboard

1. Navigate to `/login.html`
2. Enter username and password
3. Click "Login to Dashboard"
4. View real-time analytics

---

## 🎯 Quiz Management

### Quiz Questions & Answers

#### Location
File: `public/quiz.html`

#### Question Structure
The quiz contains 4 questions about Rumah Penghulu Abu Seman:
- Question 1 - Construction method
- Question 2 - Climatic design principles
- Question 3 - Original location
- Question 4 - Ancient construction technology

The quiz supports **3 languages**: English (en), Malay (ms), and Chinese (zh).

### How to Update Questions

#### Step 1: Locate the Quiz Data

1. Open `public/quiz.html`
2. Search for: `const quizDataMultilang = {`
3. You'll find the quiz data structure organized by language:
   ```javascript
   const quizDataMultilang = {
       en: [ /* English questions */ ],
       ms: [ /* Malay questions */ ],
       zh: [ /* Chinese questions */ ]
   };
   ```

#### Step 2: Update a Question

Each question block has this structure:
```javascript
{
    question: "What is the question text?",
    options: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
    ],
    correct: 0  // Index of correct answer (0, 1, 2, or 3)
}
```

**To update a question:**
1. Find the question in the appropriate language block (en, ms, or zh)
2. Replace the `question` text with your new question
3. Update the `options` array with new answer choices
4. Save and test

#### Step 3: Update Question in All Languages

⚠️ **IMPORTANT:** To maintain consistency, update the same question across all three languages:

**Example: Updating Question 1 in all languages**

English version:
```javascript
{
    question: "Why was the construction method meticulous?",
    options: [...],
    correct: 1
}
```

Malay version (in `ms:` block):
```javascript
{
    question: "Mengapa kaedah pembinaan dianggap teliti?",
    options: [...],
    correct: 1
}
```

Chinese version (in `zh:` block):
```javascript
{
    question: "为什么建造方法被认为是精密的？",
    options: [...],
    correct: 1
}
```

### How to Change Correct Answers

#### Identify Answer Index
The `correct` field uses 0-based indexing for the options array:
- `correct: 0` → Answer A (first option)
- `correct: 1` → Answer B (second option)
- `correct: 2` → Answer C (third option)
- `correct: 3` → Answer D (fourth option)

#### Update Correct Answer

**Before:**
```javascript
{
    question: "Why was the construction method meticulous?",
    options: [
        "It used only bricks and mortar",
        "It allowed the house to be deconstructed and moved",
        "It required advanced machinery",
        "It was built entirely underground"
    ],
    correct: 1  // Currently "It allowed the house to be deconstructed and moved"
}
```

**After (if changing correct answer to option A):**
```javascript
{
    question: "Why was the construction method meticulous?",
    options: [
        "It used only bricks and mortar",
        "It allowed the house to be deconstructed and moved",
        "It required advanced machinery",
        "It was built entirely underground"
    ],
    correct: 0  // Now "It used only bricks and mortar"
}
```

### Example: Complete Question Update

Let's update Question 1 in all three languages:

**English (en):**
```javascript
{
    question: "What architectural feature makes traditional Malay houses special?",
    options: [
        "Underground foundations",
        "Elevated timber construction for ventilation",
        "Reinforced concrete walls",
        "Underground climate control"
    ],
    correct: 1
}
```

**Malay (ms):**
```javascript
{
    question: "Apakah ciri seni bina yang membuat rumah tradisional Melayu istimewa?",
    options: [
        "Asas bawah tanah",
        "Pembinaan kayu tinggi untuk pengudaraan",
        "Dinding konkrit berperkuat",
        "Kawalan iklim bawah tanah"
    ],
    correct: 1
}
```

**Chinese (zh):**
```javascript
{
    question: "什么建筑特征使传统马来房屋与众不同？",
    options: [
        "地下基础",
        "用于通风的抬高木质结构",
        "钢筋混凝土墙",
        "地下气候控制"
    ],
    correct: 1
}
```

### Testing Your Changes

After updating questions:

1. Save the file
2. Refresh the website in your browser
3. Select each language and verify:
   - Questions display correctly
   - All answer options appear
   - Correct answers are marked when you submit
4. Complete a full quiz in each language to ensure functionality

---

## 📝 Content Updates

### Update Frequency Recommendations

| Content | Update Frequency | Priority |
|---------|------------------|----------|
| Quiz Questions | As needed | High |
| Quiz Answers | As needed | High |
| Admin Credentials | Every 90 days | Critical |
| 3D Models | When new versions available | Medium |
| Dashboard Display Text | Quarterly review | Low |

### Main Site Content

**File:** `public/index.html`

- Welcome text
- About Rumah Penghulu Abu Seman information
- Navigation and links
- CTA ("Take the Quiz" button)

To update:
1. Open `public/index.html`
2. Find the text section you want to modify
3. Update HTML content
4. Save file (no server restart needed)

### Login Page Content

**File:** `public/login.html`

- Title: "Admin Login"
- Subtitle: "Access Dashboard Analytics"
- Error messages
- Back link text

To update admin interface text:
1. Open `public/login.html`
2. Locate the text within the HTML structure
3. Update as needed
4. Save file

### Dashboard Content

**File:** `public/dashboard.html`

- Dashboard title and subtitle
- Section descriptions (Quiz Button Clicks, Completion Rate, etc.)
- Information cards explaining metrics

To update:
1. Open `public/dashboard.html`
2. Find the section (search for icon or text)
3. Update the content
4. Save file

---

## 📈 Analytics & Data

### Data Storage Overview

The application uses two storage systems:

| Storage System | Location | Purpose | Status |
|---|---|---|---|
| **Local File** | `data/clicks.json` | Fallback/offline data | Always available |
| **Supabase Database** | Cloud PostgreSQL | Primary production database | When configured |

- **Primary Storage:** `Supabase` (cloud-based PostgreSQL)
- **Fallback Storage:** `data/clicks.json` (local JSON file)
- **Tracks:** Quiz button clicks, quiz starts, quiz completions, and scores with timestamps

### Supabase Database Tables

Supabase provides a managed PostgreSQL database for storing analytics data. Three main tables track different aspects of user interactions:

#### 1. click_events Table

**Purpose:** Tracks all button clicks and quiz interactions

**Table Structure:**
```sql
CREATE TABLE click_events (
  id BIGSERIAL PRIMARY KEY,
  button_type TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Fields:**

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | BIGSERIAL | Unique auto-increment ID | 1, 2, 3, ... |
| `button_type` | TEXT | Type of interaction tracked | `quiz`, `quiz-start` |
| `timestamp` | TIMESTAMPTZ | When the click occurred | `2025-12-18T07:06:26.742Z` |
| `created_at` | TIMESTAMPTZ | Record creation time (auto) | `2025-12-18T07:06:26.742Z` |

**Button Types Tracked:**

| Button Type | Description | When Recorded |
|---|---|---|
| `quiz` | "Take the Quiz" button on homepage | User clicks main quiz button |
| `quiz-start` | Quiz session initiated | User first interacts with a quiz question |
| `quiz-complete` | Quiz submission | User submits all answers |
| `3d-model` | 3D model viewer interaction | User clicks/interacts with 3D model |
| `feedback` | Feedback form submission | User submits feedback about the site |

**Example Data:**
```
| id | button_type | timestamp | created_at |
|----|-------------|-----------|-----------|
| 1 | quiz | 2026-01-02T03:04:53Z | 2026-01-02T03:04:54Z |
| 2 | quiz-start | 2026-01-02T03:04:56Z | 2026-01-02T03:04:56Z |
| 3 | quiz-complete | 2026-01-02T03:05:07Z | 2026-01-02T03:05:07Z |
| 4 | 3d-model | 2026-01-02T04:19:57Z | 2026-01-02T04:19:58Z |
| 5 | feedback | 2026-01-02T03:04:50Z | 2026-01-02T03:04:50Z |
```

#### 2. quiz_completions Table

**Purpose:** Stores detailed quiz submission data with scores

**Table Structure:**
```sql
CREATE TABLE quiz_completions (
  id BIGSERIAL PRIMARY KEY,
  score INTEGER NOT NULL,
  percentage NUMERIC(5,2) NOT NULL,
  total_questions INTEGER NOT NULL DEFAULT 10,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Fields:**

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | BIGSERIAL | Unique submission ID | 1, 2, 3, ... |
| `score` | INTEGER | Number of correct answers | 0, 1, 2, 3, 4 |
| `percentage` | NUMERIC(5,2) | Percentage score | 0.00, 25.00, 50.00, 75.00, 100.00 |
| `total_questions` | INTEGER | Total questions in quiz | 4 |
| `timestamp` | TIMESTAMPTZ | When quiz was submitted | `2025-12-18T07:06:26.742Z` |
| `created_at` | TIMESTAMPTZ | Record creation time (auto) | `2025-12-18T07:06:26.742Z` |

**Example Data:**
```
| id | score | percentage | total_questions | timestamp | created_at |
|----|-------|-----------|-----------------|-----------|-----------|
| 1 | 4 | 100.00 | 4 | 2025-12-18T07:06:26Z | 2025-12-18T07:06:26Z |
| 2 | 2 | 50.00 | 4 | 2025-12-18T07:07:13Z | 2025-12-18T07:07:13Z |
| 3 | 3 | 75.00 | 4 | 2025-12-18T07:08:45Z | 2025-12-18T07:08:45Z |
```

#### 3. admin_sessions Table

**Purpose:** Manages admin login sessions and tokens

**Table Structure:**
```sql
CREATE TABLE admin_sessions (
  id BIGSERIAL PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Fields:**

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | BIGSERIAL | Unique session ID | 1, 2, 3, ... |
| `token` | TEXT | Auth token (unique) | Long random string |
| `username` | TEXT | Admin username | `admin`, `supervisor` |
| `expires_at` | TIMESTAMPTZ | When session expires | `2025-12-18T08:06:26Z` |
| `created_at` | TIMESTAMPTZ | Session creation time | `2025-12-18T07:06:26Z` |

**Example Data:**
```
| id | token | username | expires_at | created_at |
|----|-------|----------|-----------|-----------|
| 1 | eyJhbGc... | admin | 2025-12-18T08:06:26Z | 2025-12-18T07:06:26Z |
| 2 | eyJhbGc... | admin | 2025-12-18T09:15:45Z | 2025-12-18T08:15:45Z |
```

### Database Indexing

For performance, indexes are created on frequently queried fields:

```sql
-- click_events indexes
CREATE INDEX idx_click_events_button_type ON click_events(button_type);
CREATE INDEX idx_click_events_timestamp ON click_events(timestamp DESC);

-- quiz_completions indexes
CREATE INDEX idx_quiz_completions_timestamp ON quiz_completions(timestamp DESC);

-- admin_sessions indexes
CREATE INDEX idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX idx_admin_sessions_expires_at ON admin_sessions(expires_at);
```

These indexes speed up:
- Filtering clicks by type
- Sorting by timestamp (newest first)
- Token lookups for session validation
- Expired session cleanup

### Accessing Supabase Data

#### Through Supabase Dashboard

1. Log in to [supabase.com](https://supabase.com)
2. Select your project
3. Go to **SQL Editor** or **Table Editor**
4. View, query, or manage data directly

#### Through Application APIs

The application provides APIs to retrieve statistics:

**Dashboard API:** `/api/get-stats`
- Returns calculated metrics (quiz clicks, completions, average score)
- Used by admin dashboard
- Requires authentication token

**Track API:** `/api/track-click`
- Receives click and completion events
- Automatically inserts into Supabase tables
- Used by quiz.html when user interacts with quiz

### Common Supabase Queries

**View all quiz submissions:**
```sql
SELECT * FROM quiz_completions 
ORDER BY timestamp DESC 
LIMIT 100;
```

**Get average quiz score:**
```sql
SELECT AVG(percentage) as avg_percentage, AVG(score) as avg_score
FROM quiz_completions;
```

**Count clicks by type:**
```sql
SELECT button_type, COUNT(*) as count
FROM click_events
GROUP BY button_type
ORDER BY count DESC;
```

**Find quiz completions in last 7 days:**
```sql
SELECT * FROM quiz_completions
WHERE timestamp >= NOW() - INTERVAL '7 days'
ORDER BY timestamp DESC;
```

**Get quiz completion rate:**
```sql
SELECT 
  (SELECT COUNT(*) FROM click_events WHERE button_type = 'quiz-complete') as completions,
  (SELECT COUNT(*) FROM click_events WHERE button_type = 'quiz') as clicks,
  ROUND(100.0 * (SELECT COUNT(*) FROM click_events WHERE button_type = 'quiz-complete') / 
        (SELECT COUNT(*) FROM click_events WHERE button_type = 'quiz'), 2) as completion_rate
```

### Supabase Configuration

#### Environment Variables Required

Add these to your `.env` or Vercel environment:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

**How to find these values:**
1. Log into Supabase dashboard
2. Go to **Project Settings** → **API**
3. Copy **Project URL** → `SUPABASE_URL`
4. Copy **anon public** key → `SUPABASE_ANON_KEY`

#### Row Level Security (RLS)

All tables have RLS enabled for security:

| Operation | Who Can | Policy |
|-----------|---------|--------|
| **Insert click_events** | Anyone (anon) | Allow anonymous inserts |
| **Insert quiz_completions** | Anyone (anon) | Allow anonymous inserts |
| **Read click_events** | Authenticated users | Dashboard access only |
| **Read quiz_completions** | Authenticated users | Dashboard access only |
| **Manage sessions** | Service role | Admin token management |

### Troubleshooting Supabase Issues

**Problem:** "Supabase not configured" error
- **Solution:** Check SUPABASE_URL and SUPABASE_ANON_KEY environment variables
- Verify values in Supabase project settings

**Problem:** "Permission denied" when accessing tables
- **Solution:** Check RLS policies are set correctly
- Verify user has proper authentication token

**Problem:** Data not appearing in Supabase but visible in clicks.json
- **Solution:** Click "Refresh Data" on dashboard to sync
- Check if application is using local fallback instead of Supabase

**Problem:** Can't insert data into tables
- **Solution:** Verify RLS allows anonymous inserts
- Check table structure matches schema above
- Review Supabase logs for detailed error

### Data File Structure

The `data/clicks.json` file contains the following information:

```json
{
  "total": 9,
  "buttons": {
    "quiz": 3,
    "quiz-start": 3,
    "quiz-complete": 3
  },
  "history": {
    "quiz": ["timestamp1", "timestamp2", ...],
    "quiz-start": ["timestamp1", "timestamp2", ...],
    "quiz-complete": ["timestamp1", "timestamp2", ...]
  },
  "quizScores": [
    {
      "score": 4,
      "percentage": 100,
      "timestamp": "2025-12-18T07:06:26.742Z"
    },
    {
      "score": 2,
      "percentage": 50,
      "timestamp": "2025-12-18T07:07:13.881Z"
    }
  ]
}
```

### Understanding the Data Format

**Top-level Fields:**

| Field | Description | Example |
|-------|-------------|---------|
| `total` | Total number of interactions across all button types | 9 |
| `buttons` | Count summary for each button type | `{"quiz": 3, "quiz-start": 3, ...}` |
| `history` | Timeline of all interactions with timestamps | Each button type has array of timestamps |
| `quizScores` | Detailed score data for completed quizzes | Array of objects with score, percentage, timestamp |

**Button Types Tracked:**

| Button Type | Meaning | When Tracked |
|-------------|---------|--------------|
| `quiz` | "Take the Quiz" button click | When user clicks the main quiz button on homepage |
| `quiz-start` | Quiz session started | When user first interacts with a question on quiz page |
| `quiz-complete` | Quiz submission | When user submits all answers |

**Quiz Scores Object:**

```json
{
  "score": 3,              // Number of correct answers (0-4)
  "percentage": 75,        // Percentage score (0-100)
  "timestamp": "ISO date"  // When quiz was completed
}
```

### Viewing Raw Data

To examine the quiz database:

1. Open `data/clicks.json` in a text editor
2. Review the structure to understand:
   - **Total Interactions:** The `total` field shows cumulative interactions
   - **Button Breakdown:** The `buttons` object shows counts by type
   - **Timeline:** The `history` object shows when each interaction occurred
   - **Scores:** The `quizScores` array shows individual quiz performances

### Data Interpretation Guide

**Quiz Button Clicks (quiz count)**
- Shows how many times the "Take the Quiz" button was clicked on the homepage
- Located in `buttons.quiz`

**Quiz Starts (quiz-start count)**
- Shows how many visitors actually entered the quiz
- Located in `buttons["quiz-start"]`
- Should be ≤ quiz button clicks

**Quiz Completions (quiz-complete count)**
- Shows how many visitors completed and submitted the quiz
- Located in `buttons["quiz-complete"]`
- Should be ≤ quiz starts

**Score Analysis (quizScores array)**
- Each entry shows: score (0-4), percentage (0-100), and timestamp
- Used to calculate average score on dashboard
- Example: `score: 3, percentage: 75` means 3 correct out of 4 questions

**Calculating Completion Rate:**
```
Completion Rate = (quiz-complete count ÷ quiz button click count) × 100%
Example: If 10 clicked, 5 completed = 50% completion rate
```

**Calculating Average Score:**
```
Average Score = (Sum of all scores) ÷ (Number of completions)
Example: If scores are [4, 2, 3], average = 9 ÷ 3 = 3.0 out of 4
```

### Data Timeline Reference

Each timestamp in the file is in ISO 8601 format:
- Format: `YYYY-MM-DDTHH:MM:SS.sssZ`
- Example: `2025-12-18T07:06:26.742Z` = December 18, 2025 at 7:06:26 AM (UTC)
- The `Z` indicates UTC/GMT timezone

### Editing Quiz Data (Advanced)

⚠️ **WARNING: Only edit if you know what you're doing**

If you need to modify quiz data:

1. **Backup first!** Copy the file before editing
2. Maintain the JSON structure exactly
3. Ensure all timestamps are valid ISO format
4. Verify array and object syntax:
   ```json
   // CORRECT array syntax
   "quizScores": [
     { "score": 4, "percentage": 100, "timestamp": "..." },
     { "score": 3, "percentage": 75, "timestamp": "..." }
   ]

   // WRONG - missing comma
   "quizScores": [
     { "score": 4, "percentage": 100, "timestamp": "..." }
     { "score": 3, "percentage": 75, "timestamp": "..." }
   ]
   ```

### Resetting All Data

⚠️ **CRITICAL WARNING: This will permanently delete all analytics data**

To completely reset the quiz database:

1. Open `data/clicks.json`
2. Replace ALL contents with this template:
   ```json
   {
     "total": 0,
     "buttons": {
       "quiz": 0,
       "quiz-start": 0,
       "quiz-complete": 0
     },
     "history": {
       "quiz": [],
       "quiz-start": [],
       "quiz-complete": []
     },
     "quizScores": []
   }
   ```
3. Save the file
4. Dashboard will show "No data yet" until new submissions
5. Consider if you really need to reset before doing this!

### Regular Data Backups

**Recommended:** Weekly backups of `data/clicks.json`

**Backup Procedure:**

1. Open file manager and navigate to `data/` folder
2. Copy `clicks.json`
3. Rename copy to: `clicks_backup_YYYY-MM-DD.json`
   - Example: `clicks_backup_2026-01-02.json`
4. Store backup in a safe location (external drive, cloud storage)

**Automated Backup Best Practice:**
- Create weekly schedule to copy the file
- Store at least 4 weeks of backups
- Store backups in multiple locations

### Troubleshooting Data Issues

**Problem:** Dashboard shows incorrect numbers
- **Solution:** Click "Refresh Data" button on dashboard
- If still wrong, check `data/clicks.json` for corrupted data

**Problem:** Some quiz submissions missing
- **Solution:** Backups allow you to restore from previous version
- Compare timestamps to identify gap period

**Problem:** Can't open or read data/clicks.json
- **Cause:** File is corrupted or has invalid JSON
- **Solution:** Restore from backup, or reset to template above

**Problem:** Average score not calculating correctly
- **Cause:** Missing or invalid score entries
- **Solution:** Verify all quizScores entries have valid score (0-4) and percentage (0-100)

---

## 🎨 3D Models Management

### Current 3D Models

The application includes interactive 3D models representing the four pillars:

| Model File | Pillar | Purpose |
|------------|--------|---------|
| `cosmos.glb` | Spirituality | Represents cosmic/spiritual connection |
| `fauna.glb` | Community | Represents living creatures/unity |
| `flora.glb` | Nature/Knowledge | Represents growth and learning |
| `geometric.glb` | Tradition | Represents structured foundation |

### Model Format
- **Format:** GLB (GL Transmission Format)
- **Location:** `public/models/` folder
- **File names:** Must be exactly as listed above (case-sensitive)

### How to Update 3D Models

#### Step 1: Prepare Your Model
- Export your 3D model as `.glb` format
- Optimize file size (ideally under 5MB for web)
- Test model in a 3D viewer before uploading

#### Step 2: Replace Model File
1. Navigate to `public/models/` folder
2. Backup existing model (rename with timestamp)
3. Place new model file with exact name:
   - `cosmos.glb`, `fauna.glb`, `flora.glb`, or `geometric.glb`
4. Maintain exact file naming (case-sensitive)

#### Step 3: Verify
1. Refresh the website
2. Check that model displays correctly
3. Verify interaction (rotation, zoom)
4. Test on different devices

#### Example: Update Spirituality Pillar Model

1. Create new 3D model of cosmos
2. Export as `cosmos.glb`
3. Go to `public/models/`
4. Backup: Rename old `cosmos.glb` → `cosmos.glb.backup`
5. Upload new `cosmos.glb`
6. Test on website

### 3D Model Specifications

**Recommended Settings:**
- Resolution: 2K-4K textures
- Polygons: 50K-200K for smooth performance
- Textures: PBR (Physically Based Rendering)
- Scale: Normalized (-1 to 1 range)
- Format: GLB with embedded textures

### Troubleshooting 3D Models

**Problem:** Model doesn't appear
- Check file name is exactly correct (case-sensitive)
- Verify file is in `public/models/` folder
- Ensure file is valid GLB format

**Problem:** Model is very slow
- File may be too large
- Optimize model and re-export
- Reduce texture resolution

**Problem:** Model displays incorrectly (wrong scale/rotation)
- Check model was exported with correct settings
- Verify normalization (-1 to 1 scale)
- Re-export from 3D software

---

## 🌐 Translations & Localization

### Available Languages

The website supports multiple languages:
- **English** (en)
- **Malay** (ms)
- **Chinese** (zh)

### How Language Works

Users can switch languages using the language selector on the main website. The UI automatically translates based on selection.

### Updating Existing Language Translations

If you are not satisfied with current translations or need to correct them:

#### Step 1: Locate Translation Sections

1. Open the relevant HTML file:
   - `public/index.html` - Main site content
   - `public/quiz.html` - Quiz questions and interface text
   - `public/dashboard.html` - Dashboard labels and descriptions

2. Search for language-specific sections (typically organized by language code):
   ```javascript
   // ENGLISH TRANSLATIONS (en)
   // MALAY TRANSLATIONS (ms)
   // CHINESE TRANSLATIONS (zh)
   ```

#### Step 2: Find the Text to Update

Look for translation objects or sections structured like:

```javascript
const translations = {
    en: {
        title: "English Title Here",
        description: "English description...",
        button: "English Button Text"
    },
    ms: {
        title: "Tajuk Bahasa Melayu Di Sini",
        description: "Penerangan Bahasa Melayu...",
        button: "Teks Butang Bahasa Melayu"
    },
    zh: {
        title: "中文标题在这里",
        description: "中文描述...",
        button: "中文按钮文本"
    }
}
```

Or inline HTML comments for each language section:
```html
<!-- ENGLISH VERSION -->
<h1>Quiz About Rumah Penghulu Abu Seman</h1>

<!-- MALAY VERSION (Hidden by default) -->
<h1 style="display:none;">Kuiz Tentang Rumah Penghulu Abu Seman</h1>

<!-- CHINESE VERSION (Hidden by default) -->
<h1 style="display:none;">关于彭亨阿布塞曼房屋的测验</h1>
```

#### Step 3: Update the Translation

1. Find the language code you want to update (en, ms, or zh)
2. Replace the text with your new translation
3. Keep the structure and variable names exactly the same
4. Save the file

#### Step 4: Test the Changes

1. Refresh the website in your browser
2. Switch to the language you updated
3. Verify the new text displays correctly
4. Check formatting and layout (especially for Chinese)

### Example: Updating Malay Quiz Title

**Before:**
```javascript
ms: {
    quizTitle: "Kuiz Tentang Rumah Penghulu Abu Seman"
}
```

**After (if you want to change the wording):**
```javascript
ms: {
    quizTitle: "Ujian Pengetahuan: Rumah Penghulu Abu Seman"
}
```

### Example: Updating Quiz Questions in Different Languages

If quiz questions need translation updates:

1. Open `public/quiz.html`
2. Search for: `<!-- QUIZ QUESTIONS -->`
3. Find the language-specific question text
4. Update the text while keeping the HTML structure intact

**Before (English):**
```html
<div class="question-text">What is the first pillar of Rumah Penghulu Abu Seman?</div>
```

**After:**
```html
<div class="question-text">What is the primary pillar representing spirituality?</div>
```

### Common Translation Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Text not updating | Browser cache | Clear cache or hard refresh (Ctrl+Shift+R) |
| Wrong language showing | Incorrect language code | Verify language code (en, ms, zh) |
| Text overlapping UI | Long translation | Use shorter text or check CSS widths |
| Characters not displaying | Encoding issue | Ensure file is saved as UTF-8 |
| Inconsistent terminology | Multiple translators | Review and standardize all translations |

### Translation Files Location

| File | Content | Languages |
|------|---------|-----------|
| `public/index.html` | Main site content, about section, buttons | en, ms, zh |
| `public/quiz.html` | Quiz questions, answer options, results | en, ms, zh |
| `public/dashboard.html` | Dashboard labels, metric descriptions | en, ms, zh |
| `public/login.html` | Login page text | en, ms, zh (if available) |

### Adding New Language

To add support for a new language (e.g., Spanish/es):

1. Open the HTML file with translations
2. Find the language blocks:
   ```javascript
   const translations = {
       en: { ... },
       ms: { ... },
       zh: { ... }
   }
   ```

3. Add new language code with all required text:
   ```javascript
   const translations = {
       en: { ... },
       ms: { ... },
       zh: { ... },
       es: {
           // Copy all keys from another language
           title: "Spanish Title Here",
           description: "Spanish description...",
           // ... all other keys
       }
   }
   ```

4. Update language selector to include new language:
   ```html
   <select id="languageSelector">
       <option value="en">English</option>
       <option value="ms">Malay</option>
       <option value="zh">中文</option>
       <option value="es">Español</option>
   </select>
   ```

5. Test all pages in the new language

### Translation Best Practices

✅ Keep translations concise and clear  
✅ Maintain consistent terminology across all pages  
✅ Test right-to-left (RTL) languages if adding Arabic/Hebrew  
✅ Verify special characters display correctly  
✅ Update all pages consistently (don't leave some pages in one language)  
✅ Save files as UTF-8 encoding  
✅ Have native speakers review translations  
✅ Test language switching on different browsers  
✅ Document any specialized terminology in translations

---

## 🛠️ Troubleshooting

### Common Issues

#### 1. Dashboard Won't Load
- **Cause:** Login token expired
- **Solution:** 
  1. Clear browser cookies
  2. Log out and log in again
  3. Check browser console for errors

#### 2. Quiz Not Submitting
- **Cause:** Server connection issue or validation error
- **Solution:**
  1. Check internet connection
  2. Verify all questions are answered
  3. Check browser console for errors
  4. Restart server if running locally

#### 3. Dashboard Shows "No Data Yet"
- **Cause:** No quiz submissions recorded
- **Solution:**
  1. Complete the quiz on the website
  2. Submit answers
  3. Wait 30 seconds for auto-refresh
  4. Click "Refresh Data" button

#### 4. Incorrect Completion Rate
- **Cause:** Data calculation issue
- **Solution:**
  1. Click "Refresh Data" to recalculate
  2. Check `data/clicks.json` for corrupted data
  3. Backup and reset if necessary

#### 5. 3D Model Not Showing
- **Cause:** Wrong file name or missing file
- **Solution:**
  1. Verify file name (exactly: cosmos.glb, fauna.glb, flora.glb, geometric.glb)
  2. Check file exists in `public/models/`
  3. Verify GLB format is valid
  4. Try with different browser

### Error Messages

| Message | Meaning | Solution |
|---------|---------|----------|
| "Invalid username or password" | Credentials are wrong | Check spelling, verify credentials in api/admin-login.js |
| "Unable to load analytics data" | Server error or database issue | Check server is running, verify data file exists |
| "Token expired" | Session timeout | Log out and log in again |
| "Unauthorized" | No valid token | Clear cache and log in again |

### Debug Mode

To enable debug logging:
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for error messages and stack traces
4. Report to developer with full console output

---

## 📞 Support & Contact

### Regular Maintenance Checklist

**Weekly:**
- [ ] Verify dashboard is accessible
- [ ] Check if new quiz submissions appear
- [ ] Review completion rate

**Monthly:**
- [ ] Backup analytics data
- [ ] Review quiz questions for accuracy
- [ ] Check for any error messages

**Quarterly:**
- [ ] Update admin credentials
- [ ] Review and update quiz content as needed
- [ ] Verify 3D models display correctly
- [ ] Test on multiple browsers and devices

**Annually:**
- [ ] Comprehensive content review
- [ ] Update 3D models if needed
- [ ] Security audit
- [ ] Performance optimization

### Important Files Reference

| File | Purpose | Edit Frequency |
|------|---------|-----------------|
| `api/admin-login.js` | Admin credentials | Every 90 days |
| `public/quiz.html` | Quiz questions & answers | As needed |
| `public/index.html` | Main website content | Quarterly |
| `public/dashboard.html` | Analytics display | Rarely |
| `data/clicks.json` | Quiz submissions | Automatic |
| `public/models/*.glb` | 3D models | As needed |

### Contact Information

For technical support or questions about maintaining this application:

1. **Server Issues:** Check server logs and console output
2. **Dashboard Access:** Review credentials in ADMIN_CREDENTIALS.md
3. **Quiz Data:** Check data/clicks.json file
4. **Content Updates:** Follow specific guides in this document

### Backup Strategy

**Critical Files to Backup:**
- `api/admin-login.js` (credentials)
- `public/quiz.html` (quiz content)
- `data/clicks.json` (analytics data)
- `public/models/` folder (3D models)

**Backup Frequency:** Weekly minimum

---

## 📱 Quick Reference Card

```
DASHBOARD LOGIN
└─ Username: admin
└─ Password: pillar2024
└─ URL: /login.html

QUIZ UPDATES
├─ Questions: public/quiz.html
├─ Answers: Search for CORRECT_ANSWERS
└─ 3D Models: public/models/ folder

DATA & ANALYTICS
├─ View data: data/clicks.json
├─ Reset data: Clear and save []
└─ Backup: Copy clicks.json weekly

CRITICAL TASKS
├─ Change admin password IMMEDIATELY
├─ Backup data weekly
└─ Monitor completion rate
```

---

## 📄 Version History

**Version 1.0** - January 2, 2026
- Initial maintenance guide
- Dashboard documentation
- Quiz management procedures
- 3D models management guide
- Troubleshooting section

---

*Last Updated: January 2, 2026*  
*For questions or updates, contact the development team.*
