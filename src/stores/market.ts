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
}

export interface Message {
  id: number
  from: string
  to: string
  content: string
  time: string
  productTitle: string
  unread: boolean
}

export interface UserInfo {
  id: string
  name: string
  avatar: string
  phone: string
  campus: string
  dorm: string
  signature: string
}

export const useMarketStore = defineStore('market', () => {
  const currentUserId = ref('user_001')
  const nextId = ref(20)

  const userInfo = ref<UserInfo>({
    id: 'user_001',
    name: '张三',
    avatar: '',
    phone: '138xxxx1234',
    campus: '校本部',
    dorm: '3号楼 502',
    signature: '热爱生活，喜欢分享',
  })

  const products = ref<Product[]>([
    { id: 1, title: '二手自行车', price: 200, desc: '九成新，买了半年没怎么骑', content: '九成新凤凰牌山地车，买了半年没怎么骑，变速正常，刹车灵敏。因毕业离校低价转让，送车锁一把。', category: '数码/电器', location: '校本部 3 号楼', seller: '张三', contact: '138xxxx1234', publishTime: '2026-06-20', views: 328, image: '', publisherId: 'user_001' },
    { id: 2, title: '考研数学资料', price: 35, desc: '几乎全新，做了几页笔记', content: '考研数学全套资料，几乎全新，只做了前几页笔记。包含高数、线代、概率论三门课程的重点笔记和真题解析。', category: '书籍/资料', location: '校本部 5 号楼', seller: '李四', contact: '139xxxx5678', publishTime: '2026-06-21', views: 156, image: '', publisherId: 'user_002' },
    { id: 3, title: '机械键盘 Cherry 轴', price: 150, desc: '青轴，手感极佳，毕业出', content: 'Cherry MX 青轴机械键盘，87键设计，RGB背光，手感清脆利落。使用一年半，正常使用痕迹，包装盒配件齐全。', category: '数码/电器', location: '校本部 2 号楼', seller: '王五', contact: '137xxxx9012', publishTime: '2026-06-22', views: 267, image: '', publisherId: 'user_003' },
    { id: 4, title: '床上折叠桌', price: 25, desc: '懒人必备，可调节高度', content: '宿舍神器折叠桌，可调节5档高度，防滑桌面，稳固耐用。不用时折叠收纳不占空间。', category: '生活用品', location: '校本部 7 号楼', seller: '赵六', contact: '136xxxx3456', publishTime: '2026-06-23', views: 89, image: '', publisherId: 'user_004' },
    { id: 5, title: 'Kindle Paperwhite 4', price: 400, desc: '国行，带背光，轻微划痕', content: 'Kindle Paperwhite 4代，国行正品，8G内存，带背光阅读灯。屏幕有轻微划痕不影响阅读，续航强劲。附送原装保护壳。', category: '数码/电器', location: '校本部 1 号楼', seller: '孙七', contact: '135xxxx7890', publishTime: '2026-06-24', views: 432, image: '', publisherId: 'user_005' },
    { id: 6, title: '吉他 Yamaha F310', price: 450, desc: '入门神器，保养良好', content: 'Yamaha F310 民谣吉他，经典入门款，音色温暖饱满。弦距已调低，按弦轻松。送琴包、调音器和备用琴弦。', category: '文体/娱乐', location: '校本部 4 号楼', seller: '周八', contact: '134xxxx2345', publishTime: '2026-06-25', views: 201, image: '', publisherId: 'user_002' },
    { id: 7, title: '宿舍小冰箱', price: 300, desc: '50L容量，静音省电', content: '50L小型冰箱，适合宿舍使用，制冷效果好，噪音<35分贝，功率仅60W。上层冷冻下层冷藏，夏天必备。', category: '生活用品', location: '校本部 6 号楼', seller: '吴九', contact: '133xxxx6789', publishTime: '2026-06-26', views: 512, image: '', publisherId: 'user_003' },
    { id: 8, title: '戴尔显示器 24寸', price: 600, desc: '2K分辨率，IPS面板', content: 'Dell U2419H 24寸IPS显示器，2K分辨率，sRGB 99%色域，超窄边框。做设计写代码都很合适，因换4K屏出售。', category: '数码/电器', location: '校本部 3 号楼', seller: '郑十', contact: '132xxxx0123', publishTime: '2026-06-27', views: 178, image: '', publisherId: 'user_004' },
  ])

  const messages = ref<Message[]>([
    { id: 1, from: '李四', to: 'user_001', content: '你好，请问自行车还在吗？', time: '2026-06-27 10:30', productTitle: '二手自行车', unread: true },
    { id: 2, from: '王五', to: 'user_001', content: '机械键盘200出吗？', time: '2026-06-27 11:15', productTitle: '机械键盘 Cherry 轴', unread: true },
    { id: 3, from: '系统', to: 'user_001', content: '欢迎来到校园轻集市！你发布的"二手自行车"已有328次浏览。', time: '2026-06-20 09:00', productTitle: '系统通知', unread: false },
    { id: 4, from: '赵六', to: 'user_001', content: '折叠桌还在吗，可以便宜点吗？', time: '2026-06-27 14:20', productTitle: '床上折叠桌', unread: true },
    { id: 5, from: '系统', to: 'user_001', content: '你的商品"二手自行车"收到一条新留言，请及时查看。', time: '2026-06-27 10:31', productTitle: '系统通知', unread: false },
  ])

  const myProducts = computed(() =>
    products.value.filter((p) => p.publisherId === currentUserId.value)
  )

  const myMessages = computed(() =>
    messages.value.filter((m) => m.to === currentUserId.value)
  )

  const unreadCount = computed(() =>
    messages.value.filter((m) => m.to === currentUserId.value && m.unread).length
  )

  function addProduct(product: Omit<Product, 'id' | 'publishTime' | 'views'>) {
    products.value.push({
      ...product,
      id: nextId.value++,
      publishTime: new Date().toISOString().slice(0, 10),
      views: 0,
    })
  }

  function getProductById(id: number): Product | undefined {
    return products.value.find((p) => p.id === id)
  }

  function incrementViews(id: number) {
    const p = products.value.find((p) => p.id === id)
    if (p) p.views++
  }

  function addMessage(msg: Omit<Message, 'id' | 'time'>) {
    messages.value.push({
      ...msg,
      id: messages.value.length + 1,
      time: new Date().toLocaleString('zh-CN'),
    })
  }

  function markAsRead(msgId: number) {
    const m = messages.value.find((m) => m.id === msgId)
    if (m) m.unread = false
  }

  function updateUserInfo(info: Partial<UserInfo>) {
    Object.assign(userInfo.value, info)
  }

  return {
    currentUserId,
    userInfo,
    products,
    messages,
    myProducts,
    myMessages,
    unreadCount,
    addProduct,
    getProductById,
    incrementViews,
    addMessage,
    markAsRead,
    updateUserInfo,
  }
})
