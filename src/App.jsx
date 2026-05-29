import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const personalInfo = {
  name: '李翱',
  nameEn: 'Leo',
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
  description: '以实力立身，以才情筑己。本硕学业持续领跑，兼具数据洞察与文字创作能力。善用数据叙事，以内容传情，钟情数理逻辑，亦热爱笔墨山河。',
  highlights: [
    '数据敏感：专注于HR数据指标梳理，搭建数据模型帮助全国HRBP洞察',
    '内容手感：30+原创文案，单篇5k+阅读是基操',
    '协调能力：打通各个部门，成功落地全国性员工沟通平台"小鹿听你说"',
    '文字功底：政策研究、课题报告、公众号运营全能选手'
  ]
}

const educationData = [
  {
    school: '中国农业大学',
    major: '图书情报专硕',
    period: '2023.09 - 2025.06',
    degree: '硕士 | 985/211/双一流',
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

const workData = [
  {
    company: '罗德公共关系顾问有限公司',
    title: 'AAE（助理客户主任）',
    period: '2026.03 - 2026.05',
    tag: '',
    achievements: [
      { title: '品牌文案撰写', desc: '服务阿斯顿·马丁豪华汽车品牌，结合高端用户画像拆解传播需求，独立撰写全渠道品牌文案；复盘传播数据持续优化内容调性，统一品牌对外宣传口径', projectId: 'ruderfinn-copywriting' },
      { title: '舆情数据分析', desc: '定期复盘舆情趋势、输出数据洞察报告，识别潜在口碑风险，为品牌传播策略调整提供支撑', projectId: 'ruderfinn-sentiment' }
    ]
  },
  {
    company: '瑞幸咖啡',
    title: 'HRBP主管（数据运营方向）',
    period: '2024.08 - 2026.01',
    tag: '实习转正',
    achievements: [
      { title: '小鹿听你说平台AI优化项目', desc: '全权负责员工反馈平台全周期运营，完成3400条用户建议闭环；落地AI智能分类、OA线上流转，大幅提升协同效率', projectId: 'ai-platform' },
      { title: '全国HRBP数据模型搭建', desc: '独立搭建2套核心业务数据模型，梳理68个经营核心指标；设计自动化表单&数据仪表盘，实现数据标准化可视化', projectId: 'data-model' },
      { title: '跨部门项目落地', desc: '承接人才储备、门店管理能力升级等重点项目，统筹4场线上培训，项目交付率100%', projectId: 'cross-dept' }
    ]
  }
]

const projectDetails = {
  'ruderfinn-copywriting': {
    title: '品牌文案撰写 — 阿斯顿·马丁',
    sections: [
      { label: '背景', text: '服务阿斯顿·马丁豪华汽车品牌，结合高端用户画像拆解传播需求，负责全渠道品牌文案产出', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '拆解高端用户画像与传播需求，制定品牌文案策略',
        '独立撰写全渠道品牌文案，统一品牌对外宣传口径',
        '复盘传播数据，持续优化内容调性'
      ]},
      { label: '工作成果', text: '建立品牌文案标准化输出流程，统一对外宣传口径，有效提升品牌传播一致性', type: 'result', images: ['/Leoisthebest/罗德-配图1.png'] }
    ]
  },
  'ruderfinn-sentiment': {
    title: '舆情数据分析 — 阿斯顿·马丁',
    sections: [
      { label: '背景', text: '负责阿斯顿·马丁品牌舆情监测与数据分析，为品牌传播策略调整提供数据支撑', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '定期复盘舆情趋势，监测品牌口碑动态',
        '输出数据洞察报告，识别潜在口碑风险',
        '基于数据为品牌传播策略调整提供建议'
      ]},
      { label: '工作成果', text: '建立舆情数据监测体系，有效识别潜在口碑风险，为品牌传播决策提供专业数据支撑', type: 'result', images: ['/Leoisthebest/罗德-配图2.png'] }
    ]
  },
  'ai-platform': {
    title: '小鹿听你说平台AI优化项目',
    sections: [
      { label: '背景', text: '全权负责瑞幸咖啡员工反馈平台"小鹿听你说"全周期运营，面对3400条用户建议人工处理效率低、流转链路长的问题', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '搭建AI前端建议收集入口，实现用户反馈结构化采集',
        '部署AI中台智能分类系统，自动识别建议类型与优先级',
        '落地AI自动建议流转，打通OA线上审批与任务分派链路'
      ]},
      { label: '工作成果', text: '完成3400条用户建议闭环处理，落地AI智能分类与OA线上流转，大幅提升跨部门协同效率', type: 'result', images: ['/Leoisthebest/ai-frontend.jpg', '/Leoisthebest/ai-middleware.jpg', '/Leoisthebest/ai-auto-flow.png'] }
    ]
  },
  'data-model': {
    title: '全国HRBP数据模型搭建',
    sections: [
      { label: '背景', text: '全国HRBP缺乏统一的数据指标体系，经营数据分散、分析维度不一，难以支撑高效决策', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '基于全国HR常用数据维度，系统梳理68个经营核心指标',
        '独立搭建2套核心业务数据模型，归纳指标逻辑与关联关系',
        '设计自动化表单与数据仪表盘，实现数据标准化可视化呈现'
      ]},
      { label: '工作成果', text: '建立全国HRBP数据标准化体系，68个核心指标可视化呈现，数据模型支撑全国HRBP业务洞察与决策', type: 'result', images: ['/Leoisthebest/data-metrics.png', '/Leoisthebest/data-application.png'] }
    ]
  },
  'cross-dept': {
    title: '跨部门项目落地',
    sections: [
      { label: '背景', text: '承接人才储备、门店管理能力升级等跨部门重点项目，需统筹多方资源推动项目落地交付', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '统筹人才储备项目，协调各部门资源推进关键节点',
        '推动门店管理能力升级，设计并组织4场线上培训',
        '建立项目跟踪机制，确保各环节按时交付'
      ]},
      { label: '工作成果', text: '项目交付率100%，4场线上培训全员覆盖，跨部门协作流程标准化', type: 'result', images: ['/Leoisthebest/cross-dept1.png', '/Leoisthebest/cross-dept2.png'] }
    ]
  },
  'intern-elsevier': {
    title: '励德爱思唯尔信息技术（北京）有限公司',
    sections: [
      { label: '背景', text: '负责学术类新媒体全渠道运营，对标行业账号优化内容策略，以数据驱动提升品牌传播效果。', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '拆解同行学术新媒体选题、内容形式与传播路径，对标复盘迭代运营策略',
        '运维公众号/小红书/微博，整合翻译国际学术资讯，原创策划文案',
        '监控阅读、转发、活跃用户等KPI，输出数据周报，动态调整选题与发布节奏'
      ]},
      { label: '工作成果', text: '产出30+篇原创文案，单篇平均阅读5k+，形成竞品分析—内容创作—数据复盘完整闭环，有效提升品牌全域传播影响力', type: 'result', image: '/Leoisthebest/elsevier.png' }
    ]
  },
  'intern-academy': {
    title: '北京市农林科学院数据科学与农业经济研究所',
    sections: [
      { label: '背景', text: '参与《数字化促进城乡基本公共服务均等化》课题研究，完成政策梳理、文本建模与课题报告撰写，输出专业发展研判与落地建议', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        { text: '系统梳理156份国家、省级政策文件，采用政策文本编码完成归类拆分、维度拆解与逻辑建模', images: ['/Leoisthebest/academy-text1.png', '/Leoisthebest/academy-text2.png'] },
        '整合行业业态数据与政策导向，独立完成整篇课题研究报告撰写'
      ]},
      { label: '工作成果', text: '输出城乡公共服务数字化发展专业研判结论，形成可落地优化建议，为课题研究提供完整理论与数据支撑', type: 'result', image: '/Leoisthebest/academy-conclusion.png' }
    ]
  },
  'intern-hill': {
    title: '伟达（中国）公共关系顾问有限公司',
    sections: [
      { label: '背景', text: '服务施耐德电气、建发集团等品牌客户，负责公关稿件创作、新品营销策划及全渠道品牌传播数据复盘工作', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '为施耐德电气撰写10+份专业公关新闻稿，分发搜狐、网易等十余家媒体平台，单篇稿件阅读量达1w+',
        '参与新品营销方案策划，调研竞品传播渠道与内容调性，独立完成方案初稿及PPT制作',
        '复盘建发集团全渠道传播数据，分析线下广告、SEO、媒体通稿投放效果，输出专业复盘PPT并向客户汇报'
      ]},
      { label: '工作成果', text: '产出多篇高传播度公关稿件，策划的营销方案被客户正式采纳落地；通过多维度数据复盘沉淀传播方法论，为品牌营销决策提供专业依据', type: 'result', image: '/Leoisthebest/hill-knowlton.png' }
    ]
  },
  'intern-nandu': {
    title: '广州市南都周刊传媒股份有限公司',
    sections: [
      { label: '背景', text: '负责社会热点选题采写、公众号栏目运营与社群渠道搭建，产出优质原创内容，提升媒体平台传播影响力', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '跟进考公、社会热点等事件，完成选题采访与新闻稿件撰写，多平台发布上线',
        '统筹运营媒笔记公众号栏目，搭建公众号联动社群渠道',
        '策划并推送13篇媒体行业经验专栏笔记，常态化稳定内容更新'
      ]},
      { label: '工作成果', text: '原创稿件在南都周刊全平台累计收获100w+总阅读量，专栏单篇稳定3k+阅读；搭建内容+社群运营闭环，有效沉淀用户、提升栏目品牌影响力', type: 'result', images: ['/Leoisthebest/nandu1.png', '/Leoisthebest/nandu2.png'] }
    ]
  },
  'research-library-survey': {
    title: '高校图书馆数字资源利用行为调研',
    sections: [
      { label: '背景', text: '针对高校图书馆数字资源使用效率低下的问题，带领团队进行系统性调研分析与优化', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '调研国内外12所高校图书馆数字化服务模式，完成SWOT竞品分析',
        '设计问卷并访谈200+师生用户，挖掘核心需求',
        '推动图书馆新增资源采购，落地外文教材阅读专栏'
      ]},
      { label: '工作成果', text: '形成2万字调研报告，获图书馆管理层正式采纳', type: 'result', images: ['/Leoisthebest/资源调研-配图1.png', '/Leoisthebest/资源调研-配图2.png', '/Leoisthebest/资源调研-配图3.png'] }
    ]
  },
  'research-library-data': {
    title: '高校图书馆读者资源利用数据可视化与分析',
    sections: [
      { label: '背景', text: '对图书馆40万条读者借阅数据进行清洗、分析与可视化呈现，挖掘用户行为模式', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '使用Python Pandas处理缺失值、异常值，规范化数据结构',
        '基于Tableau/Excel构建12个数据看板，展示借阅趋势、热门资源等',
        '识别高频读者群体，挖掘阅读偏好，输出用户行为分析报告'
      ]},
      { label: '工作成果', text: '调研报告被图书馆正式采用，用于指导采购决策', type: 'result', images: ['/Leoisthebest/图书馆数据-配图1.png', '/Leoisthebest/图书馆数据-配图2.png', '/Leoisthebest/图书馆数据-配图3.png', '/Leoisthebest/图书馆数据-配图4.png'] }
    ]
  },
  'research-policy': {
    title: '"双一流"背景下高等教育分类政策演进课题研究',
    sections: [
      { label: '背景', text: '参与研究中国双一流高校政策的演变历程与发展趋势，完成核心章节撰写', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '梳理2015-2023年政策文件、学术论文共计500+篇',
        '运用Python进行关键词提取与语义网络分析',
        '独立撰写"学科建设成效评估"核心章节，约8000字'
      ]},
      { label: '工作成果', text: '课题成果提交至教育部相关研究机构参考', type: 'result', images: ['/Leoisthebest/高校分类-配图.png', '/Leoisthebest/高校分类-配图1.png'] }
    ]
  },
  'typeflow-engine': {
    title: 'AI智能排版引擎',
    sections: [
      { label: '背景', text: '微信公众号排版耗时耗力，现有工具模板化严重、设计感不足，运营者需要反复手动调整样式，效率低下', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '设计专业级System Prompt，定义10种排版风格（简约商务/文艺清新/科技未来/中式国风等），覆盖主流公众号视觉需求',
        '对接DeepSeek、GPT-4o、通义千问等多模型，支持流式输出实时预览生成过程',
        '实现风格参考图解析，AI自动提取参考图配色与布局特征并还原',
        '设计长图文模式，从封面到结尾形成连贯视觉流，像一张精心设计的长海报'
      ]},
      { label: '工作成果', text: 'AI一键生成高设计感排版，10种预设风格+自定义风格描述，生成效果远超传统模板工具', type: 'result', images: ['/Leoisthebest/typeflow-step3.png', '/Leoisthebest/typeflow-step4.png'] }
    ]
  },
  'typeflow-dual-mode': {
    title: '双模式编辑系统',
    sections: [
      { label: '背景', text: '不同用户对排版控制粒度需求不同：部分用户希望AI全自动生成，部分用户希望精细控制每个组件的样式', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '设计AI长图文模式：输入内容+风格描述，AI流式生成完整排版，支持中途停止与重新生成',
        '设计手动组件模式：将内容拆分为标题/正文/分割线/图片/引导5类组件，用户可逐个选择样式',
        '实现长图文→组件化自动转换，AI将长图文HTML拆解为独立可编辑组件',
        '开发8种主题色系（简约/商务/中国风/文艺/可爱/科技/清新/复古），组件样式随主题联动'
      ]},
      { label: '工作成果', text: '双模式满足不同场景需求，AI模式一键出图，组件模式精细打磨，两种模式可自由切换', type: 'result', images: ['/Leoisthebest/typeflow-step1.png', '/Leoisthebest/typeflow-step2.png'] }
    ]
  },
  'typeflow-parser': {
    title: '多格式解析与微信适配',
    sections: [
      { label: '背景', text: '公众号运营者内容来源多样（Markdown/Word/PDF），且微信编辑器对HTML样式有严格限制，需解决格式兼容问题', type: 'bg' },
      { label: '执行', text: '', type: 'action', bullets: [
        '开发多格式文件解析器：Markdown直接解析、Word通过mammoth.js提取文本、PDF通过pdfjs-dist逐页提取',
        '实现智能文本结构识别：自动区分标题/正文/引用/列表，短句识别为标题，长句识别为段落',
        '开发微信兼容性清洗工具：移除class/id/style标签、过滤position:fixed/sticky、确保所有样式内联',
        '实现一键复制到剪贴板功能，粘贴到微信编辑器样式完整保留'
      ]},
      { label: '工作成果', text: '支持Markdown/Word/PDF三种格式导入，微信编辑器粘贴样式零丢失，端到端排版效率提升10倍+', type: 'result', images: ['/Leoisthebest/typeflow-step0.png', '/Leoisthebest/typeflow-step5.png'] }
    ]
  }
}

const internshipData = [
  {
    company: '励德爱思唯尔信息技术（北京）有限公司',
    title: '市场部新媒体实习生',
    period: '2024.03 - 2024.07',
    projectId: 'intern-elsevier',
    achievements: [
      { title: '竞品拆解内容策略', desc: '拆解同行学术新媒体选题、内容形式与传播路径，对标复盘迭代运营策略' },
      { title: '全渠道内容运营', desc: '运维公众号/小红书/微博，整合翻译国际学术资讯，原创策划文案' },
      { title: '数据驱动运营', desc: '监控阅读、转发、活跃用户等KPI，输出数据周报，动态调整选题与发布节奏' }
    ]
  },
  {
    company: '北京市农林科学院数据科学与农业经济研究所',
    title: '政策研究实习生',
    period: '2023.12 - 2024.03',
    projectId: 'intern-academy',
    achievements: [
      { title: '政策文本编码建模', desc: '系统梳理156份国家、省级政策文件，采用政策文本编码完成归类拆分、维度拆解与逻辑建模' },
      { title: '课题研究报告撰写', desc: '整合行业业态数据与政策导向，独立完成整篇课题研究报告撰写' }
    ]
  },
  {
    company: '伟达（中国）公共关系顾问有限公司',
    title: '公关实习生',
    period: '2022.12 - 2023.03',
    projectId: 'intern-hill',
    achievements: [
      { title: '公关稿件创作与分发', desc: '为施耐德电气撰写10+份专业公关新闻稿，分发搜狐、网易等十余家媒体，单篇阅读量达1w+' },
      { title: '新品营销方案策划', desc: '调研竞品传播渠道与内容调性，独立完成方案初稿及PPT制作，方案被客户正式采纳落地' },
      { title: '全渠道传播数据复盘', desc: '复盘建发集团线下广告、SEO、媒体通稿等传播效果，输出专业复盘PPT并向客户汇报' }
    ]
  },
  {
    company: '广州市南都周刊传媒股份有限公司',
    title: '运营组（深度训练营）',
    period: '2021.04 - 2022.04',
    projectId: 'intern-nandu',
    achievements: [
      { title: '热点选题采写', desc: '跟进考公、社会热点等事件选题采访与稿件撰写，多平台累计斩获100w+总阅读量' },
      { title: '公众号栏目运营', desc: '统筹运营媒笔记公众号栏目，搭建公众号联动社群渠道，策划推送13篇行业经验专栏笔记，单篇稳定3k+' }
    ]
  }
]

const researchData = [
  {
    title: '高校图书馆数字资源利用行为调研',
    role: '组长',
    period: '2024.03 - 2024.09',
    description: '针对高校图书馆数字资源使用效率低下的问题，带领团队进行系统性调研分析与优化。',
    projectId: 'research-library-survey'
  },
  {
    title: '高校图书馆读者资源利用数据可视化与分析',
    role: '组员',
    period: '2024.01 - 2024.06',
    description: '对图书馆40万条读者借阅数据进行清洗、分析与可视化呈现，挖掘用户行为模式。',
    projectId: 'research-library-data'
  },
  {
    title: '"双一流"背景下高等教育分类政策演进课题研究',
    role: '组员',
    period: '2023.10 - 2024.03',
    description: '参与研究中国双一流高校政策的演变历程与发展趋势，完成核心章节撰写。',
    projectId: 'research-policy'
  }
]

const aiProjectData = [
  {
    title: 'TypeFlow — AI公众号自动排版工具',
    role: '独立开发者',
    period: '2026.05',
    description: '基于AI大模型的微信公众号智能排版工具，支持Markdown/Word/PDF多格式导入，AI一键生成设计感排版，10种预设风格+自定义风格描述，流式输出实时预览。',
    projectId: 'ai-typeflow',
    achievements: [
      { title: 'AI智能排版引擎', desc: '对接DeepSeek/GPT-4o等大模型，设计专业级System Prompt，实现从内容到高设计感HTML的一键转化', projectId: 'typeflow-engine' },
      { title: '双模式编辑系统', desc: 'AI长图文模式（流式生成+风格参考图）+ 手动组件模式（标题/正文/分割线/图片/引导5类组件库）', projectId: 'typeflow-dual-mode' },
      { title: '多格式解析与微信适配', desc: '支持Markdown/Word/PDF文件解析，微信内联样式清洗与兼容性处理，一键复制粘贴到公众号编辑器', projectId: 'typeflow-parser' }
    ]
  }
]

const skillsData = {
  language: [
    { name: '英语四级', level: 554, icon: '📝' },
    { name: '英语六级', level: 477, icon: '📝' },
    { name: '粤语母语', level: 100, icon: '🗣️' }
  ],
  dataTools: ['Python', 'SPSS', 'Excel', 'Tableau', 'Claude Code', 'Trae Vibe Coding'],
  designTools: ['Midjourney AI生图', '剪映AI', 'PS', 'Canva', '秀米', '剪映', 'PR']
}

const honorsData = [
  '校级二等奖学金（5次）',
  '优秀中共党员',
  '全国优秀荐读官',
  '专业排名Top 5%（双学位）',
  '省级挑战杯铜奖',
  '省级电商三创赛二等奖'
]

const navItems = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于我' },
  { id: 'education', label: '教育经历' },
  { id: 'work', label: '正式工作经历' },
  { id: 'ai-project', label: 'AI产品项目' },
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

function TimelineCard({ data, isWork = false, isEducation = false, onProjectClick }) {
  return (
    <div className="relative pl-8 border-l-2 border-ink-muted/20">
      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-royal rounded-full" />
      <div className="bg-white rounded-lg p-6 mb-6 border border-ink-muted/10">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold text-ink">
            {isWork ? data.company : data.school}
          </h3>
          {isEducation && (
            <span className="px-2 py-1 bg-royal-pale text-royal-dark text-xs rounded">
              {data.degree}
            </span>
          )}
          {isWork && data.tag && (
            <span className="px-2 py-1 bg-royal-pale text-royal-dark text-xs rounded">
              {data.tag}
            </span>
          )}
        </div>
        <p className="text-ink-light mb-1">
          {isWork ? data.title : data.major}
        </p>
        <p className="text-sm text-ink-muted mb-3">{data.period}</p>
        
        {isEducation && data.rank && (
          <p className="text-sm mb-2">
            <span className="font-semibold text-royal">专业排名: </span>
            <span className="font-bold text-royal">{data.rank}</span>
          </p>
        )}
        
        {data.scholarship && (
          <p className="text-sm text-ink-light mb-1">
            <span className="font-medium">🏆 </span>{data.scholarship}
          </p>
        )}
        
        {data.honors && (
          <p className="text-sm text-ink-light mb-1">
            <span className="font-medium">⭐ </span>{data.honors}
          </p>
        )}
        
        {data.role && (
          <p className="text-sm text-ink-light">
            <span className="font-medium">📋 </span>{data.role}：{data.description}
          </p>
        )}
        
        {isWork && data.achievements && (
          <ul className="mt-4 space-y-4">
            {data.achievements.map((item, idx) => (
              <li key={idx} className="text-sm text-ink-light">
                {item.projectId ? (
                  <button
                    onClick={() => onProjectClick && onProjectClick(item.projectId)}
                    className="group inline-flex items-center gap-2 px-3 py-1.5 -ml-3 rounded-lg text-royal font-semibold hover:bg-royal-pale transition-all duration-200"
                  >
                    <span>{item.title}</span>
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                ) : (
                  <span className="font-semibold text-ink">{item.title}</span>
                )}
                <span className="ml-1">— {item.desc}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function SkillBar({ name, level, icon }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-royal-pale/30 rounded-xl">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-ink">{name}</span>
          <span className="text-sm font-bold text-royal">{level}</span>
        </div>
        <div className="h-1.5 bg-ink-muted/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${Math.min(level, 100)}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-royal to-royal-light rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

function LanguageCard({ name, level, icon }) {
  return (
    <div className="flex items-center gap-3 p-3.5 bg-royal-pale/30 rounded-xl group hover:bg-royal-pale/50 transition-colors duration-200">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-ink">{name}</span>
      </div>
      {level !== 100 && <span className="text-2xl font-bold text-royal">{level}</span>}
    </div>
  )
}

function SkillTag({ children }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      className="inline-flex items-center px-3.5 py-2 bg-white text-ink-light text-sm rounded-xl mr-2 mb-2.5 border border-ink-muted/10 shadow-sm hover:shadow-md hover:border-royal/20 transition-all duration-200 cursor-default"
    >
      {children}
    </motion.span>
  )
}

function Navbar() {
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
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-ink-muted/10' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <span className="text-lg font-bold text-royal tracking-wide">Leo</span>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, -1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 text-sm text-ink-light hover:text-royal transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink-light"
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
                className="block w-full text-left px-3 py-2 text-ink-light hover:text-royal"
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
            <p className="text-ink-muted mb-4">{personalInfo.politicalStatus} | {personalInfo.graduation}毕业</p>
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">
              {personalInfo.name} <span className="text-royal">({personalInfo.nameEn})</span>
            </h1>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
              {personalInfo.strengths.map((strength, idx) => (
                <span key={idx} className="px-4 py-2 bg-white text-ink-light rounded-full text-sm border border-ink-muted/15">
                  {strength}
                </span>
              ))}
            </div>

            <div className="space-y-3 text-ink-light mb-8">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <img src="/Leoisthebest/cau-logo.svg" alt="中国农业大学" className="w-8 h-8 flex-shrink-0" />
                <span>{personalInfo.school1} · {personalInfo.major1}</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <img src="/Leoisthebest/hlju-logo.png" alt="黑龙江大学" className="w-8 h-8 flex-shrink-0" />
                <span>{personalInfo.school2} · {personalInfo.major2}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href={`tel:${personalInfo.phone}`}
                className="px-6 py-2.5 bg-royal text-white rounded-lg hover:bg-royal-dark transition-colors"
              >
                📞 电话联系
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="px-6 py-2.5 border-2 border-ink-muted/30 text-ink-light rounded-lg hover:border-royal hover:text-royal transition-colors"
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
            <div className="w-48 h-48 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-xl ring-2 ring-royal/20">
              <img 
                src="/Leoisthebest/证件照2026.jpg" 
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
    <Section id="about">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-ink text-center mb-12">关于我</h2>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-ink-muted/10">
          <p className="text-lg text-ink-light leading-relaxed mb-8">
            {aboutMe.description}
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {aboutMe.highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 p-4 bg-royal-pale/50 rounded-lg border-l-3 border-royal"
              >
                <span className="text-royal text-xl">✦</span>
                <span className="text-ink-light">{item}</span>
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
        <h2 className="text-3xl font-bold text-ink text-center mb-12">教育经历</h2>
        <div className="space-y-0">
          {educationData.map((item, idx) => (
            <TimelineCard key={idx} data={item} isEducation />
          ))}
        </div>
      </div>
    </Section>
  )
}

function ProjectModal({ projectId, onClose }) {
  const project = projectDetails[projectId]
  if (!project) return null

  const hasTypedSections = project.sections.some(s => s.type)

  const getLabelBadge = (type, label) => {
    if (type === 'bg') return (
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-bold tracking-wide">{label || '背景'}</span>
    )
    if (type === 'result') return (
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-royal-dark/10 text-royal-dark text-xs font-bold tracking-wide">{label || '工作成果'}</span>
    )
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-royal-light/20 text-royal text-xs font-bold tracking-wide">{label || '执行'}</span>
    )
  }

  const renderImages = (images) => {
    if (!images || images.length === 0) return null
    return (
      <div className={`mt-4 grid ${images.length === 1 ? 'grid-cols-1 max-w-md' : 'grid-cols-2'} gap-4`}>
        {images.map((img, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-ink-muted/8 shadow-sm">
            <img src={img} alt="" className="w-full" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[88vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-royal to-royal-light px-8 py-6 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-xs tracking-widest uppercase mb-1">Project Detail</p>
            <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(88vh-88px)] p-8 space-y-8">
          {project.sections.map((section, idx) => (
            <div key={idx}>
              {hasTypedSections ? (
                <div>
                  <div className="mb-3">{getLabelBadge(section.type, section.label)}</div>
                  {section.text && (
                    <p className="text-[15px] text-ink-light leading-relaxed mb-3">{section.text}</p>
                  )}
                  {section.bullets && (
                    <ul className="space-y-3 mb-3">
                      {section.bullets.map((bullet, bi) => {
                        const bulletText = typeof bullet === 'string' ? bullet : bullet.text
                        const bulletImages = typeof bullet === 'object' ? bullet.images : null
                        return (
                          <li key={bi} className="flex items-start gap-2 text-[15px] text-ink-light leading-relaxed">
                            <span className="text-royal mt-1.5 flex-shrink-0">•</span>
                            <span>{bulletText}</span>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                  {renderImages(section.images || (typeof section.bullets?.[0] === 'object' ? null : null))}
                  {section.bullets && section.bullets.some(b => typeof b === 'object' && b.images) && (
                    <div className="space-y-4">
                      {section.bullets.filter(b => typeof b === 'object' && b.images).map((bullet, bi) => (
                        <div key={bi}>{renderImages(bullet.images)}</div>
                      ))}
                    </div>
                  )}
                  {section.image && renderImages([section.image])}
                </div>
              ) : (
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-royal text-white text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-ink font-medium text-[15px] leading-relaxed">{section.text}</p>
                  </div>
                  {section.image && renderImages([section.image])}
                  {section.images && renderImages(section.images)}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function Work({ onProjectClick }) {
  return (
    <Section id="work">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-ink text-center mb-12">正式工作经历</h2>
        <div className="space-y-0">
          {workData.map((item, idx) => (
            <TimelineCard key={idx} data={item} isWork onProjectClick={onProjectClick} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function AIProject({ onProjectClick }) {
  return (
    <Section id="ai-project">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-ink text-center mb-12">AI产品项目</h2>
        {aiProjectData.map((project, idx) => (
          <div key={idx} className="relative pl-8 border-l-2 border-ink-muted/20">
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-royal rounded-full" />
            <div className="bg-white rounded-lg p-6 mb-6 border border-ink-muted/10">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
                <span className="px-2 py-1 bg-royal-pale text-royal-dark text-xs rounded">
                  {project.role}
                </span>
              </div>
              <p className="text-sm text-ink-muted mb-3">{project.period}</p>
              <p className="text-sm text-ink-light mb-4">{project.description}</p>
              <ul className="mt-4 space-y-4">
                {project.achievements.map((item, i) => (
                  <li key={i} className="text-sm text-ink-light">
                    {item.projectId ? (
                      <button
                        onClick={() => onProjectClick && onProjectClick(item.projectId)}
                        className="group inline-flex items-center gap-2 px-3 py-1.5 -ml-3 rounded-lg text-royal font-semibold hover:bg-royal-pale transition-all duration-200"
                      >
                        <span>{item.title}</span>
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    ) : (
                      <span className="font-semibold text-ink">{item.title}</span>
                    )}
                    <span className="ml-1">— {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Internship({ onProjectClick }) {
  return (
    <Section id="internship">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-ink text-center mb-12">实习经历</h2>
        <div className="space-y-0">
          {internshipData.map((item, idx) => (
            <div key={idx} className="relative pl-8 border-l-2 border-ink-muted/20">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-royal-light rounded-full" />
              <div className="bg-white rounded-lg p-6 mb-6 border border-ink-muted/10">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-ink">{item.company}</h3>
                  {item.projectId && (
                    <button
                      onClick={() => onProjectClick && onProjectClick(item.projectId)}
                      className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-royal text-sm font-semibold hover:bg-royal-pale transition-all duration-200"
                    >
                      <span>查看详情</span>
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <p className="text-ink-light">{item.title}</p>
                  <span className="text-ink-muted/40">|</span>
                  <p className="text-sm text-ink-muted">{item.period}</p>
                </div>
                <ul className="space-y-3">
                  {item.achievements.map((ach, i) => (
                    <li key={i} className="text-sm text-ink-light flex items-start">
                      <span className="text-royal mr-2 mt-0.5">•</span>
                      <span>
                        <span className="font-semibold text-ink">{ach.title}</span>
                        <span className="ml-1">— {ach.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Research({ onProjectClick }) {
  return (
    <Section id="research">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-ink text-center mb-12">科研项目</h2>
        <div className="space-y-0">
          {researchData.map((item, idx) => (
            <div key={idx} className="relative pl-8 border-l-2 border-ink-muted/20">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-royal-light rounded-full" />
              <div className="bg-white rounded-lg p-6 mb-6 border border-ink-muted/10">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <span className="px-2 py-1 bg-royal-pale text-royal-dark text-xs rounded">
                    {item.role}
                  </span>
                  {item.projectId && (
                    <button
                      onClick={() => onProjectClick && onProjectClick(item.projectId)}
                      className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-royal text-sm font-semibold hover:bg-royal-pale transition-all duration-200"
                    >
                      <span>查看详情</span>
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  )}
                </div>
                <p className="text-sm text-ink-muted mb-1">{item.period}</p>
                <p className="text-sm text-ink-light">{item.description}</p>
              </div>
            </div>
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
        <h2 className="text-3xl font-bold text-ink text-center mb-12">专业技能</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-ink-muted/10 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-5">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-royal/10 text-royal">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
              </span>
              <h3 className="text-lg font-semibold text-ink">语言能力</h3>
            </div>
            <div className="space-y-3">
              {skillsData.language.map((item, idx) => (
                <LanguageCard key={idx} name={item.name} level={item.level} icon={item.icon} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-ink-muted/10 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-5">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-royal/10 text-royal">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </span>
              <h3 className="text-lg font-semibold text-ink">数据分析/编程工具</h3>
            </div>
            <div className="flex flex-wrap">
              {skillsData.dataTools.map((skill, idx) => (
                <SkillTag key={idx}>{skill}</SkillTag>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-ink-muted/10 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-5">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-royal/10 text-royal">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
              </span>
              <h3 className="text-lg font-semibold text-ink">设计剪辑</h3>
            </div>
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
    <Section id="honors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-ink text-center mb-12">荣誉奖项</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {honorsData.map((honor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="px-6 py-4 bg-white rounded-lg shadow-sm text-ink-light border border-ink-muted/10"
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
        <h2 className="text-3xl font-bold text-ink mb-12">联系我</h2>
        
        <div className="bg-white rounded-2xl p-8 border border-ink-muted/10 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <button
              onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
              className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl border border-ink-muted/15 hover:border-royal/30 hover:shadow-md transition-all duration-200 w-full md:w-auto"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-royal/10 text-royal flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </span>
              <div className="text-left">
                <p className="text-xs text-ink-muted mb-0.5">电话</p>
                <p className="text-ink font-medium">{personalInfo.phone}</p>
              </div>
              {copied === 'phone' && <span className="text-royal text-sm ml-2">✓</span>}
            </button>

            <button
              onClick={() => copyToClipboard(personalInfo.email, 'email')}
              className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl border border-ink-muted/15 hover:border-royal/30 hover:shadow-md transition-all duration-200 w-full md:w-auto"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-royal/10 text-royal flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <div className="text-left">
                <p className="text-xs text-ink-muted mb-0.5">邮箱</p>
                <p className="text-ink font-medium">{personalInfo.email}</p>
              </div>
              {copied === 'email' && <span className="text-royal text-sm ml-2">✓</span>}
            </button>
          </div>

          <p className="text-ink-muted text-sm">
            感谢您查看我的简历，期待与您交流！
          </p>
        </div>

        <p className="mt-12 text-sm text-ink-muted/60">
          © 2025 {personalInfo.name} {personalInfo.nameEn}. All rights reserved.
        </p>
      </div>
    </Section>
  )
}

function App() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Work onProjectClick={setActiveProject} />
      <AIProject onProjectClick={setActiveProject} />
        <Internship onProjectClick={setActiveProject} />
      <Research onProjectClick={setActiveProject} />
      <Skills />
      <Honors />
      <Contact />
      {activeProject && (
        <ProjectModal projectId={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  )
}

export default App