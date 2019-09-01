export function getJsUrl () { // 获取iframe外部的URL和参数
  // let pos, str, para, parastr
  let str, parastr
  let array = []
  str = document.referrer
  if (str.indexOf('?') !== -1) {
    parastr = str.split('?')[1]
  } else {
    return
  }
  let arr = parastr.split('&')
  for (let i = 0; i < arr.length; i++) {
    array[arr[i].split('=')[0]] = arr[i].split('=')[1]
  }
  return array
}

export function GetUrlParam (paraName) {
  let url = document.location.toString()
  let arrObj = url.split('?')

  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split('&')
    let arr

    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')

      if (arr != null && arr[0] === paraName) {
        if (paraName === 'id') {
          return parseInt(arr[1])
        } else {
          return arr[1]
        }
      }
    }
    return ''
  } else {
    return ''
  }
}

export function oneDimensionalToTree (jsonData) {
  let result = []; let temp = {}; let i = 0; let j = 0; let len = jsonData.length
  for (; i < len; i++) {
    temp[jsonData[i]['id']] = jsonData[i] // 以id作为索引存储元素，可以无需遍历直接定位元素
  }
  for (; j < len; j++) {
    let currentElement = jsonData[j]
    let tempCurrentElementParent = temp[currentElement['parentId']] // 临时变量里面的当前元素的父元素
    if (tempCurrentElementParent) { // 如果存在父元素
      if (!tempCurrentElementParent['children']) { // 如果父元素没有chindren键
        tempCurrentElementParent['children'] = [] // 设上父元素的children键
      }
      tempCurrentElementParent['children'].push(currentElement) // 给父元素加上当前元素作为子元素
    } else { // 不存在父元素，意味着当前元素是一级元素
      result.push(currentElement)
    }
  }
  return result
}

export function addThousands (number) {
  if (number === 0) {
    return number
  } else if (number === 0.0) {
    return number
  }
  let num = number + ''
  num = num.replace(new RegExp(',', 'g'), '')
  // 正负号处理
  let symble = ''
  if (/^([-+]).*$/.test(num)) {
    symble = num.replace(/^([-+]).*$/, '$1')
    num = num.replace(/^([-+])(.*)$/, '$2')
  }
  if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
    num = num.replace(new RegExp('^[0]+', 'g'), '')
    if (/^\./.test(num)) {
      num = '0' + num
    }
    let decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, '$1')
    let integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, '$1')
    let re = /(\d+)(\d{3})/
    while (re.test(integer)) {
      integer = integer.replace(re, '$1,$2')
    }
    return symble + integer + decimal
  } else {
    return number
  }
}

export function numberChange (number) {
  let num
  if (parseInt(number) < 0) {
    num = '0'
  } else if (parseInt(number) > 999999999) {
    num = Math.floor(parseInt(number) / 1000000) / 100 + '亿'
  } else if (parseInt(number) > 99999) {
    num = Math.floor(parseInt(number) / 100) / 100 + '万'
  } else {
    num = parseInt(number).toLocaleString()
  }
  return num
}

export function capacityChange (number) {
  let num
  if (parseInt(number) < 1024) {
    num = parseInt(number) + 'MB'
  } else if (parseInt(number) < 1024 * 1024) {
    num = Math.floor(parseInt(number) / 10.24) / 100 + 'GB'
  } else if (parseInt(number) < 1024 * 1024 * 1024) {
    num = (Math.floor(parseInt(number) / (10.24 * 1024)) / 100).toLocaleString() + 'TB'
  } else {
    num = (Math.floor(parseInt(number) / (10.24 * 1024 * 1024)) / 100).toLocaleString() + 'PB'
  }
  return num
}
