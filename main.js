let btnIndex = 1 //将要点击按钮的序号，跳过一些无法完成的任务
let itemCount = 0 //浏览、加购商品计数
const interval = 2000 //任务执行间隔，手机性能差的设置大一些
const member = false //设置是否加入会员。true为加入、false为跳过

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

function Task(btnIndex, itemCount, interval, member) {
  this.btnIndex = btnIndex
  this.itemCount = itemCount
  this.interval = interval
  this.member = member
  this.next = true
  this.switch = true

  //等待8秒任务
  this.waitingPage = () => {
    if (
      this.next &&
      textStartsWith('获得').exists() &&
      textEndsWith('金币').exists()
    ) {
      toast('等待8秒任务')
      this.next = false
      backToTaskPage()
    }
  }

  //加购任务页
  this.cartTaskPage = () => {
    const conditions = textContains('购物车加购5个商品').exists()
    if (this.next && conditions) {
      toast('加购任务')
      this.next = false
      if (this.itemCount >= 5) {
        this.itemCount = 0
        return backToTaskPage()
      }
      textContains('¥').find()[this.itemCount].parent().child(5).click()
      this.itemCount++
    }
  }

  //商品详情页面
  this.detadilsPage = () => {
    const conditions1 =
      textContains('店铺').exists() && textContains('购物车').exists()
    const conditions2 =
      textContains('客服').exists() && textContains('购物车').exists()
    if (this.next && (conditions1 || conditions2)) {
      toast('商品详情')
      this.next = false
      sleep(1000)
      back()
    }
  }

  //会员任务
  this.memberPage = () => {
    const conditions = textContains('品牌会员联合开卡').exists()
    if (this.next && conditions) {
      toast('会员任务')
      this.next = false
      if (this.member) {
        if (textContains('恭喜您已集齐所有会员卡').exists()) {
          back()
        }
        textContains('确认授权并加入店铺会员').findOne().click()
      } else {
        toast('跳过所有会员任务')
        this.btnIndex++
        back()
      }
    }
  }

  //可以直接返回的任务
  this.backPage = () => {
    sleep(5000)
    if (textStartsWith('逛精').exists() && textEndsWith('金币').exists()) {
      return
    } else if (this.next) {
      toast('可以直接返回的任务')
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
        sleep(1000)
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
    toast('脚本运行中，请打开任务列表')
    for (;;) {
      if (!this.switch) {
        toast('停止一般任务')
        break
      }
      this.next = true
      sleep(this.interval)
      this.detadilsPage()
      this.cartTaskPage()
      this.taskListPage()
      this.waitingPage()
      this.backPage()
      this.memberPage()
    }
  }

  this.stop = () => {
    this.switch = false
  }
}

const task = new Task(btnIndex, itemCount, interval, member)

const taskBtn = floaty.window(
  <horizontal>
    <button id="task" text="重新开始任务" />
  </horizontal>
)

const stopBtn = floaty.window(
  <horizontal>
    <button id="stop" text="停止所有任务" />
  </horizontal>
)

taskBtn.setPosition(150, 0)
stopBtn.setPosition(150, 150)

taskBtn.task.click(() => {
  threads.shutDownAll()
  threads.start(function () {
    toast('重新执行一般任务')
    task.stop()
    task.switch = true
    task.start()
  })
})

stopBtn.stop.click(() => {
  toast('停止所有任务')
  threads.shutDownAll()
  task.switch = false
})

//by 坛友mouse040429
const nextBtn = floaty.window(
  <horizontal>
    <button id="stop" text="跳过任务" />
  </horizontal>
)
nextBtn.setPosition(150, 300)
nextBtn.stop.click(() => {
  task.btnIndex++
  toast('成过跳过任务，当前任务序列' + task.btnIndex)
})

threads.start(function () {
  task.start()
})

setInterval(() => {}, 500)
