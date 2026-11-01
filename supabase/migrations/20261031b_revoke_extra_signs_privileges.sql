-- Applied to Supabase project qkilustidnsmdxfsjyfj on 2026-10-31
-- as migration "revoke_extra_signs_privileges".
revoke truncate, references, trigger on public.signs from anon, authenticated;
