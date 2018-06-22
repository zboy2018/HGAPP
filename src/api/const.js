/**
 * 系统常量
 */


/**
 * 获取所有的路由名称
 *
 */
export const routerNames = {
    login: 'login',
    noPower2: 'noPower2',
    redirect: 'redirect',
    error404: '404',
    home: 'home',
    main: 'main',
    table: 'table',
    form: 'form',
    user: 'user',
    nullPage: 'nullPage',
    comingSoon: 'comingSoon',
    page4: 'page4',
    page5: 'page5',
    page6: 'page6',
    echarts: 'echarts'
};

/**审批按钮（新版本） */
export const approvalAction = {
    /**同意 */
    OK: 1000,
    /**拒绝 */
    Reject: 1001,
    /**加签 */
    Sign: 1002,
    /**转签 */
    Transfer: 1003,
    /**驳回 */
    //TurnedDown: 1004,
    /**不同意但继续 */
    DisagreeContinue: 1005
};

/**k2系统相关 在待办中心注册的 系统编码 */
export const k2RegistrationSystemCodes = ['k2', '8081', '8080']


/**任务状态 const*/
export const taskState = {
    /**待办 */
    todo: 1,
    /**办理中 */
    dong: 2,
    /**已办 */
    done: 3,
}
