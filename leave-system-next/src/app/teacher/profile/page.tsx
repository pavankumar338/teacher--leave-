import DashboardLayout from '@/components/layout/DashboardLayout'
import { createClient } from '@/utils/supabase/server'
import { User, Mail, Phone, Building2, Book, Award, Calendar, ShieldCheck, Fingerprint, MapPin, Contact, CheckCircle2 } from 'lucide-react'
import { UpdateProfileButton } from './UpdateProfileButton'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single()

  if (!profile) return (
    <div className="h-screen flex items-center justify-center p-6 text-center">
      <div className="space-y-4">
        <div className="h-16 w-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto border border-red-100 shadow-sm shadow-red-50">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">Session Unverified</h2>
        <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed font-medium">We could not retrieve your faculty identification. Please refresh your session by logging in again.</p>
        <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">Sign In</button>
      </div>
    </div>
  )

  const infoGroups = [
    {
      title: 'Faculty Identification',
      items: [
        { label: 'Full Name', value: profile.full_name, icon: User, color: 'indigo' },
        { label: 'Staff Access Code', value: profile.staff_id, icon: Fingerprint, color: 'blue' },
        { label: 'Role Access', value: profile.role?.toUpperCase(), icon: ShieldCheck, color: 'emerald' },
      ]
    },
    {
      title: 'Institutional Alignment',
      items: [
        { label: 'Departmental Unit', value: profile.department || 'Unassigned', icon: Building2, color: 'indigo' },
        { label: 'Academic Discipline', value: profile.subject || 'N/A', icon: Book, color: 'blue' },
        { label: 'Current Designation', value: profile.designation || 'Faculty Member', icon: Calendar, color: 'emerald' },
      ]
    },
    {
      title: 'Communication Protocol',
      items: [
        { label: 'Official Work Email', value: user?.email, icon: Mail, color: 'indigo' },
        { label: 'Verified Phone Record', value: profile.phone || '(Not provided)', icon: Phone, color: 'blue' },
        { label: 'Campus Office Location', value: 'Block-A, Staff Lounge', icon: MapPin, color: 'emerald' },
      ]
    }
  ]

  return (
    <DashboardLayout profile={profile}>
      <div className="max-w-7xl mx-auto space-y-12 pb-24 animate-in duration-700 ease-out">
        {/* Profile Card / Hero */}
        <div className="relative bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-indigo-100/30 border border-slate-100 overflow-hidden flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-8 md:space-y-0 md:space-x-12">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-indigo-50/50 blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-blue-50/50 blur-3xl opacity-60"></div>

          <div className="relative shrink-0">
            <div className="h-40 w-40 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-white text-6xl font-black shadow-2xl shadow-indigo-200 ring-[8px] ring-indigo-50">
              {profile.full_name?.charAt(0)}
            </div>
            <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-emerald-500 rounded-2xl border-[4px] border-white flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-white stroke-[3px]" />
            </div>
          </div>

          <div className="flex-1 space-y-4 pt-2">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase tracking-tight">{profile.full_name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest border border-indigo-100">{profile.role} Profile</span>
                <span className="px-4 py-1.5 bg-slate-50 text-slate-400 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-100 tracking-tighter">Verified Identity</span>
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-100 tracking-tighter">Academic Year '26 </span>
              </div>
            </div>
            <p className="text-slate-400 font-medium text-lg max-w-xl leading-relaxed italic">"Dedicated to advancing academic excellence through consistent professional development and faculty collaboration."</p>
          </div>

           <div className="shrink-0 flex items-center justify-end">
              <UpdateProfileButton profile={profile} />
           </div>
        </div>

        {/* Dynamic Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {infoGroups.map((group, gIdx) => (
            <div key={group.title} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 pb-4 border-b border-slate-50">{group.title}</h3>
              <div className="space-y-10">
                {group.items.map((item, iIdx) => (
                  <div key={item.label} className="relative group/item">
                    <div className="flex items-start space-x-6">
                      <div className={`p-4 bg-${item.color}-50 bg-opacity-60 rounded-2xl group-hover/item:scale-110 transition-transform duration-300`}>
                        <item.icon className={`w-5 h-5 text-${item.color}-500 stroke-[2.5px]`} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">{item.label}</p>
                        <p className="text-lg font-black text-slate-800 tracking-tight leading-tight truncate max-w-[180px]">{item.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

// Minimal icons used to satisfy Tailwind compilation if needed (though Tailwind 4 handles it differently)
const iconColors = "bg-indigo-50 bg-blue-50 bg-emerald-50 text-indigo-500 text-blue-500 text-emerald-500";
