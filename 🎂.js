toast('开始执行')

let btnIndex = 0 //跳过好友助力
let commodityViewCount = 0 //浏览商品浏览计数
let cartCount = 0 //架构计数
const sleepTime = 12000 //等待8s任务场景的等待时间（手机性能差建议调长一些）
const sleepTime_2 = 20000 //有些场景加载很慢，建议设置长一些
if (className('android.view.View').textContains('邀请好友助力').exists()) {
  btnIndex = 1
}

const task = () => {
  if (text('去完成').exists()) {
    //任务页
    click('去完成', btnIndex)
  } else if (text('浏览以下5个商品').exists()) {
    //商品浏览
    if (commodityViewCount >= 5) {
      //任务完成
      commodityViewCount = 0
      id('fe').findOne().click()
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
    if (cartCount >= 5) {
      //任务完成
      cartCount = 0
      id('fe').findOne().click()
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
  }
  //商品页
  else if (text('购物车').exists() && text('店铺').exists()) {
    sleep(3000)
    id('fe').findOne().click()
  } else if (className('android.view.View').textContains('S').exists()) {
    //8秒任务浏览
    sleep(sleepTime)
    id('fe').findOne().click()
  } else {
    //其他的一些浏览任务
    sleep(sleepTime_2)
    if (id('fd').exists()) {
      //领卷中心等
      id('fd').findOne().click()
    }
    if (className('android.widget.Button').desc('返回').exists()) {
      //领京豆页面等
      className('android.widget.Button').desc('返回').findOne().click()
    }
    if (className('android.view.View').textContains('S').exists()) {
      //这里是一些特殊的8秒浏览，比如城市红包、宠物这种
      sleep(sleepTime)
      id('fe').findOne().click()
    } else {
      id('fe').findOne().click()
    }
  }
}
for (;;) {
  sleep(3000)
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
