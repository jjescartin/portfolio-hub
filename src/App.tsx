import Panel from './components/Panel'
import DotNav from './components/DotNav'
import Hero from './components/Hero'
import WorkExperience from './components/WorkExperience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { PANELS } from './data/panels'
import { useSnapScroll } from './hooks/useSnapScroll'
import Nav from './components/Nav'
import { LABELS } from './data/navigation'

const IDS = PANELS.map((p) => p.id)

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
      <Panel id="projects" index={2} className="bg-gray-100 text-white" {...shared}>
        <Projects />
      </Panel>
      <Panel id="contact" index={3} className="bg-gray-100 text-white" {...shared}>
        <Contact />
      </Panel>
      
      <Nav current={current} onSelect={goTo} />
      <DotNav labels={LABELS} current={current} onSelect={goTo} />
    </>
  )
}