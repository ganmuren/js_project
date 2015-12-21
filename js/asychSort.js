$(function () {
    $('#sortForm').bind('submit', function (e) {
        e.preventDefault();
        var val = $('#forSort').val();
        var arr = val.split(',');
        var obj = getSortModule();
        var result = obj.sort(arr);
        //$('#sortResult').html(JSON.stringify(result));
    });
});

function getSortModule() {
    var $resultDiv = $('#sortResult');
    var arr = [];
    var rmvItemAnimate = function (arr$item, onComplete) {
        var rmv = function (ix) {
            if (ix >= arr$item.length) {
                onComplete();
                return;
            }
            arr$item[ix].fadeOut('slow', function () {
                rmv(++ix);
            });
        }
        rmv(0);
    };
    var addItemAnimate = function (arr$item, onComplete) {
        var add = function (ix) {
            if (ix >= arr$item.length) {
                onComplete();
                return;
            }
            arr$item[ix].fadeIn('slow', function () {
                add(++ix);
            });
        }
        add(0);
    };
    var showArray = function (onComplete) {
        $resultDiv.html("");
        if (!$.isArray(arr)) return;
        var ix = 0;
        var $itemArr = [];
        for (ix = 0; ix < arr.length; ix++) {
            var $item = $('<span class="label label-default" style="display:none;">' + arr[ix] + '</span>');
            $resultDiv.append($item);
            $resultDiv.append(' ');
            $itemArr.push($item);
        }

        addItemAnimate($itemArr, onComplete);


    };
    var swap = function (arr, i, j) {
        var t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    };
    var justifyIntArray = function (onComplete) {
        var i = 0, arr$Rmv = [],
            arr1 = [],
            t;
        if (arr.constructor !== Array) return;

        while (i < arr.length) {
            t = parseInt(arr[i])
            if (!isNaN(t)) arr1.push(t);
            else arr$Rmv.push($resultDiv.children().eq(i));
            i++;
        }
        arr = arr1;

        rmvItemAnimate(arr$Rmv, function () {
            arr$Rmv.forEach(function ($item) {
                $item.remove();
            });
            onComplete();
        });

    };
    var swapAnimate = function (arr$item, i, j, onComplete) {
        var ti = arr$item[i].html();
        var tj = arr$item[j].html();

        var di = arr$item[i].css({color: 'red'}).fadeOut('slow').queue(function (next) {
            $(this).html(tj);
            next();
        }).fadeIn('slow').queue(function (next) {
            $(this).css({color: 'white'});
            next();
        });
        var dj = arr$item[j].css({color: 'blue'}).delay(1200).fadeOut('slow').queue(function (next) {
            $(this).html(ti);
            next();
        }).fadeIn('slow').queue(function (next) {
            $(this).css({color: 'white'});
            next();
        });

        $.when(di, dj).done(function () {
            onComplete();
        });
       //var funcArr=[
       //    function(next){
       //        arr$item[i].css({color: 'red'}).fadeOut('slow').queue(function (next) {
       //                    $(this).html(tj);
       //                    next();
       //                }).fadeIn('slow').queue(function (next) {
       //                    $(this).css({color: 'white'});
       //                });
       //        next();},
       //    function(next){
       //        arr$item[j].css({color: 'blue'}).fadeOut('slow').queue(function (next) {
       //                $(this).html(ti);
       //                next();
       //            }).fadeIn('slow').queue(function (next) {
       //                $(this).css({color: 'white'});
       //            });
       //        onComplete();}
       //];
       // $.queue(funcArr);

    };
    var sortCore = function (arr$item, i, j, onComplete) {
        if (arr.length < 2) return;
        if (i >= arr.length - 1) {
            if (onComplete)onComplete();
            return;
        }
        if (j >= arr.length) {
            i++;
            j = i + 1;
            sortCore(arr$item, i, j, onComplete);
        }
        if (arr[j] < arr[i]) {
            swap(arr, i, j);
            swapAnimate(arr$item, i, j, function () {
                j++;
                sortCore(arr$item, i, j, onComplete);
            })
        }
    };
    var sort = function (arr1, onComplete) {
        var i, j;
        arr = arr1;
        var funArr = [
            function (next) {
                showArray(function () {
                    next();
                })
            },
            function (next) {
                justifyIntArray(function () {
                    next();
                })
            },
            function (next) {
                var arr$item = [];
                $resultDiv.children().each(function (i) {
                    arr$item.push($resultDiv.children().eq(i));
                });
                sortCore(arr$item, 0, 1, onComplete);
            }
        ];

        $resultDiv.queue(funArr);
        //$resultDiv.dequeue('my1');


        return arr;
    };
    return {
        sort: sort
    }
}