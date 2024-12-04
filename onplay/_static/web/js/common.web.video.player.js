/*
*	web video player
*/
var COMMON_WEB_VIDEO = {};






COMMON_WEB_VIDEO.contentsPreviewVideoInit = function(EleId, isViewLayer) {
	
	console.log('contentsPreviewVideoInit : video on', EleId);
	if($(EleId).length < 1){
		return;
	}
	if($('#onplay_web_preview_player').length < 1){
		return;
	}
	console.log('aaaa');
	
	var videoPlayerReady = function(media, node, player) {
		console.log('videoPlayerReady');
		media.addEventListener('ended', function(e) {
			//Do what you want, e.g. reload the page
			console.log('media ended');
			//media.load();
			//http://fca-pre.mobile.pconn.co.kr/clip/6h0v7t4fZVUfxk8xRHrF0dxKd6R2fNUavRYSh4zB7szoHQgnwk--h7PWxpcRH4fqnsIL0MR9qkumO8H0ka9EPpPoAT0KUjH2vQhYcC9eOOPkT3cmIfoIgtFZYBmJuEaVXOmtbc7QV5V2kyMCqngrwQ
		});
		
		var previewPosterUrl = $('#video-prev-post-src').val();
		console.log('previewPosterUrl', previewPosterUrl);
		if(isDefined(previewPosterUrl)){
			player.setPoster(previewPosterUrl);	
		}
	};
	
	
	$('#onplay_web_preview_player').mediaelementplayer({
		pluginPath: '/_static/_lib/mediaelementjs/',
		//pluginPath :  ' ../build/ ' ,
		// All the config related to HLS
		hls: {
			debug: true
		},
		// More configuration parameters...
	
		success: function(media, node, instance) {
			// Use the conditional to detect if you are using `native_hls` renderer for that given media;
			// otherwise, you don't need it
			console.log('contentsPreviewVideoInit success');
			
			//if (Hls !== undefined) 
			if(isDefined(Hls) == true){
				console.log('hls');
				
				//console.log(Hls.Events);
				media.addEventListener(Hls.Events.MEDIA_ATTACHED, function () {
					// All the code when this event is reached...
					console.log('contentsPreviewVideoInit Media attached!');
				});
	
				// Manifest file was parsed, invoke loading method
				media.addEventListener(Hls.Events.MANIFEST_PARSED, function () {
					// All the code when this event is reached...
					console.log('contentsPreviewVideoInit Manifest parsed!');
				});
	
				media.addEventListener(Hls.Events.FRAG_PARSING_METADATA, function (event, data) {
					// All the code when this event is reached...
					console.log(data);
				});
				
			}else{
				console.log('contentsPreviewVideoInit no hls')
			}
			videoPlayerReady(media, node, instance);
		},
		error: function (err) { 
     			console.log('contentsPreviewVideoInit err');
     			console.log(err);
				$(EleId).find('.web_view_preview_err-msg').addClass('show');
    		}
	});
	
	
	
	return;
	
};
