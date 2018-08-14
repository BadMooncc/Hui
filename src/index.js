// import Vue from 'vue'
import { formatDate } from './components/index'

const components = [ formatDate ]
const install = (_vue) => {
  if (install.installed) return
  components.forEach((component) => {
    _vue.component(component.name, component)
  })
}

export default {
  install,
  formatDate
}
