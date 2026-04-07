'use client'

import { LayoutDashboard, Calendar, User, LogOut, X, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { signOut } from '@/app/auth/actions'

const icons = {
  dashboard: LayoutDashboard,
  calendar: Calendar,
  user: User,
} as const;

export type IconId = keyof typeof icons;

export function Sidebar({ profile, items }: { profile: any, items: any[] }) {
  const pathname = usePathname()

  return (
    <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-8">
        <Link href="/" className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Calendar className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            LeaveSystem
          </span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Main Menu</div>
        {items.map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative",
              pathname === item.href 
                ? "bg-blue-50 text-blue-600" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            {(() => {
              const Icon = icons[item.iconId as IconId] || LayoutDashboard;
              return <Icon className={cn(
                "w-5 h-5 mr-3 transition-colors",
                pathname === item.href ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
              )} />;
            })()}
            {item.name}
            {pathname === item.href && (
              <motion.div 
                layoutId="activeTab"
                className="absolute left-0 w-1 h-6 bg-blue-600 rounded-full"
              />
            )}
          </Link>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
              {profile?.full_name?.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{profile?.full_name}</p>
              <p className="text-xs text-slate-500 truncate">{profile?.role}</p>
            </div>
          </div>
        </div>
        <form action={signOut}>
          <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors group">
            <LogOut className="w-5 h-5 mr-3 text-slate-400 group-hover:text-red-500" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}

export function MobileMenu({ profile, items, isOpen, onClose }: { profile: any, items: any[], isOpen: boolean, onClose: () => void }) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl"
          >
            <div className="p-6 flex items-center justify-between">
              <span className="font-bold text-xl text-blue-600">LeaveSystem</span>
              <button onClick={onClose} className="p-2 text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
              {items.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all",
                    pathname === item.href ? "bg-blue-50 text-blue-600" : "text-slate-600"
                  )}
                >
                  {(() => {
                    const Icon = icons[item.iconId as IconId] || LayoutDashboard;
                    return <Icon className="w-5 h-5 mr-3" />;
                  })()}
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-6 mt-auto border-t">
              <form action={signOut}>
                <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl">
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export function MobileMenuTrigger({ profile, items }: { profile: any, items: any[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -ml-2 text-slate-600 outline-none"
      >
        <Menu className="w-6 h-6" />
      </button>
      <MobileMenu 
        profile={profile} 
        items={items} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  )
}
