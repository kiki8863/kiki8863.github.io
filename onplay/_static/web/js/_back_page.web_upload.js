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
	$('.upfile-form-selector').hide();
	
	/*
	if(isBrowserIe() == true){
		console.log('diskWebCtrl');
		$('#ie-activex-upfile-form').show();
		//$('#div_disk_upload').hide();
		$('#div_disk_upload').show();
		if($('#diskWebCtrl').length < 1){
	    	activeXuploadInstallActiveXController();	
	    }
	}else{
		console.log('chrome');
		$('#chrome-non-activex-upfile-form').show();
		$('#div_disk_upload').show();
		//$('#btnFileUploadSubmit').prop("disabled", true);
		//return;
	}
	*/
	
	
	
	
	
	//load ajax form
	PAGE_UPLOAD.loadFileUploadForm();
	 

};




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


//업로드 파일 선택
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

//업로드 폼
PAGE_UPLOAD.loadFileUploadForm = function(){
	console.log('PAGE_UPLOAD.loadFileUploadForm');	
	
	var beforeSubmitFun = function(formData, jqForm, options){
		console.log('beforeSubmitFun');
		console.log(formData);
		console.log(jqForm);
		//console.log(options);
		
		//up file list
		var selectedFiles = [];
		$('#disk_upload_list :selected').each(function(){
			selectedFiles.push($(this).val());
		});
		console.log(selectedFiles);
		
		var checkData = {};
	    for(var i in formData){
	    	var cName = formData[i].name;
	    	if(cName == 'upload_file_list'){
	    		formData[i].value = JSON.stringify(selectedFiles);
	    	}
	    	checkData[cName] = formData[i].value;
	    }
	    
	    //contents
	    oEditors.getById["upLoadFileContents"].exec("UPDATE_CONTENTS_FIELD", []);
	    checkData.upLoadFileContents = $('#upLoadFileContents').val();
	    console.log(checkData);
		$('#upLoadFileContentsInfo').removeClass('sfocus');
		
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
		
		//return false;
		return true;
		
	};
	
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
						activeXuploadFileUpload(data.upload.access_token);
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
