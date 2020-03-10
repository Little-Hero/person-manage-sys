/**
 * 导入封装的request配置接口文件
 * 再封装一层为main.vue单独一个网络请求方法，以便别处直接导入调用该js文件的方法便可
 * 
 */
import { request } from './request';

export function getUsersData() {
    return request({
        url: '/users'
    })
}