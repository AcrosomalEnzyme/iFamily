class Family_join {
    constructor() {
        start();
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
        this.add_listening_events_family_join();
        //this.add_listening_events_register();
    }
}