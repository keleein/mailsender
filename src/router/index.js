import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

import sendPage from "@/components/send-page";
import errPage from "../components/err-page";
import nodemailer_send from "@/components/nodemailer_send";
import API_interface from "@/components/API_interface";
import smsBao from "@/components/smsBao";

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/sendPage',
        },
        {
            path:'/sendPage',
            name:'sendPage',
            component:sendPage,
            children:[
                {
                    path:'/nodemailer_send',
                    name:'nodemailer_send',
                    component:nodemailer_send
                },
                {
                    path:'/API_interface',
                    name:'API_interface',
                    component:API_interface
                },
                {
                    path:'/smsBao',
                    name:'smsBao',
                    component:smsBao
                }
            ]
        },
        {
            path:'*',
            component:errPage,
        }
    ]
})