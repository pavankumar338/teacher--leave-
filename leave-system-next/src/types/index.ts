export type Role = 'teacher' | 'admin';

export interface Profile {
  id: string;
  full_name: string | null;
  staff_id: string | null;
  phone: string | null;
  subject: string | null;
  department: string | null;
  designation: string | null;
  role: Role;
  created_at: string;
}

export interface Leave {
  id: string;
  teacher_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by: string | null;
  approved_date: string | null;
  rejection_reason: string | null;
  created_at: string;
  profiles?: Profile; // Joined data
}
