class My_select {
    constructor() {
        this.$my_select = $(".dashboard-main-wrapper");

        // this.my_companys = [""];

        // this.user_name = "";

        this.company_id = "";
        this.simple_name = "";
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
        this.price_tem = "";
        this.amplitude = "";
        this.turnover_ratio = "";

        let outer = this;

        $.ajax({
            type: "GET",
            url: "http://175.178.119.52/stock/get_my_companys/",
            dataType: 'json',
            success: function (result) {
                let my_companys = result["my_companys"];

                //如果没有任何自选数据
                if (!my_companys[0])
                    return 0;
                outer.start(my_companys);
            }
        });

        // console.log(this.my_companys);
    }

    start(my_companys_list) {
        let outer = this;
        let my_companys = my_companys_list;
        let company_id = this.company_id;
        let simple_name = this.simple_name;
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
        let price_tem = this.price_tem;
        let amplitude = this.amplitude;
        let turnover_ratio = this.turnover_ratio;
        let counter = 0;
        let html = "";
        let html2 = "";
        let html3 = "";


        $.ajax({
            type: "GET",
            url: "http://175.178.119.52/stock/get_my_select_information/",
            // dataType: 'json',
            traditional: true,
            data: {
                "my_companys": my_companys,
            },
            success: function (result) {

                let data = result['data'];
                console.log(data);
                let length = data.length;

                //改写网页内容
                html = "";
                html2 = "";
                html3 = "";
                for (let i = 0; i < length; i++) {
                    company_id = data[i]["company_id"];
                    simple_name = data[i]["simple_name"];
                    trade_status = data[i]["trade_status"];
                    update_time = data[i]["update_time"];
                    price_tem = data[i]["price_tem"];
                    change_ = data[i]["change_"];
                    change_percent = data[i]["change_percent"];
                    closing_price = data[i]["closing_price"];
                    opening_price = data[i]["opening_price"];
                    highest = data[i]["highest"];
                    lowest = data[i]["lowest"];
                    amplitude = data[i]["amplitude"];
                    turnover_ratio = data[i]["turnover_ratio"];
                    PER = data[i]["PER"];
                    dynamic_PER = data[i]["dynamic_PER"];
                    PBR = data[i]["PBR"];
                    market_value = data[i]["market_value"];
                    circulation_market_value = data[i]["circulation_market_value"];
                    turnover_volume = data[i]["turnover_volume"];
                    turnover_value = data[i]["turnover_value"];
                    volume_ratio = data[i]["volume_ratio"];
                    circulation_shares = data[i]["circulation_shares"];
                    total_shares = data[i]["total_shares"];
                    BPS = data[i]["BPS"];

                    counter = i + 1;

                    html = html +
                        "<tr>\n" +

                        "<td>" + counter + "</td>\n" +
                        "<td>" + company_id + "</td>\n" +
                        "<td>" + simple_name + "</td>\n" +
                        "<td>" + trade_status + "</td>\n" +
                        "<td>" + price_tem + "</td>\n" +
                        "<td>" + change_ + "</td>\n" +
                        "<td>" + change_percent + "</td>\n" +
                        "<td>" + closing_price + "</td>\n" +
                        "<td>" + opening_price + "</td>\n" +
                        "<td>" + highest + "</td>\n" +
                        "<td>" + lowest + "</td>\n" +
                        "<td>" + amplitude + "</td>\n" +
                        "<td>" + turnover_ratio + "</td>\n" +
                        "<td>" + PER + "</td>\n" +
                        "<td>" + dynamic_PER + "</td>\n" +
                        "<td>" + PBR + "</td>\n" +
                        "<td>" + market_value + "</td>\n" +
                        "<td>" + circulation_market_value + "</td>\n" +
                        "<td>" + turnover_value + "</td>\n" +
                        "<td>" + volume_ratio + "</td>\n" +
                        "<td>" + circulation_shares + "</td>\n" +
                        "<td>" + total_shares + "</td>\n" +
                        "<td>" + BPS + "</td>\n" +
                        "</tr>\n";

                    // alert(total_shares);

                    if (change_percent[0] != "-") {
                        html2 = html2 + "<li class=\"traffic-sales-content list-group-item \"><span\n" +
                            "class=\"traffic-sales-name\">" + simple_name + "</span><span\n" +
                            "class=\"traffic-sales-amount\">¥" + price_tem + "  " + "<span\n" +
                            "class=\"icon-circle-small icon-box-xs text-success ml-4 bg-success-light\"><i\n" +
                            "class=\"fa fa-fw fa-arrow-up\"></i></span><span\n" +
                            "class=\"ml-1 text-success\">" + change_percent + "</span></span>\n" +
                            "</li>";
                    } else {
                        html2 = html2 + "<li class=\"traffic-sales-content list-group-item \"><span\n" +
                            "class=\"traffic-sales-name\">" + simple_name + "<span class=\"traffic-sales-amount\">¥" + price_tem + "  " + "<span\n" +
                            "class=\"icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light\"><i\n" +
                            "class=\"fa fa-fw fa-arrow-down\"></i></span><span\n" +
                            "class=\"ml-1 text-danger\">" + change_percent + "</span></span>\n" +
                            "</span>\n" +
                            "</li>";
                    }


                }


                for (let i = length - 1; i > -1; i--) {

                    simple_name = data[i]["simple_name"];
                    price_tem = data[i]["price_tem"];
                    change_percent = data[i]["change_percent"];

                    if (change_percent[0] != "-") {
                        html3 = html3 + "<li class=\"traffic-sales-content list-group-item \"><span\n" +
                            "class=\"traffic-sales-name\">" + simple_name + "</span><span\n" +
                            "class=\"traffic-sales-amount\">¥" + price_tem + "  " + "<span\n" +
                            "class=\"icon-circle-small icon-box-xs text-success ml-4 bg-success-light\"><i\n" +
                            "class=\"fa fa-fw fa-arrow-up\"></i></span><span\n" +
                            "class=\"ml-1 text-success\">" + change_percent + "</span></span>\n" +
                            "</li>";
                    } else {
                        html3 = html3 + "<li class=\"traffic-sales-content list-group-item \"><span\n" +
                            "class=\"traffic-sales-name\">" + simple_name + "<span class=\"traffic-sales-amount\">¥" + price_tem + "  " + "<span\n" +
                            "class=\"icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light\"><i\n" +
                            "class=\"fa fa-fw fa-arrow-down\"></i></span><span\n" +
                            "class=\"ml-1 text-danger\">" + change_percent + "</span></span>\n" +
                            "</span>\n" +
                            "</li>";
                    }


                }


                $("#detail").empty();
                $("#detail").html(html);

                $("#list").empty();
                $("#list").html(html2);

                $("#list2").empty();
                $("#list2").html(html3);


                setInterval(function () {

                    $.ajax({
                        type: "GET",
                        url: "http://175.178.119.52/stock/get_my_select_information/",
                        data: {
                            "my_companys": my_companys,
                        },
                        success: function (result) {
                            let data = result['data'];
                            let length = data.length;

                            //改写网页内容
                            html = "";
                            html2 = "";
                            html3 = "";
                            for (let i = 0; i < length; i++) {
                                company_id = data[i]["company_id"];
                                simple_name = data[i]["simple_name"];
                                trade_status = data[i]["trade_status"];
                                update_time = data[i]["update_time"];
                                price_tem = data[i]["price_tem"];
                                change_ = data[i]["change_"];
                                change_percent = data[i]["change_percent"];
                                closing_price = data[i]["closing_price"];
                                opening_price = data[i]["opening_price"];
                                highest = data[i]["highest"];
                                lowest = data[i]["lowest"];
                                amplitude = data[i]["amplitude"];
                                turnover_ratio = data[i]["turnover_ratio"];
                                PER = data[i]["PER"];
                                dynamic_PER = data[i]["dynamic_PER"];
                                PBR = data[i]["PBR"];
                                market_value = data[i]["market_value"];
                                circulation_market_value = data[i]["circulation_market_value"];
                                turnover_volume = data[i]["turnover_volume"];
                                turnover_value = data[i]["turnover_value"];
                                volume_ratio = data[i]["volume_ratio"];
                                circulation_shares = data[i]["circulation_shares"];
                                total_shares = data[i]["total_shares"];
                                BPS = data[i]["BPS"];

                                counter = i + 1;

                                html = html +
                                    "<tr>\n" +

                                    "<td>" + counter + "</td>\n" +
                                    "<td>" + company_id + "</td>\n" +
                                    "<td>" + simple_name + "</td>\n" +
                                    "<td>" + trade_status + "</td>\n" +
                                    "<td>" + price_tem + "</td>\n" +
                                    "<td>" + change_ + "</td>\n" +
                                    "<td>" + change_percent + "</td>\n" +
                                    "<td>" + closing_price + "</td>\n" +
                                    "<td>" + opening_price + "</td>\n" +
                                    "<td>" + highest + "</td>\n" +
                                    "<td>" + lowest + "</td>\n" +
                                    "<td>" + amplitude + "</td>\n" +
                                    "<td>" + turnover_ratio + "</td>\n" +
                                    "<td>" + PER + "</td>\n" +
                                    "<td>" + dynamic_PER + "</td>\n" +
                                    "<td>" + PBR + "</td>\n" +
                                    "<td>" + market_value + "</td>\n" +
                                    "<td>" + circulation_market_value + "</td>\n" +
                                    "<td>" + turnover_value + "</td>\n" +
                                    "<td>" + volume_ratio + "</td>\n" +
                                    "<td>" + circulation_shares + "</td>\n" +
                                    "<td>" + total_shares + "</td>\n" +
                                    "<td>" + BPS + "</td>\n" +
                                    "</tr>\n";

                                if (change_percent[0] != "-") {
                                    html2 = html2 + "<li class=\"traffic-sales-content list-group-item \"><span\n" +
                                        "class=\"traffic-sales-name\">" + simple_name + "</span><span\n" +
                                        "class=\"traffic-sales-amount\">¥" + price_tem + "  " + "<span\n" +
                                        "class=\"icon-circle-small icon-box-xs text-success ml-4 bg-success-light\"><i\n" +
                                        "class=\"fa fa-fw fa-arrow-up\"></i></span><span\n" +
                                        "class=\"ml-1 text-success\">" + change_percent + "</span></span>\n" +
                                        "</li>";
                                } else {
                                    html2 = html2 + "<li class=\"traffic-sales-content list-group-item \"><span\n" +
                                        "class=\"traffic-sales-name\">" + simple_name + "<span class=\"traffic-sales-amount\">¥" + price_tem + "  " + "<span\n" +
                                        "class=\"icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light\"><i\n" +
                                        "class=\"fa fa-fw fa-arrow-down\"></i></span><span\n" +
                                        "class=\"ml-1 text-danger\">" + change_percent + "</span></span>\n" +
                                        "</span>\n" +
                                        "</li>";
                                }


                            }

                            for (let i = length - 1; i > -1; i--) {

                                simple_name = data[i]["simple_name"];
                                price_tem = data[i]["price_tem"];
                                change_percent = data[i]["change_percent"];

                                if (change_percent[0] != "-") {
                                    html3 = html3 + "<li class=\"traffic-sales-content list-group-item \"><span\n" +
                                        "class=\"traffic-sales-name\">" + simple_name + "</span><span\n" +
                                        "class=\"traffic-sales-amount\">¥" + price_tem + "  " + "<span\n" +
                                        "class=\"icon-circle-small icon-box-xs text-success ml-4 bg-success-light\"><i\n" +
                                        "class=\"fa fa-fw fa-arrow-up\"></i></span><span\n" +
                                        "class=\"ml-1 text-success\">" + change_percent + "</span></span>\n" +
                                        "</li>";
                                } else {
                                    html3 = html3 + "<li class=\"traffic-sales-content list-group-item \"><span\n" +
                                        "class=\"traffic-sales-name\">" + simple_name + "<span class=\"traffic-sales-amount\">¥" + price_tem + "  " + "<span\n" +
                                        "class=\"icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light\"><i\n" +
                                        "class=\"fa fa-fw fa-arrow-down\"></i></span><span\n" +
                                        "class=\"ml-1 text-danger\">" + change_percent + "</span></span>\n" +
                                        "</span>\n" +
                                        "</li>";
                                }


                            }

                            $("#detail").empty();
                            $("#detail").html(html);

                            $("#list").empty();
                            $("#list").html(html2);

                            $("#list2").empty();
                            $("#list2").html(html3);

                        }
                    });


                }, 5000);

            }
        });
    }
}