import DashboardLayout from '@/components/layout/DashboardLayout'
import { createClient } from '@/utils/supabase/server'
import LeaveActions from './LeaveActions'
import { Users, FileText, CheckCircle, XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()
  
  if (!profile) {
    return redirect('/login')
  }

  if (profile.role !== 'admin') {
    return redirect('/teacher')
  }

  const { data: leavesFetch } = await supabase
    .from('leaves')
    .select('*, profiles(full_name, staff_id, department)')
    .order('created_at', { ascending: false })

  const { count: teacherCount, data: teachersFetch } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .eq('role', 'teacher')
    .order('full_name')

  const leaves = leavesFetch || []
  const teachers = teachersFetch || []





  const stats = [
    { name: 'Pending Approvals', value: leaves?.filter((l: any) => l.status === 'pending').length || 0, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Total Teachers', value: teacherCount || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Approved Today', value: leaves?.filter((l: any) => l.status === 'approved' && l.approved_date?.startsWith(new Date().toISOString().split('T')[0])).length || 0, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
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
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Control Center</h1>
          <p className="text-slate-500 mt-1">Review and manage leave applications across the institution.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className={stat.bg + " p-3 rounded-xl " + stat.color}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium">{stat.name}</p>
                  <h3 className="text-2xl font-bold text-slate-900 leading-none mt-1">{stat.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaves Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg">Leave Applications Queue</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4">Teacher</th>
                  <th className="px-8 py-4">Request Details</th>
                  <th className="px-8 py-4">Reason</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {!leaves?.length ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-slate-400 italic">
                      No leave requests found in the system.
                    </td>
                  </tr>
                ) : (
                  leaves.map((leave: any) => (
                    <tr key={leave.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                            {leave.profiles?.full_name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{leave.profiles?.full_name}</p>
                            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tight">
                              {leave.profiles?.staff_id} • {leave.profiles?.department}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold text-slate-700">{leave.leave_type}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {new Date(leave.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} -
                          {new Date(leave.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm text-slate-600 max-w-xs truncate">{leave.reason}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-lg text-[11px] font-bold border tracking-wide uppercase ${getStatusStyles(leave.status)}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {leave.status === 'pending' ? (
                          <LeaveActions leaveId={leave.id} />
                        ) : (
                          <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-slate-500 capitalize">{leave.status}</span>
                            <span className="text-[10px] text-slate-300">By {leave.approved_by}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Teachers List */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-lg">Staff Directory</h3>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{teachers.length} Teachers</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4">Name</th>
                  <th className="px-8 py-4">Staff ID</th>
                  <th className="px-8 py-4">Department</th>
                  <th className="px-8 py-4">Subject</th>
                  <th className="px-8 py-4 text-right">Designation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {!teachers.length ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-slate-400 italic">
                      No teachers found in the system.
                    </td>
                  </tr>
                ) : (
                  teachers.map((t: any) => (
                    <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-4">
                          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold">
                            {t.full_name?.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-900 text-sm">{t.full_name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-600">{t.staff_id}</td>
                      <td className="px-8 py-5 text-sm text-slate-600">{t.department || 'N/A'}</td>
                      <td className="px-8 py-5 text-sm text-slate-600">{t.subject || 'N/A'}</td>
                      <td className="px-8 py-5 text-right font-medium text-slate-500 text-sm">{t.designation || 'Teacher'}</td>
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
