import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Product {
  id: number
  title: string
  price: number
  desc: string
  content: string
  category: string
  location: string
  seller: string
  contact: string
  publishTime: string
  views: number
  image: string
  publisherId: string
  tag: string
  tagType: string
}

export interface LostFound {
  id: number
  title: string
  desc: string
  content: string
  category: string
  location: string
  type: 'lost' | 'found'
  contact: string
  reward: string
  time: string
  publishTime: string
  views: number
  image: string
  publisherId: string
}

export interface GroupBuy {
  id: number
  title: string
  desc: string
  content: string
  type: string
  total: number
  current: number
  price: string
  deadline: string
  location: string
  contact: string
  publishTime: string
  views: number
  image: string
  publisherId: string
}

export interface ErrandTask {
  id: number
  title: string
  desc: string
  content: string
  type: string
  reward: number
  deadline: string
  fromAddr: string
  toAddr: string
  contact: string
  status: string
  publishTime: string
  views: number
  image: string
  publisherId: string
}

export interface Message {
  id: number
  from: string
  to: string
  content: string
  time: string
  productTitle: string
  unread: boolean
  avatar: string
}

export interface UserInfo {
  id: string
  name: string
  avatar: string
  phone: string
  campus: string
  dorm: string
  college: string
  signature: string
}

export const useMarketStore = defineStore('market', () => {
  const currentUserId = ref('user_001')
  const nextId = ref(30)

  const userInfo = ref<UserInfo>({
    id: 'user_001',
    name: '张三同学',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=220&h=220&fit=crop',
    phone: '138xxxx1234',
    campus: '校本部',
    dorm: '3号楼 502',
    college: '计算机学院 大三',
    signature: '热爱生活，喜欢分享',
  })

  const products = ref<Product[]>([
    { id: 1, title: '九成新 iPhone 14 Pro 256G 深空黑', price: 4200, desc: '国行正品，戴壳贴膜使用半年，电池92%，无划痕无维修，配件齐全。', content: '去年11月购入，国行正品，一直在使用保护壳和钢化膜，屏幕和机身均无划痕。无任何维修历史，所有功能正常。电池健康度 92%，日常中度使用一天一充。配件齐全：原装充电线、包装盒、说明书、取卡针都在。额外赠送一个全新手机壳和一个未使用的钢化膜。因为换了新手机所以出售。校本部3号楼楼下当面交易，支持验机。价格可小刀，屠龙刀勿扰~', category: '数码/电器', location: '校本部3号楼', seller: '张三同学', contact: '138xxxx1234', publishTime: '2026-06-28', views: 328, image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&h=600&fit=crop', publisherId: 'user_001', tag: '二手', tagType: 'primary' },
    { id: 2, title: '考研数学全套资料 几乎全新', price: 35, desc: '高数线代概率论三门笔记加近五年真题解析，字迹工整只做前几页。', content: '考研数学全套资料，几乎全新，只做了前几页笔记。包含高数、线代、概率论三门课程的重点笔记和近五年真题解析。字迹工整，适合考研备考使用。', category: '书籍/资料', location: '校本部5号楼', seller: '李同学', contact: '139xxxx5678', publishTime: '2026-06-27', views: 156, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=600&fit=crop', publisherId: 'user_002', tag: '二手', tagType: 'primary' },
    { id: 3, title: 'Cherry MX 青轴机械键盘 87键RGB', price: 150, desc: '使用一年半手感清脆，RGB背光正常，包装盒配件齐全，毕业出闲置。', content: 'Cherry MX 青轴机械键盘，87键设计，RGB背光，手感清脆利落。使用一年半，正常使用痕迹，包装盒配件齐全。因毕业离校低价转让。', category: '数码/电器', location: '校本部2号楼', seller: '王同学', contact: '137xxxx9012', publishTime: '2026-06-26', views: 267, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop', publisherId: 'user_003', tag: '二手', tagType: 'primary' },
    { id: 4, title: 'Dell U2419H 24寸2K IPS显示器', price: 600, desc: '99%sRGB色域，超窄边框，设计师写代码利器，成色很好。', content: 'Dell U2419H 24寸IPS显示器，2K分辨率，sRGB 99%色域，超窄边框。做设计写代码都很合适，因换4K屏出售。包装盒配件齐全，可在校本部3号楼试机。', category: '数码/电器', location: '校本部3号楼', seller: '赵同学', contact: '136xxxx3456', publishTime: '2026-06-25', views: 178, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop', publisherId: 'user_004', tag: '二手', tagType: 'primary' },
    { id: 5, title: '宿舍小冰箱 50L 静音省电', price: 300, desc: '制冷效果好，噪音<35分贝，功率仅60W，上层冷冻下层冷藏。', content: '50L小型冰箱，适合宿舍使用，制冷效果好，噪音<35分贝，功率仅60W。上层冷冻下层冷藏，夏天必备。因毕业离校转让，使用一年。', category: '生活用品', location: '校本部6号楼', seller: '孙同学', contact: '135xxxx7890', publishTime: '2026-06-24', views: 512, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=600&fit=crop', publisherId: 'user_005', tag: '二手', tagType: 'primary' },
    { id: 6, title: '吉他 Yamaha F310 入门神器', price: 450, desc: '弦距调低按弦轻松，音色温暖饱满，送琴包调音器备用琴弦。', content: 'Yamaha F310 民谣吉他，经典入门款，音色温暖饱满。弦距已调低，按弦轻松。送琴包、调音器和备用琴弦。保养良好，适合初学者。', category: '文体/娱乐', location: '校本部4号楼', seller: '周同学', contact: '134xxxx2345', publishTime: '2026-06-23', views: 201, image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop', publisherId: 'user_002', tag: '二手', tagType: 'primary' },
    { id: 7, title: 'Kindle Paperwhite 4 国行 8G', price: 400, desc: '带背光，屏幕轻微划痕不影响阅读，续航强送原装保护壳。', content: 'Kindle Paperwhite 4代，国行正品，8G内存，带背光阅读灯。屏幕有轻微划痕不影响阅读，续航强劲。附送原装保护壳。', category: '数码/电器', location: '校本部1号楼', seller: '吴同学', contact: '133xxxx6789', publishTime: '2026-06-22', views: 432, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop', publisherId: 'user_003', tag: '二手', tagType: 'primary' },
    { id: 8, title: '出闲置考研英语红宝书+真题', price: 28, desc: '几乎全新正版，只做前两套真题的笔记，附赠词汇速记手册。', content: '正版考研英语红宝书+近十年真题解析，几乎全新，只做了前两套真题的笔记。附赠词汇速记手册和作文模板。', category: '书籍/资料', location: '校本部7号楼', seller: '郑同学', contact: '131xxxx4567', publishTime: '2026-06-28', views: 89, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop', publisherId: 'user_006', tag: '二手', tagType: 'primary' },
  ])

  const lostFounds = ref<LostFound[]>([
    { id: 101, title: '西门打印店丢失黑色 AirPods Pro 充电盒', desc: 'AirPods Pro充电盒，黑色硅胶套上有猫爪贴纸，下午两点丢失。', content: '今天下午两点左右，在校本部西门打印店附近丢失了AirPods Pro充电盒。黑色硅胶保护套，上面贴了白色猫爪贴纸。背面有一处细小划痕，序列号尾号X7K2。这个充电盒上的猫爪贴纸是女朋友送的，有纪念意义。如果哪位好心同学捡到了，麻烦联系我，必有酬谢！', category: '数码/电子', location: '西门打印店', type: 'lost', contact: '139xxxx5678', reward: '感谢酬金 ¥50', time: '2026年6月28日 下午2点左右', publishTime: '2026-06-28', views: 156, image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07afc?w=800&h=600&fit=crop', publisherId: 'user_007' },
    { id: 102, title: '拾到校园卡一张 尾号8832 请失主联系', desc: '图书馆二楼自习室捡到，请失主尽快联系核实后取回。', content: '今晚在图书馆二楼自习室捡到一张校园卡，尾号8832。请失主看到后尽快联系核实身份取回。', category: '证件/卡片', location: '图书馆二楼', type: 'found', contact: '138xxxx1111', reward: '-', time: '2026年6月28日 晚上7点左右', publishTime: '2026-06-28', views: 89, image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=600&fit=crop', publisherId: 'user_008' },
    { id: 103, title: '东区食堂丢失蓝色折叠天堂伞', desc: '昨天东区食堂二楼吃饭忘记拿，蓝色天堂伞手柄有磨损。', content: '昨天中午在东区食堂二楼吃午饭时忘记拿了，蓝色天堂折叠伞，手柄处有些磨损痕迹。使用了一年多，虽然不是很贵但用习惯了。', category: '生活用品', location: '东区食堂', type: 'lost', contact: '136xxxx2222', reward: '-', time: '2026年6月27日 中午12点左右', publishTime: '2026-06-27', views: 45, image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&h=600&fit=crop', publisherId: 'user_009' },
    { id: 104, title: '操场入口拾到钥匙一串', desc: '在操场入口处拾到一串钥匙，包含宿舍钥匙和U盘。', content: '今天下午在操场入口附近的草坪上拾到一串钥匙，包含两把宿舍钥匙、一个银色U盘和一个小挂饰。请失主联系核实后取回。', category: '钥匙/饰品', location: '操场入口', type: 'found', contact: '137xxxx3333', reward: '-', time: '2026年6月28日 下午3点左右', publishTime: '2026-06-28', views: 32, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=600&fit=crop', publisherId: 'user_010' },
  ])

  const groupBuys = ref<GroupBuy[]>([
    { id: 201, title: '东区食堂三楼霸王茶姬拼奶茶 还差2人！', desc: '5人拼享6折优惠，已有3人确认，人均约18元，下午5点集合。', content: '霸王茶姬最近出了新品，五个人一起拼可以享受6折优惠！目前已有3个人确认了，还差2个小伙伴。今天下午5点在东区食堂三楼奶茶店集合。大家可自由选择口味，然后一起结账。人均约18元（原价30），比单独买便宜将近一半！欢迎加入。', type: '拼单购物', total: 5, current: 3, price: '¥18', deadline: '2026-06-28 17:00', location: '东区食堂三楼奶茶店', contact: '138xxxx4444', publishTime: '2026-06-28', views: 89, image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&h=400&fit=crop', publisherId: 'user_011' },
    { id: 202, title: '周五晚上拼车去高铁站 ¥30/人', desc: '周五晚7点南门出发，舒适五座3空位，准时出发。', content: '周五晚上7点从校本部南门出发去高铁站，车型舒适五座，目前司机和1位乘客已确定，还有3个空位。每人30元车费，行李可带。准时出发不等人。', type: '拼车出行', total: 5, current: 2, price: '¥30', deadline: '2026-07-03 19:00', location: '校本部南门', contact: '139xxxx5555', publishTime: '2026-06-27', views: 156, image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop', publisherId: 'user_012' },
    { id: 203, title: '周六下午篮球搭子 缺3人', desc: '每周六下午3点体育馆半场4v4，目前5人还缺3个，水平不限。', content: '每周六下午常规篮球局，半场4v4，目前稳定5人，想再找3个凑齐8人方便轮换。水平不限主要图个开心。准时到体育馆即可，自带水和球鞋。', type: '运动搭子', total: 8, current: 5, price: '免费', deadline: '2026-07-04 15:00', location: '体育馆篮球场', contact: '136xxxx6666', publishTime: '2026-06-26', views: 67, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop', publisherId: 'user_013' },
    { id: 204, title: '考研自习搭子 图书馆固定座位', desc: '找2个同学一起占座自习，互相监督，每天早上7点半图书馆见。', content: '正在准备考研复习，想找2个志同道合的同学一起在图书馆自习。互相监督不摸鱼，分享资料和学习方法。每天早上7点半图书馆门口集合占座，至少待到晚上9点。', type: '学习搭子', total: 3, current: 1, price: '免费', deadline: '2026-07-10', location: '图书馆三楼自习区', contact: '137xxxx7777', publishTime: '2026-06-28', views: 42, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop', publisherId: 'user_014' },
  ])

  const errandTasks = ref<ErrandTask[]>([
    { id: 301, title: '帮取中通快递到6栋宿舍', desc: '西门菜鸟驿站中通快递，羽绒服体积大但不重，送到6栋楼下。', content: '在西门菜鸟驿站有一个中通快递需要取，是一件羽绒服。东西不重但包装袋体积略大。取件码：7-3-8821。取出来之后送到校本部6栋宿舍楼下，到了打我电话我下来拿。希望今天下午6点前完成，酬谢5元。感谢帮忙！', type: '代取快递', reward: 5, deadline: '2026-06-28 18:00', fromAddr: '西门菜鸟驿站', toAddr: '校本部6栋宿舍楼下', contact: '136xxxx3456', status: '待接单', publishTime: '2026-06-28', views: 67, image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&h=400&fit=crop', publisherId: 'user_015' },
    { id: 302, title: '东门煎饼果子代买 加蛋加肠不要辣', desc: '晚上想吃煎饼，送到3号楼405，微信转账。', content: '晚上突然想吃东门那家的煎饼果子，加蛋加肠不要辣，送到校本部3号楼405。到了打我电话，微信转账给你。感谢！', type: '代买饭菜/零食', reward: 8, deadline: '2026-06-28 21:00', fromAddr: '东门夜市煎饼摊', toAddr: '校本部3号楼405', contact: '138xxxx8888', status: '待接单', publishTime: '2026-06-28', views: 23, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop', publisherId: 'user_016' },
    { id: 303, title: '代打印论文初稿 30页双面', desc: '论文初稿30页双面打印，送到图书馆三楼12号桌。', content: '需要打印论文初稿，PDF已经发到打印店的邮箱了。30页双面打印装订好，送到图书馆三楼自习区12号桌。酬谢3元。', type: '代办事务', reward: 3, deadline: '2026-06-28 16:00', fromAddr: '图书馆打印室', toAddr: '图书馆三楼12号桌', contact: '139xxxx9999', status: '已接单', publishTime: '2026-06-27', views: 45, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop', publisherId: 'user_017' },
    { id: 304, title: '教学楼到宿舍楼之间送份资料', desc: '帮忙把资料从教学楼A座送到校本部6栋楼下，就一份文件袋。', content: '有一份文件袋需要从教学楼A座312教室送到校本部6栋楼下。就在校内的距离，走路10分钟的事。到了6栋楼下打我电话我下来拿。酬谢5元。', type: '校园跑腿', reward: 5, deadline: '2026-06-28 17:30', fromAddr: '教学楼A座312', toAddr: '校本部6栋楼下', contact: '135xxxx0000', status: '待接单', publishTime: '2026-06-28', views: 18, image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop', publisherId: 'user_018' },
  ])

  const messages = ref<Message[]>([
    { id: 1, from: '李同学', to: 'user_001', content: '你好，请问自行车还在吗？价格能优惠些吗？', time: '2026-06-28 10:30', productTitle: '二手自行车', unread: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { id: 2, from: '王同学', to: 'user_001', content: '机械键盘200元出吗？我就在校本部可以当面来看。', time: '2026-06-28 11:15', productTitle: '机械键盘', unread: true, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop' },
    { id: 3, from: '系统通知', to: 'user_001', content: '欢迎来到校园轻集市！你发布的"二手自行车"已有328次浏览。', time: '2026-06-20 09:00', productTitle: '平台通知', unread: false, avatar: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop' },
    { id: 4, from: '赵同学', to: 'user_001', content: '折叠桌还在吗，可以便宜点吗？我就在隔壁楼随时可以过来。', time: '2026-06-27 14:20', productTitle: '床上折叠桌', unread: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { id: 5, from: '拼单群聊-奶茶', to: 'user_001', content: '王同学：我确认参加，选伯牙绝弦～今天下午见！', time: '2026-06-26 18:00', productTitle: '霸王茶姬拼单', unread: false, avatar: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=100&h=100&fit=crop' },
    { id: 6, from: '跑腿接单-小刘', to: 'user_001', content: '好的，我马上去西门菜鸟驿站取，大概15分钟送到6栋。', time: '2026-06-26 15:30', productTitle: '取快递任务', unread: false, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  ])

  const myProducts = computed(() => products.value.filter((p) => p.publisherId === currentUserId.value))
  const myMessages = computed(() => messages.value.filter((m) => m.to === currentUserId.value))
  const unreadCount = computed(() => messages.value.filter((m) => m.to === currentUserId.value && m.unread).length)

  function addProduct(product: Omit<Product, 'id' | 'publishTime' | 'views'>) {
    products.value.push({ ...product, id: nextId.value++, publishTime: new Date().toISOString().slice(0, 10), views: 0 })
  }

  function getProductById(id: number): Product | undefined {
    return products.value.find((p) => p.id === id)
  }

  function incrementViews(id: number) {
    const p = products.value.find((p) => p.id === id)
    if (p) p.views++
  }

  function addMessage(msg: Omit<Message, 'id' | 'time'>) {
    messages.value.push({ ...msg, id: messages.value.length + 1, time: new Date().toLocaleString('zh-CN') })
  }

  function markAsRead(msgId: number) {
    const m = messages.value.find((m) => m.id === msgId)
    if (m) m.unread = false
  }

  function updateUserInfo(info: Partial<UserInfo>) {
    Object.assign(userInfo.value, info)
  }

  return {
    currentUserId, userInfo, products, lostFounds, groupBuys, errandTasks, messages,
    myProducts, myMessages, unreadCount,
    addProduct, getProductById, incrementViews, addMessage, markAsRead, updateUserInfo,
  }
})
