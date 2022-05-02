class Company_detail {
    constructor(company_id, place, simple_name) {

        this.$company_detail = $(".dashboard-main-wrapper");
        // this.$dom = this.$company_detail.find("#container");
        this.$select = this.$company_detail.find("#select");
        this.company_id = company_id;
        this.place = place;
        this.simple_name = simple_name;


        // this. id = "";
        // this. simple_name = "";
        this.trade_status = "";
        this.update_time = "";
        this.change_ = "";
        this.closing_price = "";
        this.lowest = "";
        this.PER = "";
        this.dynamic_PER = "";
        this.PBR = "";
        this.market_value = "";
        this.circulation_market_value = "";
        this.turnover_value = "";
        this.volume_ratio = "";
        this.circulation_shares = "";
        this.total_shares = "";
        this.BPS = "";
        this.change_percent = "";
        this.opening_price = "";
        this.highest = "";
        this.turnover_volume = "";
        this.price_tem = 0;
        this.amplitude = 0;
        this.turnover_ratio = 0;

        this.start();

    }

    start() {
        // console.log( this.company_id);
        let outer = this;
        let company_id = this.company_id;
        let place = this.place;
        let simple_name = this.simple_name;
        // this. id = "";
        // this. simple_name = "";
        let trade_status = this.trade_status;
        let update_time = this.update_time;
        let change_ = this.change_;
        let closing_price = this.closing_price;
        let lowest = this.lowest;
        let PER = this.PER;
        let dynamic_PER = this.dynamic_PER;
        let PBR = this.PBR;
        let market_value = this.market_value;
        let circulation_market_value = this.circulation_market_value;
        let turnover_value = this.turnover_value;
        let volume_ratio = this.volume_ratio;
        let circulation_shares = this.circulation_shares;
        let total_shares = this.total_shares;
        let BPS = this.BPS;
        let change_percent = this.change_percent;
        let opening_price = this.opening_price;
        let highest = this.highest;
        let turnover_volume = this.turnover_volume;
        let price_tem = 0;
        let amplitude = 0;
        let turnover_ratio = 0;

        let high_price;
        let low_price;
        let turnover_ratio_high;


        // this.$dom = this.$company_detail.find("#container");
        // this.myChart = echarts.init(this.$dom);
        // let dom = document.getElementById("container");
        // let myChart = echarts.init(dom);

        this.add_listening_events();


        $.ajax({
            type: "GET",
            url: "http://175.178.119.52/stock/company_detail_information/",
            // dataType: 'json',
            data: {
                "company_id": this.company_id,
                "place": this.place,
                "simple_name": this.simple_name,
            },
            success: function (result) {
                company_id = result['company_id']
                simple_name = result['simple_name']
                price_tem = result['price_tem']
                amplitude = result['amplitude']
                turnover_ratio = result['turnover_ratio']
                // user_name = result['user_name']
                change_percent = result['change_percent']
                opening_price = result['opening_price']
                highest = result['highest']
                turnover_volume = result['turnover_volume']

                trade_status = result['trade_status']
                update_time = result['update_time']
                change_ = result['change_']
                closing_price = result['closing_price']
                lowest = result['lowest']
                PER = result['PER']
                dynamic_PER = result['dynamic_PER']
                PBR = result['PBR']
                market_value = result['market_value']
                circulation_market_value = result['circulation_market_value']
                turnover_value = result['turnover_value']
                volume_ratio = result['volume_ratio']
                circulation_shares = result['circulation_shares']
                total_shares = result['total_shares']
                BPS = result['BPS']


                high_price = price_tem * (1 + 0.005 * amplitude);

                low_price = price_tem * (1 - 0.005 * amplitude);


                turnover_ratio_high = turnover_ratio * 3;


                turnover_ratio_high = turnover_ratio_high.toFixed(2);

                high_price = high_price.toFixed(2);


                low_price = low_price.toFixed(2);


                $(function init() {

                    var html = "";


                    html = company_id + " " + simple_name;
                    $("#base_infor").empty();
                    $("#base_infor").html(html);


                    $("#price_tem").empty();
                    $("#price_tem").html(price_tem);

                    if (change_percent[0] != "-") {

                        html = "<div class=\"metric-label d-inline-block float-right text-danger font-weight-bold\">\n" +
                            "                                             <span class=\"icon-circle-small icon-box-xs text-danger bg-danger-light\">\n" +
                            "                                                 <i class=\"fa fa-fw fa-arrow-up\"></i>\n" +
                            "                                             </span>\n" +
                            "                                            <span class=\"ml-1\">" + change_percent + "</span>\n" +
                            "                                        </div>"


                        $("#change_percent").empty();
                        $("#change_percent").html(html);

                    } else {
                        html = "<div class=\"metric-label d-inline-block float-right text-success font-weight-bold\">\n" +
                            "                                        <span class=\"icon-circle-small icon-box-xs text-success bg-success-light bg-success-light \"><i\n" +
                            "                                                class=\"fa fa-fw fa-arrow-down\"></i></span><span class=\"ml-1\">" + change_percent + "</span>\n" +
                            "                                    </div>"
                        $("#change_percent").empty();
                        $("#change_percent").html(html);
                    }

                    $("#opening_price").empty();
                    $("#opening_price").html(opening_price);

                    $("#highest").empty();
                    $("#highest").html(highest);

                    $("#turnover_volume").empty();
                    $("#turnover_volume").html(turnover_volume);

                    //详细信息
                    html =
                        "<td>1</td>\n" +
                        "<td>" + simple_name + "</td>\n" +
                        "<td>" + trade_status + "</td>\n" +
                        " <td>" + update_time + "</td>\n" +
                        "<td>" + change_ + "</td>\n" +
                        "<td>" + closing_price + "</td>\n" +
                        "<td>" + lowest + "</td>\n" +
                        "<td>" + amplitude + "</td>\n" +
                        "<td>" + PER + "</td>\n" +
                        "<td>" + dynamic_PER + "</td>\n" +
                        "<td>" + PBR + "</td>\n" +
                        "<td>" + market_value + "</td>\n" +
                        "<td>" + circulation_market_value + "</td>\n" +
                        "<td>" + turnover_value + "</td>\n" +
                        "<td>" + volume_ratio + "</td>\n" +
                        "<td>" + circulation_shares + "</td>\n" +
                        "<td>" + total_shares + "</td>\n" +
                        "<td>" + BPS + "</td>\n"


                    $("#detail").empty();
                    $("#detail").html(html);


                });


                setInterval(function () {


                    $.ajax({
                        type: "GET",
                        url: "http://175.178.119.52/stock/company_detail_information/",
                        // dataType: 'json',
                        data: {
                            "company_id": outer.company_id,
                            "place": outer.place,
                            "simple_name": outer.simple_name,
                        },
                        success: function (result) {

                            price_tem = result['price_tem']
                            turnover_ratio = result['turnover_ratio']
                            amplitude = result['amplitude']


                            trade_status = result['trade_status']
                            update_time = result['update_time']
                            change_ = result['change_']
                            closing_price = result['closing_price']
                            lowest = result['lowest']
                            PER = result['PER']
                            dynamic_PER = result['dynamic_PER']
                            PBR = result['PBR']
                            market_value = result['market_value']
                            circulation_market_value = result['circulation_market_value']
                            turnover_value = result['turnover_value']
                            volume_ratio = result['volume_ratio']
                            circulation_shares = result['circulation_shares']
                            total_shares = result['total_shares']
                            BPS = result['BPS']
                        }
                    });


                    $(function change() {

                        var html = "";


                        $("#price_tem").empty();
                        $("#price_tem").html(price_tem);

                        if (change_percent[0] != "-") {

                            html = "<div class=\"metric-label d-inline-block float-right text-danger font-weight-bold\">\n" +
                                "                                             <span class=\"icon-circle-small icon-box-xs text-danger bg-danger-light\">\n" +
                                "                                                 <i class=\"fa fa-fw fa-arrow-up\"></i>\n" +
                                "                                             </span>\n" +
                                "                                            <span class=\"ml-1\">" + change_percent + "</span>\n" +
                                "                                        </div>"


                            $("#change_percent").empty();
                            $("#change_percent").html(html);

                        } else {
                            html = "<div class=\"metric-label d-inline-block float-right text-success font-weight-bold\">\n" +
                                "                                        <span class=\"icon-circle-small icon-box-xs text-success bg-success-light bg-success-light \"><i\n" +
                                "                                                class=\"fa fa-fw fa-arrow-down\"></i></span><span class=\"ml-1\">" + change_percent + "</span>\n" +
                                "                                    </div>"
                            $("#change_percent").empty();
                            $("#change_percent").html(html);
                        }

                        $("#opening_price").empty();
                        $("#opening_price").html(opening_price);

                        $("#highest").empty();
                        $("#highest").html(highest);

                        $("#turnover_volume").empty();
                        $("#turnover_volume").html(turnover_volume);

                        //详细信息
                        html =
                            "<td>1</td>\n" +
                            "<td>" + simple_name + "</td>\n" +
                            "<td>" + trade_status + "</td>\n" +
                            " <td>" + update_time + "</td>\n" +
                            "<td>" + change_ + "</td>\n" +
                            "<td>" + closing_price + "</td>\n" +
                            "<td>" + lowest + "</td>\n" +
                            "<td>" + amplitude + "</td>\n" +
                            "<td>" + PER + "</td>\n" +
                            "<td>" + dynamic_PER + "</td>\n" +
                            "<td>" + PBR + "</td>\n" +
                            "<td>" + market_value + "</td>\n" +
                            "<td>" + circulation_market_value + "</td>\n" +
                            "<td>" + turnover_value + "</td>\n" +
                            "<td>" + volume_ratio + "</td>\n" +
                            "<td>" + circulation_shares + "</td>\n" +
                            "<td>" + total_shares + "</td>\n" +
                            "<td>" + BPS + "</td>\n"


                        $("#detail").empty();
                        $("#detail").html(html);
                    });

                }, 5000);

            }
        });
    }


    //统一绑定监听函数
    add_listening_events() {
        let outer = this;
        //this.add_listening_events_login();
        this.add_listening_events_company_detail_information();
    }

    //股票详情界面的监听函数
    add_listening_events_company_detail_information() {
        let outer = this;

        //加入自选股的监听函数
        this.$select.click(function () {
            outer.select();
        });

    }

    select() {
        $.ajax({
            url: "http://175.178.119.52/stock/select/",
            type: "GET",
            data: {
                "company_id": this.company_id,
            },
            success: function (res) {
                //console.log(res);
                if (res.result === "success") {
                    //登录成功就刷新网页，
                    //这样就能通过调用getinfo，加载出首页
                    //location.reload();
                    // window.location.href="http://175.178.119.52/home/";
                }
            }
        });

    }


}