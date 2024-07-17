import session from 'express-session';
import supabase from '../config/supabaseConfig.js';

class SupabaseSessionStore extends session.Store {
  constructor() {
    super();
    this.supabase = supabase;
  }

  async get(sid, callback) {
    try {
      const { data, error } = await this.supabase
        .from('sessions')
        .select('data')
        .eq('sid', sid)
        .single();
      if (error) return callback(error);
      callback(null, data ? JSON.parse(data.data) : null);
    } catch (err) {
      callback(err);
    }
  }

  async set(sid, session, callback) {
    try {
      const { error } = await this.supabase
        .from('sessions')
        .upsert({ sid, data: JSON.stringify(session) });
      callback(error);
    } catch (err) {
      callback(err);
    }
  }

  async destroy(sid, callback) {
    try {
      const { error } = await this.supabase
        .from('sessions')
        .delete()
        .eq('sid', sid);
      callback(error);
    } catch (err) {
      callback(err);
    }
  }
}

export default SupabaseSessionStore;
