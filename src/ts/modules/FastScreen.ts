import { EVT } from './EVT'
import { DOM } from './DOM'
import { pageInfo } from './PageInfo'

// 在搜索页面按收藏数快速筛选
class FastScreen {
  constructor() {
    this.create()

    window.addEventListener(EVT.events.destroy, () => {
      this.destroy()
    })
  }
  // 添加快速筛选功能
  private create() {
    // 判断插入点的元素有没有加载出来
    let target = document.querySelector('#root>div')

    if (!target) {
      setTimeout(() => {
        this.create()
      }, 300)
      return
    }

    const favNums = [
      '100users入り',
      '500users入り',
      '1000users入り',
      '3000users入り',
      '5000users入り',
      '10000users入り',
      '20000users入り',
      '30000users入り',
      '50000users入り'
    ] // 200 和 2000 的因为数量太少，不添加。40000 的也少

    const fastScreenArea = document.createElement('div')
    fastScreenArea.className = 'fastScreenArea'
    favNums.forEach(secondTag => {
      let a = document.createElement('a')
      a.innerText = secondTag
      a.href = 'javascript:viod(0)'
      a.onclick = () => {
        this.openFastScreenLink(secondTag)
      }
      fastScreenArea.appendChild(a)
    })
    ;(target as HTMLDivElement).insertAdjacentElement(
      'afterend',
      fastScreenArea
    )
  }

  // 打开快速筛选链接
  private openFastScreenLink(secondTag: string) {
    // 拼接两个 tag。因为搜索页面可以无刷新切换搜索的 tag，所以从这里动态获取
    const firstTag = pageInfo.getPageTag.split(' ')[0]
    const fullTag = encodeURIComponent(firstTag + ' ' + secondTag)
    // 用新的 tag 替换掉当前网址里的 tag
    let newURL = location.href.replace(
      encodeURIComponent(pageInfo.getPageTag),
      fullTag
    )
    // 添加 s_mode=s_tag 宽松匹配标签
    let u = new URL(newURL)
    u.searchParams.set('s_mode', 's_tag')
    location.href = u.toString()
  }

  private destroy() {
    // 删除快速筛选元素
    const fastScreen = document.querySelector('.fastScreenArea')
    DOM.removeEl(fastScreen as HTMLDivElement)
  }
}

export { FastScreen }
