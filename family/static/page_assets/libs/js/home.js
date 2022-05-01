class Home {
    constructor() {
        this.username = "";
        this.photo = "";
        this.family_name = "";
        // this.status = true;
        this.family_members = [];

        this.$home = $(".dashboard-main-wrapper");
        //提示消息小红点
        this.$home_nav_indicator = this.$home.find("#home_nav_indicator");
        //消息提示框
        this.$home_nav_list_group = this.$home.find("#home_nav_list_group");
        //菜单栏：用户头像、用户名、登出按钮
        this.$home_nav_photo = this.$home.find("#home_nav_photo");
        this.$home_nav_username = this.$home.find("#home_nav_username");
        this.$home_nav_logout = this.$home.find("#home_nav_logout");
        //名片栏：用户头像、用户名、家庭、登出
        this.$home_card_photo = this.$home.find("#home_card_photo");
        this.$home_card_username = this.$home.find("#home_card_username");
        this.$home_card_family = this.$home.find("#home_card_family");
        this.$home_card_logout = this.$home.find("#home_card_logout");
        //家庭成员每一个tbody
        this.$home_family_card = this.$home.find("#home_family_card");
        this.$home_family_card_member = this.$home.find("#home_family_card_member");

        // this.$home_logout.text("ff") ;
        // console.log(this.$home_logout.text());
        // this.$home_nav_photo.attr('src','fff');

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
        // this.getinfo_home();
        // //绑定监听函数
        this.add_listening_events();
        // this.flag = true;

        // setInterval(this.get_online, 5000);
        // setInterval(this.getinfo_home, 5000);

    }

    //统一绑定监听函数
    add_listening_events() {
        let outer = this;
        this.add_listening_events_home();
        //this.add_listening_events_register();
    }

    //主页界面监听函数
    add_listening_events_home() {
        //有click函数都需要定义outer
        let outer = this;

        //退出登录按钮的监听函数
        this.$home_nav_logout.click(function () {
            outer.home_logout();
        });
        this.$home_card_logout.click(function () {
            outer.home_logout();
        });

    }

    //主页界面的退出登录函数
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

    //填入主页界面所需的信息
    update_page() {
        this.$home_nav_photo.attr('src', this.photo);
        this.$home_nav_username.text(this.username);
        this.$home_card_photo.attr('src', this.photo);
        this.$home_card_username.text(" " + this.username);
        if (!this.family_name) {
            this.$home_card_family.text("  我的家庭：还未加入家庭");
            this.$home_family_card.text("家庭成员：还未加入家庭");
            return 0;
        }
        this.$home_card_family.text("  我的家庭：" + this.family_name);

        let member_information = "";
        //加入家庭成员列表
        for (let i = 0; i < this.family_members.length; i++) {
            let member = this.family_members[i];
            // console.log(member);
            // console.log(member.photo);
            //如果是在线状态
            if (member.status) {
                member_information =
                    member_information +
                    "<tr>" +
                    "<td>" + (i + 1) + "</td>" +
                    "<td>" + "<div class=\"m-r-10\"><img src=" + member.photo + " alt=\"user\" class=\"rounded\" width=\"45\"></div>" + "</td>" +
                    "<td>" + member.username + "</td>" +
                    "<td>" + member.score + "</td>" +
                    "<td " + "id=\"" + member.username + "\"" + "><span class=\"badge-dot badge-success mr-1\"></span>在线</td>"
            }
            //如果是离线状态
            else {
                member_information =
                    member_information +
                    "<tr>" +
                    "<td>" + (i + 1) + "</td>" +
                    "<td>" + "<div class=\"m-r-10\"><img src=" + member.photo + " alt=\"user\" class=\"rounded\" width=\"45\"></div>" + "</td>" +
                    "<td>" + member.username + "</td>" +
                    "<td>" + member.score + "</td>" +
                    "<td " + "id=\"" + member.username + "\"" + "><span class=\"badge-dot badge-brand mr-1\" ></span>离线</td>"
            }

        }
        this.$home_family_card_member.append(member_information);
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

                    //第一次更新成功，从服务器端获取信息，渲染网页
                    outer.getinfo_home();
                    //每隔10秒更新自己信息，然后获取其他人在线状态并渲染
                    setInterval(function () {
                        $.ajax({
                            url: "http://175.178.119.52/family/get_online",
                            type: "GET",
                            data: {},
                            success: function (res) {
                                // console.log(res);
                                if (!res.family_name)
                                    return 0;
                                let family_members = res.family_member;
                                let member_information = "";
                                //加入家庭成员列表
                                for (let i = 0; i < family_members.length; i++) {
                                    let member = family_members[i];
                                    let $tag_td = outer.$home.find("#" + member.username);
                                    // $tag_td.text('aaaa');
                                    $tag_td.empty();
                                    //根据在线状态进行更新
                                    if (member.status) {
                                        $tag_td.append("<span class=\"badge-dot badge-success mr-1\"></span>在线");
                                    } else {
                                        $tag_td.append("<span class=\"badge-dot badge-brand mr-1\"></span>离线");
                                    }
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

}