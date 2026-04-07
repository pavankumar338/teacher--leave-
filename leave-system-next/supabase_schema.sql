-- Create a table for public profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  email text,
  staff_id text unique,
  phone text,
  subject text,
  department text,
  designation text,
  role text check (role in ('teacher', 'admin')) default 'teacher',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Create a table for leaves
create table if not exists public.leaves (
  id uuid default gen_random_uuid() primary key,
  teacher_id uuid references public.profiles(id) on delete cascade not null,
  leave_type text check (leave_type in ('Casual', 'Sick', 'Earned', 'Other', 'emergency', 'casual', 'sick')) not null,
  start_date date not null,
  end_date date not null,
  reason text not null,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  approved_by text,
  approved_date timestamp with time zone,
  rejection_reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for leaves
alter table public.leaves enable row level security;

create policy "Teachers can view their own leaves." on public.leaves
  for select using (auth.uid() = teacher_id);

create policy "Admins can view all leaves." on public.leaves
  for select using (
    exists (
      select 1 from public.profiles
      where public.profiles.id = auth.uid()
      and public.profiles.role = 'admin'
    )
  );

create policy "Teachers can insert their own leaves." on public.leaves
  for insert with check (auth.uid() = teacher_id);

create policy "Admins can update leaf status." on public.leaves
  for update using (
    exists (
      select 1 from public.profiles
      where public.profiles.id = auth.uid()
      and public.profiles.role = 'admin'
    )
  );

-- Function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    coalesce(new.raw_user_meta_data->>'role', 'teacher')
  );
  return new;
end;
$$;

-- Trigger to create profile on signup
-- To enable this, uncomment the following:
-- create trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();
