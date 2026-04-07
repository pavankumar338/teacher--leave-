'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { updateLeaveStatus } from './actions'
import { Check, X } from 'lucide-react'

export default function LeaveActions({ leaveId }: { leaveId: string }) {
  const [loading, setLoading] = useState(false)

  const handleStatusUpdate = async (status: 'approved' | 'rejected') => {
    let reason = ''
    if (status === 'rejected') {
      reason = window.prompt('Please enter rejection reason:') || ''
      if (!reason) return
    }

    setLoading(true)
    await updateLeaveStatus(leaveId, status, reason)
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-end space-x-2">
      <Button 
        size="sm" 
        variant="outline" 
        className="h-8 px-4 rounded-full text-emerald-600 border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all font-bold text-[11px] uppercase tracking-wider"
        onClick={() => handleStatusUpdate('approved')}
        disabled={loading}
      >
        <Check className="w-3.5 h-3.5 mr-1.5 stroke-[3px]" />
        Approve
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        className="h-8 px-4 rounded-full text-rose-600 border-rose-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-all font-bold text-[11px] uppercase tracking-wider"
        onClick={() => handleStatusUpdate('rejected')}
        disabled={loading}
      >
        <X className="w-3.5 h-3.5 mr-1.5 stroke-[3px]" />
        Reject
      </Button>
    </div>
  )
}
