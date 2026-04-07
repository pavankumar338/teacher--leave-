import DashboardLayout from '@/components/layout/DashboardLayout'
import { createClient } from '@/utils/supabase/server'
import { Plus, Clock, CheckCircle2, XCircle, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export default async function TeacherDashboard() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()

  if (profile?.role === 'admin') {
    return redirect('/admin')
  }

  const { data: leaves } = await supabase
    .from('leaves')
    .select('*')
    .eq('teacher_id', user?.id)
    .order('created_at', { ascending: false })

  const stats = [
    { name: 'Total Requests', value: leaves?.length || 0, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Approved', value: leaves?.filter(l => l.status === 'approved').length || 0, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Rejected', value: leaves?.filter(l => l.status === 'rejected').length || 0, icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ]

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-100'
      default: return 'bg-amber-50 text-amber-700 border-amber-100'
    }
  }

  return (
    <DashboardLayout profile={profile}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
            <p className="text-slate-500 mt-1">Monitor your leave applications and statistics.</p>
          </div>
          <Link href="/teacher/apply">
            <Button className="h-12 px-6 rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all font-bold">
              <Plus className="w-5 h-5 mr-2" />
              New Application
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={stat.bg + " p-3 rounded-xl " + stat.color}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.name}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Leaves Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Recent Applications</h3>
            <Button variant="ghost" size="sm" className="text-blue-600 font-bold">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4">Type</th>
                  <th className="px-8 py-4">Duration</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Applied Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {!leaves?.length ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-slate-400 italic">
                      No applications found yet.
                    </td>
                  </tr>
                ) : (
                  leaves.map((leave) => (
                    <tr key={leave.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="font-bold text-slate-900">{leave.leave_type}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-600">
                            {new Date(leave.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} -
                            {new Date(leave.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusStyles(leave.status)}`}>
                          {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors">
                          {new Date(leave.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
