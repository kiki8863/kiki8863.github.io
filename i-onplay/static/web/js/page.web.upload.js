/*
* upload
*/
var oEditors = [];
var PAGE_UPLOAD = {};


PAGE_UPLOAD.start = function(pageSub, pagData){
	console.log('PAGE_UPLOAD.start', pageSub);
	
	PAGE_UPLOAD.defaultBinding();
	
	if(pageSub == 'upload_form'){
		PAGE_UPLOAD.contentsUploadBinding();
	}else if(pageSub == 'edit_form'){
		PAGE_UPLOAD.contentsEditBinding();
	}
	
};

PAGE_UPLOAD.defaultBinding = function(){
	console.log('PAGE_UPLOAD.defaultBinding');
	console.log('EZCreator');
	//load smart editor
	nhn.husky.EZCreator.createInIFrame({
		oAppRef: oEditors,
		elPlaceHolder: "upLoadFileContents",
		sSkinURI: "/html/smartEditor2/SmartEditor2Skin_Filemonster.php",
		fCreator: "createSEditor2"
	});
	
	console.log(nhn.husky.EZCreator);
	
};



//콘텐츠 업로드일 경우
PAGE_UPLOAD.contentsUploadBinding = function(){
	console.log('PAGE_UPLOAD.contentsUploadBinding');
	
	//oEditors[0].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
	
	//activeX
	//$('.upfile-form-selector').hide();
	
	//load ajax form
	PAGE_UPLOAD.loadFileUploadForm();
	
	//cechk upload app
	PAGE_UPLOAD.checkInstallUploadApp();
};



//콘텐츠 업로드일 경우
PAGE_UPLOAD.checkInstallUploadApp = function(){
	console.log('PAGE_UPLOAD.contentsUploadBinding');
	
	//다운로더 설치 확인 - 분기(성공, 실패)
	var checkUloaderInstall = function(wsData, ws){
		console.log('checkUloaderInstall');
		console.log(wsData);
		
		$('.upfile-check-curl').hide();
		var connectStatus = 0;
		if(isDefined(wsData.status)){
			
			if(isDefined(wsData.status)){
				connectStatus = parseInt(wsData.status);
			}
			
			if(wsData.type != 'starter'){
				console.log('not starter')
				return;
			}
			/*
			if(wsData.status < 0 || wsData.status == 100){
				alert('업로드 전용프로그램이 설치되어 있지 않습니다.');
				PAGE_UPLOAD.showUploaderAppGuide();
				delDiskInstalledCUS('upload');
				return;
			}else 
			*/
			if(wsData.status == 1 && wsData.s_msg =='onplay.starter'){
				console.log('ok!!!!!!!!');
				//return;
				PAGE_UPLOAD.showUploaderAppBinding();
				//return;
				if(isDefined(ws)){
					console.log(ws);
					//ws.close();
					//COMMON_WEB_UPLOAD.WS = null;
				}
				
				
				setDiskInstalledCUS('upload');
				//return;
			}else{
				
			}
			
			/*
			//시간지나면 소켓 닫기
			setTimeout(function() {
			  console.log(ws);
			  console.log('5 ses la')
			  if(isDefined(ws)){
					console.log(ws);
					ws.close();
					ws = null;
				}
			}, 5000);
			*/
		}
		if(connectStatus == 1){
			return;
		}else if(connectStatus == 100){
			alert("온플레이 업로드 전용 프로그램이 설치 되지 않았습니다.\n설치후 다시 시도해 주세요 ");
			$('.upload-form-guide').show();
			return;
		}else if(connectStatus == 200){
			alert("온플레이 업로드 전용 프로그램이 설치 되지 않았거나 지원하지 않는 브라우져입니다.");
			$('#non-surport-browser-upfile-form').show();
			return;
		}else if(connectStatus == 400 || connectStatus == 500){
			alert("서버통신이 실패하였습니다.\n관리자에게 문의해주세요 ");
			//$('.upload-form-guide').show();
			$('.upfile-check-curl').show();
			return;
		}
		PAGE_UPLOAD.showUploaderAppGuide();
		$('#non-surport-browser-upfile-form').show();
		alert('업로드 전용프로그램이 설치되어 있지 않습니다.');
		return;
		
		
		
		/*
		if(isConnected == true){
			setDiskInstalledCUS('upload');
			//COMMON_DOWNLOAD.actionWebContentsDownload(sendData, successDownloadfun);
			PAGE_UPLOAD.showUploaderAppBinding();
		}else{
			alert('업로드 전용프로그램이 설치되어 있지 않습니다.');
			PAGE_UPLOAD.showUploaderAppGuide();
		}
		*/
		/*
		PAGE_UPLOAD.showUploaderAppBinding();
		if(isDefined(COMMON_WEB_UPLOAD.WS)){
			COMMON_WEB_UPLOAD.WS.close();
			COMMON_WEB_UPLOAD.WS = null;
		}
		*/
	};
	
	
	//check 
	if(isWebSocketSuport() == true){
		$('#upFormisWebSocketSuport').val(1);
		/*
		if(checkDiskInstalledCUS('upload') == true){
			PAGE_UPLOAD.showUploaderAppBinding();
		}else{
			//다운로드 프로그램 먼저 설치되어 있는 지 검사
			COMMON_WEB_UPLOAD.DISK_WEBSOCKET.IS_INSTALL_UPLOADER(checkUloaderInstall);
		}
		*/
		//다운로드 프로그램 먼저 설치되어 있는 지 검사
		COMMON_WEB_UPLOAD.DISK_WEBSOCKET.IS_INSTALL_UPLOADER(checkUloaderInstall);
	}else{
		console.log('not isWebSocketSuport');
		
		if(isBrowserIe() == true){
			console.log('show');
			PAGE_UPLOAD.setActiveXUploaderForm();
			return;
		}else{
			$('#non-surport-browser-upfile-form').show();
			$('#upFormisWebSocketSuport').val(0);
			alert('업로드를 지원하지 않는 브라우져입니다. 최신 브라우져를 다운받으세요.');	
		}
		
		
		//$('#ie-NotTWebSocketSuport-form').show();
		//$('#upFormisWebSocketSuport').val(0);
	}
};

//Active X 사용 브라우져
PAGE_UPLOAD.setActiveXUploaderForm = function(){
	console.log('PAGE_UPLOAD.setActiveXUploaderForm');
	
	//set ax obj
	activeXuploadInstallActiveXController();
	
	
	if(checkIsInstalledActiveX() == true){
		console.log('show select folder');
		$('.upfile-form-selector').show();
		$('.upfile-check-ax-install').hide();
		$('#upFormisWebActiveXBroSuport').val(1);
		
		//activeX_object_ID.attachEvent( "custom_event", function(){ document.write("ok!"); } );
		//폴더 & 파일 선택 이벤트 등록
		setGetSelectFileEventListenerUploaderForm();
		
	}else{
		console.log('show ax guide');
		$('.upfile-check-ax-install').show();
	}
	
	
};



//업로더 설치되지 않을 경우 가이드
PAGE_UPLOAD.showUploaderAppGuide = function(){
	console.log('PAGE_UPLOAD.showUploaderAppGuide');
	$('#non-install-uponplay-upfile-form').show();
	
};

//업로더가 설치되었을 경우 처리
PAGE_UPLOAD.showUploaderAppBinding = function(){
	console.log('PAGE_UPLOAD.showUploaderAppBinding');
	//return;
	$('#non-install-uponplay-upfile-form').hide();
	$('#non-surport-browser-upfile-form').hide();
	
	$('#ie-activex-upfile-form').show();
}




//메인 카테고리 클릭시
PAGE_UPLOAD.onclickMainCategory = function(thisEle){
	console.log('PAGE_UPLOAD.onclickMainCategory');
	var eleData = $(thisEle).data();
	
	console.log('eleData',eleData);
	
	if(isDefined(eleData.type) == true){
		$('.upform-sub-category.active').removeClass('active');
		$('.upform-sub-category.'+eleData.type).addClass('active');
	}else{
		return;
	}
	
	$('.btn-upform-main-category.active').removeClass('active');
	$(thisEle).addClass('active');
	
	if(isDefined(eleData.key) == true){
		//$('#upFormCategoryMain').val(eleData.key);
		//$("#upFormCategoryMain").attr("value", eleData.key);
		document.getElementById('upFormCategoryMain').setAttribute('value', eleData.key);
		document.getElementById('upFormCategorySub').setAttribute('value', '');
	}
	
};

//서브 카테고리 클릭시
PAGE_UPLOAD.onclickSubCategory = function(thisEle){
	console.log('PAGE_UPLOAD.onclickSubCategory');
	var eleData = $(thisEle).data();
	
	console.log('eleData',eleData);
	

	
	$('.upform-sub-category-item.active').removeClass('active');
	$(thisEle).addClass('active');
	
	if(isDefined(eleData.key) == true){
		//$('#upFormCategorySub').val(eleData.key);
		//$("#upFormCategorySub").attr("value", eleData.key);
		document.getElementById('upFormCategorySub').setAttribute('value', eleData.key);
	}
	
};

//파일 or 폴더를 선택한 후 처리
PAGE_UPLOAD.setSelectedFileList = function(selectedType, data){
	console.log('PAGE_UPLOAD.setSelectedFileList', selectedType);
	console.log(data);	
	//var data = 'onplay.upload.folder.returnE:\온플레이 다운로드\(선 독스) 잔잔한 코미디 드라마~!#<-1#<-1#<-1#>E:\온플레이 다운로드\(선 독스) 잔잔한 코미디 드라마~!\Sun.Dogs.2017.720p.NF.WEB-DL.DD5.1.x264-NTG.mkv#<1119097554#<E:\온플레이 다운로드\(선 독스) 잔잔한 코미디 드라마~!#<5579a9743f9cbe6010ea0c4954f390c8#>E:\온플레이 다운로드\(선 독스) 잔잔한 코미디 드라마~!\Sun.Dogs.2017.720p.NF.WEB-DL.DD5.1.x264-NTG.smi#<124431#<E:\온플레이 다운로드\(선 독스) 잔잔한 코미디 드라마~!#<e60034577b69bbf5bf7986d612858cda#>';
	
	
	
	
	
	var DF = get_disk_config(false);
	var sendMessageType = DF.WEB_APP_PROTOCOL_NAME.up_file;
	if(selectedType == 'folder'){
		sendMessageType = DF.WEB_APP_PROTOCOL_NAME.up_folder;
	}
	data = data.replace(sendMessageType+'.return','');
	var tmp_a = data.split('#>');
	console.log(tmp_a);
	
	var gData = [];
	for(var i in tmp_a){
		var tmp_b = tmp_a[i].split('#<');
		if(tmp_b.length > 3){
			gData[i] = tmp_b;	
		}
	}
	
	console.log('gData');
	console.log(gData);
	
	var upFormFileList = [];
	var upFileFullSize = 0;
	var showFilePathName;
	var selectedFileList = [];
	
	if(gData.length > 0){
		for(var k in gData){
			var fData = gData[k];
			if(fData.length > 3){
				
				//strMode + "||" + strSize + "||" + strPath + "||" + strHash;
				
				//var optVal = '';
				var strPath = fData[0];
				var strSize = fData[1];
				var strMode = fData[2];
				var strHash = fData[3];
				var optVal = strMode + "||" + strSize + "||" + strPath + "||" + strHash;
				
				console.log('strMode', strMode);
				console.log('strSize', strSize);
				console.log('strPath', strPath);
				console.log('strHash', strHash);
				
				console.log('optVal', optVal);
				
				if(strHash  != '-1' && isDefined(strHash) == true && isDefined(strPath) == true){
					upFormFileList.push(optVal);	
					
					if(strSize > 0){
						upFileFullSize += parseInt(strSize);
					}
				}
				
				if(strMode == -1){
					showFilePathName = strPath;
				}
				
				//inset form select data
				$('#disk_upload_list').append($('<option>', {
                    value	: optVal,
                    text	: strPath
                }).prop("selected", true));
                selectedFileList.push(optVal);
			}
		}
		
	}
	
	console.log(upFileFullSize);
	console.log('showFilePathName', showFilePathName);
	var selectFilesValues = ''; 
    if(selectedFileList.length > 0){
    	selectFilesValues = selectedFileList.join("<>");
    }
	
	//save upfile list on form
	$('#upFormFileList').val(JSON.stringify(upFormFileList));
	//$("#upFormSize").attr("value", upFileFullSize);
	$("#upFormFiles").attr("value", selectFilesValues);
    $("#upFormFileType").attr("value", selectedType);
    $("#upFormSize").attr("value", upFileFullSize);
    
    $('#uploadFileSize').html(axFunParseSize(upFileFullSize, 2));
    if(isDefined(showFilePathName)){
    	$("#upFormFilePath").attr("value", showFilePathName);	
    }
	
	return;
}

//업로드 파일 선택
PAGE_UPLOAD.onclickSelectUpFile = function(type){
	
	console.log('PAGE_UPLOAD.onclickSelectUpFile', type);
	
	//폼 파일 리스트 초기화
	var resetUploadFormList = function(){
	
		//alert('activeXuploadFormListRemove');
		console.log('activeXuploadFormListRemove');
		
		var $uploadFormEle = $('form[name="uploadForm"]')
		
		console.log($uploadFormEle);
		//$("#upFormFiles").val('upFormFiles');
		$("#upFormFiles").attr("value", "");
		$("#upFormSize").attr("value", "");
		$("#upFormFilename").attr("value", "");
		$("#upFormFileType").attr("value", "");
		$("#upFormFilePath").attr("value", "");
		$("#disk_upload_list").attr("value", "");
		
		
		//$uploadFormEle.find('#disk_upload_list').html('<option value="">목록</option>');
		$('#disk_upload_list').empty();
		$("#disk_upload_list option[value]").remove();
		$("#disk_upload_list option:selected").prop("selected", false);
		//$("#disk_upload_list").multiselect('refresh');
		
		$('#uploadFileSize').empty();
		
		return;
		
	};	

	resetUploadFormList();

	
	var uploadSelectedFileListCallback = function(data){
		console.log('uploadSelectedFileListCallback');
		//console.log('ws', ws);
		console.log('data', data);
		
		var connectStatus = 0;
		
		if(isDefined(data) == true){
			//return;
			if(isDefined(data.status)){
				connectStatus = parseInt(data.status);
			}
			
			var wsType = 'starter';
			if(isDefined(data.type)){
				wsType = data.type;
			}
			console.log('type', wsType);
			
			if(wsType == 'starter'){
				
			}else if(wsType == 'up_file' || wsType == 'up_folder'){
				if(connectStatus == -1){
					IS_UPLOADER_INSTALLED_WS = true;
					console.log('select folder~~~ return');
					if(isDefined(data.g_msg)){
						PAGE_UPLOAD.setSelectedFileList(type, data.g_msg);	
					}
					return;
				}
			}
			
			
			//return;
			
			
			/*
			
			if(isDefined(data.g_msg)){
				$('.upload-form-guide').hide();
				//PAGE_UPLOAD.setSelectedFileList(type, data.g_msg);
				return;
			}
			*/
			
			/*
			if(isDefined(data.g_msg)){
				PAGE_UPLOAD.setSelectedFileList(type, data.g_msg);	
			}
			*/
			
			/*
			var DF = get_disk_config(false);
			var sendMessageType = DF.WEB_APP_PROTOCOL_NAME.up_file;
			if(type == 'folder'){
				sendMessageType = DF.WEB_APP_PROTOCOL_NAME.up_folder;
			}
			
			data = data.replace(sendMessageType+'.return','');
			var tmp_a = data.split('#>');
			console.log(tmp_a);
			
			var gData = [];
			for(var i in tmp_a){
				var tmp_b = tmp_a[i].split('#<');
				if(tmp_b.length > 3){
					gData[i] = tmp_b;	
				}
			}
			
			console.log('gData');
			console.log(gData);
			*/
		}
		//1 - 정상, 100 - 미설치, 200 - 실패 (액션에 대한 실패 - customurl로 요청), 400 - customurl로 실행바람,500 - 잘못된 명령어
		if(connectStatus == 1){
			
			return;
		}else if(connectStatus == 100){
			alert("온플레이 업로드 전용 프로그램이 설치 되지 않았습니다.\n설치후 다시 시도해 주세요 ");
			$('.upload-form-guide').show();
			return;
		}else if(connectStatus == 200){
			alert("온플레이 업로드 전용 프로그램이 설치 되지 않았거나 지원하지 않는 브라우져입니다./n이미 설치되었다면 페이지 새로고침후 다시 시도해주세요.");
			$('#non-surport-browser-upfile-form').show();
			return;
		}else if(connectStatus == 400 || connectStatus == 500){
			alert("서버통신이 실패하였습니다.\n관리자에게 문의해주세요 ");
			//$('.upload-form-guide').show();
			$('.upfile-check-curl').show();
			return;
		}

		alert("온플레이 업로드 전용 프로그램이 설치 되지 않았습니다.\n설치후 다시 시도해 주세요 ");
		$('.upload-form-guide').show();
		return;
			
		/*
		if(isDefined(ws)){
			ws.close();
			ws = null;
		}
		*/
	};
	
	
	
	
	//check 
	if(isWebSocketSuport() == true){
		//설친된 경우
		if(checkDiskInstalledCUS('upload') == true){
			//PAGE_UPLOAD.showUploaderAppBinding();
			COMMON_WEB_UPLOAD.DISK_WEBSOCKET.SELECT_UP_FILES(type, uploadSelectedFileListCallback);
		}else{
			PAGE_UPLOAD.checkInstallUploadApp();
		}
	}else{
		console.log('not isWebSocketSuport');
		if(isBrowserIe() == true){
			console.log('show');
			actionActiveXObj(type);
			return;
		}
		
		alert('파일 업로드를 지원하지 않는 브라우져입니다. 최신 브라우져를 다운받으세요.');
		$('#non-surport-browser-upfile-form').show();
		return;
	}
};

//ie - non websocket up file
PAGE_UPLOAD.onchangeIeUploadFileSelect = function(thisEle){
	console.log('PAGE_UPLOAD.onchangeIeUploadFileSelect');
	
	
	//var selectedFiles = $(thisEle).val();
	//console.log('selectedFiles', selectedFiles);
	
	var strFilePath, strUpFilePath;
	var selectionRange;
	strFilePath = thisEle.value;
	console.log('strFilePath', strFilePath);
	$('#upFormFilePathIe').val(strFilePath);
	return;
};


//스마트 에디터에서 이미지 받기 처리
PAGE_UPLOAD.receivePhothOnContentsForm = function(receiveImgList){
	console.log('PAGE_UPLOAD.receivePhothOnContentsForm', receiveImgList);
	//alert('PAGE_UPLOAD.receivePhothOnContentsForm');
	if(jQuery.isArray(receiveImgList) != true){
		console.log('not arr');
		return;
	}
	
	
	var setImageList = [];
	var targetForm = jQuery('#uploadForm');
	if(targetForm.length > 0){
		var setImageData = 	jQuery('#saveFirstImg').val();
		console.log('setImageData', setImageData);
		
		if(isDefined(setImageData)){
			 setImageList = JSON.parse(setImageData);
		}
		if(setImageList.length > 0){
			for(var i in receiveImgList){
				if(jQuery.inArray( receiveImgList[i], setImageList) < 0){
					setImageList.push(receiveImgList[i]);
				}
			}
		}else{
			setImageList = receiveImgList;
		}
	}
	console.log('setImageList', setImageList); 
	var saveFirstImg = null;
	if(setImageList.length > 0){
		saveFirstImg = JSON.stringify(setImageList);
	}
	console.log('saveFirstImg', saveFirstImg);
	if(isDefined(saveFirstImg)){
		jQuery('#saveFirstImg').val(saveFirstImg);
	}
		
};


//업로드 폼
PAGE_UPLOAD.loadFileUploadForm = function(){
	console.log('PAGE_UPLOAD.loadFileUploadForm');	
	
	
	var beforeSubmitFun = function(formData, jqForm, options){
		console.log('beforeSubmitFun');
		console.log(formData);
		console.log(jqForm);
		//console.log(options);
		
		//up file list
		/*
		var selectedFiles = [];
		$('#disk_upload_list :selected').each(function(){
			selectedFiles.push($(this).val());
		});
		console.log(selectedFiles);
		*/
		//contents
	    oEditors.getById["upLoadFileContents"].exec("UPDATE_CONTENTS_FIELD", []);
	    var getUpLoadFileContents = $('#upLoadFileContents').val();
	    console.log('getUpLoadFileContents', getUpLoadFileContents);
	    
		var checkData = {};
	    for(var i in formData){
	    	var cName = formData[i].name;
	    	/*
	    	if(cName == 'upload_file_list'){
	    		formData[i].value = JSON.stringify(selectedFiles);
	    	}
	    	*/
	    	if(cName == 'upLoadFileContents'){
	    		if(isDefined(getUpLoadFileContents) == true){
	    			formData[i].value = getUpLoadFileContents;	
	    		}
	    	}
	    	checkData[cName] = formData[i].value;
	    }
	    
	    
	    
	    console.log(checkData);
		$('#upLoadFileContentsInfo').removeClass('sfocus');
		$("textarea#upLoadFileContents").val(checkData.upLoadFileContents);
		  
		if(isDefined(checkData.uploadTitle) == false){
			alert('제목을 입력하지 않았습니다.');
			$('#uploadTitle').focus();
			return false;
		}
		
		if(isDefined(checkData.upLoadFileContents) == false){
			alert('콘텐츠의 상세 설명을 입력해 주세요.');
			return false;
		}
		
		if(isDefined(checkData.cateMain) == false){
			alert('콘텐츠 분류를 선택해 주십시오.');
			return false;
		}
		
		if(isDefined(checkData.cateSub) == false){
			alert('콘텐츠의 서브 분류를 선택해주십시오.');
			return false;
		}
		
		if(checkData.uploadTitle.length < 10){
			alert('제목은 한글 5자 이상 영문 10자 이상 입력해야만 합니다.');
			$('#uploadTitle').focus();
			return false;
		}
		
		//태그제거
    	var checkContents = checkData.upLoadFileContents.replace(/<(\/div|div)([^>]*)>/gi,"");
    	var checkContents = checkContents.replace(/<(\/br|br)([^>]*)>/gi,"");
    	console.log('checkContents', checkContents);
    	if(checkContents.length < 20){
			alert('콘텐츠 상세 설명은 한글 10자 이상 영문 20자 이상 입력해야만 합니다.');
			$('#upLoadFileContentsInfo').addClass('sfocus');
			return false;
		}
		
		$("textarea#upLoadFileContents").html(checkData.upLoadFileContents);
		
		
		if(checkData.upLoadFileContents.length < 20){
			alert('콘텐츠 상세 설명은 한글 10자 이상 영문 20자 이상 입력해야만 합니다.');
			$('#upLoadFileContentsInfo').addClass('sfocus');
			return false;
		}
		
		if(isDefined(checkData.filepath) == false){
			alert('업로드할 파일이 선택되지 않습니다.');
			return false;
		}
		
		if(isDefined(checkData.disk_files) == false){
			alert('업로드하려는 파일을 선택해주십시오.');
			return false;
		}
		
		if(isDefined(checkData.upload_file_list) == false){
			alert('업로드할 파일이 비어 있습니다. 확인 후 다시 시도해주세요.');
			return false;
		}
		
		if(isDefined(checkData.file_size) == false){
			alert('업로드할 파일이 비어 있습니다. 확인 후 다시 시도해주세요.');
			return false;
		}
		
		if(parseInt(checkData.file_size) < 1024){
			alert('업로드할 파일이 용량이 지나치가 작습니다. 확인 후 다시 시도해주세요.');
			return false;
		}
		
		if(isDefined(checkData.contents_tags) == true){
			alert(checkData.contents_tags.length);
			if(checkData.contents_tags.length > 30){
				alert('콘텐츠 키워드는 한글 30자 이네로 작성해야합니다.');
				$('#upFormContentsTags').addClass('sfocus');
				return false;
			}
		}
		//btn disable
		$('#btnFileUploadSubmit').attr('disabled', true);


		
		//return false;
		return true;
		
	};
	
	
	var uploadActionAppCallbackFun = function(rt){
		console.log('uploadActionAppCallbackFun');
		console.log(rt);
		
		if(isDefined(rt.ws)){
			rt.ws.close();
			rt.ws = null;
			COMMON_WEB_UPLOAD.WS  = null;
		}
		window.close();
		//self.close();
	}
	
	var successSubmitFun = function(getServerData, statusText, xhr, $form){
		console.log('successSubmitFun');
		console.log(getServerData);
		console.log(statusText);
		console.log(xhr);
		console.log($form);
		
		
		if(isDefined(getServerData)){
			var data = DISK_PROTOCOL.checkServerValuation(getServerData, null);
			if(isDefined(data) == true){
				console.log(data);
				if(isDefined(data.upload) == true){
					console.log('data.upload', data.upload);
					if(isDefined(data.upload.access_token) == true){
						//activeXuploadFileUpload(data.upload.access_token);
						var up_access_token = Base64.encode(data.upload.access_token);
							if(isWebSocketSuport() == true){
								COMMON_WEB_UPLOAD.DISK_WEBSOCKET.OPEN_UPLOADER(up_access_token, uploadActionAppCallbackFun);
								return;
							}else{
								console.log('not isWebSocketSuport');
								if(isBrowserIe() == true){
									actionActiveXObj('upload',up_access_token);
									return;
								}else{
									$('#non-surport-browser-upfile-form').show();
									$('#upFormisWebSocketSuport').val(0);
									alert('업로드를 지원하지 않는 브라우져입니다. 최신 브라우져를 다운받으세요.');	
								}
								
							}		
									
						
						
					}
					//nfile_upload(data.user.user_email, data.user.access_token, data.bbs.idx);
					
				}
			}
			
		}
		
		
	};
	
	var actionUrl = DISK_PROTOCOL.ONPLAY_URL.UPLOAD.UPLOAD_ACTION;
	var options = { 
        target:        '#ajaxFormTarget', 
        beforeSubmit:  beforeSubmitFun, 
        success:       successSubmitFun, 
        url:       actionUrl,         // override for form's 'action' attribute 
        dataType:  'json',        // 'xml', 'script', or 'json' (expected server response type) 
        //clearForm: true,        // clear all form fields after successful submit 
        //resetForm: true,        // reset the form after successful submit 
        timeout:   3000,
        type:      'post'        // 'get' or 'post', override for form's 'method' attribute
        
         
    }; 
	
	$('#uploadForm').ajaxForm(options);
}


//신규 등록 
PAGE_UPLOAD.onclickUploadFormSubmit = function(thisEle){
	console.log('PAGE_UPLOAD.onclickUploadFormSubmit');
	$('#uploadForm').submit();
};


//페이지 수정일경우
PAGE_UPLOAD.contentsEditBinding = function(){
	console.log('PAGE_UPLOAD.contentsEditBinding');
	
	if($('#uploadDiskEditForm').length > 0){
		console.log('uploadDiskEditForm');
		$("#uploadDiskEditForm").unbind('submit');
		$("#uploadDiskEditForm").submit(function(event){
			console.log('channelSellerContentsOwnerSearchForm submit');
			event.preventDefault(); 
			var formValues = $(this).serializeArray();
			console.log('formValues:', formValues);
			
			var formData = changeFormArrToObject(formValues);
			console.log('formData:',formData);
			formData.editorUpLoadFileContents = '';
			oEditors.getById["upLoadFileContents"].exec("UPDATE_CONTENTS_FIELD", []);
	    	formData.editorUpLoadFileContents = $('#upLoadFileContents').val();
	    	
	    	console.log('formData:',formData);
	    	
			//태그제거
	    	var checkContents = formData.editorUpLoadFileContents.replace(/<(\/div|div)([^>]*)>/gi,"");
	    	var checkContents = checkContents.replace(/<(\/br|br)([^>]*)>/gi,"");
	    	console.log('checkContents', checkContents);
	    	if(checkContents.length < 20){
				alert('콘텐츠 상세 설명은 한글 10자 이상 영문 20자 이상 입력해야만 합니다.');
				$('#upLoadFileContentsInfo').addClass('sfocus');
				return false;
			}
			
			if(isDefined(formData.uploadTitle) == false){
				alert('제목을 입력하지 않았습니다.');
				$('#uploadTitle').focus();
				return false;
			}
			
			if(isDefined(formData.upLoadFileContents) == false){
				alert('콘텐츠의 상세 설명을 입력해 주세요.');
				return false;
			}
			
			if(isDefined(formData.cateMain) == false){
				alert('콘텐츠 분류를 선택해 주십시오.');
				return false;
			}
			
			if(isDefined(formData.cateSub) == false){
				alert('콘텐츠의 서브 분류를 선택해주십시오.');
				return false;
			}
			
			if(formData.uploadTitle.length < 10){
				alert('제목은 한글 5자 이상 영문 10자 이상 입력해야만 합니다.');
				$('#uploadTitle').focus();
				return false;
			}
			
			if(isDefined(formData.contents_tags) == true){
				if(formData.contents_tags.length > 30){
					alert('콘텐츠 키워드는 한글 30자 이네로 작성해야합니다.');
					$('#upFormContentsTags').addClass('sfocus');
					return false;
				}
			}
			//btn disable
			$('#btnDiskContentsEditSubmit').attr('disabled', true);
			
			PAGE_UPLOAD.editDiskContentsAction(formData);
			return false;
			
		});
	
	}
	
};

//컨텐츠 수정 :action
PAGE_UPLOAD.editDiskContentsAction = function(sendData){
	console.log('PAGE_UPLOAD.editDiskContentsAction', sendData);
	var successFunEditContents = function(data){
		console.log('successFunEditContents', data);
		
		alert('콘텐츠 정보가 수정되었습니다.');
		
		self.close();
		if(window.opener){
			//opener.location.reload();
		}
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.UPLOAD.EDIT_ACTION,
		data		: formData,
		success_fun	: successFunEditContents,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


/*
PAGE_UPLOAD.onclickSelectUpFile = function(type){
	
	console.log('PAGE_UPLOAD.onclickSelectUpFile', type);
	
	if(isEnabledActiveXBrowser() != true){
		alert('지원하지 않는 브라우저입니다.\n파일을 업로드 하려면 ActiveX(액티브엑스)를 지원하는 브라우져여야만 합니다.');
		return;
	}
	
	//var DF = get_disk_config(false);
    //console.log(DF);
    var checkActiveX = checkIsInstalledActiveX();
    
    if(checkActiveX != true){
        alert('파일을 업로드 하실려면 아크웍스에서 배포한 업로드 전용 프로그램을 설치하셔야합니다.');
        location.href ="/guide/file_upload/activex/";
        return;
    }
    

    
    if(activeXuploadCheckVersion() == false){
    	console.log('activeXuploadCheckVersion false');
		//alert('업로드 프로그램이 최신 프로그램이 아니거나 설치되지 않았습니다.\n파일을 업로드 하실려면 TidyWeb에서 배포한 업로드 전용 프로그램을 설치하셔야합니다.');
    	return;
    }else{
    	console.log('activeXuploadCheckVersion true');
		activeXuploadBtnUploadFile(type);	
    }
  
}
*/

