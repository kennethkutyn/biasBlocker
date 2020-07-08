

//If setting exists, read and set 'enabled', otherwise, default to ON.
var enabled = getSetting();

if (window.location.hostname == "www.linkedin.com"){
	var site = "linkedIn";
} else if (window.location.hostname == "www.xing.com"){
	var site = "xing";
};


function start(enabled){
	console.log('starting');
	if (enabled){
		//console.log('starting');
		turnOn();
	};
};


function waitForElementToDisplay() {
        if(document.getElementsByClassName('pv-top-card__image')[0] != null && enabled) {
            document.getElementsByClassName('pv-top-card__image')[0].style.display = 'none';
            setTimeout(function() {
                waitForElementToDisplay();
            }, 100);
        }
        else {
            setTimeout(function() {
                waitForElementToDisplay();
            }, 100);
        }
    }

waitForElementToDisplay();

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
    	console.log('mutated');

      //if (mutation.type === 'childList') {
        //document.getElementById('profile-xingid-container').childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].style.display = 'none';
      	if (site == "xing"){
      		document.getElementById('ContactPathModule').style.display = 'none';
      		document.getElementById('PersonalDetailsModule').style.display = 'none';
      	};

      	if (site == "linkedIn"){
      		console.log('listening For Changes on linkedin');
      		if(document.getElementsByClassName('pv-top-card__image')[0]){
      			document.getElementsByClassName('pv-top-card__image')[0].style.display = 'none';
      		}
      		
		};
      	//};
      	
      	//document.title = "XING User Profile";

      	//text find and replace
      	//$("body").children().each(function () {
    	//	$(this).html( $(this).html().replace(/Falko Suhr/gi,"Another Word"));
		//});

      //}
    });
  });
  var config = {
    attributes: true,
    childList: true,
    characterData: true
  };



//consider option to hide url if this causes issues with 'back'
var hideURL = false;
///if (getSettings(hideURL)){
//	hideURL = getSetting(hideURL);
//};


//Read Page Data
//URL = window.location.href;
//userName = URL.split("/")[4].replace("_"," ");




function turnOn(){
	//console.log('running function turnOn()');
	
	enabled = true;

	//var nameElement = document.getElementById('profile-xingid-container').childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1];
	
	if (site == "xing"){
		var imageElement = document.getElementById('profile-xingid-container').childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0]

		if (document.getElementById('ContactPathModule')){
			document.getElementById('ContactPathModule').style.display = 'none';
		};
    
    	if (document.getElementById('PersonalDetailsModule')){
    		document.getElementById('PersonalDetailsModule').style.display = 'none';
    	};
	}

	if (site == "linkedIn"){
		var imageElement = document.getElementsByClassName('pv-top-card__image')[0];
		if(document.getElementsByClassName('pv-profile-sticky-header__image')[0]){
			document.getElementsByClassName('pv-profile-sticky-header__image')[0].style.display = "none";
		}

		document.onscroll = function(){
			if(document.getElementsByClassName('pv-profile-sticky-header__image')[0]){
				document.getElementsByClassName('pv-profile-sticky-header__image')[0].style.display = "none";
			}
		};
	}
	
	//var contactPathModule = document.getElementById('ContactPathModule')
	//document.title = "XING User Profile";

	//nameElement.style.display = 'none';
	imageElement.style.display = 'none';
	//contactPathModule.style.diplay = 'none';



    
    //document.title = "XING User Profile";

	//if (hideURL == true){
	//	var URL = window.location.href;
	//	window.history.pushState('XING', 'XING User Profile', '/hidden');
	//}

	listenForChanges();
	updateSettingsOn();

};

function turnOff(){

	enabled = false;

	updateSettingsOff("enabled", enabled);

	//Show profile image
	if (site == "xing"){
		var imageElement = document.getElementById('profile-xingid-container').childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0]
		imageElement.style.display = 'block';

		//Show Contact Path
    	document.getElementById('ContactPathModule').style.display = 'block';
   	
		//Show Personal Detials
   		document.getElementById('PersonalDetailsModule').style.display = 'block';
	}

	if (site == "linkedIn"){
		var imageElement = document.getElementsByClassName('pv-top-card__image')[0];
		imageElement.style.display = 'block';

		if(document.getElementsByClassName('pv-profile-sticky-header__image')[0]){
			document.getElementsByClassName('pv-profile-sticky-header__image')[0].style.display = "block";
		}

		document.onscroll = function(){
			if(document.getElementsByClassName('pv-profile-sticky-header__image')[0]){
				document.getElementsByClassName('pv-profile-sticky-header__image')[0].style.display = "block";
			}
		};

	}
    

    //Show profile details
    //document.getElementById('profile-xingid-container').childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].style.display = 'block';
    
    
    
   	//document.title = userName + " | XING";

   	//Reset URL
    //window.history.pushState('XING', 'XING User Profile', URL);

    //Stop listening for changes
    observer.disconnect();
}


function updateSettingsOn(){
	chrome.storage.local.set({enabled: true}, function() {
  		//console.log('updated storage On');
  		//console.log('enabled = ' + enabled);
    });
};

function updateSettingsOff(){
	chrome.storage.local.set({enabled: false}, function() {
  		//console.log('updated storage Off');
  		//console.log('enabled = ' + enabled);
    });
};

function getSetting(){
	chrome.storage.local.get(['enabled'], function(result) {
    	//console.log('running function getSetting()');
    	//console.log(result.enabled);
    	start(result.enabled);
    	return result.enabled; 
 	});  

};


function toggleStatus(){
	if (enabled){
		//console.log('before Toggle Status, enabled = ' + enabled);
		turnOff();
		//console.log('after Toggle Status, enabled = ' + enabled);

	}else{
		//console.log('before Toggle Status, enabled = ' + enabled);
		turnOn();
		//console.log('after Toggle Status, enabled = ' + enabled);
	}
}

function listenForChanges() {
  var observeThis = document.body;
  observer.observe(observeThis, config);
  //observer.disconnect(); 
  //use observer.disconnect to end observations

}

//Listen for button presses
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	toggleStatus();
    }
  }
);
