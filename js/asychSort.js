$(function() {
	$('#sortForm').bind('submit', function(e) {
		e.preventDefault();
		var val = $('#forSort').val();
		var arr = val.split(',');
		var obj = getSortModule();
		var result = obj.sort(arr);
		//$('#sortResult').html(JSON.stringify(result));
	});
});

function getSortModule() {
	var resultDiv = $('#sortResult');
    var arr=[];
	var removeItemAnimation=function(i){
		var r=resultDiv.children().eq(i);
		r.fadeOut('slow').queue(function(next){
            r.remove();
            next();
        });
	}
	var showArray = function(onComplete) {
		resultDiv.html("");
		if (!$.isArray(arr)) return;
		var ix = 0;
        var $itemArr=[];
        for(ix=0;ix<arr.length;ix++){
            resultDiv.append('<span class="label label-default" style="display:none;">' + arr[ix] + '</span> ');
        }

        resultDiv.each(function(i){
            var $k=$(this).children().eq(i);
            $k.fadeIn('slow',function(){scheduleAnimation(++ix1);
        });

        var scheduleAnimation= function (ix1) {
            if(ix1>=$itemArr.length){
                onComplete();
                return;
            }
            $itemArr[ix1].fadeIn('slow',function(){scheduleAnimation(++ix1);})
        }
        scheduleAnimation(0);//async





		//var showItem = function() {
		//	if (ix >= arr.length) {
         //       return;
         //   }
		//	var c1 = '<span class="label label-default" style="display:none;">' + arr[ix] + '</span> ';
		//	resultDiv.append(c1);
		//	var c = resultDiv.children().last();
		//	ix++;
         //   $.queue();
		//	c.fadeIn('slow').queue(function(){
         //       showItem();
         //   });
		//}
		//showItem();

	}
	var swap = function(arr, i, j) {
		var t = arr[i];
		arr[i] = arr[j];
		arr[j] = t;
	}
	var justifyIntArray = function() {
		var i = 0,
			arr1 = [],
			t;
		if (arr.constructor !== Array) return;
		
		while (i < arr.length) {
			t = parseInt(arr[i])
			if (!isNaN(t)) arr1.push(t);
			else removeItemAnimation(i);
			i++;
		}
		return arr1;
	}
	var sort = function(arr1) {
		var i, j;
        //var cb= $.Callbacks();
        arr=arr1;
        //cb.add(showArray);
        //cb.add(justifyIntArray);
        //cb.fire();
        //resultDiv.queue([showArray,justifyIntArray]);
        //resultDiv.dequeue();
        var funArr=[
            function(next){showArray(function(){
                    next();
                })
            },
            justifyIntArray
        ];



        resultDiv.queue('my1',funArr);
        resultDiv.dequeue('my1');
        //showArray();
		//arr = justifyIntArray(arr);
		return;
		if (arr.constructor !== Array) return;
		if (arr.length < 2) return;
		for (i = 0; i < arr.length - 1; i++)
			for (j = i + 1; j < arr.length; j++)
				if (arr[j] < arr[i])
					swap(arr, i, j);
		return arr;
	}
	return {
		sort: sort
	}
}