'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ShieldCheck, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react'

const features = [
  {
    icon: Calendar,
    title: 'Easy Leave Requests',
    description: 'Submit leave applications in seconds with a simple, intuitive interface designed for busy teachers.'
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Approvals',
    description: 'Track your application status in real-time. Admins can review and process requests with just one click.'
  },
  {
    icon: Clock,
    title: 'Leave History',
    description: 'Maintain a complete record of your academic leave history, including approved and rejected applications.'
  },
  {
    icon: Users,
    title: 'Staff Directory',
    description: 'A centralized portal for administrators to manage teacher information and institutional metadata.'
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <div className="h-10 w-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform duration-300">
              <Calendar className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">LeaveSystem</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">Process</Link>
            <Link href="/login" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-screen w-[1200px] bg-indigo-50/50 rounded-full blur-3xl -z-10 -translate-y-1/2 opacity-60"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100/50"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Efficiency Redefined</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-tight md:leading-tight"
          >
            Manage Your Leaves <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">With Absolute Clarity</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            A high-performance management system for educational institutions. 
            Automate the boring stuff, focus on academic excellence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/login" className="w-full sm:w-auto px-10 h-16 bg-slate-900 text-white rounded-[1.25rem] font-bold text-lg flex items-center justify-center hover:bg-slate-800 shadow-2xl shadow-slate-200 transition-all active:scale-95 group">
              Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/register" className="w-full sm:w-auto px-10 h-16 bg-white text-slate-900 border-2 border-slate-100 rounded-[1.25rem] font-bold text-lg flex items-center justify-center hover:border-indigo-100 hover:bg-indigo-50/30 transition-all active:scale-95">
              Create Account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.2em]">The Platform</h2>
            <h3 className="text-4xl font-black tracking-tight text-slate-900">Modern tools for modern schools</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                whileHover={{ y: -8 }}
                key={idx}
                className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300"
              >
                <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:bg-indigo-600 transition-colors">
                  <feature.icon className="w-7 h-7 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-20 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-[size:40px_40px]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
            "The LeaveSystem has completely transformed how we manage our faculty administration. It's clean, fast, and works perfectly on every device."
          </p>
          <div className="mt-8 flex items-center justify-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-indigo-400 border-2 border-white/20"></div>
            <div className="text-left">
              <p className="text-white font-bold text-sm">Sarah Jenkins</p>
              <p className="text-indigo-200 text-xs font-semibold uppercase tracking-wider">Academic Registrar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-slate-900 rounded-xl flex items-center justify-center">
              <Calendar className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-slate-900 tracking-tight">LeaveSystem</span>
          </div>
          <div className="flex items-center space-x-8 text-xs font-black text-slate-400 uppercase tracking-widest">
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Support</Link>
          </div>
          <p className="text-xs font-bold text-slate-400">© 2026 Admin Portal</p>
        </div>
      </footer>
    </div>
  )
}
