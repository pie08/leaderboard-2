import { supabase } from "./supabase";

export const channel = supabase.channel("position:changes");
