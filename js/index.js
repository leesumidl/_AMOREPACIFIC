$(function(){
/* 슬라이드 */
		var $indicator = $("#slides>.button>li>a");//인디케이터
		var $slide = $("#slides>.visual>li");//슬라이드
		var nowIdx=0;
		var oldIdx=4;
		var interval_id=" ";
		var $btnAuto = $("#slides>.slides-btn");   //재생,정지버튼
		$btnAuto.data("state","on"); //버튼의 내부데이터 설정 - on: 재생중, off: 정지상태		

		$(window).on("load",function(){
			$slide.hide().eq(nowIdx).show();// 첫번째 슬라이드 노출
			autoPlay();// 자동실행 함수 호출
			$indicator.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");// 인디케이터 활성화
		});// 이미지까지 다 읽어서 메모리에 로딩 완료된 시점에 발생하는 이벤트 load

		// 슬라이드 변환함수 fadeAction
		function fadeAction(){
			$slide.eq(oldIdx).stop().fadeOut(800).removeClass("on");// 이전 슬라이드 사라짐
			$slide.eq(nowIdx).stop().fadeIn(800).addClass("on");// 이번에 나타날 슬라이드
			$indicator.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");// 인디케이터 활성화
			oldIdx=nowIdx;
		}

		// 자동재생 함수
		function autoPlay(){
			autoStop();
			interval_id=setInterval(function(){
				nextIdx();
				fadeAction();
			},5000);
		}
		// 자동 재생 정지 함수
		function autoStop(){
			clearInterval(interval_id);
		}
		// 다음번 인덱스번호 추출
		function nextIdx(){
			if(nowIdx>3){
				nowIdx=0;
			}else{
				nowIdx++;
			}
		}
		// 인디케이터에 대한 클릭이벤트 구문
		$indicator.on("click",function(evt){
			autoStop();
			if(!$(this).parent().hasClass("on")){// 현재선택된 인디케이터가 아닐 때 실행되는 조건
				nowIdx=$indicator.index($(this));
				fadeAction();// 슬라이드, 인디케이터 변환함수 호출
			}
			evt.preventDefault();
			autoPlay();
		});

		// 이전버튼에 대한 클릭이벤트 구문
		$(".slides-prev").on("click",function(){
			autoStop();
			if(nowIdx<1){
				nowIdx=4;
			}else{
				nowIdx--;
			}
			fadeAction();// 슬라이드 변환함수 호출
			evt.preventDefault();
		});
		
		// 다음버튼에 대한 클릭이벤트 구문
		$(".slides-next").on("click",function(evt){
			autoStop();
			if(nowIdx>3){
				nowIdx=0;
			}else{
				nowIdx++;
			}
			fadeAction();// 슬라이드 변환함수 호출
			evt.preventDefault();
		});

		//일체형 재생정지 버튼에 대한 클릭이벤트
		$btnAuto.on("click",function(evt){
			
			var stateVal = null;
			
			if($(this).data("state")=="on"){ // 초기상태(즉., 재생중이며 정지버튼 노출상태)
				$(this).removeClass("pause").text("자동재생");
				stateVal = "off";
				autoStop();
				
			}else if($(this).data("state")=="off"){ // 재생 버튼이 노출된 상태
				$(this).addClass("pause").text("일시정지");
				stateVal = "on";
				autoPlay();
			}
			
			$(this).data("state",stateVal);
			evt.preventDefault();
			
		});
		
		//일체형 재생정지버튼의 상태를 .pause를 붙이고 state값을 off로 설정하는 함수
		function setStateValOff(){
			$btnAuto.removeClass("pause").text("자동재생").data("state","off");
		}
	


	

/* 메뉴(서브메뉴) */
	var menu = $(".gnb > li");		//큰 메뉴
	var wrap = $("#gnbWrap");		//메뉴를 감싸고 있는 wrap
	var pageURL = location.href;	//링크걸기(넘어가기)
	var activeMenu;
	menu.on({
		mouseover:function(){		//큰 메뉴에 마우스 오버했을때
			  var tg = $(this);		
			menu.removeClass("on");
			tg.addClass("on");		//tg = 선택한 li
			  var th = tg.children("a").height() + tg.children(".gnbArea").height(); //a의 높이값과 sGnbArea의 높이값을 더한 값 = th
			wrap.stop().animate({height:th});
	    },
		mouseout:function(){
			var tg = $(this);
			tg.removeClass("on");
			var th = tg.children("a").height();
			wrap.stop().animate({height:th});
			onActive();
		}
	});

	//서브메뉴
	menu.each(function(i){		//메뉴의 각각
		var tg = $(this);
		var sub = tg.find("> .gnbArea > ul > li");
		var menuURL = tg.children("a").attr("href");
		var active = pageURL.indexOf(menuURL);  
		if(active > -1) activeMenu = tg;		//active가 찾다가 없으면(-1) 값을 리턴
		
		sub.each(function(j){		//서브메뉴의 각각
			var tg = $(this);
			var subURL = tg.children("a").attr("href");
			active = pageURL.indexOf(subURL);
			if(active > -1) activeMenu = tg;
		});
		
		sub.on({
			mouseover:function(event){
				var tg = $(this);
				sub.removeClass("on");
				tg.addClass("on");
			},
			mouseout:function(){
				var tg = $(this);
				tg.removeClass("on");


				onActive();
			}
		});
	});


	
	//해당 페이지로 가는 스크롤
    var scrollSpeed = 1000;
	function pageScroll(obj){
		if(!obj){console.log("실행1");
			$.scrollTo({top:0, left:0}, scrollSpeed, {easeing:"easeInOutQuint"}); 
		}else{console.log("실행2");
			var topPos = $(obj).offset().top - 1280;
			$.scrollTo({top:topPos, left:0}, scrollSpeed, {easing:"easeInOutQuint"}); 
		}
	};
	$("div.btn a").click(function(){
		var goPage = $(this).attr("href");
		$.scrollTo({top:0, left:0}, scrollSpeed, {easeing:"easeInOutQuint"});
		return false;
	});

	$(function(){
	//language_list
		$(".util .language").toggle(function(){
			$(".util .language_list").slideUp(200);
		},function(){
			$(".util .language_list").slideDown(200);
	});
	
  });


}); //약식초기화