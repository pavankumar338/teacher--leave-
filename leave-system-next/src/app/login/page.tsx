import { login } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const { error, message } = await searchParams
  
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {/* Left Side: Illustration/Welcome */}
      <div className="hidden lg:flex flex-col justify-center px-12 xl:px-24 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-blue-500/50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-blue-700/50 blur-3xl"></div>
        
        <div className="relative z-10 w-full max-w-lg">
          <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-xl">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div className="text-5xl font-extrabold tracking-tight mb-6">
            Welcome back to <br />
            <span className="text-blue-200">LeaveSystem</span>
          </div>
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            Manage your work-life balance with ease. Our digital portal makes leave applications seamless for educators.
          </p>
          
          <div className="flex items-center space-x-6 text-blue-100/60 font-medium">
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-blue-300 mr-2"></span>
              Fast Processing
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-blue-300 mr-2"></span>
              Secure Data
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-blue-300 mr-2"></span>
              Instant Updates
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-8 lg:p-12 xl:p-24 relative overflow-hidden">
        <div className="absolute lg:hidden top-0 left-0 h-full w-full bg-blue-600 -z-10"></div>
        
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl lg:shadow-[0_24px_64px_rgba(0,0,0,0.05)] border border-slate-100 lg:animate-in">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign In</h2>
            <p className="text-slate-500 mt-2">Enter your credentials to access your dashboard</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
              {error}
            </div>
          )}
          
          {message && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-medium">
              {message}
            </div>
          )}

          <form action={login} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 ml-1">Work Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                defaultValue="admin@school.com"
                className="h-14 px-5 rounded-2xl border-slate-200 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
                placeholder="teacher@school.com"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label htmlFor="password" title="password" className="text-slate-700">Password</Label>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                defaultValue="admin1234"
                className="h-14 px-5 rounded-2xl border-slate-200 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all hover:translate-y-[-1px] active:translate-y-[0px]">
              Sign In
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <p className="mt-10 text-center text-slate-500 text-sm font-medium">
            New to the portal?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-extrabold hover:underline transition-all">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
