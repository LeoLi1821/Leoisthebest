import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const personalInfo = {
  name: '李翱',
  nameEn: 'Leo',
  title: '数据驱动 / 内容表达',
  phone: '18138705503',
  email: 'liaoleo1821@qq.com',
  politicalStatus: '中共党员',
  graduation: '2025年6月',
  school1: '中国农业大学',
  major1: '图书情报专硕',
  school2: '黑龙江大学',
  major2: '电子商务 + 新闻学',
  strengths: ['数据洞察', '内容表达']
}

const aboutMe = {
  description: '一个把"卷"变成艺术的选手——本科双学位专业第一，研究生继续霸榜。别人写论文秃头，我写报告顺带发个专栏。擅长用数据讲故事，用内容打动人心。本质上，我就是一个热爱和数据打交道、也热爱写东西的人。',
  highlights: [
    '数据敏感：68个经营指标随手拈来，搭建模型是我的日常',
    '内容手感：30+原创文案，单篇5k+阅读是基操',
    '协调能力：跨部门、跨项目，交付率100%是底线',
    '文字功底：政策研究、课题报告、公众号运营全能选手'
  ]
}

const educationData = [
  {
    school: '中国农业大学',
    major: '图书情报专硕',
    period: '2023.09 - 2025.06',
    degree: '985/211/双一流',
    rank: '2/17',
    scholarship: '校级二等奖学金2次',
    honors: '优秀中共党员、全国优秀荐读官',
    role: '院党支部宣传委员',
    description: '擅长内容宣传、活动统筹、文字撰稿、项目协调'
  },
  {
    school: '黑龙江大学',
    major: '电子商务 + 新闻学',
    period: '2019.09 - 2023.06',
    degree: '本科',
    rank: '1/37',
    scholarship: '校级二等奖学金3次',
    honors: '',
    role: '班长、院校友会理事长',
    description: '具备统筹组织、跨部门沟通、活动策划能力'
  }
]

const workData = {
  company: '瑞幸咖啡',
  title: 'HRBP主管（数据运营方向）',
  period: '2024.08 - 2026.01',
  achievements: [
    { title: '平台AI优化', desc: '全权负责员工反馈平台全周期运营，完成3400条用户建议闭环；落地AI智能分类、OA线上流转，大幅提升协同效率' },
    { title: '数据模型搭建', desc: '独立搭建2套核心业务数据模型，梳理68个经营核心指标；设计自动化表单&数据仪表盘，实现数据标准化可视化' },
    { title: '跨项目落地', desc: '承接人才储备、门店升级等重点项目，统筹4场线上培训，项目交付率100%' }
  ]
}

const internshipData = [
  {
    company: '励德爱思唯尔',
    title: '市场部新媒体实习生',
    period: '2024.03 - 2024.07',
    achievements: [
      '竞品拆解内容策略，运营公众号/小红书/微博',
      '撰写30+原创文案，单篇平均阅读5k+',
      '跟踪KPI输出数据周报'
    ]
  },
  {
    company: '北京市农林科学院',
    title: '政策研究实习生',
    period: '2023.12 - 2024.03',
    achievements: [
      '梳理156份政策文件，政策文本编码建模',
      '独立撰写课题研究报告，输出城乡公共服务数字化优化建议'
    ]
  }
]

const researchData = [
  {
    title: '高校图书馆数字资源利用行为调研',
    role: '组长',
    period: '2024.03 - 2024.09',
    description: '针对高校图书馆数字资源使用效率低下的问题，带领团队进行系统性调研分析与优化。',
    achievements: [
      'SWOT竞品分析：调研国内外12所高校图书馆数字化服务模式',
      '定性定量用户调研：设计问卷并访谈200+师生用户，挖掘核心需求',
      '落地外文教材阅读专栏：推动图书馆新增资源采购，设立专门阅读区',
      '形成2万字调研报告，获图书馆管理层采纳'
    ]
  },
  {
    title: '图书馆40w+数据清洗与可视化',
    role: '组员',
    period: '2024.01 - 2024.06',
    description: '对图书馆40万条读者借阅数据进行清洗、分析与可视化呈现。',
    achievements: [
      'Python Pandas数据清洗：处理缺失值、异常值，规范化数据结构',
      'Tableau/Excel可视化：构建12个数据看板，展示借阅趋势、热门资源等',
      '用户行为分析报告：识别高频读者群体，挖掘阅读偏好',
      '调研报告被图书馆正式采用，用于指导采购决策'
    ]
  },
  {
    title: '双一流政策演进课题研究',
    role: '组员',
    period: '2023.10 - 2024.03',
    description: '参与研究中国双一流高校政策的演变历程与发展趋势。',
    achievements: [
      '文献数据整理：梳理2015-2023年政策文件、学术论文共计500+篇',
      '词频文本分析：运用Python进行关键词提取与语义网络分析',
      '独立撰写核心章节：负责"学科建设成效评估"部分，约8000字',
      '课题成果提交至教育部相关研究机构参考'
    ]
  }
]

const skillsData = {
  language: [
    { name: '英语四级', level: 554 },
    { name: '英语六级', level: 477 },
    { name: '粤语母语', level: 100 }
  ],
  dataTools: ['Python', 'SPSS', 'Excel', 'Tableau', 'Claude Code', 'Trae Vibe Coding'],
  designTools: ['Midjourney AI生图', '剪映AI', 'PS', 'Canva', '秀米', '剪映', 'PR']
}

const honorsData = [
  '校级二等奖学金（5次）',
  '优秀中共党员',
  '全国优秀荐读官',
  '专业排名Top 5%（双学位）'
]

const navItems = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于我' },
  { id: 'education', label: '教育经历' },
  { id: 'work', label: '工作经历' },
  { id: 'internship', label: '实习经历' },
  { id: 'research', label: '科研项目' },
  { id: 'skills', label: '专业技能' },
  { id: 'honors', label: '荣誉奖项' },
  { id: 'contact', label: '联系我' }
]

function Section({ id, children, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`py-16 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  )
}

function TimelineCard({ data, isWork = false, isEducation = false }) {
  return (
    <div className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-700">
      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full" />
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
            {isWork ? data.company : data.school}
          </h3>
          {isEducation && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded">
              {data.degree}
            </span>
          )}
        </div>
        <p className="text-slate-600 dark:text-slate-300 mb-1">
          {isWork ? data.title : data.major}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{data.period}</p>
        
        {isEducation && data.rank && (
          <p className="text-sm mb-2">
            <span className="font-semibold text-blue-600 dark:text-blue-400">专业排名: </span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{data.rank}</span>
          </p>
        )}
        
        {data.scholarship && (
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
            <span className="font-medium">🏆 </span>{data.scholarship}
          </p>
        )}
        
        {data.honors && (
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
            <span className="font-medium">⭐ </span>{data.honors}
          </p>
        )}
        
        {data.role && (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium">📋 </span>{data.role}：{data.description}
          </p>
        )}
        
        {isWork && data.achievements && (
          <ul className="mt-4 space-y-3">
            {data.achievements.map((item, idx) => (
              <li key={idx} className="text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-800 dark:text-white">• {item.title}: </span>
                {item.desc}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function SkillBar({ name, level }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{name}</span>
        <span className="text-sm text-slate-500 dark:text-slate-400">{level}</span>
      </div>
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(level, 100)}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
        />
      </div>
    </div>
  )
}

function SkillTag({ children }) {
  return (
    <span className="inline-block px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full mr-2 mb-2">
      {children}
    </span>
  )
}

function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <span className="text-lg font-bold text-slate-800 dark:text-white">Leo</span>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, -1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <p className="text-slate-500 dark:text-slate-400 mb-4">{personalInfo.politicalStatus} | {personalInfo.graduation}毕业</p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-2">
              {personalInfo.name} <span className="text-blue-600 dark:text-blue-400">({personalInfo.nameEn})</span>
            </h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-6">{personalInfo.title}</p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
              {personalInfo.strengths.map((strength, idx) => (
                <span key={idx} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                  {strength}
                </span>
              ))}
            </div>

            <div className="space-y-2 text-slate-600 dark:text-slate-300 mb-8">
              <p>📚 {personalInfo.school1} · {personalInfo.major1}</p>
              <p>📚 {personalInfo.school2} · {personalInfo.major2}</p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href={`tel:${personalInfo.phone}`}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                📞 电话联系
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="px-6 py-2.5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors"
              >
                ✉️ 发送邮件
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <div className="w-48 h-48 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/证件照2026.jpg" 
                alt="李翱 Leo" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" className="bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">关于我</h2>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm">
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            {aboutMe.description}
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {aboutMe.highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
              >
                <span className="text-blue-500 text-xl">✦</span>
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">教育经历</h2>
        <div className="space-y-0">
          {educationData.map((item, idx) => (
            <TimelineCard key={idx} data={item} isEducation />
          ))}
        </div>
      </div>
    </Section>
  )
}

function Work() {
  return (
    <Section id="work" className="bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">工作经历</h2>
        <TimelineCard data={workData} isWork />
      </div>
    </Section>
  )
}

function Internship() {
  return (
    <Section id="internship">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">实习经历</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {internshipData.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">{item.company}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-1">{item.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{item.period}</p>
              <ul className="space-y-2">
                {item.achievements.map((ach, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {ach}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Research() {
  return (
    <Section id="research" className="bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">科研项目</h2>
        <div className="space-y-8">
          {researchData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{item.title}</h3>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded">
                  {item.role}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{item.period}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.achievements.map((ach, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start">
                    <span className="text-blue-500 mr-2">▸</span>
                    {ach}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">专业技能</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">语言能力</h3>
            {skillsData.language.map((item, idx) => (
              <SkillBar key={idx} name={item.name} level={item.level} />
            ))}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">数据工具</h3>
            <div className="flex flex-wrap">
              {skillsData.dataTools.map((skill, idx) => (
                <SkillTag key={idx}>{skill}</SkillTag>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">设计剪辑</h3>
            <div className="flex flex-wrap">
              {skillsData.designTools.map((skill, idx) => (
                <SkillTag key={idx}>{skill}</SkillTag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Honors() {
  return (
    <Section id="honors" className="bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-12">荣誉奖项</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {honorsData.map((honor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="px-6 py-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-slate-700 dark:text-slate-300"
            >
              <span className="text-xl mr-2">🏆</span>
              {honor}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Contact() {
  const [copied, setCopied] = useState('')

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <Section id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-12">联系我</h2>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <button
              onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
              className="flex items-center gap-3 px-6 py-3 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <span className="text-2xl">📱</span>
              <span className="text-slate-700 dark:text-slate-300">{personalInfo.phone}</span>
              {copied === 'phone' && <span className="text-green-500 text-sm">✓ 已复制</span>}
            </button>

            <button
              onClick={() => copyToClipboard(personalInfo.email, 'email')}
              className="flex items-center gap-3 px-6 py-3 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <span className="text-2xl">✉️</span>
              <span className="text-slate-700 dark:text-slate-300">{personalInfo.email}</span>
              {copied === 'email' && <span className="text-green-500 text-sm">✓ 已复制</span>}
            </button>
          </div>

          <p className="text-slate-500 dark:text-slate-400 text-sm">
            感谢您查看我的简历，期待与您交流！😊
          </p>
        </div>

        <p className="mt-12 text-sm text-slate-400 dark:text-slate-500">
          © 2025 {personalInfo.name} {personalInfo.nameEn}. All rights reserved.
        </p>
      </div>
    </Section>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <About />
      <Education />
      <Work />
      <Internship />
      <Research />
      <Skills />
      <Honors />
      <Contact />
    </div>
  )
}

export default App
