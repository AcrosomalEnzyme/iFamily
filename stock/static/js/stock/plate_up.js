class Plate_up {
    constructor() {
        this.$plate = $(".dashboard-main-wrapper");
        //更新板块信息的标签
        this.$list = this.$plate.find("#list");
        this.start()
    }

    start() {
        let outer = this;
        $.ajax({
            type: "GET",
            url: "http://175.178.119.52/stock/plate_data/",
            dataType: 'json',
            success: function (result) {

                let data = result['data']['plate_up'];
                let length = data.length;

                //改写网页内容
                let html = "";

                for (var i = 0; i < length; i++) {
                    let id = data[i][0];
                    let plate_name = data[i][1];
                    let company_id = data[i][2];
                    let simple_name = data[i][3];
                    let plate_change_percent = data[i][4];
                    let company_change_percent = data[i][5];


                    html = html + "<li class=\"traffic-sales-content list-group-item \"><span\n" +
                        "class=\"traffic-sales-name\">" + id + " &nbsp &nbsp" + "</span><span\n" +
                        "class=\"traffic-sales-name\">   " + plate_name + "   </span><span\n" +
                        "class=\"icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light\"><i\n" +
                        "class=\"fa fa-fw fa-arrow-up\"></i></span><span\n" +
                        "class=\"ml-1 text-danger\">" + plate_change_percent + "</span></span><span\n" +
                        "class=\"traffic-sales-amount\">代表公司：" + simple_name + "&nbsp" + company_id + "  <span\n" +
                        "class=\"icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light\"><i\n" +
                        "class=\"fa fa-fw fa-arrow-up\"></i></span><span\n" +
                        "class=\"ml-1 text-danger\">" + company_change_percent + "</span></span>\n" +
                        "</li>"

                }


                outer.$list.empty();
                outer.$list.html(html);


                setInterval(function () {

                    $.ajax({
                        type: "GET",
                        url: "http://175.178.119.52/stock/plate_data/",
                        dataType: 'json',
                        success: function (result) {
                            let data = result['data']['plate_up'];
                            let length = data.length;

                            //改写网页内容
                            let html = "";

                            for (var i = 0; i < length; i++) {
                                let id = data[i][0];
                                let plate_name = data[i][1];
                                let company_id = data[i][2];
                                let simple_name = data[i][3];
                                let plate_change_percent = data[i][4];
                                let company_change_percent = data[i][5];


                                html = html + "<li class=\"traffic-sales-content list-group-item \"><span\n" +
                                    "class=\"traffic-sales-name\">" + id + " &nbsp &nbsp" + "</span><span\n" +
                                    "class=\"traffic-sales-name\">   " + plate_name + "   </span><span\n" +
                                    "class=\"icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light\"><i\n" +
                                    "class=\"fa fa-fw fa-arrow-up\"></i></span><span\n" +
                                    "class=\"ml-1 text-danger\">" + plate_change_percent + "</span></span><span\n" +
                                    "class=\"traffic-sales-amount\">代表公司：" + simple_name + "&nbsp" + company_id + "  <span\n" +
                                    "class=\"icon-circle-small icon-box-xs text-danger ml-4 bg-danger-light\"><i\n" +
                                    "class=\"fa fa-fw fa-arrow-up\"></i></span><span\n" +
                                    "class=\"ml-1 text-danger\">" + company_change_percent + "</span></span>\n" +
                                    "</li>"


                            }


                            outer.$list.empty();
                            outer.$list.html(html);

                        }
                    });


                }, 10000);

            }
        });
    }
}