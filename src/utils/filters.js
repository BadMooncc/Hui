const filters = {
  install (Vue, opt) {
    // 存储过滤器容器
    let filterVessel = {
      'formatDate': function (val, types) {
        // type : 'YYYY-MM-DD' 'YYYY-MM' 'YYYY-MM hh:mm:ss' 'hh:mm:ss'
        if (typeof val === 'number') {
          val = '' + val
          if (val.length === 10) val = (val + '000') // 十位时间戳转为13位
          val = parseInt(val)
        }
        types = types || ''
        let result = ''
        const date = new Date(val)
        const yyyy = date.getFullYear()
        const mm = date.getMonth() > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
        const dd = date.getDate() > 10 ? date.getDate() : '0' + date.getDate()
        const h = date.getHours() > 10 ? date.getHours() : '0' + date.getHours()
        const m = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()
        const s = date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds()
        switch (types) {
          case 'YYYY-MM-DD':
            result = `${yyyy}-${mm}-${dd}`
            break
          case 'YYYY-MM':
            result = `${yyyy}-${mm}`
            break
          case 'hh:mm:ss':
            result = `${h}:${m}:${s}`
            break
          case '':
            result = `${yyyy}-${mm}-${dd} ${h}:${m}:${s}`
        }
        return result
      },
      'formatTel': function (val) {
        let regTel = /^[1][356789][0-9]{9}$/
        if (!val) return ''
        // 验证电话格式
        if (!regTel.test(val)) {
          try {
            var err = new Error('电话号码格式错误！')
            throw err
          } catch (err) {
            console.warn(err)
            // return '电话号码格式错误！'
          }
        }
        val = '' + val
        return val.substr(0, 3) + '****' + val.substr(7)
      },
      'formatMoney': function (val, types) {
        if (typeof types !== 'string') {
          try {
            var err = new Error('电话号码格式错误！')
            throw err
          } catch (err) {
            console.error(err)
          }
        }
        return types + val
      },
      'formatIdCard': function (val) {
        if (typeof val === 'number') {
          console.warn('身份证号必须为string！')
          return
        }
        return val.substr(0, 4) + '*******' + val.substr(14, val.length)
      },
      'formatBankCard': function (val) {
        if (typeof val === 'number') {
          console.warn('银行卡号必须为string！！')
          return
        }
        return val.substr(0, 4) + ' **** **** **** ' + val.substr(val.length - 4, val.length)
      },
      'toLowerCase': function (val) {
        return val.toLowerCase()
      },
      'toUpperCase': function (val) {
        return val.toUpperCase()
      }
    }
    // 全局注册过滤器
    Object.keys(filterVessel).map(function (item) {
      Vue.filter(item, filterVessel[item])
    })
  }
}

export default filters
