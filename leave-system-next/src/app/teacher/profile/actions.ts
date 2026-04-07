'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  const staff_id = formData.get('staff_id') as string | null
  const department = formData.get('department') as string | null
  const subject = formData.get('subject') as string | null
  const designation = formData.get('designation') as string | null
  const phone = formData.get('phone') as string | null

  // Ensure we don't pass null if they weren't in form, just use what is provided
  const updateData: any = {}
  if (staff_id !== null) updateData.staff_id = staff_id
  if (department !== null) updateData.department = department
  if (subject !== null) updateData.subject = subject
  if (designation !== null) updateData.designation = designation
  if (phone !== null) updateData.phone = phone

  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}
