
(function($){
    $.fn.typelisttext = function(obj){
        var self = $(this),originwidth=190,
            options={
                resethidden:"block",
                close:"open",
                item:1,
                setTitle:{
                    title1:'标题1'
                }
            };
        $.extend(options, obj);

        var ssresethidden = options.resethidden;
        var ssclose = options.close;
        var ssitem = options.item;
        var sssetTitle = options.setTitle;
        function createSelector(){
            self.siblings('.typelisttext').find('.tlt-select-content').eq(0).addClass('letter-car-list')
                .end().end().css('top',self.height());
            self.each(function(){

                var thisheight=$(this).siblings(".typelisttext").find(".tlt-en-select").height();
                var thisouterheight=$(this).siblings(".typelisttext").find(".tlt-en-select").outerHeight();

                $(this).siblings(".typelisttext").css({"height":thisouterheight}).find(".tlt-select-content").find(".tsc-scroll").css({"height":thisheight});

            }).siblings(".typelisttext").find(".tlt-en-select").find("a").click(function(e){
                e.stopPropagation();

                var thisindex=$(this).parent(".tlt-en-select").find("a").index($(this));

                $(this).addClass("selected").siblings("a").removeClass("selected");

                var alltop=0;


                if($(this).parent(".tlt-en-select").siblings(".tsc-one").find("dl").eq(thisindex).length!=0){
                    for(var iesp=0;iesp<thisindex;iesp++){

                        alltop=alltop+parseInt($(this).parent(".tlt-en-select").siblings(".tsc-one").find("dl").eq(iesp).outerHeight());

                    }

                    $(this).parent(".tlt-en-select").siblings(".tsc-one").find(".tsc-scroll").stop(true,true).animate({scrollTop:alltop},500);
                }

            });
            self.siblings(".typelisttext").on("click",".unlimited",function(e){
                e.stopPropagation();
                var dlindex=self.siblings(".typelisttext").find(".tlt-select-content").find(".selected").length;
                var allselecttext=[];
                var alltotaltext="";

                for(var i=0;i<dlindex;i++){
                    if(i==0){
                        var selectedtext=self.siblings(".typelisttext").find(".tlt-select-content").find(".selected").eq(i).text().replace(/\s/g,"");
                        alltotaltext=alltotaltext+selectedtext+" ";
                    }
                    else
                    {
                        var selectedtext=self.siblings(".typelisttext").find(".tlt-select-content").find(".selected").eq(i).text();
                        alltotaltext=alltotaltext+selectedtext+" ";
                    }
                    allselecttext.push(selectedtext);


                }

                self.val(alltotaltext);
                self.next().remove();

            });
            self.siblings(".typelisttext").on("click","dd",function(e){
                e.stopPropagation();

                $(this).parents(".tsc-scroll").find("dd").removeClass("selected");
                $(this).addClass("selected");


                var nextlength=$(this).parents(".tlt-select-content").next(".tlt-select-content").length;
                var allwidth=parseInt($(this).parents(".typelisttext").find(".tlt-en-select").outerWidth());

                var thislength=$(this).parents(".typelisttext").find(".tlt-select-content").length;
                var thisindex=$(this).parents(".typelisttext").find(".tlt-select-content").index($(this).parents(".tlt-select-content"));

                function widthlll(e){
                    e.parents(".typelisttext").find(".tlt-select-content").each(function(){
                        if(!$(this).hasClass("tlt-none")){
                            allwidth=allwidth+parseInt($(this).outerWidth())+parseInt($(this).css("margin-left"));
                        }
                    });
                }

                var thisindex=$(this).parents(".typelisttext").find(".tlt-select-content").index($(this).parents(".tlt-select-content"));

                $(this).parents(".typelisttext").find(".tlt-select-content").addClass("tlt-none");

                for(var inum=0;inum<=thisindex;inum++){
                    $(this).parents(".typelisttext").find(".tlt-select-content").eq(inum).removeClass("tlt-none");
                }



                if(nextlength>0&&$(this).parents(".tlt-select-content").next(".tlt-select-content").hasClass("tlt-none")){
                    var thisnextthing=$(this).parents(".tlt-select-content").next(".tlt-select-content");
                    thisnextthing.removeClass("tlt-none");
                    widthlll($(this));
                    $(this).parents(".typelisttext:not(:animated)").stop(true,true).animate({width:allwidth},500);

                }

                if(thisindex==thislength-1){

                    var dlindex=self.siblings(".typelisttext").find(".tlt-select-content").find(".selected").length;
                    var allselecttext=[];
                    var alltotaltext="";

                    for(var i=0;i<dlindex;i++){
                        if(i==0){
                            var selectedtext=self.siblings(".typelisttext").find(".tlt-select-content").find(".selected").eq(i).text().replace(/\s/g,"");
                            alltotaltext=alltotaltext+selectedtext+" ";
                        }
                        else
                        {
                            var selectedtext=self.siblings(".typelisttext").find(".tlt-select-content").find(".selected").eq(i).text();
                            alltotaltext=alltotaltext+selectedtext+" ";
                        }
                        allselecttext.push(selectedtext);


                    }

                    self.val(alltotaltext);//self.siblings(".typelisttext").find(".tlt-select-content").find("dl").find(".selected").text()
                    self.attr("data-arry",allselecttext);


                    self.removeClass("textvalue-default").siblings(".typelisttext").removeClass("tlt-op100").addClass("zdx-1");

                    self.blur();

                }

            });



            self.siblings(".typelisttext").find(".lcl-hidden").find("dd").each(function(){
                var thisdd=$(this);
                var thisletter=$(this).attr("data-letter");


                self.siblings(".typelisttext").find(".letter-car-list").find("dt").each(function(){
                    if(thisletter==$(this).text()){
                        thisdd.insertAfter($(this));
                    }
                });
            });

            $(".tlt-close").click(function(e){
                e.stopPropagation();

                $(this).parent(".typelisttext").removeClass("tlt-op100").addClass("zdx-1");
            });

            self.siblings(".typelisttext").click(function(e){
                e.stopPropagation();

                return false;
            });

            $(document).click(function(){
                $(".typelisttext").removeClass("tlt-op100").addClass("zdx-1");
            });
        }



        self.click(function(e){
            e.stopPropagation();
            var allwidth2=0;
            self.next().remove();
            var itemNum=[
                '<div class="tlt-select-content tsc-one">',
                '<h5>'+sssetTitle.title1+'</h5>',
                '<div class="tsc-scroll"></div>',
                '</div>'
            ].join('');
            var i=1;

            while(i<ssitem){
                var title='title'+(i+1);
                itemNum+=[
                    '<div class="tlt-select-content tlt-none">',
                    '<h5>'+sssetTitle[title]+'</h5>',
                    '<div class="tsc-scroll"></div>',
                    '</div>'
                ].join('');
                i++;
            }
            var selectorBox=[
                '<div class="typelisttext zdx-1">',
                '<div class="tlt-en-select"></div>',
                itemNum,
                '<span class="tlt-close">x</span>',
                '</div>'
            ].join('');
            self.after(selectorBox);
            $.when(getData(self)).done(function () {
                createSelector();
            })
            function widthlll(){
                $(this).siblings(".typelisttext").find(".tlt-select-content").each(function(){
                    if(!$(this).hasClass("tlt-none")){
                        allwidth2=allwidth2+parseInt($(this).outerWidth())+parseInt($(this).css("margin-left"));
                    }
                });
            }

            if(ssresethidden=="hidden"){
                widthlll();

                $(this).siblings(".typelisttext").css({width:allwidth2});

                $(this).siblings(".typelisttext").find(".tlt-select-content").addClass("tlt-none").eq(0).removeClass("tlt-none");

                $(this).siblings(".typelisttext").find(".tlt-en-select").find("a").removeClass("selected");

                $(this).siblings(".typelisttext").find("dd").removeClass("selected");
            }

            $(".typelisttext").removeClass("tlt-op100").addClass("zdx-1");

            if(ssclose!="close"){
                $(this).siblings(".typelisttext").addClass("tlt-op100").removeClass("zdx-1");
            }


        });


    }
})(jQuery);