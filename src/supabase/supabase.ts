import { Database } from "@/supabase/types/database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zlygckncitbvysugssvx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpseWdja25jaXRidnlzdWdzc3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNDE5ODcsImV4cCI6MjAzMTYxNzk4N30.dANBd2c1-8GB90O_GaKRoW_RGEasYjZ54OtoOpTIdLQ";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
