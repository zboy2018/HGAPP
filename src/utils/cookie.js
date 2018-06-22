/*cookie操作方法
 *create by yk 2016/5/19
 */

export default {
    /**
     * 设置cookie
     * 
     * @param {any} cname
     * @param {any} cvalue
     * @param {any} exHours
     */
    set(cname, cvalue, exHours) {
        var d = new Date();
        d.setTime(d.getTime() + (exHours * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    /**
     * 获取cookie
     * 
     * @param {any} cname
     * @returns
     */
    get(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    /**
     * 删除cookie
     * 
     * @param {any} cname
     */
    clear(cname) {
        this.set(cname, "", -1);
    }
}