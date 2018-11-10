import _ from 'lodash'

export const logFun = (from) => {
  console.log(_.join([1,2,3], '-'))
  console.log(from)
  console.log('开启hot--js')
  console.log('开启hot--dev.config--js')
}