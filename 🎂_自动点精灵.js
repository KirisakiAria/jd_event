toast('开始执行')

let btnIndex = 0 //跳过一些无法完成的任务
let commodityViewCount = 0 //浏览商品计数
let cartCount = 0 //加购计数
const interval = 4000 //任务执行间隔，手机性能差的设置大一些
const sleepTime = 20000 //有些场景加载得很慢，建议设置大一些
const clickInterval = 2000 //精灵点击间隔
const version = device.release //安卓版本
let breakTask = true //是否中止任务

const judge = () => {
  if (className('android.view.View').textContains('邀请好友助力').exists()) {
    btnIndex = 1
  }
  if (className('android.view.View').textContains('每邀1个好友可得').exists()) {
    btnIndex = 1
  }
}

const task = () => {
  if (breakTask) {
    return
  }
  if (
    className('android.widget.TextView').text('扫啊扫').exists() &&
    className('android.widget.TextView').text('消息').exists()
  ) {
    //从首页自动进入活动
    if (parseInt(version.substring(0, 1)) >= 7) {
      const w1 = className('android.widget.ImageView')
        .descContains('浮层活动')
        .findOne()
      click(w1.bounds().centerX(), w1.bounds().centerY())
      sleep(sleepTime)
      idContains('homeSceneBtnTask').findOne().click()
    }
  }
  //跳出组队任务
  else if (
    className('android.view.View').text('继续领红包').depth(12).exists()
  ) {
    //任务列表页返回确认对话框
    className('android.view.View')
      .text('继续领红包')
      .depth(12)
      .findOne()
      .click()
  } else if (
    textContains('战队红包').exists() &&
    textContains('预计分得').exists()
  ) {
    if (idContains('com.jingdong.app.mall:id/fe').exists()) {
      idContains('com.jingdong.app.mall:id/fe').findOne().click()
    } else if (idContains('com.jingdong.app.mall:id/fd').exists()) {
      idContains('com.jingdong.app.mall:id/fd').findOne().click()
    } else if (idContains('fe').exists()) {
      idContains('fe').findOne().click()
    } else if (idContains('fd').exists()) {
      idContains('fd').findOne().click()
    }
    sleep(4000)
    btnIndex = 2
  } else if (textContains('恭喜完成，获得').exists()) {
    //8s任务
    if (idContains('com.jingdong.app.mall:id/fe').exists()) {
      idContains('com.jingdong.app.mall:id/fe').findOne().click()
    } else if (idContains('com.jingdong.app.mall:id/fd').exists()) {
      idContains('com.jingdong.app.mall:id/fd').findOne().click()
    } else {
      back()
    }
  } else if (text('去完成').exists()) {
    //任务页
    click('去完成', btnIndex)
  } else if (text('浏览以下5个商品').exists()) {
    //商品浏览
    if (commodityViewCount >= 6) {
      //任务完成
      commodityViewCount = 0
      if (idContains('com.jingdong.app.mall:id/fe').exists()) {
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
    className('android.view.View')
      .text('浏览以下5个商品')
      .findOne()
      .parent()
      .parent()
      .child(1)
      .child(commodityViewCount)
      .click()
    commodityViewCount++
  } else if (text('当前页点击加购以下5个商品').exists()) {
    //加购
    if (cartCount >= 6) {
      //任务完成
      cartCount = 0
      if (idContains('com.jingdong.app.mall:id/fe').exists()) {
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
    className('android.view.View')
      .text('当前页点击加购以下5个商品')
      .findOne()
      .parent()
      .parent()
      .child(1)
      .child(cartCount)
      .child(2)
      .click()
    cartCount++
  } else if (text('购物车').exists() && text('店铺').exists()) {
    //商品页
    sleep(4000)
    if (idContains('com.jd.lib.productdetail:id/fe').exists()) {
      idContains('com.jd.lib.productdetail:id/fe').findOne().click()
    } else if (idContains('com.jd.lib.productdetail:id/fd').exists()) {
      idContains('com.jd.lib.productdetail:id/fd').findOne().click()
    } else if (idContains('fe').exists()) {
      idContains('fe').findOne().click()
    } else if (idContains('fd').exists()) {
      idContains('fd').findOne().click()
    } else {
      back()
    }
  } else {
    //其他的一些浏览任务
    sleep(sleepTime)
    if (idContains('abb').exists() && textContains('忍痛离开').exists()) {
      //忍痛离开
      idContains('abb').findOne().click()
    } else if (
      idContains('ui-bgm').exists() &&
      idContains('pop-start-btn').exists()
    ) {
      //游戏
      idContains('pop-start-btn').findOne().click()
      idContains('pop-fail2-btn').waitFor()
      idContains('pop-fail2-btn').findOne().click()
    } else if (textContains('东东萌宠').exists()) {
      // 萌宠
      if (parseInt(version.substring(0, 1)) >= 7) {
        toast()
        const w2 = className('android.view.ViewGroup')
          .desc('返回按钮')
          .findOne()
          .findOne()
        click(w2.bounds().centerX(), w2.bounds().centerY())
      } else {
        back()
      }
    }
    if (className('android.widget.TextView').textContains('领京豆').exists()) {
      // 领京豆
      if (parseInt(version.substring(0, 1)) >= 7) {
        const w3 = className('android.widget.Button').desc('返回').findOne()
        click(w3.bounds().centerX(), w3.bounds().centerY())
      } else {
        back()
      }
    } else if (className('android.view.ViewGroup').desc('返回按钮').exists()) {
      className('android.view.ViewGroup').desc('返回按钮').findOne().click()
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
}

const clickCoinElf = () => {
  if (idContains('goldElfin').exists()) {
    idContains('goldElfin').findOne().click()
  }
  setTimeout(() => {
    clickCoinElf()
  }, clickInterval)
}

const getCoins = () => {
  breakTask = true
  if (
    className('android.widget.Image')
      .textContains('x6YonE079h84lBpxnX4CVJaqei7TKx8AAAAASUVORK5CYII=')
      .exists()
  ) {
    className('android.widget.Image')
      .textContains('x6YonE079h84lBpxnX4CVJaqei7TKx8AAAAASUVORK5CYII=')
      .findOne()
      .click()
  }
  clickCoinElf()
}

const taskQueue = () => {
  breakTask = false
  for (;;) {
    if (breakTask) {
      break
    }
    sleep(interval)
    if (btnIndex != 2) {
      judge()
    }
    task()
  }
}

// prettier-ignore
const floatyWin = floaty.window(
  <horizontal>
    <button id="coin" text="点击金币精灵" />
  </horizontal>
)

floatyWin.coin.click(() => {
  getCoins()
})

taskQueue()

setInterval(() => {}, 1000)
