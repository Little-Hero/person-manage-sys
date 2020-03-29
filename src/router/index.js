import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'components/common/Login.vue'

Vue.use(VueRouter)

const routes = [
    // -----------------------------------登录路由-----------------------------------
    {
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    },

    // --------------------------以下均采用懒加载方式注册路由--------------------------

    // -----------------------------------首页路由及内部路由-----------------------------------
    {
        path: '/index',
        component: () =>
            import ( /* webpackChunkName: "index" */ 'views/index.vue'),
        children: [{
                path: '',
                redirect: '/users'
            }, {
                name: 'Users',
                path: '/users',
                component: () =>
                    import ( /* webpackChunkName: "DepartmentLift" */ 'views/users/Users.vue'),
            },

            // -----------------------------------考勤管理路由-----------------------------------
            {
                name: 'Attendance',
                path: '/attendance',
                component: () =>
                    import ( /* webpackChunkName: "DepartmentLife" */ 'views/attendance/Attendance.vue'),
            },

            // -----------------------------------部门管理路由-----------------------------------
            {
                name: 'DepartmentLife',
                path: '/departmentLife',
                component: () =>
                    import ( /* webpackChunkName: "DepartmentLife" */ 'views/department/DepartmentLife.vue'),
            }, {
                name: 'DepartmentVue',
                path: '/departmentVue',
                component: () =>
                    import ( /* webpackChunkName: "DepartmentVue" */ 'views/department/DepartmentVue.vue'),
            }, {
                name: 'DepartmentSales',
                path: '/departmentSales',
                component: () =>
                    import ( /* webpackChunkName: "DepartmentVue" */ 'views/department/DepartmentSales.vue'),
            }, {
                name: 'DepartmentMoney',
                path: '/departmentMoney',
                component: () =>
                    import ( /* webpackChunkName: "DepartmentVue" */ 'views/department/DepartmentMoney.vue'),
            }, {
                name: 'DepartmentYy',
                path: '/departmentYy',
                component: () =>
                    import ( /* webpackChunkName: "DepartmentVue" */ 'views/department/DepartmentYy.vue'),
            },

            // -----------------------------------岗位管理路由-----------------------------------
            {
                name: 'Job',
                path: '/job',
                component: () =>
                    import ( /* webpackChunkName: "DepartmentVue" */ 'views/job/Job.vue'),
            },

            // -----------------------------------人员管理路由-----------------------------------
            {
                name: 'Flow',
                path: '/flow',
                component: () =>
                    import ( /* webpackChunkName: "DepartmentVue" */ 'views/flow/Flow.vue'),
            }
        ]
    },
    // -----------------------------------详情按钮路由-----------------------------------
    {
        name: 'Detail',
        path: '/detail/:id',
        component: () =>
            import ( /* webpackChunkName: "Detail" */ 'components/common/Detail.vue'),
    }
]

const router = new VueRouter({
    //去除路由自带的'#'
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router