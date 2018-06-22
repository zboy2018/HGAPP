<style scoped>
.layout {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100%;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: auto;
    background: #fff;
    border-radius: 4px;
    height: 80%;
}

.layout-content-main {
    padding: 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #313540;
}

.layout-header {
    height: 60px;
    background: #fff;
}
.layout-main-logo{
    padding:10px 0 0 0;
}
.layout-logo-left {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 28px;
    text-align: center;
    background: #0091ea;
    /*  background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;*/
}

.layout-ceiling-main a {
    color: #9ba7b5;
}

.layout-hide-left-nav .layout-text {
    display: none;
}
.layout-hide-left-nav .ivu-menu{
    display: none;
}
.layout-page-toggle-left{
    display: inline-block;
}
.layout-page-title{
    display: inline-block;
    font-size: 24px;
}

.layout-page-title span{
    display: inline-block;
    vertical-align:middle;
    margin-bottom: 0;
    padding: 12px 0px;
    line-height:1;
}

.ivu-col {
    transition: width .2s ease-in-out;
}

.ivu-row-flex {
    height: 100%;
}

.userinfo {
    display: inline-block;
    float: right;
}

.userinfo .ivu-dropdown {
    margin-top: 50px;
}

.ivu-dropdown {
    margin-right: 25px;
    margin-top: 22px;
}

.ivu-menu-submenu-title {
    padding: 14px;
}

.head-img {
    width: 100%;
    height: 60px;
    line-height: 60px;
    float: right;
    margin-top: -50px;
}

.head-img img {
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    width: 40px;
    height: 40px;
    float: right;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
    background: #0091ea!important
}
</style>
<template>
    <div class="layout" :class="{'layout-hide-left-nav': spanLeft < 4}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left" >
                <div >
                <Menu :mode="modeType" theme="dark" width="auto"  :active-name="this.$route.path" :open-names="openNames" @on-select="menuSelect" accordion>
                    <div class="layout-logo-left">
                        <div class="layout-main-logo" v-show="logoIsDisplay">
                            <img v-bind:src="pageLogo" alt="">
                        </div>
                        <!--<Icon type="paper-airplane" :size="logoSize" v-show="logoIsDisplay"></Icon>-->
                    </div>
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <Submenu :name="item.pageTitle" v-if="!item.leaf">
                            <template slot="title">
                                <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="layout-text">{{item.pageTitle}}</span>
                            </template>
                            <template v-for="(child,childIndex) in item.children" v-if="!child.hidden">
                                <Menu-item :name="child.path">{{child.pageTitle}}</Menu-item>
                            </template>
                        </Submenu>
                        <template v-if="item.leaf&&item.children.length>0">
                            <Menu-item :name="item.children[0].path">
                                <Icon :type="item.iconCls" :size="iconSize"></Icon>
                                <span class="layout-text">{{item.children[0].pageTitle}}</span>
                            </Menu-item>
                        </template>
                    </template>
                </Menu>
                </div>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <div class="layout-page-toggle-left">
                        <Button type="text" @click="toggleClick">
                            <Icon type="navicon" size="32"></Icon>
                        </Button>
                    </div>

                     <div class="layout-page-title">
                         <span>OA管理系统</span>
                     </div>
                    <div class="userinfo">
                        <Dropdown placement="bottom-end">
                            <span class="head-img">
                                {{curUserName}}
                                <img v-bind:src="userPhoto" alt="">
                            </span>
                            <Dropdown-menu slot="list">
                                <Dropdown-item @click.native="modifyPassWord()">修改密码</Dropdown-item>
                                <Dropdown-item @click.native="logout()" divided>退出</Dropdown-item>
                            </Dropdown-menu>
                        </Dropdown>
                    </div>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>{{$route.name}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </Col>
        </Row>

        <Modal v-model="modal1" title="修改密码" @on-ok.prevent="comfirmModifyPS" @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Form-item label="原密码" prop="oldPassword">
                    <Input v-model="formValidate.oldPassword" placeholder="请输入原始密码"></Input>
                </Form-item>
                <Form-item label="新密码" prop="newPassword">
                    <Input v-model="formValidate.newPassword" placeholder="请输入新密码"></Input>
                </Form-item>
                <Form-item label="确认新密码" prop="resetPassword">
                    <Input v-model="formValidate.resetPassword" placeholder="请再次输入新密码"></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
    <!-- 修改密码 模态框 -->

    <!-- 修改密码 模态框 -->
</template>

<script>

var logoPath = require('../assets/img/user.jpg');
var userPhotoPath = require('../assets/img/user.jpg');

export default {
    data() {
        return {
            userPhoto:userPhotoPath,
            pageLogo: logoPath,
            openNames: [this.$route.matched[0].name],
            curUserName: "",
            modeType: "vertical",
            spanLeft: 4,
            spanRight: 20,
            iconSize:16,
            logoSize:0,
            leftNavIsDisplay:true,
            logoIsDisplay: true,
            loading: true,
            modal1: false,
            formValidate: {
                oldPassword: '',
                newPassword: '',
                resetPassword: ''
            },
            ruleValidate: {
                oldPassword: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                resetPassword: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    watch:{
        spanLeft (val){
            // console.log(val);
            //  if (val !== 4) {
            //     this.logoIsDisplay = false;
            // } else {
            //     this.logoIsDisplay = true;
            // }
        }
    },
    computed: {
        // iconSize() {
        //     return this.spanLeft === 4 ? 18 : 24;
        // },
        // logoSize() {
        //     if (this.spanLeft !== 4) {
        //         //this.logoIsDisplay = true;
        //         return 30;
        //     } else {
        //         //this.logoIsDisplay = false;
        //         return 0;
        //     }
        // }
    },
    methods: {
        toggleClick() {
            if (this.spanLeft === 4) {
                this.leftNavIsDisplay =true;
                this.spanLeft = 0;
                this.spanRight = 24;
            } else {
                this.leftNavIsDisplay =false;
                this.spanLeft = 4;
                this.spanRight = 20;
            }
        },
        modifyPassWord() {
            this.modal1 = true;
        },
        logout() {
            this.$router.push('/login');
        },
        comfirmModifyPS() {
            return false;
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    this.modal1 = false;
                    //         this.loading = false;
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                    return false;
                }
            })
            // this.$Message.info('点击了确定');
        },
        cancel() {
            this.modal1 = false;
            this.$Message.info('点击了取消');
        },
        menuSelect(name) {
            this.$router.push({ path: name });
        }

    },
    mounted() {
    }
}
</script>
