var logger=require("cordova/plugin/ios/logger"),console=module.exports,WinConsole=window.console,UseLogger=!1,Timers={};function noop(){}function wrappedOrigCall(o,e){return function(){var l=[].slice.call(arguments);try{o.apply(WinConsole,l)}catch(n){}try{e.apply(console,l)}catch(n){}}}for(var key in console.useLogger=function(o){if(arguments.length&&(UseLogger=!!o),UseLogger&&logger.useConsole())throw new Error("console and logger are too intertwingly");return UseLogger},console.log=function(){logger.useConsole()||logger.log.apply(logger,[].slice.call(arguments))},console.error=function(){logger.useConsole()||logger.error.apply(logger,[].slice.call(arguments))},console.warn=function(){logger.useConsole()||logger.warn.apply(logger,[].slice.call(arguments))},console.info=function(){logger.useConsole()||logger.info.apply(logger,[].slice.call(arguments))},console.debug=function(){logger.useConsole()||logger.debug.apply(logger,[].slice.call(arguments))},console.assert=function(o){if(!o){var e=logger.format.apply(logger.format,[].slice.call(arguments,1));console.log("ASSERT: "+e)}},console.clear=function(){},console.dir=function(o){console.log("%o",o)},console.dirxml=function(o){console.log(o.innerHTML)},console.trace=noop,console.group=console.log,console.groupCollapsed=console.log,console.groupEnd=noop,console.time=function(o){Timers[o]=(new Date).valueOf()},console.timeEnd=function(o){var e=Timers[o];if(e){var l=(new Date).valueOf()-e;console.log(o+": "+l+"ms")}else console.warn("unknown timer: "+o)},console.timeStamp=noop,console.profile=noop,console.profileEnd=noop,console.count=noop,console.exception=console.log,console.table=function(o,e){console.log("%o",o)},console)"function"===typeof WinConsole[key]&&(console[key]=wrappedOrigCall(WinConsole[key],console[key]));