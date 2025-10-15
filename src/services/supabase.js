import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://gbyzopuysrtcsoougtzr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdieXpvcHV5c3J0Y3Nvb3VndHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODcxODYsImV4cCI6MjA1ODY2MzE4Nn0.vDncMbBjAgbRse2Y8h7hVyGwwqvF-6S-xn7kM0PcZbg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
