let btnIndex = 0 //将要点击按钮的序号，跳过一些无法完成的任务
let itemCount = 0 //浏览、加购商品计数
const interval = 2000 //任务执行间隔，手机性能差的设置大一些
const member = true //跳过会员
const unfollow = false //浏览店铺任务后自动取关店铺

const backToTaskPage = () => {
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

//autojs4.1尚未支持class关键字（保留字），只能用传统的工厂函数，强迫症犯了草
function Stall(btnIndex, itemCount, interval, member) {
  this.btnIndex = btnIndex
  this.itemCount = itemCount
  this.interval = interval
  this.member = member
  this.next = true
  this.switch = true

  //主会场页面
  //TODO：测试并修改判断完成逻辑
  this.mainHallPage = () => {
    const conditions =
      textContains('推荐').exists() &&
      textContains('预售').exists() &&
      textContains('头号京贴').exists()
    if (this.next && conditions) {
      sleep(20000)
      backToTaskPage()
      this.next = false
    }
  }

  //一般页面
  this.normalPage = () => {
    const conditions =
      textStartsWith('获得').exists() && textEndsWith('000金币').exists()
    if (this.next && conditions) {
      if (unfollow && idContains('qa').exists()) {
        idContains('qa').findOne().click()
        sleep(200)
      }
      backToTaskPage()
      this.next = false
    }
  }

  //商圈页面
  this.circlePage = () => {
    const conditions =
      textContains('邀人进商圈').exists() && textEndsWith('的商圈').exists()
    if (this.next && conditions) {
      this.btnIndex++
      backToTaskPage()
      this.next = false
    }
  }

  //浏览任务页
  this.viewTaskPage = () => {
    const conditions = textContains('浏览以下5个商品').exists()
    if (this.next && conditions) {
      if (textContains('已完成').exists()) {
        this.next = false
        this.itemCount = 0
        return backToTaskPage()
      }
      textMatches('^¥[0-9]+.[0-9][0-9]')
        .find()
        [this.itemCount].parent()
        .parent()
        .child(3)
        .click()
      this.itemCount++
      this.next = false
    }
  }

  //加购任务页
  this.cartTaskPage = () => {
    const conditions = textContains('在当前页任意加购5个商品').exists()
    if (this.next && conditions) {
      if (textContains('已完成').exists()) {
        this.next = false
        this.itemCount = 0
        return backToTaskPage()
      }
      idContains('jmdd-react-smash_' + this.itemCount)
        .findOne()
        .click()
      this.itemCount++
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
      backToTaskPage()
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
        backToTaskPage()
      } else {
        this.btnIndex++
        backToTaskPage()
      }
      this.next = false
    }
  }

  //城市现金页面
  this.cityPage = () => {
    const conditions = textContains('最高可提现1111元').exists()
    if (this.next && conditions) {
      backToTaskPage()
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
      backToTaskPage()
      this.next = false
    }
  }

  //京东朋友圈
  this.friendsPage = () => {
    const conditions =
      textContains('京友圈').exists() && textContains('推荐好友').exists()
    if (this.next && conditions) {
      backToTaskPage()
      sleep(2000)
      backToTaskPage()
      this.next = false
    }
  }

  //京东魔方
  this.cubePage = () => {
    const conditions = textContains('每获得30分可抽一次奖').exists()
    if (this.next && conditions) {
      backToTaskPage()
      this.next = false
    }
  }

  //摇一摇
  this.shakePage = () => {
    const conditions =
      textContains('摇一摇').exists() && textContains('当前可摇').exists()
    if (this.next && conditions) {
      backToTaskPage()
      this.next = false
    }
  }

  //巅峰王牌
  this.trumpPage = () => {
    const conditions = textContains('喜欢的品牌看更多').exists()
    if (this.next && conditions) {
      backToTaskPage()
      this.next = false
    }
  }

  //天天点点券
  this.voucherPage = () => {
    const conditions =
      textContains('天天点点券').exists() && textContains('我的点点券').exists()
    if (this.next && conditions) {
      backToTaskPage()
      this.next = false
    }
  }

  //品质男装
  this.menPage = () => {
    const conditions =
      textContains('品质男装').exists() && textContains('定金10抵100').exists()
    if (this.next && conditions) {
      backToTaskPage()
      this.next = false
    }
  }

  //东东小窝
  this.homePage = () => {
    const conditions =
      textContains('东东小窝').exists() &&
      textContains('家具').exists() &&
      textContains('装饰').exists() &&
      textContains('灯具').exists()
    if (this.next && conditions) {
      backToTaskPage()
      this.next = false
    }
  }

  //双签领现金
  this.signPage = () => {
    const conditions =
      textContains('双签领现金').exists() &&
      textContains('去京东APP签到').exists()
    if (this.next && conditions) {
      backToTaskPage()
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
          toast('已经完成所有任务')
          this.switch = false
        }
      }
      this.next = false
    }
  }

  //其他未统计到的页面
  this.otherPage = () => {
    sleep(3000)
    if (this.next) {
      backToTaskPage()
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
      this.mainHallPage()
      this.cityPage()
      this.beanPage()
      this.friendsPage()
      this.cubePage()
      this.shakePage()
      this.circlePage()
      this.trumpPage()
      this.voucherPage()
      this.menPage()
      this.homePage()
      this.signPage()
      this.detadilsPage()
      this.viewTaskPage()
      this.cartTaskPage()
      this.normalPage()
      this.memberPage()
      this.taskPage()
      this.otherPage()
    }
  }

  this.stop = () => {
    this.switch = false
  }
}

function Chest(interval) {
  this.interval = interval
  this.switch = true
  this.next = true
  this.btnIndex = 0

  this.normalPage = () => {
    sleep(2000)
    if (this.next) {
      backToTaskPage()
      this.btnIndex++
      this.next = false
    }
  }

  this.chestPage = () => {
    const conditions = textContains('宝箱随机藏在以下').exists()
    if (this.next && conditions) {
      textContains('宝箱随机藏在以下')
        .findOne()
        .parent()
        .child(2)
        .child(this.btnIndex)
        .child(0)
        .click()
      if (this.btnIndex > 20) {
        this.switch = false
      }
      this.next = false
    }
  }
  this.start = () => {
    for (;;) {
      if (!this.switch) {
        toast('停止寻宝任务')
        break
      }
      this.next = true
      sleep(this.interval)
      this.chestPage()
      this.normalPage()
    }
  }
  this.stop = () => {
    this.switch = false
  }
}

const stall = new Stall(btnIndex, itemCount, interval, member)
const chest = new Chest(interval)

const stallBtn = floaty.window(
  <horizontal>
    <button id="stall" text="重新开始任务" />
  </horizontal>
)

const chestBtn = floaty.window(
  <horizontal>
    <button id="chest" text="寻宝箱" />
  </horizontal>
)

const stopBtn = floaty.window(
  <horizontal>
    <button id="stop" text="停止所有任务" />
  </horizontal>
)

stallBtn.setPosition(150, 0)
chestBtn.setPosition(150, 150)
stopBtn.setPosition(150, 300)

stallBtn.stall.click(() => {
  threads.shutDownAll()
  threads.start(function () {
    toast('重新执行一般任务')
    chest.stop()
    stall.stop()
    stall.switch = true
    stall.start()
  })
})

chestBtn.chest.click(() => {
  threads.shutDownAll()
  threads.start(function () {
    toast('执行点击宝箱任务')
    chest.stop()
    stall.stop()
    chest.switch = true
    chest.start()
  })
})

stopBtn.stop.click(() => {
  toast('停止所有任务')
  threads.shutDownAll()
  stall.switch = false
  chest.switch = false
})

threads.start(function () {
  stall.start()
})

setInterval(() => {}, 500)
