class Family_join {
    constructor() {
        this.username = "";
        this.photo = "";
        // this.platform = "WEB";
        this.$family_name = $("#family_name");
        this.$family_password = $("#family_password");
        this.$family_join_submit = $("#family_join_submit");
        this.$family_join_to_create = $("#family_join_to_create");
        this.$family_join_error_message = $("#family_join_error_message");

        this.start();
    }


    start() {
        //从服务器端获取信息
        this.getinfo();
        //绑定监听函数
        this.add_listening_events();
    }

    //统一绑定监听函数
    add_listening_events() {
        let outer = this;
        this.add_listening_events_family_join();
        //this.add_listening_events_register();
    }

    add_listening_events_family_join() {
        //有click函数都需要定义outer
        let outer = this;

        //加入家庭按钮的监听函数
        this.$family_join_submit.click(function () {
            outer.family_join();
        });

        //切换加入家庭界面的监听函数
        this.$family_join_to_create.click(function () {
            window.location.href = "http://175.178.119.52/family/family/family_create_index/";
        });
    }

    //加入家庭
    family_join() {
        let outer = this;
        //获取用户输入的家庭名称和密码
        //val表示取出input的值
        let family_name = this.$family_name.val();
        let family_password = this.$family_password.val();

        //每次点击要清空错误信息
        this.$family_join_error_message.empty();

        $.ajax({
            url: "http://175.178.119.52/family/family/family_join/",
            type: "GET",
            data: {
                username: outer.username,
                family_name: family_name,
                family_password: family_password,
            },
            success: function (res) {
                //console.log(res);
                if (res.result === "success") {
                    //加入家庭成功就加载出首页
                    window.location.href = "http://175.178.119.52/home/";
                    // location.reload();
                } else {
                    //创建家庭失败就显示失败信息
                    console.log(res.result);
                    outer.$family_join_error_message.html(res.result);
                }
            }
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
                console.log(res);
                if (res.result === "success") {
                    //console.log("1");
                    //记录传回来的用户名称和头像
                    outer.username = res.username;
                    outer.photo = res.photo;
                    //跳转回主页
                    //window.location.href = "http://175.178.119.52/game/";
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