import session from 'express-session';
import SupabaseSessionStore from '../utils/supabase-session-store.js';
import { supabaseUrl, supabaseKey } from './supabaseConfig.js';

const sessionConfig = session({
  store: new SupabaseSessionStore(supabaseUrl, supabaseKey),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 día
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
});

export default sessionConfig;
