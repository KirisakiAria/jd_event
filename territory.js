let index = 0
let btnIndex = 0
const interval = 2000 //任务执行间隔，手机性能差的设置大一些

function Territory(index, interval) {
  this.index = index
  this.interval = interval
  this.next = true
  this.finish = false
  this.cityList = [
    '北京',
    '沈阳',
    '长春',
    '呼和浩特',
    '哈尔滨',
    '石家庄',
    '天津',
    '济南',
    '太原',
    '西安',
    '郑州',
    '合肥',
    '南京',
    '杭州',
    '上海',
    '重庆',
    '成都',
    '贵阳',
    '武汉',
    '长沙',
    '南昌',
    '福州',
    '台北',
    '广州',
    '香港',
    '南宁',
    '澳门',
    '海口',
    '昆明',
    '拉萨',
    '西宁',
    '银川',
    '兰州',
    '乌鲁木齐',
    '热爱城',
  ]

  //一般浏览页面
  this.normalPage = () => {
    sleep(3000)
    if (this.next) {
      this.backToTaskPage()
      this.next = false
    }
  }

  //任务列表页
  this.taskPage = () => {
    const conditions = textContains('每日签到')
    if (this.next && conditions) {
      const city = this.cityList[index]
      if (textContains(city).exists()) {
        const result = click(city, this.btnIndex)
        if (!result) {
          this.btnIndex = 0
          index++
          this.backToTaskPage()
        }
      }
      this.next = false
    }
  }

  //版图页
  this.territoryPage = () => {
    const conditions = textContains('营业版图')
    if (this.next && conditions) {
      if (textContains('去完成').exists()) {
        const result = click('去完成', this.btnIndex)
      }
      this.next = false
    }
  }

  //返回任务列表
  this.backToTaskPage = () => {
    if (idContains('title_back').exists()) {
      idContains('title_back').findOne().click()
    } else if (idContains('yl').exists()) {
      idContains('yl').findOne().click()
    } else if (idContains('com.jd.lib.jshop:id/fd').exists()) {
      idContains('com.jd.lib.jshop:id/fd').findOne().click()
    } else if (idContains('com.jd.lib.jshop:id/fe').exists()) {
      idContains('com.jd.lib.jshop:id/fe').findOne().click()
    } else if (
      classNameContains('android.view.ViewGroup').desc('返回按钮').exists()
    ) {
      classNameContains('android.view.ViewGroup')
        .desc('返回按钮')
        .findOne()
        .click()
    } else if (idContains('com.jingdong.app.mall:id/fe').exists()) {
      idContains('com.jingdong.app.mall:id/fe').findOne().click()
    } else if (idContains('com.jingdong.app.mall:id/fd').exists()) {
      idContains('com.jingdong.app.mall:id/fd').findOne().click()
    } else if (idContains('fe').exists()) {
      idContains('fe').findOne().click()
    } else if (idContains('fd').exists()) {
      idContains('fd').findOne().click()
    } else {
      back()
    }
  }

  this.taskQueue = () => {
    toast('开始执行任务')
    for (;;) {
      this.next = true
      sleep(this.interval)
      this.taskPage()
      this.territoryPage()
      this.normalPage()
      if (this.finish) {
        toast('任务完成')
        break
      }
    }
  }
}

const territory = new Territory(index)
territory.taskQueue()
