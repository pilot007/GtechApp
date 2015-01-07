
function registerPushwooshIOS() {
	console.log('registerPushwooshIOS 1 ' );
 	var pushNotification = window.plugins.pushNotification;
	console.log('registerPushwooshIOS 2 ' );
 	//set push notification callback before we initialize the plugin
	document.addEventListener('push-notification',
		function(event)
		{
			//get the notification payload
			var notification = event.notification;

			//display alert to the user for example
			alert(notification.aps.alert);
			
			//to view full push payload
			//alert(JSON.stringify(notification));
			
			//clear the app badge
			pushNotification.setApplicationIconBadgeNumber(0);
		}
	);
	console.log('registerPushwooshIOS 3 ' );
	//initialize the plugin
    pushNotification.onDeviceReady({pw_appid:"13FDF-795B4"});
	console.log('registerPushwooshIOS 4 ' );
	//register for pushes
	pushNotification.registerDevice(
		function(status)
		{
			var deviceToken = status['deviceToken'];
			console.warn('registerDevice: ' + deviceToken);
			onPushwooshiOSInitialized(deviceToken);
		},
		function(status)
		{
			console.warn('failed to register : ' + JSON.stringify(status));
			//alert(JSON.stringify(['failed to register ', status]));
		}
	);
	console.log('registerPushwooshIOS 5 ' );
	//reset badges on start
	pushNotification.setApplicationIconBadgeNumber(0);
	console.log('registerPushwooshIOS 6 ' );
}

function onPushwooshiOSInitialized(pushToken)
{
	console.log('registerPushwooshIOS init 1 ' );
	var pushNotification = window.plugins.pushNotification;
	console.log('registerPushwooshIOS init 2 ' );
	//retrieve the tags for the device
	pushNotification.getTags(
		function(tags) {
			console.warn('tags for the device: ' + JSON.stringify(tags));
		},
		function(error) {
			console.warn('get tags error: ' + JSON.stringify(error));
		}
	);
	console.log('registerPushwooshIOS init 3 ' );
	//example how to get push token at a later time 
	pushNotification.getPushToken(
		function(token)
		{
			console.warn('push token device: ' + token);
		}
	);
	console.log('registerPushwooshIOS init 4 ' );
	//example how to get Pushwoosh HWID to communicate with Pushwoosh API
	pushNotification.getPushwooshHWID(
		function(token) {
			console.warn('Pushwoosh HWID: ' + token);
		}
	);
	console.log('registerPushwooshIOS init 5 ' );
	//start geo tracking.
	//pushNotification.startLocationTracking();
}
