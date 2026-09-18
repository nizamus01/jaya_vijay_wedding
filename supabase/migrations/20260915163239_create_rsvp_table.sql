/*
# Create RSVP table for wedding invitation

1. New Tables
- `rsvp`
  - `id` (uuid, primary key)
  - `name` (text, not null) - Guest name
  - `attending` (boolean, not null) - Whether the guest will attend
  - `guests_count` (integer, default 1) - Number of guests
  - `message` (text, nullable) - Optional message from guest
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `rsvp`.
- Allow anon + authenticated to insert and read (public wedding invitation, no sign-in).
*/

CREATE TABLE IF NOT EXISTS rsvp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  attending boolean NOT NULL,
  guests_count integer NOT NULL DEFAULT 1,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_rsvp" ON rsvp;
CREATE POLICY "anon_select_rsvp" ON rsvp FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_rsvp" ON rsvp;
CREATE POLICY "anon_insert_rsvp" ON rsvp FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_rsvp" ON rsvp;
CREATE POLICY "anon_update_rsvp" ON rsvp FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_rsvp" ON rsvp;
CREATE POLICY "anon_delete_rsvp" ON rsvp FOR DELETE
  TO anon, authenticated USING (true);
