import DashboardLayout from '@/components/layout/DashboardLayout'
import { createClient } from '@/utils/supabase/server'
import { Users, GraduationCap, Building2, Search, ArrowRight, Book, Briefcase, Mail, Phone } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function TeachersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()
  
  if (!profile || profile.role !== 'admin') {
    return redirect('/teacher')
  }

  const { data: teachers } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'teacher')
    .order('full_name')

  return (
    <DashboardLayout profile={profile}>
      <div className="space-y-8 animate-in transition-all duration-500 ease-in-out">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-10 gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-600">Educational Faculty</h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
              Access and manage the complete institutional staff directory.
              Review credentials, departments, and communication details.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100 shadow-inner">
            <Users className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-700 font-black text-sm tracking-tight">{teachers?.length || 0} Professional Members</span>
          </div>
        </div>

        {/* Dynamic Search & Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Ex: Dr. John Smith, T552..."
              className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all w-full shadow-sm placeholder:text-slate-300 font-medium"
            />
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-500 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-colors uppercase tracking-[0.1em] shadow-sm">Export List</button>
            <button className="flex-1 sm:flex-none px-6 py-3 bg-slate-950 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all uppercase tracking-[0.1em] shadow-lg shadow-slate-100">Analytics</button>
          </div>
        </div>

        {/* Faculty Grid - A more modern card approach than just a table row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {!teachers?.length ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-white border border-dashed border-slate-200 rounded-[2.5rem]">
              <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200 animate-pulse">
                <Users className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 leading-tight">No faculty members <br /> record found</h4>
              <p className="text-slate-400 mt-2 max-w-xs mx-auto font-medium leading-relaxed">The staff directory is currently empty. New registrations will appear here automatically.</p>
            </div>
          ) : (
            teachers.map((t: any) => (
              <div key={t.id} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/40 hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex items-start justify-between mb-8">
                  <div className="h-16 w-16 rounded-[1.25rem] bg-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform duration-500">
                    {t.full_name?.charAt(0)}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Staff Access Code</p>
                    <p className="text-sm font-black text-indigo-700 tracking-tight">{t.staff_id}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight mb-1">{t.full_name}</h4>
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100">{t.designation || 'Senior Faculty'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 bg-slate-50 rounded-lg"><Building2 className="w-3.5 h-3.5 text-slate-400" /></div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">Department</p>
                        <p className="text-xs font-bold text-slate-700">{t.department || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 bg-slate-50 rounded-lg"><Book className="w-3.5 h-3.5 text-slate-400" /></div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Specialization</p>
                        <p className="text-xs font-bold text-slate-700">{t.subject || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50 space-y-3">
                    <div className="flex items-center space-x-3 text-slate-400">
                      <Mail className="w-4 h-4" />
                      <span className="text-xs font-medium truncate">{t.email || 'No email stored'}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-400">
                      <Phone className="w-4 h-4" />
                      <span className="text-xs font-medium">{t.phone || '(No contact records)'}</span>
                    </div>
                  </div>

                  <button className="w-full py-4 mt-2 bg-slate-50 text-slate-950 text-xs font-black uppercase tracking-widest rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner flex items-center justify-center gap-2">
                    Profile Data <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
