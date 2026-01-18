
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ejtfaeabhthdnhagqwqr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ZIjNWMCmJan4BjfdrA-pow_ucCJ3r5N';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
