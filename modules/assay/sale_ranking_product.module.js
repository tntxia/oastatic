(function(name, moduleFun) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    let module = moduleFun();
    if (arguments.length > 2) {
        let components = Object.create(null);
        for (let i = 2; i < arguments.length; i++) {
            let name = arguments[i];
            i++;
            let func = arguments[i];
            if (!func) {
                continue;
            }
            let component = func();
            components[name] = component;
        }
        module.components = components;
    }

    window.modules[name] = module;
})('assay/sale_ranking_product', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div>\r\n    <!-- <form name=\"form1\" method=\"post\" action=\"../sale/ddgl/pfmain-search.jsp\">  -->\r\n    <script src=\"/static/lib/echarts/echarts.js\"></script>\r\n    <div id=\"form\" style=\"position: relative;z-index: 200000;\">\r\n        <table width=\"100%\" bordercolor=\"#CCBE5A\" cellspacing=\"0\" bordercolordark=\"#ffffff\" cellpadding=\"3\" align=\"center\" bgcolor=\"#ffffff\" bordercolorlight=\"#7f9db9\" border=\"1\">\r\n            <tr>\r\n                <td bgcolor=\"#e8ebf5\">起始日期\r\n                </td>\r\n                <td width=\"40%\">\r\n                    <jxiaui-datepicker v-model=\"form.startdate\"></jxiaui-datepicker>\r\n                </td>\r\n                <td width=\"11%\" bgcolor=\"#e8ebf5\">终止日期</td>\r\n                <td width=\"40%\">\r\n                    <jxiaui-datepicker v-model=\"form.enddate\"></jxiaui-datepicker>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td colspan=\"4\">\r\n                    <div align=\"center\">\r\n                        <button @click=\"sub\">统计</button>\r\n                    </div>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n    <div id=\"diagram\" style=\"height: calc(100% - 50px)\">\r\n    </div>\r\n</div>";
        

        exports.init = function() {
            var myChart = echarts.init(document.getElementById('diagram'));
var dataAxis = [];

var chartdata = [];

var option = {
    title: {
        text: '产品销售情况统计',
        subtext: ''
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: {
        data: dataAxis,

        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    series: [

        {
            type: 'bar',
            barWidth: 30,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [
                            { offset: 0, color: '#83bff6' },
                            { offset: 0.5, color: '#188df0' },
                            { offset: 1, color: '#188df0' }
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ]
                    )
                }
            },
            data: chartdata
        }
    ]
};
new Vue({
    el: '#form',
    data: {
        form: {
            startdate: null,
            enddate: null
        }
    },
    methods: {
        sub() {
            var params = this.form;

            if (!params.startdate) {
                alert("请填写统计开始时间！");
                return;
            }

            if (!params.enddate) {
                alert("请填写统计结束时间");
                return;
            }

            $.ajax({
                url: webRoot + '/assay/assay!getProductSaleStatist.do',
                type: 'post',
                data: params
            }).done(function(data) {

                data.sort(function(a, b) {

                    if (a.num > b.num) {
                        return -1;
                    } else if (a.num == b.num) {
                        return 0;
                    } else {
                        return 1;
                    }

                })

                $.each(data, function(i, d) {
                    dataAxis.push(d.epro);
                    chartdata.push(d.num);
                });
                console.log("option", option);
                myChart.setOption(option);
                console.log(data);
            })
        }
    },
})
        };
        return module.exports;
    }

    
);