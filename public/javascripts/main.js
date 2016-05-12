
$(document).ready(function() {
    /**
     * enrolinfo.html
     */
    <!-- Flot -->
    //random data
    var d1 = [
        [2000, 500],
        [2001, 510],
        [2002, 560],
        [2003, 510],
        [2004, 550],
        [2005, 560],
        [2006, 540],
        [2007, 510],
        [2008, 570],
        [2009, 511],
        [2010, 535],
        [2011, 549],
        [2012, 512],
        [2013, 555],
        [2014, 543],
        [2015, 540],
        [2016, 559]
    ];

    //flot options
    var options = {
        series: {
            curvedLines: {
                apply: true,
                active: true,
                monotonicFit: true
            }
        },
        colors: ["#26B99A"],
        grid: {
            borderWidth: {
                top: 0,
                right: 0,
                bottom: 1,
                left: 1
            },
            borderColor: {
                bottom: "#7F8790",
                left: "#7F8790"
            }
        }
    };
    var plot = $.plot($("#placeholder3xx3"), [{
        label: "历年最低分数线",
        data: d1,
        lines: {
            fillColor: "rgba(150, 202, 89, 0.12)"
        }, //#96CA59 rgba(150, 202, 89, 0.42)
        points: {
            fillColor: "#fff"
        }
    }], options);
    <!-- /Flot -->

    <!-- Datatables -->
    TableManageButtons = function() {
        "use strict";
        return {
            init: function() {
                handleDataTableButtons();
            }
        };
    }();

    $('#datatable').dataTable();

    TableManageButtons.init();
    <!-- /.Datatables -->

});



