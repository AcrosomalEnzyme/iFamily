
class Family_create {
    constructor() {
        this.username = "";
        this.photo = "";
        this.platform = "WEB";
        this.$family_name = $("#family_name");
        this.$family_password = $("#family_password_first");
        this.$family_password_confirm = $("#family_password_first");
        this.$family_create_submit = $("#family_create_submit");
        this.$family_create_to_join = $("#family_create_to_join");
        this.$family_create_error_message = $("#family_create_error_message");
        this.start();
    }

    start() {
        //从服务器端获取信息
        this.getinfo_web();
        //绑定监听函数
        this.add_listening_events();
    }

    //统一绑定监听函数
    add_listening_events() {
        let outer = this;
        this.add_listening_events_family_create();
        //this.add_listening_events_register();
    }

    //登录界面监听函数
    add_listening_events_family_create() {
        //有click函数都需要定义outer
        let outer = this;

        //创建家庭按钮的监听函数
        this.$family_create_submit.click(function () {
            outer.family_create();
        });

        //切换加入家庭界面的监听函数
        this.$family_create_to_join.click(function () {
            outer.family_create_to_join();
        });
    }

    //创建家庭
    family_create()
    {
        let outer = this;
        //获取用户输入的家庭名称和密码
        //val表示取出input的值
        let family_name = this.$family_name.val();
        let family_password = this.$family_password.val();
        let family_password_confirm = this.$family_password_confirm.val();

        //每次点击要清空错误信息
        this.$family_create_error_message.empty();

        $.ajax({
            url: "http://175.178.119.52/family/family/family_create/",
            type: "GET",
            data: {
                username: outer.username,
                family_name: family_name,
                family_password: family_password,
                family_password_confirm: family_password_confirm,
            },
            success: function(res){
                //console.log(res);
                if (res.result === "success")
                {
                    //创建家庭成功就加载出首页
                    window.location.href="http://175.178.119.52/game/";
                    // location.reload();
                }
                else
                {
                    //创建家庭失败就显示失败信息
                    console.log(res.result);
                    outer.$family_create_error_message.html(res.result);
                }
            }
        });
    }

    //获取用户是否登录的状态，web端
    getinfo_web() {
        //console.log("1");
        //为了记录外部的“this”
        let outer = this;
        $.ajax({
            //像相应的链接发送请求
            url: "http://175.178.119.52/family/family/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
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

                    window.location.href="http://175.178.119.52/family/login/";
                }
            }
        });
    }
}
