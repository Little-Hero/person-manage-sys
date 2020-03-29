/**
 * 导入封装的request配置接口文件
 * 再封装一层为main.vue单独一个网络请求方法，以便别处直接导入调用该js文件的方法便可
 * 
 */
import { request } from './request'

// 定义一个获取全部用户数据的方法
export function getUsersData() {
    return request({
        url: '/users'
    })
}

// 定义一个获取部门人员的方法,需要传入自身部门名称的参数
export function getDepartmentData(department) {
    console.log(department)
    return request({
        url: '/dep/' + department
    })
}

// 定义一个获取入离职申请
export function getApply(nature) {
    return request({
        url: '/Apply?nature=' + nature
    })
}