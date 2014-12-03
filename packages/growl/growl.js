var statusMessageTimeout;
Growl = {
    create: function (message, options) {
        createMessage(message, 'alert-info', options);
    }
    , error: function (message, options) {
        createMessage(message, 'alert-danger', options);
    }
    , warning: function (message, options) {
        createMessage(message, 'alert-warning', options);
    }
    , success: function (message, options) {
        createMessage(message, 'alert-success', options);
    }
    , info: function (message, options) {
        createMessage(message, 'alert-info', options);   
    }
    , clear: function (options) {
        removeMessages(options);
    }
}

createMessage = function (message, styleClass, options) {
    var message_defaults = {
            parentSelector: "#statusMessages",
            alertType: "alert-info",
            title: "Fun Fact #" + Math.max( Math.round( Random.fraction() * 205 ), 1 ) + ":",
            message: "If you spell out consecutive numbers, you have to go up to one thousand until you would find the letter \"a\".",
            code: "",            
            sticky: false,
            delay: 4500,
        }
        , container = document.createElement("div")
        , msg = document.createElement("p")
        , opts = {};
    
    if (message instanceof Error) {
        console.log("error message", message);
        opts = _.extend({}, message_defaults, { "title": "Uh-oh!", "message": message.reason, "code": message.error, "styleClass": "alert-danger" });
    } else {
        opts.message = typeof message === "string" && message || "";
        opts.styleClass = styleClass || "alert-info";
        if (options) {
            opts = _.extend({}, message_defaults, _.pick(options, "title", "parentSelector", "code", "sticky", "delay"), opts);
        } else {
            opts = _.extend({}, message_defaults, opts);
        }
    }
    // define container
    container.className = "alert " + opts.styleClass + " fade in";
    container.style.padding = "8px 15px";
    container.innerHTML = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>"
    if (opts.title) {
        container.innerHTML += "<strong>" + opts.title + "</strong>";
    }
    // define message
    msg.className = "alert-message";
    msg.innerHTML = opts.message;
    if (!!opts.code) {
        msg.innerHTML += " (error code: " + opts.code + ")";
    }

    // clean up any existing messages before displaying new message
    removeMessages(opts, function () {
        container.appendChild(msg);
        $(opts.parentSelector).hide().append(container).fadeIn(function () {
            if (!opts.sticky) {
                statusMessageTimeout = Meteor.setTimeout(function () {
                    removeMessages(opts);
                }, opts.delay );
            }
        });    
    });
}

removeMessages = function (opts, callback) {
    Meteor.clearTimeout(statusMessageTimeout);
    
    var parentContainer = null,
        defaults = { 
            parentSelector: "#statusMessages"
        };
    if (callback == null && typeof opts === "function") {
        callback = opts;
        opts = {};
    }
    
    opts = _.extend({}, defaults, opts);
    
    parentContainer = $(opts.parentSelector);

    if (parentContainer.children().length > 0) {
        parentContainer.fadeOut(200, function () {
            $(this).empty();
            if (callback && typeof callback === "function") {
                callback();
            }
        });
    } else {
        if (callback && typeof callback === "function") {
            callback();
        }
    }
}


/**
 * Method: createMessageAlert()
 *
 * Example Usage:
 *    createMessageAlert( messageString )
 *    createMessageAlert( messageString, messageTitle )
 *    createMessageAlert( messageString, messageTitle, alertType )
 *    createMessageAlert( Error )
 *    createMessageAlert({
 *       parentSelector: CSS Selector,
 *       sticky: true/false,
 *       alertType: [ "info", "success", "danger", "warning" ],
 *       title: string,
 *       message: string,
 *       code: string
 *    })
 *  Note: Add a div with id=statusMessages to your template for default behavior.
 */
// createMessageAlert = function () {
//     var opts = {},
//         argn = arguments.length
//         defaults = {
//             parentSelector: "#statusMessages",
//             alertType: "info",
//             title: "Fun Fact #" + Math.max( Math.round( Random.fraction() * 205 ), 1 ) + ":",
//             message: "If you spell out consecutive numbers, you have to go up to one thousand until you would find the letter \"a\".",
//             code: "",            
//             sticky: false,
//             delay: 4500,
//         };

//     if (argn < 1 || argn > 3) {
//       throw new Error( "Invalid argument length" );
//     }

//     if (argn === 2 || typeof arguments[0] === "string") {
//         opts[ "message" ] = arguments[0];
//         if ( typeof arguments[1] === "string" ) {
//             opts[ "title" ] = arguments[1];
//         }
//         if ( typeof arguments[2] === "string" ) {
//             opts[ "alertType" ] = arguments[2];
//         }
//     } else {
//         opts = arguments[0];
//     }

//     if ( opts && opts instanceof Error ) {
//         opts = { "title": "Uh-oh!", "message": opts.reason, "code": opts.error, "alertType": "danger", "sticky": true };
//     }

//     var opts = _.extend( {}, defaults, opts );
//     // console.log(argn, opts);

//     var errorDiv = document.createElement( "div" ),
//         errorMsg = document.createElement( "p" );
    
//     errorDiv.className = "alert alert-" + opts.alertType + " fade in";
//     errorDiv.style.padding = "8px 15px";
//     errorDiv.innerHTML = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>"
//     errorDiv.innerHTML += "<strong>" + opts.title + "</strong>";
    
//     errorMsg.className = "alert-message";
//     errorMsg.innerHTML = opts.message;

//     if ( !!opts.code ) {
//         errorMsg.innerHTML += " (error code: " + opts.code + ")";
//     }

//     // clean up any existing error messages before displaying new message
//     removeErrorMessages(opts, function () {
//         errorDiv.appendChild(errorMsg);
//         $( opts.parentSelector ).hide().append( errorDiv ).fadeIn( function () {
//             if ( !opts.sticky ) {
//                 statusMessageDelay = Meteor.setTimeout( function () { removeErrorMessages(opts); }, opts.delay );
//             }
//         });    
//     });
// };

// removeErrorMessages = function ( opts, callback ) {
//     Meteor.clearTimeout(statusMessageDelay);
    
//     var parentContainer = null,
//         defaults = { 
//             parentSelector: "#statusMessages"
//         };
//     if ( callback == null && typeof opts === "function" ) {
//         callback = opts;
//         opts = {};
//     }
    
//     opts = _.extend( {}, defaults, opts );
    
//     parentContainer = $( opts.parentSelector );

//     if ( parentContainer.children().length > 0 ) {
//         parentContainer.fadeOut( 200, function () {
//             $( this ).empty();
//             if ( callback && typeof callback === "function" ) {
//                 callback();
//             }
//         });
//     } else {
//         if ( callback && typeof callback === "function" ) {
//             callback();
//         }
//     }
// }