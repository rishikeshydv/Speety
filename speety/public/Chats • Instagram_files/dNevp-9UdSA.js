;/*FB_PKG_DELIM*/

__d("LSUpdateExistingMessageRange",[],(function(a,b,c,d,e,f){function a(){var a=arguments,b=a[a.length-1],c=[];return b.sequence([function(c){return b.filter(b.db.table(13).fetch([[[a[0]]]]),function(c){return b.i64.eq(c.threadKey,a[0])&&(a[2]?b.i64.eq(c.maxTimestampMs,a[1]):b.i64.eq(c.minTimestampMs,a[1]))}).next().then(function(c,d){var e=c.done;c=c.value;return e?0:(d=c.item,b.db.table(13).put({threadKey:d.threadKey,minTimestampMs:d.minTimestampMs,minMessageId:d.minMessageId,maxTimestampMs:d.maxTimestampMs,maxMessageId:d.maxMessageId,isLoadingBefore:!1,isLoadingAfter:!1,hasMoreBefore:a[2]&&!a[3]?d.hasMoreBefore:!1,hasMoreAfter:a[2]&&!a[3]?!1:d.hasMoreAfter}))})},function(a){return b.resolve(c)}])}e.exports=a}),null);