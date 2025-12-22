# Supabase Setup Guide for Pillar Tracking

## Database Tables

You need to create two tables in your Supabase project:

### 1. click_events Table

```sql
CREATE TABLE click_events (
  id BIGSERIAL PRIMARY KEY,
  button_type TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_click_events_button_type ON click_events(button_type);
CREATE INDEX idx_click_events_timestamp ON click_events(timestamp DESC);
```

### 2. quiz_completions Table

```sql
CREATE TABLE quiz_completions (
  id BIGSERIAL PRIMARY KEY,
  score INTEGER NOT NULL,
  percentage NUMERIC(5,2) NOT NULL,
  total_questions INTEGER NOT NULL DEFAULT 10,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_quiz_completions_timestamp ON quiz_completions(timestamp DESC);
```

### 3. admin_sessions Table

```sql
CREATE TABLE admin_sessions (
  id BIGSERIAL PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX idx_admin_sessions_expires_at ON admin_sessions(expires_at);
```

## Environment Variables

Add these to your `.env` file or Vercel environment variables:

```
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these values in your Supabase project settings:
1. Go to your Supabase project dashboard
2. Click on "Settings" → "API"
3. Copy the "Project URL" (SUPABASE_URL)
4. Copy the "anon public" key (SUPABASE_ANON_KEY)

## Row Level Security (RLS)

For security, enable RLS and create policies:

```sql
-- Enable RLS on both tables
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking)
CREATE POLICY "Allow anonymous inserts on click_events"
ON click_events FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on quiz_completions"
ON quiz_completions FOR INSERT
TO anon
WITH CHECK (true);

-- Allow service role to manage admin sessions
CREATE POLICY "Allow all operations on admin_sessions"
ON admin_sessions FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated reads (for dashboard)
CREATE POLICY "Allow authenticated reads on click_events"
ON click_events FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated reads on quiz_completions"
ON quiz_completions FOR SELECT
TO authenticated
USING (true);

-- If you want public read access (less secure but simpler)
CREATE POLICY "Allow public reads on click_events"
ON click_events FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow public reads on quiz_completions"
ON quiz_completions FOR SELECT
TO anon
USING (true);
```

## Installation

Run the following command to install the Supabase client:

```bash
npm install
```

## Benefits of Supabase over Redis

1. **Persistent Storage**: Data is stored permanently in PostgreSQL
2. **Better Querying**: Use SQL for complex analytics
3. **Real-time Updates**: Built-in real-time subscriptions (if needed)
4. **Easier Management**: GUI dashboard for data viewing and management
5. **Scalability**: Automatic scaling and backup
6. **Cost Effective**: Free tier with 500MB storage + 50K monthly active users
7. **No Connection Management**: Simplified client setup

## Migrating Existing Data

If you have existing data in `data/clicks.json`, you can migrate it manually:

1. Export data from your JSON file
2. Use Supabase's SQL editor or API to bulk insert the data
3. Match the timestamps and button types to the new schema

## Next Steps

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Run the SQL commands above in the SQL Editor
4. Add environment variables to your project
5. Run `npm install`
6. Test the tracking functionality
