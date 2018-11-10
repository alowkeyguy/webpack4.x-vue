import _ from 'lodash'

export const otherFun = () => {}
export const otherFun = () => {
  console.log('from otherFun')
  console.log(_.join([4,5,6], '-'))
}