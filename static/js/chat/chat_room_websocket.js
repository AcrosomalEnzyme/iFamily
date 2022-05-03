class Chat_room_websocket {
    constructor() {
        this.$chat_room = $(".dashboard-main-wrapper");
        this.$message = this.$chat_room.find("#message");
        this.$history = this.$chat_room.find("#history");
        this.$message_field = this.$chat_room.find("#message_field");

        this.username = "";
        this.photo = "";
        this.family_name = "";
        // this.status = true;
        this.family_members = [];

        //wss的链接
        this.ws = new WebSocket("ws://175.178.119.52/wss/chat_room/");
        this.start();

    }

    start() {
        this.receive();
        let outer = this;
        //先获取基本信息
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
                    // outer.status = res.status;
                    outer.family_members = res.family_member;

                    //获取到相应信息后才能加入channels房间，绑定发送消息函数
                    outer.send_create_member();
                    outer.add_listening_events();


                } else {
                    //用户未登录，跳转回登录界面
                    window.location.href = "http://175.178.119.52/family/login/";
                }
            },
        });


    }

    add_listening_events() {
        let outer = this;
        this.$message.keydown(function (e) {

            //如果是回车键，发送消息
            if (e.which === 13) {
                // let username = this.username;
                let text = outer.$message.val();
                //如果输入的信息不为空
                if (text) {
                    // console.log(text);
                    //清空消息框
                    // outer.$message_field.empty();
                    // outer.$message_field.append("<textarea class=\"form-control\" placeholder=\"输入信息\" rows=\"1\" ></textarea>\n");
                    // outer.$message.val().replace(/\n/g,'');
                    outer.$message.val("");
                    outer.add_message(outer.username, outer.photo, text);

                    // outer.add_message(username, text);
                    //将聊天内容发送给其他玩家

                    outer.send_message(text);
                }
            }
        });
    }

    //从后端接收信息
    receive() {
        let outer = this;
        //表示接收到信息
        this.ws.onmessage = function (e) {

            //将字符串变成JSON
            let data = JSON.parse(e.data);
            // console.log(data);
            let username = data.username;
            //如果是自己发送的广播，就不需要接收
            if (username === outer.username)
                return false;

            let event = data.event;
            //如果接收到消息
            if (event === "message") {
                outer.add_message(username, data.photo, data.text);
            }
        };
    }


    //发送创建用户的消息
    send_create_member() {
        let outer = this;
        // let family = this.family_name.encode('utf-8')
        //发送的API将JSON封装为字符串
        //发送信息时要携带自己的UUID，在playground中被赋值
        this.ws.send(JSON.stringify({
            //'message': "hello server",
            'event': "create_member",
            'username': outer.username,
            'family_name': outer.family_name,
            // 'family_name': family,
        }));


    }

    //传递聊天信息
    send_message(text) {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "message",
            'username': outer.username,
            'photo': outer.photo,
            'text': text,
        }));
    }


    //在历史记录中添加信息
    add_message(name, photo, text) {
        let tag = "";
        tag = tag + "<div class=\"media chat-item\"><img src=\"" + photo +
            "\" class=\"rounded-circle user-avatar-lg\">" +
            "<div class=\"media-body\"><div class=\"chat-item-title\"><span class=\"chat-item-author\">" + name +
            "</span></div>" +
            "<div class=\"chat-item-body\"><p>" + text +
            "</p></div></div></div>"

        this.$history.append(tag);
        this.$history.scrollTop(this.$history[0].scrollHeight);
    }
}