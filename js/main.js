;(function ( $, window, document, undefined ) {

    var pluginName = "quiz",
        defaults = {
            datafile: "quiz.json"
        };

    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
    	var e = this.element;
        $("#hidden1").load(this.options.datafile,function(){
        	var qs = $("#hidden1").html();

        	qs = JSON.parse(qs);

        	var rs = [];
        	
        	var tpl = _.template('<div class="quest" id="q<%=i%>"><br><br><br><b><%= a.question %></b> <br> <input type="radio" name="<%=i%>" value="<%=a.points[0]%>"><%=a.answers[0]%>  <br> <input type="radio" name="<%=i%>" value="<%=a.points[1]%>"><%=a.answers[1]%>  <br> <input type="radio" name="<%=i%>" value="<%=a.points[2]%>"><%=a.answers[2]%><br></div>');

        	_.each(qs,function(q,ind){
        		rs.push(tpl({a:q,i:ind}));
        	});
        	var len = rs.length;
        	localStorage.setItem('qq',len);
        	var cont = '<div class="block3 bfirst">';
        	for (var i = 0; i < len; i++) {
        		cont += rs[i];
        		if (i==2) cont+='<h2 class="pf">next</h2></div><div class="block3">';
        		else {
        			if ((i%3)==2) cont+='<h2 class="pb">prev</h2><h2 class="pf">next</h2></div><div class="block3">';
        		}
        	};
        	cont+='<h2 class="pb">prev</h2></div>';
        
        	$(e).html(cont);
        	$('.block3').hide();
        	$('.bfirst').show();
        	
        	$(".pf").on('click',function(){
        		$(this).parent().hide();
        		$(this).parent().next().show();
        	});
        	$(".pb").on('click',function(){
        		$(this).parent().hide();
        		$(this).parent().prev().show();
        	});
        	//localStorage.getItem("bar");
			$('input:radio').on('change',function(){
				var n = 'q' + $(this).attr('name');
				localStorage.setItem(n,$(this).val());
			});

        });


        

    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );

;(function ( $, window, document, undefined ) {

    var pluginName = "results",
        defaults = {
            datafile: "results.json"
        };

    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
    	var e = this.element;

        $("#hidden2").load(this.options.datafile,function(){

        	var rs = $("#hidden2").html();

        	rs = JSON.parse(rs);

        	$(e).append('<h3>show results</h3><h1 id="result"></h1>');

        	$('h3').on('click',function(){
        		var total = 0;
	        	var qq = localStorage.getItem('qq') || 0;
	        	if (qq) {
	        		var i=0;
		        	for (;i<parseInt(qq);i++)
		        		total += localStorage.getItem('q'+i)*1;
		        	//$('#result').html(total);	
		        	var ct=0;
		        	_.each(rs,function(r){
		        		
		        		if ((total>=ct)&&(total<=r.to)) {$('#result').html(r.status); ct=100500;}
		        		else {ct = r.to;}
		        		
		        	});
	        	}
	        	
        	});

        	

        });


        

    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );

$('#formain').quiz({datafile:'js/questions.json'});
$('#res').results({datafile:'js/results.json'});
