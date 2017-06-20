  // Programmversion
var programVersion = '2.x';
var releaseDate = '20.01.2014';

var sessionFullUsername,sessionUserID,sessionUsername,sessionEmail,isAdmin,isSupport,isSales,isTCOB;

var phpLoginURL = 'http://couchapps/cstt/login.php';
var phpUploadURL =  'http://couchapps/cstt/upload.php';
var phpMailURL = 'http://couchapps/cstt/mail.php';

// Convert Funktionen muessen hier stehen!
// Convert CompanyName in Store
    function convertCompanyName(readerValue, record){
		var index = Ext.data.StoreManager.lookup('companyConvertStore').findExact('_id',readerValue);
    	var companyName = readerValue;
		if (index >= 0) {
			companyName = Ext.data.StoreManager.lookup('companyConvertStore').getAt(index).data.company;
		}
		return companyName;
   }
  
// Convert ownerName in Store

function convertOwnerName(readerValue, record) {
	var index = Ext.data.StoreManager.lookup('allStaffStore').findExact('_id',readerValue);
	
    	var ownerName = readerValue;
		if (index >= 0) {
			ownerName = Ext.data.StoreManager.lookup('allStaffStore').getAt(index).data.staff_name;
		}
		return ownerName;
} 
   
   

/*
 * 
 * Funktion: MessageBox: Es wurden nicht alle Felder ausgefuellt
 * 
 */

function boxWarningRequiredFields() {
	Ext.MessageBox.show({
		title: 'Warnung',
		msg: 'Es wurden nicht alle ben&ouml;tigten Felder ausgef&uuml;llt.<br \>Bitte &uuml;berpr&uuml;fen Sie ihre Eingaben.',
		buttons: Ext.MessageBox.OK,
		icon: Ext.MessageBox.WARNING
	});
}

/*
 * 
 * Funktion: MessageBox: Fehler waehrend des Speicherns ist aufgetreten
 * 
 */

function boxErrorDuringSaving() {
	Ext.MessageBox.show({
		title: 'Fehler',
		msg: 'Beim Speichern ist ein Fehler aufgetreten!',
		buttons: Ext.MessageBox.OK,
		icon: Ext.MessageBox.ERROR
	});	
}

function boxErrorGeneralError() {
	Ext.MessageBox.show({
		title: 'Fehler',
		msg: 'Allgemeiner Fehler, bitte wenden Sie sich an den Entwickler mit einer Beschreibung der ausgef&uuml;hrten Aktion im CSTT.',
		buttons: Ext.MessageBox.OK,
		icon: Ext.MessageBox.ERROR
	});	
}

/*
 * 
 * Funktion: MessageBox: Fehler waehrend des Loeschens
 * 
 */

function boxErrorDuringDelete() {
	Ext.MessageBox.show({
		title: 'Fehler',
		msg: 'W&auml;hrend des L&ouml;schens ist ein Fehler aufgetreten!',
		buttons: Ext.MessageBox.OK,
		icon: Ext.MessageBox.ERROR
	});	
}

/*
 * 
 * Funktion: MessageBox: Zugriff verweigert
 * 
 */

function boxErrorAccessDenied() {
	Ext.MessageBox.show({
		title: 'Zugriff verweigert',
		msg: 'Sie haben hierf&uuml;r keine Berechtigung!',
		buttons: Ext.MessageBox.OK,
		icon: Ext.MessageBox.ERROR
	});	
}


/*
 * 
 * Funktion: MessageBox: keine Verbindung zur Datenbank
 * 
 */

function boxErrorDatabaseDown() {
	Ext.MessageBox.show({
		title: 'Datenbank nicht erreichbar ...',
		msg: 'Konnte keine Verbindung zur Datenbank herstellen!',
		buttons: Ext.MessageBox.OK,
		icon: Ext.MessageBox.ERROR
	});	
}




// Status anzeigen
function switchStatusText(dataStatus) {	
var actionStatusText = '';
	switch (dataStatus) {
	// Geschlossen
	case 0:
	actionStatusText = '<b>Ticket wurde <font color="red">geschlossen</font></b>';
	break;
	// Offen
  case 1:
  	actionStatusText = '<b>Status zu <font color="green">Offen</font> ge&auml;ndert</b>';
    break;
	// In Bearbeitung (Support)
  case 2:
	actionStatusText = '<b>Status zu <font color="blue">In Bearbeitung (Support)</font> ge&auml;ndert</b>';
    break;
	//In Bearbeitung (Kunde)
  case 3:
		actionStatusText = '<b>Status zu <font color="purple">In Bearbeitung (Kunde)</font> ge&auml;ndert</b>';
    break;
	// Entwicklung
  case 4:
   		actionStatusText = '<b>Ticket wurde an <font color="orange">Entwicklung (Derbystrasse)</font> weitergegeben</b>';
  break;
  	// L&ouml;sungsvorschlag
  case 5:
   		actionStatusText = '<b><font color="brown">L&ouml;sungsvorschlag</font> an Kunde &uuml;bermittelt</b>';
  break;
  // Eskalation (2nd Level)
  case 6:
   		actionStatusText = '<b>Status zu <font color="grey">Eskalation (2nd Level)</font> ge&auml;ndert</b>';
	break;
  // Eskalation (Vertrieb)
  case 7:
  		actionStatusText = '<b>Status zu <font color="#53BBFB">Eskalation (Vertrieb)</font> ge&auml;ndert</b>';
  break;
  // Zur�ckgestellte Tickets
  case 8:
  	actionStatusText = '<b>Ticket wurde <font color="#013608">zur&uuml;ckgestellt</font></b>';
  break;
  // Entwicklung (Hauptplatz)
   case 9:
  	actionStatusText = '<b>Ticket wurde an <font color="#FF6600">Entwicklung (Hauptplatz)</font> weitergegeben</b>';
  break;
}

return actionStatusText
	
}


/*
 * 
 * Renderer Functions
 * 
 */

// Group-Icon rendern
function renderer_contactIcon(val) {
	 return '<div align="center"><img src="images/icons/group.png" title="Kontaktpersonen anzeigen" /></div>';
	
}

// Details-Icon rendern
function renderer_DetailsIcon(val) {
	return '<div align="center"><img src="images/icons/view_detail.png" title="Details anzeigen" /></div>';
	
}

// Kontaktpersonen Name rendern
function render_name (val, x, store){
if (!store.data.forename == '') {
return  store.data.salutation + ' ' + val+', '+store.data.forename;
}
else {
	return  store.data.salutation + ' ' + val;
}
}



// Support berechnen
function render_supportTo(val, x, store) {	

	// Kunde ist ein Pilotkunde
	if (store.data.pilot === true) {
		return 'Pilotsupport';
	}	

	// U = Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)  					
	var currentDateInteger = Ext.util.Format.date(new Date(), 'U');	
	
	// strict Mode fuer Datum
	// Support bis Datum umrechnen
    var supportDate = Ext.Date.parse(store.data.supportTo+' 23:59:59','Y-m-d H:i:s');
    var supportUntilDateInteger = Ext.Date.format(supportDate, 'U');
    var supportDateDMY = Ext.Date.format(supportDate, 'd.m.Y');
    
    if(!Ext.isEmpty(store.data.reseller) && store.data.reseller === true) {
   		return 'Reseller';
    }
    
    var supportCancel;
    
    if(Ext.isEmpty(store.data.supportCancel) || store.data.supportCancel === false) {
   	 	supportCancel = false;
    } else {
    	supportCancel = store.data.supportCancel;
    }
    
    if(supportCancel === true && (supportUntilDateInteger <= currentDateInteger)) {
    	supportCancel = true;
    } else {
    	supportCancel = false;
    }
    
        
	if(supportCancel === true) {
		return '<font color="red"><b>gek&uuml;ndigt</b></font>';

	} else {
	
		// Wenn das Support bis Datum kleiner gleich das aktuelle ist, dann ist der Support abgelaufen.	
		if	(supportUntilDateInteger <= currentDateInteger) {
			return '<font color="orange"><b>Nein</b></font>';
			
		}
		// Kunde hat Support
		else if (supportUntilDateInteger >= currentDateInteger){
			return '<font color="green"><b>Ja</b></font>';
			
		}
	}

}

function convert_supportTo(val, store) {
		// Kunde ist ein Pilotkunde
	if (store.data.pilot === true) {
		return 'Pilotsupport';
	}	

	// U = Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)  					
	var currentDateInteger = Ext.util.Format.date(new Date(), 'U');	
	
	// strict Mode fuer Datum
	// Support bis Datum umrechnen
    var supportDate = Ext.Date.parse(store.data.supportTo+' 23:59:59','Y-m-d H:i:s');
    var supportUntilDateInteger = Ext.Date.format(supportDate, 'U');
    var supportDateDMY = Ext.Date.format(supportDate, 'd.m.Y');
    
    if(!Ext.isEmpty(store.data.reseller) && store.data.reseller === true) {
   		return 'Reseller';
    }
    
    var supportCancel;
    
    if(Ext.isEmpty(store.data.supportCancel) || store.data.supportCancel === false) {
   	 	supportCancel = false;
    } else {
    	supportCancel = store.data.supportCancel;
    }
    
    if(supportCancel === true && (supportUntilDateInteger <= currentDateInteger)) {
    	supportCancel = true;
    } else {
    	supportCancel = false;
    }
    
        
	if(supportCancel === true) {
		return '<font color="red"><b>gek&uuml;ndigt</b></font>';

	} else {
	
		// Wenn das Support bis Datum kleiner gleich das aktuelle ist, dann ist der Support abgelaufen.	
		if	(supportUntilDateInteger <= currentDateInteger) {
			return '<font color="orange"><b>Nein</b></font>';
			
		}
		// Kunde hat Support
		else if (supportUntilDateInteger >= currentDateInteger){
			return '<font color="green"><b>Ja</b></font>';
			
		}
	}
}

// Renderer f&uuml;r Anzeige von Datum/Zeit des Tickets

function renderer_dateTime (val, x, store) {
	
var newDate = new Date(val);
return Ext.util.Format.date(newDate,'d.m.Y H:i:s');

}

// Renderer f&uuml;r den Status im Grid + Anzeige des letzten Bearbeiters am Ticket
function renderer_status (val, x, store){
	
var index;
var staffName;
	if (store.data !== undefined) {
		index = Ext.data.StoreManager.lookup('allStaffStore').findExact('_id', store.data.lastEditorID);
		staffName = store.data.lastEditorID;
	}
	else {
		index = Ext.data.StoreManager.lookup('allStaffStore').findExact('_id', store);	
		staffName = store;
	}
if (index >= 0) {
	staffName = Ext.data.StoreManager.lookup('allStaffStore').getAt(index).data.staff_name;
}
	

switch (val) {
	// Geschlossen
	case 0:
	return '<font color="red"><b>Geschlossen</b></font> - ' + staffName;
	break;
	// Offen
  case 1:
   	return '<font color="green"><b>Offen</b></font> - ' + staffName;
    break;
	// In Bearbeitung (Support)
  case 2:
	return '<font color="blue"><b>In Bearbeitung (Support)</b></font> - ' + staffName;
    break;
	//In Bearbeitung (Kunde)
  case 3:
	return '<font color="purple"><b>In Bearbeitung (Kunde)</b></font> - ' + staffName;
    break;
	// Entwicklung
  case 4:
   	return '<font color="orange"><b>Entwicklung (Derbystrasse)</b></font> - ' + staffName;
    break;
	// L&ouml;sungsvorschlag
  case 5:
   	return '<font color="brown"><b>L&ouml;sungsvorschlag &uuml;bermittelt</b></font> - ' + staffName;
    break;
	// Eskalation (2nd Level
	case 6:
	return '<font color="grey"><b>Eskalation (2nd Level)</b></font> - ' + staffName;
	break;
	  // Eskalation (Vertrieb)
  	case 7:
  	return '<font color="#53BBFB"><b>Eskalation (Vertrieb)</b></font> - ' + staffName;
  	break;
    // Zur�ckgestellte Tickets
    case 8:
  	return '<font color="#013608"><b>Ticket zur&uuml;ckgestellt</b></font> - ' + staffName;
  	break;
  	// Entwicklung (Hauptplatz)
  	case 9:
  	return '<font color="#FF6600"><b>Entwicklung (Hauptplatz)</b></font> - ' + staffName;
  	break;
	default: 
	return staffName;
	break;
}

}

function renderEmail(val) {
	return '<a href="mailto:' + val + '">'+  val  +'</a>';
}

// Render Attachment f�r Grid
function render_attachment (val, x, store) {	
	return '<a href="../../'+store.data._id+'/'+val+'" title="'+val+'" target="_blank">'+val+'</a>';
}

function render_actions(val, x, store) {	

// Status
actionStatusText = switchStatusText(store.data.status);

var renderActionsText;


if (store.data.title !=='' && store.data.status !=='') {
	renderActionsText = actionStatusText + '<b>: ' + store.data.title + '</b>';
}else if (store.data.status == null) {
	renderActionsText = val.substring(0, 100) + '...';    
}
 else if (store.data.title =='' && store.data.status !=='') {
	renderActionsText = actionStatusText;    
} else if (store.data.title !=='' && val !=='') {

	var newValue = Ext.String.htmlEncode(val);	
	
	renderActionsText = '<b>'+store.data.title + ':</b> '+ newValue.substring(0, 100) + '...';
	
	
} else if (store.data.title !=='' && store.data.status == null) {
	renderActionsText = '<b>'+store.data.title + '</b> ';
} else if (val =='') {
	renderActionsText = '<b>'+store.data.title + '</b> ';
} else {
	renderActionsText = val.substring(0, 100) + '...';
}

// Aktion zur&uuml;ckgeben
return renderActionsText;
}


Ext.util.csttMD5 = function(s,raw,hexcase,chrsz) {
	raw = raw || false;	
	hexcase = hexcase || false;
	chrsz = chrsz || 8;

	function safe_add(x, y){
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
	function bit_rol(num, cnt){
		return (num << cnt) | (num >>> (32 - cnt));
	}
	function md5_cmn(q, a, b, x, s, t){
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t){
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t){
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t){
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t){
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	function core_md5(x, len){
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		var a =  1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d =  271733878;
		for(var i = 0; i < x.length; i += 16){
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
			d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
			b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
			d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
			c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
			d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
			d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
			a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
			d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
			c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
			b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
			d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
			c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
			d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
			c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
			a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
			d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
			c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
			b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
			a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
			d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
			b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
			d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
			c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
			d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
			a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
			d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
			b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
			a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
			d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
			c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
			d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
			d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
			a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
			d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
			b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return [a, b, c, d];
	}
	function str2binl(str){
		var bin = [];
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
		}
		return bin;
	}
	function binl2str(bin){
		var str = "";
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < bin.length * 32; i += chrsz) {
			str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
		}
		return str;
	}
	
	function binl2hex(binarray){
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) + hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
		}
		return str;
	}
	return (raw ? binl2str(core_md5(str2binl(s), s.length * chrsz)) : binl2hex(core_md5(str2binl(s), s.length * chrsz))	);
};
