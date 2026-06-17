import { useMemo, useState } from "react";
import {
  Bus,
  CalendarDays,
  Camera,
  ChevronDown,
  Clock3,
  Coffee,
  CreditCard,
  MapPin,
  Navigation,
  Plane,
  ShoppingBag,
  Sparkles,
  Store,
  Train,
  Utensils,
  Waves,
} from "lucide-react";

type IconName =
  | "plane"
  | "food"
  | "shopping"
  | "river"
  | "culture"
  | "coffee"
  | "beauty"
  | "transfer";

type Stop = {
  time: string;
  title: string;
  area: string;
  icon: IconName;
  transport?: string;
  highlights: string[];
  must: string[];
  places?: {
    name: string;
    specialty: string;
    image: string;
    detail: string;
    order: string;
    logistics: string;
  }[];
};

type DayPlan = {
  id: string;
  day: string;
  title: string;
  route: string;
  mood: string;
  image: string;
  imageCredit: string;
  stops: Stop[];
};

const iconMap = {
  plane: Plane,
  food: Utensils,
  shopping: ShoppingBag,
  river: Waves,
  culture: Camera,
  coffee: Coffee,
  beauty: Sparkles,
  transfer: Navigation,
};

const plans: DayPlan[] = [
  {
    id: "day1",
    day: "Day 1",
    title: "明洞落地开吃，汝矣岛购物后汉江泡面",
    route: "仁川机场 -> 明洞 -> The Hyundai Seoul -> 汝矣岛汉江公园",
    mood: "第一天不硬逛远点，把夜景、泡面、商场和明洞吃饭串成一条线。",
    image: "https://images.unsplash.com/photo-1608731789519-d766f7907272?auto=format&fit=crop&w=1200&q=80",
    imageCredit: "Seoul night skyline, Unsplash",
    stops: [
      {
        time: "13:35 - 16:20",
        title: "落地仁川，机场巴士进城",
        area: "ICN -> voco Seoul Myeongdong",
        icon: "plane",
        transport: "6001 机场巴士；下车优先查 Hoehyeon Station 或 Myeong-dong Station 哪站离酒店更近。",
        highlights: ["行李直接放大巴下层", "进城不用换乘地铁", "到酒店先 check-in 或寄存"],
        must: ["机场单独买 6001 票", "上车前用 Naver Map 确认最近下车站"],
      },
      {
        time: "17:00 - 18:15",
        title: "明洞华沙烤牛肠",
        area: "Myeongdong",
        icon: "food",
        transport: "酒店步行或短程打车，尽量避开正晚餐排队高峰。",
        highlights: ["第一餐直接进入韩式重口味", "牛肠、炒饭、泡菜组合最稳", "吃完就近出发去汝矣岛"],
        must: ["牛肠拼盘", "最后加炒饭", "不要拖到 19:00 后再出发"],
      },
      {
        time: "18:15 - 20:20",
        title: "The Hyundai Seoul 快逛",
        area: "Yeouido",
        icon: "shopping",
        transport: "会贤 Line 4 -> 首尔站换 Line 1 -> 新吉换 Line 5 -> 汝矣岛；赶时间可打车。",
        highlights: ["商场空间感强，适合第一晚轻松逛", "B1/B2 食品和潮流生活方式区最好逛", "适合买轻便小物，不建议大采购"],
        must: ["Sound Forest 中庭", "B1/B2 生活方式店", "咖啡或甜点打卡"],
        places: [
          {
            name: "Sound Forest",
            specialty: "室内花园中庭，适合拍商场空间感照片",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
            detail: "The Hyundai Seoul 的标志性中庭，空间开阔，第一晚时间不多时优先打卡这里。",
            order: "不买东西也值得上去看一眼，拍完再下 B1/B2。",
            logistics: "百货本体大约 20:00 左右结束营业，建议先拍中庭再逛地下层。",
          },
          {
            name: "B1/B2 食品区",
            specialty: "甜品、咖啡、伴手礼和快闪小吃",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
            detail: "最适合短时间快逛：甜品、咖啡、烘焙、熟食和小包装伴手礼集中。",
            order: "买轻便零食、饼干、巧克力和咖啡，不建议买太重的盒装礼物。",
            logistics: "从这里去汉江公园方便，买完直接步行去 Yeouinaru。",
          },
          {
            name: "生活方式/设计品牌区",
            specialty: "香氛、家居小物、韩国设计单品",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
            detail: "适合买韩国本土设计小物，比免税店更容易发现特别款。",
            order: "看杯子、香氛、家居摆件、小包和文具类。",
            logistics: "如果只剩 30 分钟，优先 B1/B2；时间够再逛设计区。",
          },
        ],
      },
      {
        time: "20:30 - 22:00",
        title: "汝矣岛汉江公园泡面",
        area: "Yeouido Hangang Park",
        icon: "river",
        transport: "The Hyundai 步行 15-20 分钟，或 Line 5 一站到 Yeouinaru。",
        highlights: ["便利店自动拉面机", "汉江夜景", "适合拍旅行第一晚的松弛感照片"],
        must: ["泡面 + 紫菜包饭", "香蕉牛奶或冰杯饮料", "带薄外套，江边晚上有风"],
      },
      {
        time: "22:00 - 22:45",
        title: "回明洞休息",
        area: "Yeouinaru -> Myeongdong",
        icon: "transfer",
        transport: "Line 5 -> 东大门历史文化公园换 Line 4 -> 明洞/会贤。",
        highlights: ["路线清楚，不需要深夜打车", "回酒店前可顺路补 Olive Young 小件", "第一天保留体力"],
        must: ["确认末班车时间", "Day 2 要早起，别再加夜宵局"],
      },
    ],
  },
  {
    id: "day2",
    day: "Day 2",
    title: "传统文化暴走，圣水洞扫店，晚上梨泰院",
    route: "明洞 -> 景福宫 -> 北村 -> 圣水洞 -> 梨泰院",
    mood: "白天拍传统建筑和街区，下午切到圣水潮流店，晚上把梨泰院的夜生活补上。",
    image: "https://images.unsplash.com/photo-1638964663550-e2123ac8900b?auto=format&fit=crop&w=1200&q=80",
    imageCredit: "Gyeongbokgung mood, Unsplash",
    stops: [
      {
        time: "08:30 - 11:00",
        title: "景福宫",
        area: "Gyeongbokgung",
        icon: "culture",
        transport: "明洞 Line 4 -> 忠武路换 Line 3 -> 景福宫。",
        highlights: ["韩服拍照最出片", "建筑纵深适合广角照片", "上午光线和体力都更好"],
        must: ["光化门正面", "勤政殿", "韩服租借店提前定"],
      },
      {
        time: "11:00 - 12:30",
        title: "北村韩屋村与三清洞",
        area: "Bukchon / Samcheong-dong",
        icon: "culture",
        transport: "从景福宫步行串联，结束后靠近安国站。",
        highlights: ["韩屋坡道视角", "小店和茶馆密度高", "比景福宫更适合慢慢拍街景"],
        must: ["北村经典上坡机位", "三清洞小店", "安国站附近咖啡"],
      },
      {
        time: "12:30 - 14:00",
        title: "午餐：炸鸡或烤肉",
        area: "Jongno / Euljiro",
        icon: "food",
        transport: "建议留在钟路、乙支路、安国附近吃，饭后从乙支路3街或安国转 Line 2 去圣水。",
        highlights: ["比参鸡汤更符合你的口味", "炸鸡最顺路，烤肉更满足但要控制排队", "维也纳咖啡放到圣水 Milestone，不占午餐时间"],
        must: ["想省时间选 Kyochon 1991 安国", "想吃经典老店选 Woo Lae Oak", "想吃最强猪肉烤肉可绕去 Geumdwaeji Sikdang"],
        places: [
          {
            name: "Kyochon 1991 安国店",
            specialty: "酱油蒜香、蜂蜜、辣味炸鸡；最顺路",
            image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80",
            detail: "在安国/三清洞动线内，Corner 指到地址 43 Bukchon-ro 5-gil，适合景福宫和北村后直接吃。",
            order: "半半口味：Soy Garlic + Red 或 Honey；搭配腌萝卜、啤酒/无酒精饮料。",
            logistics: "最少绕路，吃完去乙支路喝咖啡或直接转地铁去圣水。",
          },
          {
            name: "Woo Lae Oak 乙支路",
            specialty: "老牌名店；烤牛肉 Bulgogi + 平壤冷面",
            image: "https://cdn.shopify.com/s/files/1/0609/9376/5551/files/woo-lae-oak-uraeok-seoul-naengmyeon-bulgogi_11.jpg?v=1737607624",
            detail: "1946 年开业的经典老店，Michelin Guide 介绍为首尔知名平壤冷面餐厅；Tripadvisor 页面显示 4.2/5。",
            order: "Bulgogi + Pyongyang Naengmyeon；想吃烤肉但又不想太重，这家比纯五花肉更优雅。",
            logistics: "从安国/钟路过去顺路，适合把午餐和乙支路咖啡串起来。",
          },
          {
            name: "Geumdwaeji Sikdang 药水",
            specialty: "厚切猪肉烤肉；Michelin Bib Gourmand 级别口碑",
            image: "https://cdn.shopify.com/s/files/1/0609/9376/5551/files/Geumdwaeji_Sikdang_15.jpg?v=1666077207",
            detail: "在药水站附近，以厚切猪肉、五花肉和猪颈肉出名，SEOULSHOPPER 也标注其自 2019 年起被 Michelin Guide 收录。",
            order: "Samgyeopsal + Moksal；如果能接受排队，这是烤肉优先级最高的一家。",
            logistics: "比前两家更绕、排队风险更高。若当天已经晚了，不建议强行去。",
          },
        ],
      },
      {
        time: "14:00 - 18:30",
        title: "圣水洞时尚风暴",
        area: "Seongsu",
        icon: "shopping",
        transport: "安国 Line 3 -> 乙支路3街换 Line 2 -> 圣水。",
        highlights: ["首尔最强概念店街区之一", "香氛、潮牌、咖啡都集中", "Milestone 放在圣水中段休息"],
        must: ["Dior Seongsu 外观", "Tamburins", "Ader Error", "Milestone Coffee Roasters"],
        places: [
          {
            name: "Milestone Coffee Roasters Seongsu",
            specialty: "三巨头版本之一；Vienna Coffee / Einspänner",
            image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
            detail: "Milestone Coffee Roasters 是常见中文游客版维也纳咖啡三巨头之一。SEOULSHOPPER 记录圣水店地址为 15 Seoulsup 4-gil，营业约 10:00-21:00。",
            order: "Iced Vienna Coffee / Einspänner；想吃甜点可加 Tiramisu。",
            logistics: "放在圣水扫店中段最顺，逛 Dior / Tamburins / Ader Error 之间进去坐 30-40 分钟。",
          },
          {
            name: "Dior Seongsu",
            specialty: "建筑外观和花园感布景，主要拍照打卡",
            image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=80",
            detail: "重点是外观和概念店氛围，不一定要进店消费。",
            order: "拍外立面、门口花园感区域；如果排队太久只拍外观即可。",
            logistics: "圣水热门点之一，建议和 Tamburins、Ader Error 顺路串。",
          },
          {
            name: "Tamburins Seongsu",
            specialty: "香水、护手霜、蛋形香膏和艺术装置",
            image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=80",
            detail: "适合买轻便又有辨识度的香氛产品，送礼也好带。",
            order: "护手霜、香膏、香水小瓶；先闻再买，别只看包装。",
            logistics: "如果 Day 3 还去 Dosan 店，这里可以先试香，最后在狎鸥亭补买。",
          },
          {
            name: "Ader Error",
            specialty: "解构设计、卫衣、T 恤、包袋和配饰",
            image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
            detail: "适合看韩国潮流设计和空间陈列，服饰尺码和库存看现场。",
            order: "卫衣、T 恤、帽子、小包、联名配饰。",
            logistics: "试穿会耗时，若圣水只剩 2 小时，优先选 1-2 家认真逛。",
          },
          {
            name: "Onion Seongsu",
            specialty: "废墟风咖啡厅，雪山面包和空间氛围",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
            detail: "圣水经典咖啡店，适合在扫店中段坐下回血。",
            order: "雪山面包；咖啡已经放 Milestone，这里可以只买面包或直接跳过。",
            logistics: "热门时段排队明显，和 Milestone 二选一即可，不建议两家都排队。",
          },
        ],
      },
      {
        time: "18:30 - 21:30",
        title: "梨泰院晚餐与夜逛",
        area: "Itaewon",
        icon: "food",
        transport: "圣水 Line 2 -> 新堂换 Line 6 -> 梨泰院。",
        highlights: ["国际化餐厅和酒吧密度高", "夜晚比白天更有氛围", "适合把第一天没去的松弛街区补上"],
        must: ["梨泰院 Class 天桥附近", "坡道街景", "晚餐或小酒馆"],
      },
      {
        time: "21:30 - 22:00",
        title: "大头贴 & 人生四格",
        area: "Itaewon / Myeongdong",
        icon: "culture",
        transport: "梨泰院附近看到 Photoism / Life4Cuts 就直接拍；如果没看到，回明洞后再找分店。",
        highlights: ["适合把 Day 2 穿搭和妆造留下来", "大头贴和人生四格都很快，不会影响回酒店", "多人拍更有旅行感"],
        must: ["选韩式自然滤镜", "拍前整理头发和口红", "保留电子版或扫码下载"],
        places: [
          {
            name: "Life4Cuts 人生四格",
            specialty: "四连拍照片；经典韩式旅行纪念",
            image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80",
            detail: "韩国很常见的自助四格照品牌，适合晚饭后快速拍一组，不需要预约。",
            order: "选四格模板；拍 2-3 轮，最后选表情最自然的一版。",
            logistics: "梨泰院/明洞热门商圈都容易遇到，看到就拍，不建议专门绕远。",
          },
          {
            name: "Photoism",
            specialty: "大头贴、证件风和明星联名相框",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
            detail: "Photoism 的相框和滤镜选择更丰富，适合想要更精致的大头贴效果。",
            order: "选证件风/半身照模板；如果有喜欢的联名框可以优先用。",
            logistics: "如果梨泰院没找到，回明洞后作为最后 20 分钟补拍项目。",
          },
        ],
      },
    ],
  },
  {
    id: "day3",
    day: "Day 3",
    title: "Daybeau 变美，狎鸥亭罗德奥收尾",
    route: "明洞 -> Daybeau -> 狎鸥亭罗德奥 -> 机场",
    mood: "回程日只安排一条江南线，皮肤科之后轻逛、轻买、按时回机场。",
    image: "https://images.unsplash.com/photo-1655467022709-6a7a2b05967a?auto=format&fit=crop&w=1200&q=80",
    imageCredit: "Seoul cafe and shopping mood, Unsplash",
    stops: [
      {
        time: "09:00 - 10:15",
        title: "退房寄存行李",
        area: "voco Seoul Myeongdong",
        icon: "transfer",
        transport: "酒店前台寄存大件行李，随身只带护照、卡、手机和补妆用品。",
        highlights: ["回程日轻装移动", "免税/退税材料提前放好", "避免拖箱去皮肤科"],
        must: ["护照原件", "航班信息", "防晒和口罩"],
      },
      {
        time: "10:30 - 12:30",
        title: "Daybeau 皮肤科",
        area: "Myeongdong / Euljiro 1-ga",
        icon: "beauty",
        transport: "从酒店步行或短程打车；预约 10:30，按 2 小时预留。",
        highlights: ["回程日前置完成医美项目", "做完可直接转江南轻逛", "结账时处理现场退税"],
        must: ["不要化妆去", "只做已预约项目", "做完立刻补防晒"],
      },
      {
        time: "12:30 - 13:15",
        title: "前往狎鸥亭罗德奥",
        area: "Apgujeong Rodeo",
        icon: "transfer",
        transport: "乙支路入口 Line 2 -> 往十里换 Suin-Bundang Line -> 狎鸥亭罗德奥。",
        highlights: ["路线不绕回酒店", "比打车更稳定", "午餐可到江南再吃"],
        must: ["Naver Map 查实时换乘", "避开拖大件行李"],
      },
      {
        time: "13:15 - 16:00",
        title: "狎鸥亭罗德奥与清潭轻逛",
        area: "Apgujeong / Dosan",
        icon: "shopping",
        transport: "步行串联；体力不足时短程打车到 Haus Dosan。",
        highlights: ["江南街拍感最强", "眼镜、香氛、设计小物集中", "适合买轻便好带的东西"],
        must: ["Gentle Monster Haus Dosan", "Tamburins Dosan", "Wiggle Wiggle", "Nudake"],
        places: [
          {
            name: "Gentle Monster Haus Dosan",
            specialty: "墨镜、眼镜、沉浸式空间和拍照装置",
            image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=80",
            detail: "适合试墨镜、看装置和拍照。价格不一定最便宜，但款式和体验最好。",
            order: "墨镜、透明框、金属框；先拍型号，最后确认退税和库存。",
            logistics: "Day 3 时间有限，最多控制 45 分钟。",
          },
          {
            name: "Tamburins Dosan",
            specialty: "香水、护手霜、香膏，适合送礼",
            image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80",
            detail: "和 Gentle Monster 属同一审美系统，适合把香氛作为伴手礼。",
            order: "护手霜、蛋形香膏、小容量香水；适合送朋友。",
            logistics: "如果圣水店已买，这里只补缺货款。",
          },
          {
            name: "Wiggle Wiggle",
            specialty: "彩色生活杂货、手机配件、杯子和伴手礼",
            image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=80",
            detail: "颜色强烈、可爱小物多，适合给香港朋友带轻便礼物。",
            order: "手机壳、杯子、贴纸、毛巾、小包。",
            logistics: "很容易买多，注意回程行李空间。",
          },
          {
            name: "Nudake",
            specialty: "视觉系甜品、蛋糕和咖啡",
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
            detail: "视觉效果强，适合作为皮肤科后的轻甜品停靠。",
            order: "招牌视觉系甜品 + 咖啡；不要点太多，后面还要赶机场。",
            logistics: "排队长就拍照离开，别压缩回酒店取行李时间。",
          },
        ],
      },
      {
        time: "16:00 - 18:40",
        title: "取行李并前往仁川机场",
        area: "Apgujeong -> Myeongdong -> ICN",
        icon: "plane",
        transport: "狎鸥亭回酒店取行李；回机场优先 AREX，行李多且路况好再坐 6001。",
        highlights: ["20:00 飞机建议 17:00 左右离开酒店", "AREX 更不怕堵车", "机场预留免税提货和退税时间"],
        must: ["17:00 前后出发去机场", "提前确认航站楼", "机场提货单和护照放随身包"],
      },
    ],
  },
];

const shoppingZones = [
  {
    zone: "The Hyundai Seoul",
    tone: "商场型集中购物",
    bestFor: "生活方式、潮流集合、甜品咖啡、空间打卡",
    picks: ["Sound Forest：中庭拍照", "B1/B2：甜品咖啡伴手礼", "设计品牌区：香氛家居小物"],
  },
  {
    zone: "圣水洞",
    tone: "概念店与潮流品牌",
    bestFor: "香氛、买手店、咖啡、品牌外观拍照",
    picks: ["Dior：建筑外观打卡", "Tamburins：香水护手霜", "Ader Error：卫衣包袋", "Onion：雪山面包"],
  },
  {
    zone: "狎鸥亭罗德奥",
    tone: "江南街拍与设计小物",
    bestFor: "眼镜、香氛、可爱周边、轻便伴手礼",
    picks: ["Gentle Monster：墨镜眼镜", "Tamburins：香水香膏", "Wiggle Wiggle：彩色杂货", "Nudake：视觉系甜品"],
  },
  {
    zone: "明洞",
    tone: "补货与夜间机动",
    bestFor: "Olive Young、美妆、夜市小吃、最后补买",
    picks: ["Olive Young：面膜护肤", "明洞夜市：芝士年糕串", "乐天免税：大牌美妆香水"],
  },
];

function App() {
  const [activeDay, setActiveDay] = useState(plans[0].id);
  const [expandedStop, setExpandedStop] = useState<string | null>(null);
  const [expandedPlace, setExpandedPlace] = useState<string | null>(null);
  const currentPlan = useMemo(
    () => plans.find((plan) => plan.id === activeDay) ?? plans[0],
    [activeDay],
  );

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-image">
          <img src={currentPlan.image} alt={currentPlan.title} />
        </div>
        <div className="hero-content">
          <div className="status-row">
            <span>Seoul 3 Days</span>
            <span>13:35 落地 ICN</span>
          </div>
          <h1>首尔三日行程</h1>
          <p>明洞落地吃牛肠，汝矣岛汉江夜泡面，景福宫与圣水暴走，Daybeau 后狎鸥亭收尾。</p>
          <div className="summary-grid">
            <div>
              <CalendarDays size={17} />
              <strong>3 天</strong>
              <span>紧凑但可执行</span>
            </div>
            <div>
              <Train size={17} />
              <strong>Climate Card</strong>
              <span>市内交通最省心</span>
            </div>
            <div>
              <Bus size={17} />
              <strong>6001 / AREX</strong>
              <span>机场单独买票</span>
            </div>
          </div>
        </div>
      </section>

      <nav className="day-tabs" aria-label="选择日期">
        {plans.map((plan) => (
          <button
            className={plan.id === activeDay ? "day-tab active" : "day-tab"}
            key={plan.id}
            onClick={() => {
              setActiveDay(plan.id);
              setExpandedStop(null);
              setExpandedPlace(null);
            }}
          >
            <span>{plan.day}</span>
            <strong>{plan.title.split("，")[0]}</strong>
          </button>
        ))}
      </nav>

      <section className="plan-card">
        <div className="plan-heading">
          <div>
            <span className="section-kicker">{currentPlan.day}</span>
            <h2>{currentPlan.title}</h2>
          </div>
          <p>{currentPlan.mood}</p>
        </div>
        <div className="route-bar">
          <MapPin size={16} />
          <span>{currentPlan.route}</span>
        </div>

        <div className="timeline">
          {currentPlan.stops.map((stop, index) => {
            const Icon = iconMap[stop.icon];
            const stopKey = `${currentPlan.id}-${index}`;
            const isExpanded = expandedStop === stopKey;
            return (
              <article className="stop-card" key={`${stop.time}-${stop.title}`}>
                <div className="stop-time">
                  <Clock3 size={15} />
                  <span>{stop.time}</span>
                </div>
                <div className="stop-main">
                  <div className="stop-icon">
                    <Icon size={18} />
                  </div>
                  <div className="stop-body">
                    <button
                      className="stop-title-row"
                      type="button"
                      onClick={() => {
                        setExpandedStop(isExpanded ? null : stopKey);
                        setExpandedPlace(null);
                      }}
                      aria-expanded={isExpanded}
                    >
                      <div>
                        <h3>{stop.title}</h3>
                        <span>{stop.area}</span>
                        <p>{stop.highlights[0]}</p>
                      </div>
                      <ChevronDown className={isExpanded ? "chevron open" : "chevron"} size={18} />
                    </button>
                    {isExpanded ? (
                      <div className="stop-detail-panel">
                        {stop.transport ? (
                          <div className="transport-note">
                            <Navigation size={15} />
                            <p>{stop.transport}</p>
                          </div>
                        ) : null}
                        <div className="detail-grid">
                          <div>
                            <strong>亮点</strong>
                            {stop.highlights.map((item) => (
                              <span key={item}>{item}</span>
                            ))}
                          </div>
                          <div>
                            <strong>必去/必做</strong>
                            {stop.must.map((item) => (
                              <span key={item}>{item}</span>
                            ))}
                          </div>
                        </div>
                        {stop.places ? (
                          <div className="shop-list">
                            <strong>推荐餐厅</strong>
                            {stop.places.map((place, placeIndex) => {
                              const placeKey = `${stopKey}-${placeIndex}`;
                              const isPlaceExpanded = expandedPlace === placeKey;
                              return (
                                <div className="shop-row" key={place.name}>
                                  <button
                                    className="place-toggle"
                                    type="button"
                                    onClick={() => setExpandedPlace(isPlaceExpanded ? null : placeKey)}
                                    aria-expanded={isPlaceExpanded}
                                  >
                                    <img src={place.image} alt={place.name} />
                                    <span>
                                      <b>{place.name}</b>
                                      <small>{place.specialty}</small>
                                    </span>
                                    <ChevronDown className={isPlaceExpanded ? "chevron open" : "chevron"} size={16} />
                                  </button>
                                  {isPlaceExpanded ? (
                                    <div className="place-detail">
                                      <p>{place.detail}</p>
                                      <dl>
                                        <div>
                                          <dt>推荐点单/购买</dt>
                                          <dd>{place.order}</dd>
                                        </div>
                                        <div>
                                          <dt>动线提醒</dt>
                                          <dd>{place.logistics}</dd>
                                        </div>
                                      </dl>
                                    </div>
                                  ) : null}
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="shopping-section">
        <div className="section-title">
          <Store size={19} />
          <div>
            <span className="section-kicker">Shopping Map</span>
            <h2>逛街重点与特色</h2>
          </div>
        </div>
        <div className="shopping-grid">
          {shoppingZones.map((zone) => (
            <article className="shopping-card" key={zone.zone}>
              <span>{zone.tone}</span>
              <h3>{zone.zone}</h3>
              <p>{zone.bestFor}</p>
              <div>
                {zone.picks.map((pick) => (
                  <b key={pick}>{pick}</b>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ticket-section">
        <div className="section-title">
          <CreditCard size={19} />
          <div>
            <span className="section-kicker">Transport</span>
            <h2>买票建议</h2>
          </div>
        </div>
        <div className="ticket-list">
          <div className="ticket-row">
            <Train size={18} />
            <div>
              <strong>市内：Climate Card 3 日游客卡</strong>
              <span>10,000 韩元，另加实体卡约 3,000 韩元。三天市内预计 9-10 次地铁/公交，基本比逐次刷 T-money 更省心。</span>
            </div>
          </div>
          <div className="ticket-row">
            <Bus size={18} />
            <div>
              <strong>进城：6001 机场巴士</strong>
              <span>约 17,000 韩元，适合落地带行李直达明洞/会贤一带。</span>
            </div>
          </div>
          <div className="ticket-row">
            <Plane size={18} />
            <div>
              <strong>回程：AREX 优先，6001 备选</strong>
              <span>20:00 飞机建议 17:00 左右离开酒店；怕堵车选 AREX，行李多且路况好再选 6001。</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="app-footer">
        <span>{currentPlan.imageCredit}</span>
        <span>按 2026-06 信息规划，实际班次和营业时间出发前用 Naver Map 复核。</span>
      </footer>
    </main>
  );
}

export default App;
