import Panel from './components/Panel'
import DotNav from './components/DotNav'
import Hero from './components/Hero'
import WorkExperience from './components/WorkExperience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { PANELS } from './data/panels'
import { useSnapScroll } from './hooks/useSnapScroll'

const IDS = PANELS.map((p) => p.id)
const LABELS = PANELS.map((p) => p.label)

export default function App() {
  const { current, goTo } = useSnapScroll(IDS)
  const shared = { current, total: PANELS.length }

  return (
    <>
      <Panel id="hero" index={0} className="bg-gray-100 dark:bg-gray-950" {...shared}>
        <Hero />
      </Panel>
      <Panel id="work" index={1} className="bg-gray-100 dark:bg-gray-950" {...shared}>
        <WorkExperience />
      </Panel>
      <Panel id="projects" index={2} className="bg-blue-600 text-white" {...shared}>
        <Projects />
      </Panel>
      <Panel id="contact" index={3} className="bg-green-600 text-white" {...shared}>
        <Contact />
      </Panel>

      <DotNav labels={LABELS} current={current} onSelect={goTo} />
    </>
  )
}