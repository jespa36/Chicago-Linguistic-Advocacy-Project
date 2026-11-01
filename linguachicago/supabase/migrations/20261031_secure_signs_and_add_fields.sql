-- Applied to Supabase project qkilustidnsmdxfsjyfj on 2026-10-31
-- as migration "secure_signs_and_add_fields".

-- 1. New fields (table was empty, so NOT NULL was safe)
alter table public.signs
  add column if not exists approved boolean not null default false,
  add column if not exists source text not null default 'crowd'
    check (source in ('crowd','survey')),
  add column if not exists sign_type text not null default 'other'
    check (sign_type in ('street_sign','transit','government_notice',
      'storefront','flyer_poster','mural_graffiti','other')),
  add column if not exists dominant_language text,
  add column if not exists language_unsure boolean not null default false,
  add column if not exists community_area smallint
    check (community_area between 1 and 77);

alter table public.signs
  add constraint signs_languages_ok check (
    cardinality(languages) <= 10
    and (cardinality(languages) >= 1 or language_unsure)
    and char_length(array_to_string(languages, ',')) <= 300),
  add constraint signs_note_len check (note is null or char_length(note) <= 500),
  add constraint signs_dominant_len check (
    dominant_language is null or char_length(dominant_language) <= 60);

-- 2. Replace the four wide-open policies
drop policy if exists anon_select_signs on public.signs;
drop policy if exists anon_insert_signs on public.signs;
drop policy if exists anon_update_signs on public.signs;
drop policy if exists anon_delete_signs on public.signs;

revoke update, delete on public.signs from anon, authenticated;

create policy signs_public_read on public.signs
  for select to anon, authenticated using (approved = true);

create policy signs_public_submit on public.signs
  for insert to anon, authenticated
  with check (
    approved = false
    and source = 'crowd'
    and latitude between 41.60 and 42.07
    and longitude between -87.98 and -87.50
    and photo_url like 'https://qkilustidnsmdxfsjyfj.supabase.co/storage/v1/object/public/sign-photos/signs/%'
  );

-- 3. Photo bucket: size/type limits, no public delete, no public listing
update storage.buckets
  set file_size_limit = 5242880,
      allowed_mime_types = array['image/jpeg','image/png','image/webp']
  where id = 'sign-photos';

drop policy if exists anon_delete_sign_photos on storage.objects;
drop policy if exists anon_read_sign_photos on storage.objects;
drop policy if exists anon_upload_sign_photos on storage.objects;

create policy sign_photos_upload on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'sign-photos' and name like 'signs/%');
