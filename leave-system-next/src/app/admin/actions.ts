'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateLeaveStatus(leaveId: string, status: 'approved' | 'rejected', rejectionReason?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('staff_id')
    .eq('id', user.id)
    .single()

  const { error } = await supabase.from('leaves').update({
    status,
    approved_by: profile?.staff_id,
    approved_date: new Date().toISOString(),
    rejection_reason: rejectionReason
  }).eq('id', leaveId)

  if (!error) {
    revalidatePath('/', 'layout')
  }
}
