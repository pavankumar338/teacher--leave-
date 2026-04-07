import { Sidebar, MobileMenuTrigger, MobileMenu } from './DashboardClient'
import { Bell } from 'lucide-react'

export default async function DashboardLayout({
  children,
  profile,
}: {
  children: React.ReactNode
  profile: any
}) {
  const navItems = profile?.role === 'admin' ? [
    { name: 'Manage Leaves', href: '/admin', iconId: 'dashboard' },
    { name: 'Teachers', href: '/admin/teachers', iconId: 'user' },
  ] : [
    { name: 'My Leaves', href: '/teacher', iconId: 'dashboard' },
    { name: 'Apply Leave', href: '/teacher/apply', iconId: 'calendar' },
    { name: 'Profile', href: '/teacher/profile', iconId: 'user' },
  ]

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      {/* Sidebar - Client Component */}
      <Sidebar profile={profile} items={navItems} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 z-30 sticky top-0">
          <div className="flex items-center lg:hidden">
            {/* Mobile Menu Trigger - Minimal Client Component to handle state */}
            <MobileMenuTrigger profile={profile} items={navItems} />
            <span className="ml-3 font-bold text-slate-900">LeaveSystem</span>
          </div>
          
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center space-x-3 pl-2">
               <div className="hidden text-right lg:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">{profile?.full_name}</p>
                <p className="text-[10px] text-slate-500 leading-tight">{profile?.staff_id}</p>
              </div>
            </div>
          </div>
        </header>

        {/* This main/children content is NEVER passed as a prop to any Client Component. */}
        <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-10 lg:py-10 bg-slate-50/50 relative scroll-smooth">
          <div className="animate-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
