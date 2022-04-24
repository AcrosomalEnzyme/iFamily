class Login
{
    constructor() {
        this.username = "";
        this.photo = "";
        this.platform = "WEB";

        this.$login = $(".admin_login");
        this.$login_username = this.$login.find("#login_username");
        this.$login_password = this.$login.find("#login_password");
        this.$login_submit = this.$login.find("#login_submit");
        this.$login_error_message = this.$login.find("#login_error_message");
        this.$login_register = this.$login.find("#login_to_register");
        //this.$login_submit.hide();
        //this.$login.hide();
        this.start();
    }
    start()
    {
        //从服务器端获取信息
        this.getinfo_web();
        //绑定监听函数
        this.add_listening_events();
    }

    //统一绑定监听函数
    add_listening_events()
    {
        let outer = this;
        this.add_listening_events_login();
        //this.add_listening_events_register();
    }

    //登录界面监听函数
    add_listening_events_login()
    {
        //有click函数都需要定义outer
        let outer = this;

        //切换注册界面的监听函数
        this.$login_register.click(function(){
            outer.register();
        });

        //登录按钮的监听函数
        this.$login_submit.click(function(){
            outer.login_on_remote();
        });
    }

    //在远程服务器上登录
    login_on_remote()
    {
        let outer = this;
        //获取用户输入的用户名和密码
        //val表示取出input的值
        let username = this.$login_username.val();
        let password = this.$login_password.val();

        //每次点击要清空错误信息
        this.$login_error_message.empty();

        $.ajax({
            url: "http://175.178.119.52/family/login/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(res){
                //console.log(res);
                if (res.result === "success")
                {
                    //登录成功就刷新网页，
                    //这样就能通过调用getinfo，加载出首页
                    //location.reload();
                    window.location.href="http://175.178.119.52/game/";
                }
                else
                {
                    //登录失败就显示失败信息
                    console.log(res.result);
                    outer.$login_error_message.html(res.result);
                }
            }
        });
    }

    //打开注册界面
    register()
    {
        window.location.href="http://175.178.119.52/family/register/";
    }

    //获取用户是否登录的状态，web端
    getinfo_web()
    {
        //console.log("1");
        //为了记录外部的“this”
        let outer = this;
        $.ajax({
            //像相应的链接发送请求
            url:"http://175.178.119.52/family/family/getinfo/",
            type:"GET",
            data:{
                platform: outer.platform,
            },
            success: function(res)
            {
                console.log(res);
                if(res.result === "success")
                {
                    //console.log("1");
                    //记录传回来的用户名称和头像
                    outer.username = res.username;
                    outer.photo = res.photo;
                    //跳转回主页
                    window.location.href="http://175.178.119.52/game/";
                    //outer.hide();
                    //outer.root.menu.show();
                }
                else
                {
                    //登录失败，跳转回登录界面
                    //outer.login();
                    //window.location.href="http://175.178.119.52/family/login/";
                }
            }
        });
    }
}
