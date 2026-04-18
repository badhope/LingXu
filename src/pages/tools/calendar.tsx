import Layout from '@/components/layout/Layout'
import CalendarPanel from '@/tools/calendar/CalendarPanel'

export default function CalendarPage() {
  return (
    <Layout title="天时历法" transparentNav parentPath="/tools">
      <CalendarPanel />
    </Layout>
  )
}
