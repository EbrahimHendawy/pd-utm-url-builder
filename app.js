var app = angular.module('myApp', ['720kb.socialshare', 'ngClipboard', 'ngAnimate', 'toastr']);

app.config(['ngClipProvider', function(ngClipProvider) {
    // always use SWF from CDN
    // SWF doesn't work in localhost mode
    ngClipProvider.setPath("//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf");
}]);

// all config for toastr
app.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    allowHtml: false,
    autoDismiss: false,
    closeButton: true,
    closeHtml: '<button>&times;</button>',
    containerId: 'toast-container',
    extendedTimeOut: 1000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    maxOpened: 0,
    messageClass: 'toast-message',
    newestOnTop: true,
    onHidden: null,
    onShown: null,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    progressBar: false,
    tapToDismiss: true,
    target: 'body',
    templates: {
      toast: 'directives/toast/toast.html',
      progressbar: 'directives/progressbar/progressbar.html'
    },
    timeOut: 4000, // the toastr duration
    titleClass: 'toast-title',
    toastClass: 'toast'
  });
});

app.controller('myCtrl', function($scope, toastr) {

    /*
    activateCopyButton
    false   = copy button is disabled
    true    = copy button is active
    */
    $scope.activateCopyButton = false;

    $scope.built = function(){
        console.log("built clicked");

        /*
        Init doBuilt variable
        0 = do not proceed with URL building
        1 = do process with URL building
        */
        var doBuilt = 0;

        var url     = $scope.url;
        var source  = $scope.source;
        var medium  = $scope.medium;
        var name    = $scope.name;
        var term    = $scope.term;
        var content = $scope.content;

        console.log(url);
        console.log(source);
        console.log(medium);
        console.log(name);
        console.log(term);
        console.log(content);

        if ( (url === "" || url === undefined) && (source === "" || source === undefined) && (medium === "" || medium === undefined) && (name === "" || name === undefined) ) {
            // check all required fields
            // if all are empty, don't proceed with URL building
            toastr.error("Sila isi semua ruangan wajib");
            console.log("All required fields are empty");
            doBuilt = 0;
        } else if (url === "" || url === undefined){
            // if URL field is empty, don't proceed
            toastr.error("URL kosong");
            console.log("URL field is empty");
            doBuilt = 0;
        } else if (source === "" || source === undefined){
            // if source field is empty, don't proceed
            toastr.error("Sumber Kempen kosong");
            console.log("Source field is empty");
            doBuilt = 0;
        } else if (medium === "" || medium === undefined){
            // if medium field is empty, don't proceed
            toastr.error("Medium Kempen kosong");
            console.log("Medium field is empty");
            doBuilt = 0;
        } else if (name === "" || name === undefined){
            // if name field is empty, don't proceed
            toastr.error("Nama Kempen kosong");
            console.log("Name field is empty");
            doBuilt = 0;
        } else {
            // if all required fields is not empty, proceed
            doBuilt = 1;
        }

        /*
        URL EXAMPLE:
        http://google.com/?utm_source=b&utm_medium=c&utm_campaign=d&utm_term=e&utm_content=f

        a = URL
        b = source
        c = medium
        d = name
        e = term
        f = content
        */

        if (doBuilt == 1) {
            if ((term === "" || term === undefined) && (content === "" || content === undefined)){
                // check if optional fields are empty or not
                // if both are empty, proceed without optional fields
                console.log("Final URL 1: "+url+source+medium+name);
                $scope.finalurl = url + "?utm_source=" + source + "&utm_medium=" + medium + "&utm_campaign=" + name;
                $scope.activateCopyButton = true;
            } else if ((term !== "" || term !== undefined) && (content === "" || content === undefined)){
                // if term field is not empty and content field is empty, proceed and include term only
                console.log("Final URL 2: "+url+source+medium+name+term);
                $scope.finalurl = url + "?utm_source=" + source + "&utm_medium=" + medium + "&utm_campaign=" + name + "&utm_term=" + term;
                $scope.activateCopyButton = true;
            } else if ((content !== "" || content !== undefined) && (term === "" || term === undefined)){
                // if content field is not empty and term field is empty, proceed and include content only
                console.log("Final URL 3: "+url+source+medium+name+content);
                $scope.finalurl = url + "?utm_source=" + source + "&utm_medium=" + medium + "&utm_campaign=" + name + "&utm_content=" + content;
                $scope.activateCopyButton = true;
            } else {
                // if all fields is not empty, proceed and include all of them
                console.log("Final URL 4: "+url+source+medium+name+term+content);
                $scope.finalurl = url + "?utm_source=" + source + "&utm_medium=" + medium + "&utm_campaign=" + name + "&utm_term=" + term + "&utm_content=" + content;
                $scope.activateCopyButton = true;
            }
        }

    };

    $scope.clear = function(){
        console.log("clear clicked");
        
        $scope.url          = "";
        $scope.source       = "";
        $scope.medium       = "";
        $scope.name         = "";
        $scope.term         = "";
        $scope.content      = "";
        $scope.finalurl     = "";

        $scope.activateCopyButton = false;
    };

    $scope.copy = function(){
        console.log("copy clicked");
        return $scope.finalurl;
    };

    $scope.afterCopy = function(){
        toastr.success("URL kempen sudah dicopy");
    };
});