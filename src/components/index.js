import formatDate from './formatDate'
// import demoBlock from './DemoBlock.vue'
formatDate.install = (vue) => {
  vue.component(formatDate.name, formatDate)
}
// demoBlock.install = (vue) => {
//   vue.component(demoBlock.name, demoBlock)
// }
export {
  formatDate
  // demoBlock
}
