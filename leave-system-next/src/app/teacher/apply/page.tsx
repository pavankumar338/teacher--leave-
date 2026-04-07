import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { applyLeave } from './actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Send, AlertCircle } from 'lucide-react'

export default async function ApplyLeavePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()

  if (!profile) {
    return redirect('/login')
  }

  if (profile.role === 'admin') {
    return redirect('/admin')
  }

  return (
    <DashboardLayout profile={profile}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Request Time Off</h1>
          <p className="text-slate-500 mt-2">Fill out the form below to submit your leave application for review.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-start text-rose-600 text-sm font-medium">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="h-2 bg-blue-600 w-full"></div>
          <form action={applyLeave} className="p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="leaveType" className="text-slate-700 font-bold ml-1">Leave Category</Label>
                <select
                  id="leaveType"
                  name="leaveType"
                  required
                  className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="Casual">Casual Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Earned">Earned Leave</option>
                  <option value="Other">Other</option>
                </select>
                <p className="text-[10px] text-slate-400 ml-1">Select the most appropriate category</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-slate-700 font-bold ml-1">Commencement Date</Label>
                <Input id="startDate" name="startDate" type="date" required className="h-12 rounded-xl bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-slate-700 font-bold ml-1">Conclusion Date</Label>
                <Input id="endDate" name="endDate" type="date" required className="h-12 rounded-xl bg-slate-50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason" className="text-slate-700 font-bold ml-1">Statement of Reason</Label>
              <textarea
                id="reason"
                name="reason"
                required
                rows={5}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Briefly explain the reason for your leave request..."
              />
            </div>

            <div className="pt-6 flex flex-col md:flex-row gap-4 items-center justify-between border-t border-slate-50">
              <p className="text-xs text-slate-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Requests are typically reviewed within 24-48 hours.
              </p>
              <Button type="submit" className="w-full md:w-auto px-10 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95">
                Submit Request
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
