class Register {
    constructor() {
        this.username = "";
        this.photo = "";
        this.platform = "WEB";

        //为了沿用模板，所以HTML中还是带有login
        this.$register = $(".admin_login");
        this.$register_username = this.$register.find("#register_username");
        this.$register_password = this.$register.find("#register_password_first");
        this.$register_password_confirm = this.$register.find("#register_password_second");
        this.$register_photo = this.$register.find("#register_photo");
        this.$register_submit = this.$register.find("#register_submit");
        this.$register_error_message = this.$register.find("#register_error_message");
        this.$register_login = this.$register.find("#register_to_login");

        // this.$register_photo.hide();

        this.start();
    }

    start()
    {
        //从服务器端获取信息
        //this.getinfo_web();
        //绑定监听函数
        this.add_listening_events();
    }

    //统一绑定监听函数
    add_listening_events()
    {
        let outer = this;
        //this.add_listening_events_login();
        this.add_listening_events_register();
    }

    //注册界面的监听函数
    add_listening_events_register()
    {
        let outer = this;

        //切换登录界面的监听函数
        this.$register_login.click(function(){
            outer.login();
        });

        //注册按钮的监听函数
        this.$register_submit.click(function(){
            outer.register_on_remote();
        });
    }

    //在远程服务器上注册
    //注册要用form的形式，因为需要传输图像文件
    register_on_remote()
    {
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        let photo = this.$register_photo[0].files[0];

        //  Object.defineProperty(this.$register_photo[0],'name',{
		// 	writable:true,//设置照片属性为可写
		// });
        //
        // this.$register_photo[0].name = "few";

        var formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('password_confirm', password_confirm);
        if (photo)
            formData.append('photo', photo);
        else
            formData.append('photo', null);

        // formData.append("csrfmiddlewaretoken",$("[name='csrfmiddlewaretoken']").val());

        //console.log(this.$register_username.val());
        for (var [a, b] of formData.entries()) {undefined
                console.log(a, b);
            }


        this.$register_error_message.empty();

        $.ajax({
            url: "http://175.178.119.52/family/register/register/",
            headers: { "X-CSRFtoken":$.cookie("csrftoken")},
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
                //csrfmiddlewaretoken: '{{ csrf_token }}',
                //csrfmiddlewaretoken:$('[name="csrfmiddlewaretoken"]').val(),
            success: function(res){
                console.log(res);
                if(res.result === "success")
                {
                    //注册成功返回登录界面
                    outer.login();
                }
                else
                {
                    outer.$register_error_message.html(res.result);
                }
            }
        })
    }

    //打开登录界面
    login()
    {
        window.location.href="http://175.178.119.52/family/login/";
    }


}
