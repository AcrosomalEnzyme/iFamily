class Stock_base {
    constructor() {
        this.username = "";
        this.photo = "";
        this.family_name = "";
        // this.status = true;
        this.family_members = [];

        this.$stock = $(".dashboard-main-wrapper");
        //提示消息小红点
        this.$home_nav_indicator = this.$stock.find("#home_nav_indicator");
        //消息提示框
        this.$home_nav_list_group = this.$stock.find("#home_nav_list_group");
        //菜单栏：用户头像、用户名、登出按钮
        this.$home_nav_photo = this.$stock.find("#home_nav_photo");
        this.$home_nav_username = this.$stock.find("#home_nav_username");
        this.$home_nav_logout = this.$stock.find("#home_nav_logout");
        //查找个股的输入框和按钮
        this.$stock_search_text = this.$stock.find("#stock_search_text");
        this.$stock_search_btn = this.$stock.find("#stock_search_btn");

        this.start();
    }

    start() {
        //隐藏提示消息小红点和消息提示框
        this.$home_nav_indicator.hide();
        this.$home_nav_list_group.hide();
        //更新自己的在线信息
        this.get_online();
        //从服务器端获取信息
        this.getinfo();

        //从服务器端获取信息，渲染网页
        this.getinfo_home();
        // //绑定监听函数
        this.add_listening_events();
        // this.flag = true;

        // setInterval(this.get_online, 5000);
        // setInterval(this.getinfo_home, 5000);

    }

    //统一绑定监听函数
    add_listening_events() {
        let outer = this;
        this.add_listening_events_stock();
        //this.add_listening_events_register();
    }

    //股票界面监听函数
    add_listening_events_stock() {
        //有click函数都需要定义outer
        let outer = this;

        //退出登录按钮的监听函数
        this.$home_nav_logout.click(function () {
            outer.home_logout();
        });

        //查找股票的按钮的监听函数
        this.$stock_search_btn.click(function () {
            outer.stock_search();
        });
    }

    //版块界面的退出登录函数
    home_logout() {
        console.log("click!");
        $.ajax({
            url: "http://175.178.119.52/family/login/logout/",
            type: "GET",
            success: function (res) {
                if (res.result === "success") {
                    window.location.href = "http://175.178.119.52/family/login/";
                }
            }
        });
    }

    //查找股票的函数
    stock_search() {
        var text = document.getElementById("search_text");
        let outer = this;
        let username = this.username;
        let search_kind = 0;
        let search_information = this.$stock_search_text.val();

        if (this.IsNum(search_information)) {
            if (search_information.length != 6) {
                alert("查找格式不符合！需要6位数字代码");
                return 0;
            }
            //表示查找的类型为数字代码
            search_kind = 1;
        } else if (this.IsAlphabet(search_information)) {
            if (search_information.length != 4) {
                alert("查找格式不符合！需要四个英文字母");
                return 0;
            }

            //表示查找的类型为字母代码
            search_kind = 2;
        } else {
            //表示查找的类型为中文代码
            search_kind = 3;
        }

        window.location.href = `http://175.178.119.52/stock/company_detail/?username=${username}&search_kind=${search_kind}&search_information=${search_information}`;
        //  $.ajax({
        //     //像相应的链接发送请求
        //     url: "http://175.178.119.52/stock/company_detail/",
        //     type: "GET",
        //     data: {
        //
        //     },
        //     success: function (res) {
        //         // console.log(res);
        //         if (res.result === "success") {
        //             //记录传回来的用户名称和头像
        //
        //         }
        //     },
        // });

        return 0;
    }

    //获取用户是否登录的状态，web端
    getinfo() {
        //console.log("1");
        //为了记录外部的“this”
        let outer = this;
        $.ajax({
            //像相应的链接发送请求
            url: "http://175.178.119.52/family/getinfo/",
            type: "GET",
            data: {
                // platform: outer.platform,
            },
            success: function (res) {
                // console.log(res);
                if (res.result === "success") {
                    //console.log("1");
                    //记录传回来的用户名称和头像
                    outer.username = res.username;
                    outer.photo = res.photo;
                    //跳转回主页
                    // window.location.href = "http://175.178.119.52/home/";
                    //outer.hide();
                    //outer.root.menu.show();
                } else {
                    //登录失败，跳转回登录界面
                    //outer.login();
                    window.location.href = "http://175.178.119.52/family/login/";
                }
            }
        });
    }

    //获取渲染界面所需信息
    getinfo_home() {
        //为了记录外部的“this”
        let outer = this;
        $.ajax({
            //像相应的链接发送请求
            url: "http://175.178.119.52/family/getinfo_home/",
            type: "GET",
            data: {},
            success: function (res) {
                // console.log(res);
                if (res.result === "success") {
                    //记录传回来的用户名称和头像
                    outer.username = res.username;
                    outer.photo = res.photo;
                    outer.family_name = res.family_name;
                    outer.status = res.status;
                    outer.family_members = res.family_member;


                    //更新主页信息
                    outer.update_page();


                } else {
                    //用户未登录，跳转回登录界面
                    window.location.href = "http://175.178.119.52/family/login/";
                }
            },
        });

    }

    //填入主页界面所需的信息
    update_page() {
        this.$home_nav_photo.attr('src', this.photo);
        this.$home_nav_username.text(this.username);
    }

    //更新自己的在线信息
    get_online() {
        let outer = this;

        $.ajax({
            url: "http://175.178.119.52/family/get_online",
            type: "GET",
            data: {},
            success: function (res) {
                if (res.result === "success") {

                    //每隔10秒更新自己信息，然后获取其他人在线状态并渲染
                    setInterval(function () {
                        $.ajax({
                            url: "http://175.178.119.52/family/get_online",
                            type: "GET",
                            data: {},
                            success: function (res) {
                                return 0;
                            },
                            complete: function () {
                                // Schedule the next request when the current one is complete
                                // setTimeout(outer.get_online, 5000);
                            },
                            error: function (xhr, errmsg, err) {
                                console.log("error");
                            }
                        });
                    }, 10000);

                }

            },
            complete: function () {
                // Schedule the next request when the current one is complete
                // setTimeout(outer.get_online, 5000);
            },
            error: function (xhr, errmsg, err) {
                console.log("error");
            }
        });
    }

    //判断是不是数字
    IsNum(num) {
        let reNum = /^\d*$/;
        return (reNum.test(num));
    }

    //判断是不是字母
    IsAlphabet(alp) {
        let reAlp = /[a-z]/i;
        return (reAlp.test(alp));
    }
}