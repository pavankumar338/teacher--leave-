'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  const { data: { user } } = await supabase.auth.getUser()

  if (user && email === 'admin@school.com') {
    await supabase.from('profiles').update({ role: 'admin' }).eq('id', user.id)
  }
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single()

  const userRole = profile?.role?.toLowerCase()

  if (userRole === 'admin') {
    return redirect('/admin?diag=role_admin')
  }

  return redirect('/teacher?diag=role_teacher')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const staffId = formData.get('staffId') as string
  const role = formData.get('role') as string || 'teacher'
  
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      },
    },
  })

  if (error) {
    return redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  if (data?.user) {
    await supabase.from('profiles').insert({
      id: data.user.id,
      email: email, // <-- Store email directly in the profile
      full_name: fullName,
      staff_id: staffId,
      role: role as any,
    })
  }

  return redirect('/login?message=Check your email to confirm your account')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}
