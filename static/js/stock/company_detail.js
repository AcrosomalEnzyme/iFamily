class Company_detail {
    constructor(company_id, place, simple_name) {

        this.$company_detail = $(".dashboard-main-wrapper");
        // this.$dom = this.$company_detail.find("#container");
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

        let app = {};
        // this.$dom = this.$company_detail.find("#container");
        // this.myChart = echarts.init(this.$dom);
        let dom = document.getElementById("container");
        let myChart = echarts.init(dom);



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

                        html = "<div class=\"metric-label d-inline-block float-right text-success font-weight-bold\">\n" +
                            "                                             <span class=\"icon-circle-small icon-box-xs text-success bg-success-light\">\n" +
                            "                                                 <i class=\"fa fa-fw fa-arrow-up\"></i>\n" +
                            "                                             </span>\n" +
                            "                                            <span class=\"ml-1\">" + change_percent + "</span>\n" +
                            "                                        </div>"


                        $("#change_percent").empty();
                        $("#change_percent").html(html);

                    } else {
                        html = "<div class=\"metric-label d-inline-block float-right text-danger font-weight-bold\">\n" +
                            "                                        <span class=\"icon-circle-small icon-box-xs text-danger bg-danger-light bg-danger-light \"><i\n" +
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


                let option = null;
                option = {
                    title: {
                        text: simple_name,
                        subtext: company_id,
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#283b56'
                            }
                        }
                    },
                    backgroundColor: '#ffffff',
                    legend: {
                        data: ['价格', '换手率（%）']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: {
                        show: false,
                        start: 0,
                        end: 100
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            data: (function () {
                                let now = new Date();
                                let res = [];
                                let len = 10;
                                while (len--) {
                                    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                                    now = new Date(now - 2000);
                                }
                                return res;
                            })()

                        },
                        {
                            type: 'category',
                            boundaryGap: true,
                            data: (function () {
                                let res = [];
                                let len = 10;
                                while (len--) {
                                    res.push("");
                                }
                                return res;
                            })()
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            scale: true,
                            name: '价格',
                            max: high_price,
                            min: low_price,
                            boundaryGap: [0.2, 0.2]
                        },
                        {
                            type: 'value',
                            scale: true,
                            name: '换手率（%）',
                            max: turnover_ratio_high,
                            min: 0,
                            boundaryGap: [0.2, 0.2]
                        }
                    ],
                    series: [
                        {
                            name: '换手率（%）',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: (function () {
                                let res = [];
                                let len = 10;
                                while (len--) {
                                    // res.push(Math.round(Math.random() * 1000));
                                    res.push(turnover_ratio);
                                }
                                return res;
                            })()

                        },
                        {
                            name: '价格',
                            type: 'line',
                            data: (function () {
                                let res = [];
                                let len = 0;
                                while (len < 10) {
                                    res.push(price_tem);
                                    len++;
                                }
                                return res;
                            })()
                        }
                    ]
                };


                app.count = 11;


                setInterval(function () {

                    price_tem.toString();
                    turnover_ratio.toString();

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


                    high_price = price_tem * (1 + 0.005 * amplitude);
                    low_price = price_tem * (1 - 0.005 * amplitude);
                    high_price = high_price.toFixed(2);
                    low_price = low_price.toFixed(2);

                    if (turnover_ratio_high < turnover_ratio) {
                        turnover_ratio_high = turnover_ratio * 3;
                        turnover_ratio_high = turnover_ratio_high.toFixed(2);
                        option.yAxis[1].max = turnover_ratio_high;
                    }

                    option.yAxis[0].max = high_price;
                    option.yAxis[0].min = low_price;


                    var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
                    var data0 = option.series[0].data;
                    var data1 = option.series[1].data;


                    data0.shift();
                    // // data0.push(Math.round(Math.random() * 1000));
                    data0.push(turnover_ratio);
                    data1.shift();
                    data1.push(price_tem);

                    option.xAxis[0].data.shift();
                    option.xAxis[0].data.push(axisData);
                    // option.xAxis.data.shift();
                    // option.xAxis.data.push(axisData);
                    option.xAxis[1].data.shift();
                    option.xAxis[1].data.push("");


                    $(function change() {

                        var html = "";


                        $("#price_tem").empty();
                        $("#price_tem").html(price_tem);

                        if (change_percent[0] != "-") {

                            html = "<div class=\"metric-label d-inline-block float-right text-success font-weight-bold\">\n" +
                                "                                             <span class=\"icon-circle-small icon-box-xs text-success bg-success-light\">\n" +
                                "                                                 <i class=\"fa fa-fw fa-arrow-up\"></i>\n" +
                                "                                             </span>\n" +
                                "                                            <span class=\"ml-1\">" + change_percent + "</span>\n" +
                                "                                        </div>"


                            $("#change_percent").empty();
                            $("#change_percent").html(html);

                        } else {
                            html = "<div class=\"metric-label d-inline-block float-right text-danger font-weight-bold\">\n" +
                                "                                        <span class=\"icon-circle-small icon-box-xs text-danger bg-danger-light bg-danger-light \"><i\n" +
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


                    // option.xAxis[1].data.push(turnover_ratio);


                    myChart.setOption(option);
                }, 5000);

                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }

            }
        });
    }

    // constructor(company_id, place, simple_name) {
    //
    //     this.$company_detail = $(".dashboard-main-wrapper");
    //     // this.$dom = this.$company_detail.find("#container");
    //     this.company_id = company_id;
    //     this.place = place;
    //     this.simple_name = simple_name;
    //
    //
    //     // this. id = "";
    //     // this. simple_name = "";
    //     this.trade_status = "";
    //     this.update_time = "";
    //     this.change_ = "";
    //     this.closing_price = "";
    //     this.lowest = "";
    //     this.PER = "";
    //     this.dynamic_PER = "";
    //     this.PBR = "";
    //     this.market_value = "";
    //     this.circulation_market_value = "";
    //     this.turnover_value = "";
    //     this.volume_ratio = "";
    //     this.circulation_shares = "";
    //     this.total_shares = "";
    //     this.BPS = "";
    //     this.change_percent = "";
    //     this.opening_price = "";
    //     this.highest = "";
    //     this.turnover_volume = "";
    //     this.price_tem = 0;
    //     this.amplitude = 0;
    //     this.turnover_ratio = 0;
    //
    //
    //     this.high_price;
    //     this.low_price;
    //     this.turnover_ratio_high;
    //
    //     this.app = {};
    //     // this.$dom = this.$company_detail.find("#container");
    //     // this.myChart = echarts.init(this.$dom);
    //             var dom = document.getElementById("container");
    //     this. myChart = echarts.init(dom);
    //
    //
    //     $.ajax({
    //         type: "GET",
    //         url: "http://175.178.119.52/stock/company_detail_information/",
    //         // dataType: 'json',
    //         data: {
    //             "company_id": company_id,
    //             "place": place,
    //             "simple_name": simple_name,
    //         },
    //         success: function (result) {
    //             this.company_id = result['company_id ']
    //             this.simple_name = result['simple_name']
    //             this.price_tem = result['price_tem']
    //             this.amplitude = result['amplitude']
    //             this.turnover_ratio = result['turnover_ratio']
    //             // user_name = result['user_name']
    //             this.change_percent = result['change_percent']
    //             this.opening_price = result['opening_price']
    //             this.highest = result['highest']
    //             this.turnover_volume = result['turnover_volume']
    //
    //             this.trade_status = result['trade_status']
    //             this.update_time = result['update_time']
    //             this.change_ = result['change_']
    //             this.closing_price = result['closing_price']
    //             this.lowest = result['lowest']
    //             this.PER = result['PER']
    //             this.dynamic_PER = result['dynamic_PER']
    //             this.PBR = result['PBR']
    //             this.market_value = result['market_value']
    //             this.circulation_market_value = result['circulation_market_value']
    //             this.turnover_value = result['turnover_value']
    //             this.volume_ratio = result['volume_ratio']
    //             this.circulation_shares = result['circulation_shares']
    //             this.total_shares = result['total_shares']
    //             this.BPS = result['BPS']
    //
    //
    //             this.high_price = this.price_tem * (1 + 0.005 * this.amplitude);
    //
    //             this.low_price = this.price_tem * (1 - 0.005 * this.amplitude);
    //
    //
    //             this.turnover_ratio_high = this.turnover_ratio * 3;
    //
    //
    //             this.turnover_ratio_high = this.turnover_ratio_high.toFixed(2);
    //
    //             this.high_price = this.high_price.toFixed(2);
    //
    //
    //             this.low_price = this.low_price.toFixed(2);
    //
    //
    //             $(function init() {
    //
    //                 let html = "";
    //
    //
    //                 html = company_id + " " + simple_name;
    //                 $("#base_infor").empty();
    //                 $("#base_infor").html(html);
    //
    //
    //                 $("#price_tem").empty();
    //                 $("#price_tem").html(this.price_tem);
    //
    //                 if (change_percent[0] != "-") {
    //
    //                     html = "<div class=\"metric-label d-inline-block float-right text-success font-weight-bold\">\n" +
    //                         "                                             <span class=\"icon-circle-small icon-box-xs text-success bg-success-light\">\n" +
    //                         "                                                 <i class=\"fa fa-fw fa-arrow-up\"></i>\n" +
    //                         "                                             </span>\n" +
    //                         "                                            <span class=\"ml-1\">" + this.change_percent + "</span>\n" +
    //                         "                                        </div>"
    //
    //
    //                     $("#change_percent").empty();
    //                     $("#change_percent").html(html);
    //
    //                 } else {
    //                     html = "<div class=\"metric-label d-inline-block float-right text-danger font-weight-bold\">\n" +
    //                         "                                        <span class=\"icon-circle-small icon-box-xs text-danger bg-danger-light bg-danger-light \"><i\n" +
    //                         "                                                class=\"fa fa-fw fa-arrow-down\"></i></span><span class=\"ml-1\">" + this.change_percent + "</span>\n" +
    //                         "                                    </div>"
    //                     $("#change_percent").empty();
    //                     $("#change_percent").html(html);
    //                 }
    //
    //                 $("#opening_price").empty();
    //                 $("#opening_price").html(this.opening_price);
    //
    //                 $("#highest").empty();
    //                 $("#highest").html(this.highest);
    //
    //                 $("#turnover_volume").empty();
    //                 $("#turnover_volume").html(this.turnover_volume);
    //
    //                 //详细信息
    //                 html =
    //                     "<td>1</td>\n" +
    //                     "<td>" + this.simple_name + "</td>\n" +
    //                     "<td>" + this.trade_status + "</td>\n" +
    //                     " <td>" + this.update_time + "</td>\n" +
    //                     "<td>" + this.change_ + "</td>\n" +
    //                     "<td>" + this.closing_price + "</td>\n" +
    //                     "<td>" + this.lowest + "</td>\n" +
    //                     "<td>" + this.amplitude + "</td>\n" +
    //                     "<td>" + this.PER + "</td>\n" +
    //                     "<td>" + this.dynamic_PER + "</td>\n" +
    //                     "<td>" + this.PBR + "</td>\n" +
    //                     "<td>" + this.market_value + "</td>\n" +
    //                     "<td>" + this.circulation_market_value + "</td>\n" +
    //                     "<td>" + this.turnover_value + "</td>\n" +
    //                     "<td>" + this.volume_ratio + "</td>\n" +
    //                     "<td>" + this.circulation_shares + "</td>\n" +
    //                     "<td>" + this.total_shares + "</td>\n" +
    //                     "<td>" + this.BPS + "</td>\n"
    //
    //
    //                 $("#detail").empty();
    //                 $("#detail").html(html);
    //
    //
    //             });
    //
    //
    //             let option = null;
    //             option = {
    //                 title: {
    //                     text: this.simple_name,
    //                     subtext: this.company_id
    //                 },
    //                 tooltip: {
    //                     trigger: 'axis',
    //                     axisPointer: {
    //                         type: 'cross',
    //                         label: {
    //                             backgroundColor: '#283b56'
    //                         }
    //                     }
    //                 },
    //                 backgroundColor: '#ffffff',
    //                 legend: {
    //                     data: ['价格', '换手率（%）']
    //                 },
    //                 toolbox: {
    //                     show: true,
    //                     feature: {
    //                         dataView: {readOnly: false},
    //                         restore: {},
    //                         saveAsImage: {}
    //                     }
    //                 },
    //                 dataZoom: {
    //                     show: false,
    //                     start: 0,
    //                     end: 100
    //                 },
    //                 xAxis: [
    //                     {
    //                         type: 'category',
    //                         boundaryGap: true,
    //                         data: (function () {
    //                             let now = new Date();
    //                             let res = [];
    //                             let len = 10;
    //                             while (len--) {
    //                                 res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
    //                                 now = new Date(now - 2000);
    //                             }
    //                             return res;
    //                         })()
    //
    //                     },
    //                     {
    //                         type: 'category',
    //                         boundaryGap: true,
    //                         data: (function () {
    //                             let res = [];
    //                             let len = 10;
    //                             while (len--) {
    //                                 res.push("");
    //                             }
    //                             return res;
    //                         })()
    //                     }
    //                 ],
    //                 yAxis: [
    //                     {
    //                         type: 'value',
    //                         scale: true,
    //                         name: '价格',
    //                         max: this.high_price,
    //                         min: this.low_price,
    //                         boundaryGap: [0.2, 0.2]
    //                     },
    //                     {
    //                         type: 'value',
    //                         scale: true,
    //                         name: '换手率（%）',
    //                         max: this.turnover_ratio_high,
    //                         min: 0,
    //                         boundaryGap: [0.2, 0.2]
    //                     }
    //                 ],
    //                 series: [
    //                     {
    //                         name: '换手率（%）',
    //                         type: 'bar',
    //                         xAxisIndex: 1,
    //                         yAxisIndex: 1,
    //                         data: (function () {
    //                             let res = [];
    //                             let len = 10;
    //                             while (len--) {
    //                                 // res.push(Math.round(Math.random() * 1000));
    //                                 res.push(this.turnover_ratio);
    //                             }
    //                             return res;
    //                         })()
    //
    //                     },
    //                     {
    //                         name: '价格',
    //                         type: 'line',
    //                         data: (function () {
    //                             let res = [];
    //                             let len = 0;
    //                             while (len < 10) {
    //                                 res.push(this.price_tem);
    //                                 len++;
    //                             }
    //                             return res;
    //                         })()
    //                     }
    //                 ]
    //             };
    //
    //
    //             this.app.count = 11;
    //
    //             let outer = this;
    //             setInterval(function () {
    //                 outer.price_tem.toString();
    //                 outer.turnover_ratio.toString();
    //
    //                 $.ajax({
    //                     type: "GET",
    //                     url: "http://175.178.119.52/stock/company_detail_information/",
    //                     // dataType: 'json',
    //                     data: {
    //                         "company_id": outer.company_id,
    //                         "place": outer.place,
    //                         "simple_name": outer.simple_name,
    //                     },
    //                     success: function (result) {
    //
    //                         outer.price_tem = result['price_tem']
    //                         outer.turnover_ratio = result['turnover_ratio']
    //                         outer.amplitude = result['amplitude']
    //
    //
    //                         outer.trade_status = result['trade_status']
    //                         outer.update_time = result['update_time']
    //                         outer.change_ = result['change_']
    //                         outer.closing_price = result['closing_price']
    //                         outer.lowest = result['lowest']
    //                         outer.PER = result['PER']
    //                         outer.dynamic_PER = result['dynamic_PER']
    //                         outer.PBR = result['PBR']
    //                         outer.market_value = result['market_value']
    //                         outer.circulation_market_value = result['circulation_market_value']
    //                         outer.turnover_value = result['turnover_value']
    //                         outer.volume_ratio = result['volume_ratio']
    //                         outer.circulation_shares = result['circulation_shares']
    //                         outer.total_shares = result['total_shares']
    //                         outer.BPS = result['BPS']
    //                     }
    //                 });
    //
    //
    //                 outer.high_price = outer.price_tem * (1 + 0.005 * outer.amplitude);
    //                 outer.low_price = outer.price_tem * (1 - 0.005 * outer.amplitude);
    //                 outer.high_price = outer.high_price.toFixed(2);
    //                 outer.low_price = outer.low_price.toFixed(2);
    //
    //                 if (outer.turnover_ratio_high < outer.turnover_ratio) {
    //                     outer.turnover_ratio_high = outer.turnover_ratio * 3;
    //                     outer.turnover_ratio_high = outer.turnover_ratio_high.toFixed(2);
    //                     option.yAxis[1].max = outer.turnover_ratio_high;
    //                 }
    //
    //                 option.yAxis[0].max = outer.high_price;
    //                 option.yAxis[0].min = outer.low_price;
    //
    //
    //                 var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
    //                 var data0 = option.series[0].data;
    //                 var data1 = option.series[1].data;
    //
    //
    //                 data0.shift();
    //                 // // data0.push(Math.round(Math.random() * 1000));
    //                 data0.push(turnover_ratio);
    //                 data1.shift();
    //                 data1.push(price_tem);
    //
    //                 option.xAxis[0].data.shift();
    //                 option.xAxis[0].data.push(axisData);
    //                 // option.xAxis.data.shift();
    //                 // option.xAxis.data.push(axisData);
    //                 option.xAxis[1].data.shift();
    //                 option.xAxis[1].data.push("");
    //
    //
    //                 $(function change() {
    //
    //                     let html = "";
    //
    //
    //                     $("#price_tem").empty();
    //                     $("#price_tem").html(outer.price_tem);
    //
    //                     if (change_percent[0] != "-") {
    //
    //                         html = "<div class=\"metric-label d-inline-block float-right text-success font-weight-bold\">\n" +
    //                             "                                             <span class=\"icon-circle-small icon-box-xs text-success bg-success-light\">\n" +
    //                             "                                                 <i class=\"fa fa-fw fa-arrow-up\"></i>\n" +
    //                             "                                             </span>\n" +
    //                             "                                            <span class=\"ml-1\">" + outer.change_percent + "</span>\n" +
    //                             "                                        </div>"
    //
    //
    //                         $("#change_percent").empty();
    //                         $("#change_percent").html(html);
    //
    //                     } else {
    //                         html = "<div class=\"metric-label d-inline-block float-right text-danger font-weight-bold\">\n" +
    //                             "                                        <span class=\"icon-circle-small icon-box-xs text-danger bg-danger-light bg-danger-light \"><i\n" +
    //                             "                                                class=\"fa fa-fw fa-arrow-down\"></i></span><span class=\"ml-1\">" + outer.change_percent + "</span>\n" +
    //                             "                                    </div>"
    //                         $("#change_percent").empty();
    //                         $("#change_percent").html(html);
    //                     }
    //
    //                     $("#opening_price").empty();
    //                     $("#opening_price").html(outer.opening_price);
    //
    //                     $("#highest").empty();
    //                     $("#highest").html(outer.highest);
    //
    //                     $("#turnover_volume").empty();
    //                     $("#turnover_volume").html(outer.turnover_volume);
    //
    //                     //详细信息
    //                     html =
    //                         "<td>1</td>\n" +
    //                         "<td>" + outer.simple_name + "</td>\n" +
    //                         "<td>" + outer.trade_status + "</td>\n" +
    //                         " <td>" + outer.update_time + "</td>\n" +
    //                         "<td>" + outer.change_ + "</td>\n" +
    //                         "<td>" + outer.closing_price + "</td>\n" +
    //                         "<td>" + outer.lowest + "</td>\n" +
    //                         "<td>" + outer.amplitude + "</td>\n" +
    //                         "<td>" + outer.PER + "</td>\n" +
    //                         "<td>" + outer.dynamic_PER + "</td>\n" +
    //                         "<td>" + outer.PBR + "</td>\n" +
    //                         "<td>" + outer.market_value + "</td>\n" +
    //                         "<td>" + outer.circulation_market_value + "</td>\n" +
    //                         "<td>" + outer.turnover_value + "</td>\n" +
    //                         "<td>" + outer.volume_ratio + "</td>\n" +
    //                         "<td>" + outer.circulation_shares + "</td>\n" +
    //                         "<td>" + outer.total_shares + "</td>\n" +
    //                         "<td>" + outer.BPS + "</td>\n"
    //
    //
    //                     $("#detail").empty();
    //                     $("#detail").html(html);
    //                 });
    //
    //
    //                 // option.xAxis[1].data.push(turnover_ratio);
    //
    //
    //                 outer.myChart.setOption(option);
    //             }, 5000);
    //
    //             if (option && typeof option === "object") {
    //                 outer.myChart.setOption(option, true);
    //             }
    //
    //         }
    //     });
    //     this.start();
    //
    // }
    //
    // start() {
    //
    //
    // }
}