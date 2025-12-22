import { createClient } from '@supabase/supabase-js';

let supabase = null;

export function getSupabaseClient() {
  if (supabase) return supabase;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase not configured!');
    console.error('Missing environment variables:');
    console.error('- SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
    console.error('- SUPABASE_ANON_KEY:', supabaseKey ? '✓ Set' : '✗ Missing');
    return null;
  }

  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized successfully');
    return supabase;
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err);
    return null;
  }
}

// Track a button click event
export async function trackClick(buttonType, additionalData = {}) {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('click_events')
      .insert([
        {
          button_type: buttonType,
          timestamp: new Date().toISOString(),
          ...additionalData
        }
      ])
      .select();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error tracking click:', err);
    throw err;
  }
}

// Track a quiz completion
export async function trackQuizCompletion(score, percentage, totalQuestions) {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('quiz_completions')
      .insert([
        {
          score,
          percentage,
          total_questions: totalQuestions,
          timestamp: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error tracking quiz completion:', err);
    throw err;
  }
}

// Get click statistics
export async function getClickStats() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    // Get total clicks by button type
    const { data: clicks, error: clicksError } = await client
      .from('click_events')
      .select('button_type');

    if (clicksError) throw clicksError;

    // Count by button type
    const buttonCounts = {};
    let total = 0;
    clicks.forEach(click => {
      buttonCounts[click.button_type] = (buttonCounts[click.button_type] || 0) + 1;
      total++;
    });

    return {
      total,
      buttons: buttonCounts
    };
  } catch (err) {
    console.error('Error getting click stats:', err);
    throw err;
  }
}

// Get quiz statistics
export async function getQuizStats() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data: completions, error } = await client
      .from('quiz_completions')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;

    // Calculate statistics
    const totalAttempts = completions.length;
    let totalScore = 0;
    let totalPercentage = 0;

    completions.forEach(completion => {
      totalScore += completion.score;
      totalPercentage += completion.percentage;
    });

    const averageScore = totalAttempts > 0 ? (totalScore / totalAttempts).toFixed(2) : 0;
    const averagePercentage = totalAttempts > 0 ? (totalPercentage / totalAttempts).toFixed(2) : 0;

    return {
      totalAttempts,
      averageScore,
      averagePercentage,
      recentScores: completions.slice(0, 10) // Last 10 scores
    };
  } catch (err) {
    console.error('Error getting quiz stats:', err);
    throw err;
  }
}
