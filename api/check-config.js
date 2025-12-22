// Diagnostic endpoint to check configuration
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const config = {
    supabase: {
      url: process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing',
      anonKey: process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'
    },
    admin: {
      username: process.env.ADMIN_USERNAME ? '✅ Set' : '❌ Missing',
      password: process.env.ADMIN_PASSWORD ? '✅ Set' : '❌ Missing'
    },
    node: {
      version: process.version,
      env: process.env.NODE_ENV || 'not set'
    }
  };

  return res.status(200).json({
    success: true,
    config,
    timestamp: new Date().toISOString()
  });
}
