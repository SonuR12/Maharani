import { Metadata } from 'next'

import DashboardReport from './dashboard-report'
import { auth } from '@/auth'
export const metadata: Metadata = {
  title: 'Admin Dashboard',
}
const DashboardPage = async () => {
  const session = await auth()
  if (session?.user.role !== 'Admin')
    throw new Error('Admin permission required')

  return (
      <DashboardReport/>
)
}

export default DashboardPage
