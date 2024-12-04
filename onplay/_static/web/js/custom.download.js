(function (window) {
	
	
    //var isSupported = false;
	var timeoutSuc = null;
	function _registerEvent(target, eventType, cb) {
        if (target.addEventListener) {
            target.addEventListener(eventType, cb);
            return {
                remove: function () {
                    target.removeEventListener(eventType, cb);
                }
            };
        } else {
            target.attachEvent(eventType, cb);
            return {
                remove: function () {
                    target.detachEvent(eventType, cb);
                }
            };
        }
    }

    function _createHiddenIframe(target, uri) {
        var iframe = document.createElement("iframe");
        iframe.src = uri;
        iframe.id = "hiddenIframe";
        iframe.style.display = "none";
        target.appendChild(iframe);
        return iframe;
    }

    function openUriWithHiddenFrame(uri, failCb, successFun) {
		console.log('openUriWithHiddenFrame:'+uri);
		var isFail = false;
        var timeout = setTimeout(function () {
            isFail = true;
			failCb();
            handler.remove();
        }, 1000);
		
		timeoutSuc = setTimeout(function () {
            if(isFail != true){
            	successFun();	
            }
        }, 2000);
        
        var iframe = document.querySelector("#hiddenIframe");
        if (!iframe) {
            iframe = _createHiddenIframe(document.body, "about:blank");
        }

        var handler = _registerEvent(window, "blur", onBlur);

        function onBlur() {
            clearTimeout(timeout);
            handler.remove();
        }

        iframe.contentWindow.location.href = uri;
    }

    function openUriWithTimeoutHack(uri, failCb, successFun) {
		var isFail = false;
        var timeout = setTimeout(function () {
            console.log('다운로더가 설치되지 않았습니다.');
            isFail = true;
			failCb();
            //setStorageInstalledCUS('0');
            handler.remove();
        }, 1000);
        
        timeoutSuc = setTimeout(function () {
            if(isFail != true){
            	successFun();	
            }
        }, 2000);

        var handler = _registerEvent(window, "blur", onBlur);

        function onBlur() {
            console.log('다운로더가 설치되어 있습니다.');
            clearTimeout(timeout);
            //setStorageInstalledCUS('1');
            handler.remove();
        }
        
        console.log(uri);

        //location.href = uri;
        window.location.href= uri;
        //window.location.assign("uri://");
        
		return false;
        
    }
    
    function openUriWithTimeoutHackChrome(uri, failCb, successFun) {
		
		var isFail = false;
        var timeout = setTimeout(function () {
            //alert('다운로더가 설치되지 않았습니다.');
            isFail = true;
			failCb();
            //setStorageInstalledCUS('0');
            handler.remove();
        }, 1000);
		
		timeoutSuc = setTimeout(function () {
            if(isFail != true){
            	successFun();	
            }
        }, 2000);
        
        var handler = _registerEvent(window, "blur", onBlur);

        function onBlur() {
            //alert('다운로더가 설치되어 있습니다.');
            clearTimeout(timeout);
            //setStorageInstalledCUS('1');
            handler.remove();
        }
        
        console.log(uri);

        location.href = uri;
		return false;
        
    }
    
    function ChromeProtocolResult(isSupported, failCb, successFun){
        //alert(" supported => " + isSupported);
        console.log(" supported => " + isSupported);
        if(isSupported == false){
        	failCb();	
        }else{
        	//setStorageInstalledCUS('1');
        	successFun();
        }
    }

    
    function openUriUsingChrome(uri, failCb, successFun){
		//alert('openUriUsingChrome');
        console.log('launchChromeHandle');
		var protcolEl = $('#fc-custum-protocol-input')[0];
		console.debug(protcolEl);
        var isSupported = false;


        protcolEl.focus();
        protcolEl.onblur = function(){
            isSupported = true;
            //alert('onblur');
            console.log("Text Field onblur called");
            
        };
        //will trigger onblur
        location.href = uri;
        
        //Note: timeout could vary as per the browser version, have a higher value
        setTimeout(function(){
            protcolEl.onblur = null;
            ChromeProtocolResult(isSupported, failCb, successFun);
        }, 00);   

    }
    
    function openUriUsingSafari(uri, failCb, successCallback){
        console.log('openUriUsingSafari');
		var protocol = 'onplay.download';
        var title = 'safari.onplay.download';
        var iframe = document.querySelector("#hiddenIframe");
        if (!iframe) {
            iframe = _createHiddenIframe(document.body, "about:blank");
        }
        iframe.contentWindow.location = uri;
        
  		window.setTimeout(function () {
			failCb();
	   }, 500);
	   
	   return;
    }

    function openUriUsingFirefox(uri, failCb, successFun) {
        console.log('openUriUsingFirefox');
		var iframe = document.querySelector("#hiddenIframe");
		var isFail = false;
		timeoutSuc = setTimeout(function () {
            if(isFail != true){
            	successFun();	
            }
        }, 2000);
        
        if (!iframe) {
            iframe = _createHiddenIframe(document.body, "about:blank");
        }
        try {
            iframe.contentWindow.location.href = uri;
            
        } catch (e) {
            if (e.name == "NS_ERROR_UNKNOWN_PROTOCOL") {
                isFail = true;
				failCb();
            }
        }
    }

    function openUriUsingIE(uri, failCb, successFun) {
        //check if OS is Win 8 or 8.1
        console.log('openUriUsingIE');
        var ua = navigator.userAgent.toLowerCase();
        var isWin8 = /windows nt 6.2/.test(ua) || /windows nt 6.3/.test(ua);
		//alert(getInternetExplorerVersion());
		console.log('getInternetExplorerVersion()', getInternetExplorerVersion());
        if (isWin8) {
            openUriUsingIEInWindows8(uri, failCb, successFun);
        } else {
            if (getInternetExplorerVersion() === 10) {
                openUriUsingIE10InWindows7(uri, failCb);
            } else if (getInternetExplorerVersion() === 9) {
            	openUriWithHiddenFrame(uri, failCb, successFun);
            } else if (getInternetExplorerVersion() === 11) {
            	openUriWithHiddenFrame(uri, failCb, successFun);
            } else {
                openUriInNewWindowHack(uri, failCb, successFun);
            }
        }
    }

    function openUriUsingIE10InWindows7(uri, failCb, successFun) {
        //alert('openUriUsingIE10InWindows7');
		var timeout = setTimeout(failCb, 1000);
        window.addEventListener("blur", function () {
            clearTimeout(timeout);
        });

        var iframe = document.querySelector("#hiddenIframe");
        if (!iframe) {
            iframe = _createHiddenIframe(document.body, "about:blank");
        }
        try {
            iframe.contentWindow.location.href = uri;
        } catch (e) {
            failCb();
            clearTimeout(timeout);
        }
    }

    function openUriInNewWindowHack(uri, failCb, successFun) {
        var myWindow = window.open('', '', 'width=0,height=0');

        myWindow.document.write("<iframe src='" + uri + "'></iframe>");
        setTimeout(function () {
            try {
                myWindow.location.href;
                myWindow.setTimeout("window.close()", 1000);
            } catch (e) {
                myWindow.close();
                failCb();
            }
        }, 1000);
    }

    function openUriUsingIEInWindows8(uri, failCb, successFun) {
        
		if (navigator.msLaunchUri) {
            navigator.msLaunchUri(uri,
                function () {
                    //window.location = uri;
                    //setStorageInstalledCUS('1');
                },
                failCb
            );
        }else{
        	failCb();
        }
    }

    function checkBrowser() {
        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        return {
            isOpera: isOpera,
            isFirefox: typeof InstallTrigger !== 'undefined',
            isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
            isChrome: !!window.chrome && !isOpera,
            isIE: /*@cc_on!@*/false || !!document.documentMode   // At least IE6
        }
    }

    function getInternetExplorerVersion() {
        var rv = -1;
        if (navigator.appName === "Microsoft Internet Explorer") {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        else if (navigator.appName === "Netscape") {
            var ua = navigator.userAgent;
            var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    }

    window.custom_url_checker = function (uri, failCb, successFun) {
        var browser = checkBrowser();

        function failCallback() {
            failCb && failCb();
        }
        
        function successCallback() {
            console.log('successCallback');
            if(isDefined(timeoutSuc)){
            	console.log('timeoutSuc');
            	clearTimeout(timeoutSuc);
            }
			successFun && successFun();
        }

        if (browser.isFirefox) {
            openUriUsingFirefox(uri, failCallback, successCallback);
        } else if (browser.isChrome) {
            console.log('isChrome');
			openUriWithTimeoutHackChrome(uri, failCallback, successCallback);
            //openUriUsingChrome(uri, failCallback, successCallback);
        } else if (browser.isIE) {
            console.log('ie browser');
			openUriUsingIE(uri, failCallback, successCallback);
        
		} else if (browser.isSafari) {
            //console.log('browser.isSafari');
			openUriUsingSafari(uri, failCallback, successCallback);
        } else {
            //not supported, implement please
            openUriWithTimeoutHack(uri, failCallback, successCallback);
        }
    }
    


}(window));
