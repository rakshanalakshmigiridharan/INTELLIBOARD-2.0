import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authorized emails - only these can sign up
export const AUTHORIZED_EMAILS = [
  'ramanilakshmipriya26@gmail.com',
  'rakshanalakshmi.g.cse.2022@snsct.org',
  'ramanesh.k.cse.2022@snsct.org',
  'ravichandran.v.cse.2022@snsct.org'
];

// Check if email is authorized
export function isEmailAuthorized(email: string): boolean {
  return AUTHORIZED_EMAILS.includes(email.toLowerCase().trim());
}
