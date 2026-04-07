'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProfile } from './actions'
import { X, Save, Edit3 } from 'lucide-react'

export function UpdateProfileButton({ profile }: { profile: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    const res = await updateProfile(formData)
    setLoading(false)
    if (res.error) {
      setError(res.error)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-10 h-16 bg-slate-950 text-white rounded-[1.5rem] text-sm font-black uppercase tracking-widest hover:bg-indigo-600 transition-all duration-500 shadow-2xl shadow-slate-200 flex items-center justify-center gap-2"
      >
        <Edit3 className="w-5 h-5" />
        Update Personnel Records
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Update Records</h3>
              <button disabled={loading} onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form action={onSubmit} className="p-6 space-y-6">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-sm font-medium border border-rose-100">
                  {error}
                </div>
              )}
              
              <div className="space-y-2 text-left">
                <Label htmlFor="staff_id" className="text-slate-700 font-bold ml-1 text-sm">Staff Access Code</Label>
                <Input id="staff_id" name="staff_id" defaultValue={profile.staff_id || ''} className="h-12 rounded-xl bg-slate-50" placeholder="e.g. T12345" />
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="department" className="text-slate-700 font-bold ml-1 text-sm">Departmental Unit</Label>
                <Input id="department" name="department" defaultValue={profile.department || ''} className="h-12 rounded-xl bg-slate-50" placeholder="e.g. Computer Science" />
              </div>
              
              <div className="space-y-2 text-left">
                <Label htmlFor="subject" className="text-slate-700 font-bold ml-1 text-sm">Academic Discipline (Subject)</Label>
                <Input id="subject" name="subject" defaultValue={profile.subject || ''} className="h-12 rounded-xl bg-slate-50" placeholder="e.g. Mathematics" />
              </div>
              
              <div className="space-y-2 text-left">
                <Label htmlFor="designation" className="text-slate-700 font-bold ml-1 text-sm">Current Designation</Label>
                <Input id="designation" name="designation" defaultValue={profile.designation || ''} className="h-12 rounded-xl bg-slate-50" placeholder="e.g. Senior Faculty" />
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="phone" className="text-slate-700 font-bold ml-1 text-sm">Verified Phone Record</Label>
                <Input id="phone" name="phone" defaultValue={profile.phone || ''} className="h-12 rounded-xl bg-slate-50" placeholder="e.g. +1 555 123 4567" />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <Button type="button" variant="ghost" disabled={loading} onClick={() => setIsOpen(false)} className="font-bold rounded-xl h-12 px-6">Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 px-8 font-bold shadow-lg shadow-indigo-100 disabled:opacity-50">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
