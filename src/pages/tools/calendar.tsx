import SubPageTemplate from '@/components/layout/SubPageTemplate'
import CalendarPanel from '@/tools/calendar/CalendarPanel'

export default function CalendarPage() {
  return (
    <SubPageTemplate title="择吉日历" colorRgb="59, 130, 246">
      <CalendarPanel />
    </SubPageTemplate>
  )
}
