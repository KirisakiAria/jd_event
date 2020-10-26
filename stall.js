let btnIndex = 0 //跳过一些无法完成的任务
let viewCount = 0 //浏览商品计数
const interval = 2000 //任务执行间隔，手机性能差的设置大一些
const version = device.release //安卓版本
const member = true //跳过会员

//autojs4.1尚未支持class关键字（保留字），只能用传统的工厂函数，强迫症犯了草
function Stall(btnIndex, viewCount, interval, version, member) {
  this.btnIndex = btnIndex
  this.viewCount = viewCount
  this.interval = interval
  this.version = version
  this.member = member
  this.next = true
  this.finish = false

  //主会场页面
  //TODO：测试并修改判断完成逻辑
  this.mainHallPage = () => {
    const conditions =
      textContains('推荐').exists() &&
      textContains('预售').exists() &&
      textContains('头号京贴').exists()
    if (this.next && conditions) {
      sleep(25000)
      this.backToTaskPage()
      this.next = false
    }
  }

  //一般页面
  this.normalPage = () => {
    const conditions =
      textStartsWith('获得').exists() && textEndsWith('000金币').exists()
    if (this.next && conditions) {
      this.backToTaskPage()
      this.next = false
    }
  }

  //商圈页面
  this.circlePage = () => {
    const conditions =
      textContains('邀人进商圈').exists() && textEndsWith('的商圈').exists()
    if (this.next && conditions) {
      this.btnIndex++
      this.backToTaskPage()
      this.next = false
    }
  }

  //浏览任务页
  this.viewTaskPage = () => {
    const conditions = textContains('浏览以下5个商品').exists()
    if (this.next && conditions) {
      if (textContains('已完成').exists()) {
        this.next = false
        this.viewCount = 0
        return this.backToTaskPage()
      }
      textMatches('^¥[0-9]+.[0-9][0-9]')
        .find()
        [this.viewCount].parent()
        .parent()
        .child(3)
        .click()
      this.viewCount++
      this.next = false
    }
  }

  //加购任务页
  this.cartTaskPage = () => {
    const conditions = textContains('在当前页任意加购5个商品').exists()
    if (this.next && conditions) {
      if (textContains('已完成').exists()) {
        this.next = false
        this.viewCount = 0
        return this.backToTaskPage()
      }
      idContains('jmdd-react-smash_' + this.viewCount)
        .findOne()
        .click()
      this.viewCount++
      this.next = false
    }
  }

  //商品详情页面
  this.detadilsPage = () => {
    const conditions =
      textContains('店铺').exists() && textContains('购物车').exists()
    const conditions2 =
      textContains('联系客服').exists() && textContains('购物车').exists()
    if (this.next && (conditions || conditions2)) {
      sleep(1000)
      this.backToTaskPage()
      this.next = false
    }
  }

  //会员页面
  this.memberPage = () => {
    const conditions = textContains('确认授权并加入店铺会员').exists()
    if (this.next && conditions) {
      if (this.member) {
        textContains('确认授权并加入店铺会员').findOne().click()
        sleep(2000)
        this.backToTaskPage()
      } else {
        this.btnIndex++
        this.backToTaskPage()
      }
      this.next = false
    }
  }

  //城市现金页面
  this.cityPage = () => {
    const conditions = textContains('最高可提现1111元').exists()
    if (this.next && conditions) {
      this.backToTaskPage()
      sleep(1000)
      if (textContains('暂时离开').exists()) {
        textContains('暂时离开').findOne().click()
      }
      this.next = false
    }
  }

  //种豆页面
  this.beanPage = () => {
    const conditions = textContains('豆苗成长值').exists()
    if (this.next && conditions) {
      this.backToTaskPage()
      this.next = false
    }
  }

  //京东朋友圈
  this.friendsPage = () => {
    const conditions = textContains('京友圈').exists()
    if (this.next && conditions) {
      this.backToTaskPage()
      this.next = false
    }
  }

  //京东魔方
  this.cubePage = () => {
    const conditions = textContains('每获得30分可抽一次奖').exists()
    if (this.next && conditions) {
      this.backToTaskPage()
      this.next = false
    }
  }

  //摇一摇
  this.shakePage = () => {
    const conditions = textContains('摇一摇').exists()
    if (this.next && conditions) {
      this.backToTaskPage()
      this.next = false
    }
  }

  //京东魔方
  this.cubePage = () => {
    const conditions = textContains('每获得30分可抽一次奖').exists()
    if (this.next && conditions) {
      this.backToTaskPage()
      this.next = false
    }
  }

  //任务列表页
  this.taskPage = () => {
    const conditions = textContains('邀请好友助力')
    if (this.next && conditions) {
      if (!this.btnIndex) {
        this.btnIndex++
      }
      if (textContains('去完成').exists()) {
        const result = click('去完成', this.btnIndex)
        if (!result) {
          this.finish = true
        }
      }
      this.next = false
    }
  }

  //其他未统计到的页面
  this.otherPage = () => {
    sleep(3000)
    if (this.next) {
      this.backToTaskPage()
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
      this.mainHallPage()
      this.cityPage()
      this.beanPage()
      this.friendsPage()
      this.cubePage()
      this.shakePage()
      this.circlePage()
      this.detadilsPage()
      this.viewTaskPage()
      this.cartTaskPage()
      this.normalPage()
      this.memberPage()
      this.taskPage()
      this.otherPage()
      if (this.finish) {
        toast('任务完成')
        break
      }
    }
  }
}

const stall = new Stall(btnIndex, viewCount, interval, version, member)
stall.taskQueue()
