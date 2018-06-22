/**
 *此处配置 根访问路径 以及 全局错误处理
  更多配置请根据业务逻辑自行实现
  
 * create by yang.kun01
 */

/**是否是调试模式 */
export const debug = true; //process.env.NODE_ENV !== 'production';

/**当前运行环境 */
export const envType = 4; //1开发服；2UAT服务；3正式服；4本地开发机;

/**是否使用自动登录功能 */
export const autoLogin = {
    'userId': '51034793',
    'open': true
};