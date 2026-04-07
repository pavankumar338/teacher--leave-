'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function applyLeave(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login?error=Session expired. Please log in again.')
  }

  const leaveType = formData.get('leaveType') as string
  const startDate = formData.get('startDate') as string
  const endDate = formData.get('endDate') as string
  const reason = formData.get('reason') as string

  const { error } = await supabase.from('leaves').insert({
    teacher_id: user.id,
    leave_type: leaveType,
    start_date: startDate,
    end_date: endDate,
    reason: reason,
    status: 'pending'
  })

  if (error) {
    return redirect(`/teacher/apply?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  return redirect('/teacher')
}
