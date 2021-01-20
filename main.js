let btnIndex = 1 //将要点击按钮的序号，跳过一些无法完成的任务
let itemCount = 0 //浏览、加购商品计数
const interval = 2000 //任务执行间隔，手机性能差的设置大一些
const member = false //设置是否加入会员。true为加入、false为跳过
const unfollow = true //浏览店铺任务后自动取关店铺

const backToTaskPage = () => {
  //如果在任务首页，不走返回逻辑
  const ifHomePage =
    textContains('去完成').exists() && textContains('签到').exists()
  if (!ifHomePage) {
    if (id('title_back').exists()) {
      id('title_back').findOne().click()
    } else if (id('yl').exists()) {
      id('yl').findOne().click()
    } else if (id('yp').exists()) {
      id('yp').findOne().click()
    } else if (id('com.jd.lib.jshop:id/fd').exists()) {
      id('com.jd.lib.jshop:id/fd').findOne().click()
    } else if (id('com.jd.lib.jshop:id/fe').exists()) {
      id('com.jd.lib.jshop:id/fe').findOne().click()
    } else if (id('d').exists()) {
      id('d').findOne().click()
    } else if (
      classNameContains('android.view.ViewGroup').desc('返回按钮').exists()
    ) {
      classNameContains('android.view.ViewGroup')
        .desc('返回按钮')
        .findOne()
        .click()
    } else if (id('com.jingdong.app.mall:id/fe').exists()) {
      id('com.jingdong.app.mall:id/fe').findOne().click()
    } else if (id('com.jingdong.app.mall:id/fd').exists()) {
      id('com.jingdong.app.mall:id/fd').findOne().click()
    } else if (id('fe').exists()) {
      id('fe').findOne().click()
    } else if (id('fd').exists()) {
      id('fd').findOne().click()
    } else if (
      classNameContains('android.widget.FrameLayout')
        .boundsInside(800, 1000, device.width, device.height)
        .exists()
    ) {
      classNameContains('android.widget.FrameLayout')
        .boundsInside(800, 1000, device.width, device.height)
        .findOne()
        .click()
    } else if (
      className('android.view.View')
        .boundsInside(800, 1000, device.width, device.height)
        .clickable(true)
        .depth(7)
        .exists()
    ) {
      className('android.view.View')
        .boundsInside(800, 1000, device.width, device.height)
        .clickable(true)
        .depth(7)
        .findOne()
        .click()
    } else if (
      className('android.view.View')
        .boundsInside(800, 1000, device.width, device.height)
        .clickable(true)
        .depth(9)
        .exists()
    ) {
      className('android.view.View')
        .boundsInside(800, 1000, device.width, device.height)
        .clickable(true)
        .depth(9)
        .findOne()
        .click()
    } else {
      back()
    }
  }
}

function MainTask(btnIndex, itemCount, interval, member) {
  this.btnIndex = btnIndex
  this.itemCount = itemCount
  this.interval = interval
  this.member = member
  this.next = true
  this.switch = true

  //一般任务
  this.normalPage = () => {
    if (this.next) {
      toast('一般任务')
      this.next = false
      if (unfollow) {
        if (idContains('q_').exists()) {
          idContains('q_').findOne().click()
        }
        if (idContains('qa').exists()) {
          idContains('qa').findOne().click()
        }
        sleep(1000)
      }
      backToTaskPage()
    }
  }

  //加购任务页
  this.cartTaskPage = () => {
    const conditions = textContains('在当前页加购5个商品').exists()
    if (this.next && conditions) {
      toast('加购任务')
      this.next = false
      if (this.itemCount >= 5) {
        this.itemCount = 0
        return backToTaskPage()
      }
      idContains('jmdd-react-smash_' + this.itemCount)
        .findOne()
        .click()
      this.itemCount++
    }
  }

  //商品详情页面
  this.detadilsPage = () => {
    const conditions =
      textContains('店铺').exists() && textContains('购物车').exists()
    const conditions2 =
      textContains('客服').exists() && textContains('购物车').exists()
    if (this.next && (conditions || conditions2)) {
      toast('商品详情')
      this.next = false
      sleep(1000)
      back()
    }
  }

  //京东金融
  this.financePage = () => {
    const conditions =
      textContains('小金库').exists() && textContains('白条').exists()
    if (this.next && conditions) {
      toast('京东金融')
      this.next = false
      back()
      back()
    }
  }

  //会员任务
  this.memberPage = () => {
    const conditions = textContains('会员卡详情').exists()
    if (this.next && conditions) {
      toast('会员任务')
      this.next = false
      if (this.member) {
        text('确认授权并加入店铺会员').findOne().parent().click()
      } else {
        this.btnIndex++
        backToTaskPage()
      }
    }
  }

  //需要back键返回的页面
  this.backKeyPage = () => {
    const conditions =
      textContains('赚点点券').exists() ||
      textContains('东东超市').exists() ||
      (textContains('京喜财富岛').exists() && textContains('提现').exists()) ||
      (textContains('头号京贴').exists() &&
        textContains('推荐').exists() &&
        textContains('热门').exists()) ||
      (textContains('年货').exists() &&
        textContains('推荐').exists() &&
        textContains('视频').exists()) ||
      (textContains('每日签到').exists() && textContains('剩余').exists())
    if (this.next && conditions) {
      toast('需要back键返回的页面')
      this.next = false
      back()
    }
  }

  //任务列表
  this.taskListPage = () => {
    const conditions = textContains('邀请好友助力').exists()
    if (this.next && conditions) {
      toast('任务列表')
      if (!this.btnIndex) {
        this.btnIndex++
      }
      if (textContains('去完成').exists()) {
        const result = click('去完成', this.btnIndex)
        sleep(14000)
        if (!result) {
          toast('已经完成所有任务')
          this.switch = false
        }
      }
      this.next = false
    }
  }

  //返回任务列表
  this.start = () => {
    toast('开始执行一般任务，请打开任务列表')
    for (;;) {
      if (!this.switch) {
        toast('停止一般任务')
        break
      }
      this.next = true
      sleep(this.interval)
      this.financePage()
      this.memberPage()
      this.detadilsPage()
      this.cartTaskPage()
      this.taskListPage()
      this.backKeyPage()
      this.normalPage()
    }
  }

  this.stop = () => {
    this.switch = false
  }
}

const stall = new MainTask(btnIndex, itemCount, interval, member)

const stallBtn = floaty.window(
  <horizontal>
    <button id="stall" text="重新开始任务" />
  </horizontal>
)

const stopBtn = floaty.window(
  <horizontal>
    <button id="stop" text="停止所有任务" />
  </horizontal>
)

stallBtn.setPosition(150, 0)
stopBtn.setPosition(150, 150)

stallBtn.stall.click(() => {
  threads.shutDownAll()
  threads.start(function () {
    toast('重新执行一般任务')
    stall.stop()
    stall.switch = true
    stall.start()
  })
})

stopBtn.stop.click(() => {
  toast('停止所有任务')
  threads.shutDownAll()
  stall.switch = false
})

threads.start(function () {
  stall.start()
})

setInterval(() => {}, 500)
