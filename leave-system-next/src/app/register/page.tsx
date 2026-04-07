import { signup } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Calendar, UserPlus } from 'lucide-react'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 -ml-24 -mt-24 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -mr-24 -mb-24 h-96 w-96 rounded-full bg-blue-50/50 blur-3xl"></div>

      <div className="w-full max-w-2xl bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl lg:shadow-[0_24px_64px_rgba(0,0,0,0.05)] border border-slate-100 z-10 animate-in">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Side: Info */}
          <div className="md:w-1/3 flex flex-col justify-center">
            <div className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Join our community</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Create an account to start managing your leaves efficiently. Professional tools for modern educators.
            </p>
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Security First</p>
              <div className="space-y-3">
                <div className="flex items-center text-xs text-slate-500 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                  End-to-end Encryption
                </div>
                <div className="flex items-center text-xs text-slate-500 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>
                  Role-based Access
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
                {error}
              </div>
            )}

            <form action={signup} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-slate-700 ml-1">Full Name</Label>
                  <Input id="fullName" name="fullName" type="text" required className="h-12 rounded-xl" placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-700 ml-1">Work Email</Label>
                  <Input id="email" name="email" type="email" required className="h-12 rounded-xl" placeholder="john@school.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="staffId" className="text-slate-700 ml-1">Staff ID</Label>
                <Input id="staffId" name="staffId" type="text" required className="h-12 rounded-xl" placeholder="T12345" />
              </div>
              <input type="hidden" name="role" value="teacher" />

              <div className="space-y-1.5">
                <Label htmlFor="password" title="password" className="text-slate-700 ml-1">Password</Label>
                <Input id="password" name="password" type="password" required className="h-12 rounded-xl" placeholder="••••••••" />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all">
                  Create Account
                  <UserPlus className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <p className="mt-6 text-center text-slate-500 text-sm font-medium">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-extrabold transition-all">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
