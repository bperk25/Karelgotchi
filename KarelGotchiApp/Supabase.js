import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vdrvxdljrioupqalkjep.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcnZ4ZGxqcmlvdXBxYWxramVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1MzgzODAsImV4cCI6MjAxNjExNDM4MH0.G7gLxIDjvxtpUVgDYr5r5JsO43jmkV8gnLgm1Mt76Tw";

export default supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});