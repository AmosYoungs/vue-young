for(var CurrentLevel,logger=exports,exec=require("cordova/exec"),UseConsole=!1,UseLogger=!0,Queued=[],DeviceReady=!1,originalConsole=console,Levels=["LOG","ERROR","WARN","INFO","DEBUG"],LevelsMap={},i=0;i<Levels.length;i++){var level=Levels[i];LevelsMap[level]=i,logger[level]=level}function logWithArgs(e,o){o=[e].concat([].slice.call(o)),logger.logLevel.apply(logger,o)}function formatStringForMessage(e){return"string"===typeof e?"":"%o"}function __format(e,o){if(null===e||void 0===e)return[""];if(1===arguments.length)return[e.toString()];"string"!==typeof e&&(e=e.toString());var r=/(.*?)%(.)(.*)/,l=e,n=[];while(o.length){var g=r.exec(l);if(!g)break;var t=o.shift();l=g[3],n.push(g[1]),"%"!==g[2]?n.push(__formatted(t,g[2])):(n.push("%"),o.unshift(t))}n.push(l);var i=[].slice.call(o);return i.unshift(n.join("")),i}function __formatted(e,o){try{switch(o){case"j":case"o":return JSON.stringify(e);case"c":return""}}catch(r){return"error JSON.stringify()ing argument: "+r}return null===e||void 0===e?Object.prototype.toString.call(e):e.toString()}CurrentLevel=LevelsMap.WARN,logger.level=function(e){if(arguments.length){if(null===LevelsMap[e])throw new Error("invalid logging level: "+e);CurrentLevel=LevelsMap[e]}return Levels[CurrentLevel]},logger.useConsole=function(e){if(arguments.length&&(UseConsole=!!e),UseConsole){if("undefined"===typeof console)throw new Error("global console object is not defined");if("function"!==typeof console.log)throw new Error("global console object does not have a log function");if("function"===typeof console.useLogger&&console.useLogger())throw new Error("console and logger are too intertwingly")}return UseConsole},logger.useLogger=function(e){return arguments.length&&(UseLogger=!!e),UseLogger},logger.log=function(e){logWithArgs("LOG",arguments)},logger.error=function(e){logWithArgs("ERROR",arguments)},logger.warn=function(e){logWithArgs("WARN",arguments)},logger.info=function(e){logWithArgs("INFO",arguments)},logger.debug=function(e){logWithArgs("DEBUG",arguments)},logger.logLevel=function(e){var o=[].slice.call(arguments,1),r=formatStringForMessage(o[0]);r.length>0&&o.unshift(r);var l=logger.format.apply(logger.format,o);if(null===LevelsMap[e])throw new Error("invalid logging level: "+e);if(!(LevelsMap[e]>CurrentLevel))if(DeviceReady||UseConsole){if(UseLogger&&exec(null,null,"Console","logLevel",[e,l]),UseConsole){if(console.useLogger())throw new Error("console and logger are too intertwingly");switch(e){case logger.LOG:originalConsole.log(l);break;case logger.ERROR:originalConsole.log("ERROR: "+l);break;case logger.WARN:originalConsole.log("WARN: "+l);break;case logger.INFO:originalConsole.log("INFO: "+l);break;case logger.DEBUG:originalConsole.log("DEBUG: "+l);break}}}else Queued.push([e,l])},logger.format=function(e,o){return __format(arguments[0],[].slice.call(arguments,1)).join(" ")},logger.__onDeviceReady=function(){if(!DeviceReady){DeviceReady=!0;for(var e=0;e<Queued.length;e++){var o=Queued[e];logger.logLevel(o[0],o[1])}Queued=null}},document.addEventListener("deviceready",logger.__onDeviceReady,!1);