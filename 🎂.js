toast('开始执行')

let btnIndex = 0 //跳过好友助力
let commodityViewCount = 0 //浏览商品浏览计数
let cartCount = 0 //架构计数
const interval = 4000 //任务执行间隔，手机性能差的弄长一点
const sleepTime = 20000 //有些场景加载很慢，建议设置长一些
if (className('android.view.View').textContains('邀请好友助力').exists()) {
  btnIndex = 1
}

const task = () => {
  //8s任务
  if (textContains('恭喜完成，获得').exists()) {
    if (id('com.jingdong.app.mall:id/fe').exists()) {
      id('com.jingdong.app.mall:id/fe').findOne().click()
    } else if (id('com.jingdong.app.mall:id/fd').exists()) {
      id('com.jingdong.app.mall:id/fd').findOne().click()
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
      if (id('com.jingdong.app.mall:id/fe').exists()) {
        id('com.jingdong.app.mall:id/fe').findOne().click()
      } else if (id('com.jingdong.app.mall:id/fd').exists()) {
        id('com.jingdong.app.mall:id/fd').findOne().click()
      } else if (id('fe').exists()) {
        id('fe').findOne().click()
      } else if (id('fd').exists()) {
        id('fd').findOne().click()
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
      if (id('com.jingdong.app.mall:id/fe').exists()) {
        id('com.jingdong.app.mall:id/fe').findOne().click()
      } else if (id('com.jingdong.app.mall:id/fd').exists()) {
        id('com.jingdong.app.mall:id/fd').findOne().click()
      } else if (id('fe').exists()) {
        id('fe').findOne().click()
      } else if (id('fd').exists()) {
        id('fd').findOne().click()
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
    if (id('com.jd.lib.productdetail:id/fe').exists()) {
      id('com.jd.lib.productdetail:id/fe').findOne().click()
    } else if (id('com.jd.lib.productdetail:id/fd').exists()) {
      id('com.jd.lib.productdetail:id/fd').findOne().click()
    } else if (id('fe').exists()) {
      id('fe').findOne().click()
    } else if (id('fd').exists()) {
      id('fd').findOne().click()
    } else {
      back()
    }
  } else {
    //其他的一些浏览任务
    sleep(sleepTime)
    if (id('com.jingdong.app.mall:id/fe').exists()) {
      id('com.jingdong.app.mall:id/fe').findOne().click()
    } else if (id('com.jingdong.app.mall:id/fd').exists()) {
      id('com.jingdong.app.mall:id/fd').findOne().click()
    } else if (id('fe').exists()) {
      id('fe').findOne().click()
    } else if (id('fd').exists()) {
      id('fd').findOne().click()
    } else {
      back()
    }
    if (className('android.widget.Button').desc('返回').exists()) {
      //领京豆页面等
      className('android.widget.Button').desc('返回').findOne().click()
    }
    if (className('android.view.ViewGroup').desc('返回按钮').exists()) {
      className('android.view.ViewGroup').desc('返回按钮').findOne().click()
    }
  }
}
for (;;) {
  sleep(interval)
  const btnCollection = text('去完成').find()
  //任务完成 跳出循环
  if (btnCollection.length == 1 && btnIndex == 1) {
    toast('任务完成')
    break
  } else if (!btnCollection.length && !btnIndex) {
    toast('任务完成')
    break
  }
  task()
}
