import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DashboardReport from './dashboard-report'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

const DashboardPage = async () => {
  const session = await auth()

  if (!session || session?.user.role !== 'Admin') {
    notFound() // Show the 404 page
  }

  return <DashboardReport />
}

export default DashboardPage
