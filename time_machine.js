let storeIndex1 = 0 //超级品牌
let storeIndex2 = 0 //大牌品牌
let btnIndex = 0 //将要点击按钮的序号，跳过一些无法完成的任务
const interval = 3000 //任务执行间隔，手机性能差的设置大一些

function TimeMachine(storeIndex1, storeIndex2, btnIndex, interval) {
  this.storeIndex1 = storeIndex1
  this.storeIndex2 = storeIndex2
  this.btnIndex = btnIndex
  this.interval = interval
  this.finish = false
  this.next = true

  //店铺列表页1
  this.store1Page = () => {
    const conditions = textContains('逛超级品牌立得').exists()
    if (this.next && conditions) {
      if (textContains('9/9').exists() || this.storeIndex1 >= 9) {
        this.next = true
        return false
      }
      this.storeIndex1++
      textContains('逛超级品牌立得')
        .findOne()
        .parent()
        .child(2)
        .child(0)
        .click()
      this.next = false
    }
  }

  //店铺列表页2
  this.store2Page = () => {
    const conditions = textContains('逛大牌品牌立得').exists()
    if (this.next && conditions) {
      if (textContains('33/33').exists() || this.storeIndex2 >= 33) {
        toast('已经完成所有品牌浏览任务，请打开任务列表')
        this.next = false
        return false
      }
      this.storeIndex2++
      textContains('逛大牌品牌立得').findOne().parent().child(1).click()
      this.next = false
    }
  }

  //一般浏览页面
  this.normalPage = () => {
    sleep(1500)
    if (this.next) {
      this.backToTaskPage()
      this.next = false
    }
  }

  //任务列表页
  this.taskPage = () => {
    const conditions =
      textContains('邀请好友一起玩').exists() &&
      textContains('体验AR热爱空间').exists()
    if (this.next && conditions) {
      if (textContains('去完成').exists()) {
        const result = click('去完成', this.btnIndex)
        if (!result) {
          toast('已经完成所有任务')
          this.finish = true
        }
      }
      this.next = false
    }
  }

  //分享窗口判断
  this.shareModal = () => {
    const conditions =
      textContains('微信好友').exists() && textContains('朋友圈').exists()
    if (this.next && conditions) {
      toast('已经完成所有任务')
      this.finish = true
      this.next = false
      textContains('取消').findOne().click()
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

  this.start = () => {
    toast('开始执行任务')
    for (;;) {
      this.next = true
      sleep(this.interval)
      this.shareModal()
      this.taskPage()
      this.store1Page()
      this.store2Page()
      this.normalPage()
      if (this.finish) {
        toast('任务完成')
        break
      }
    }
  }
}

const timeMachine = new TimeMachine(
  storeIndex1,
  storeIndex2,
  btnIndex,
  interval
)
timeMachine.start()
