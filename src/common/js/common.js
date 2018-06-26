import { Loading } from 'element-ui';
import { Notification } from 'element-ui';
export function randomWord(randomFlag, min, max) {
	let str = "",
		pos = '',
		range = min,
		arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	// 随机产生
	if(randomFlag) {
		range = Math.round(Math.random() * (max - min)) + min;
	}
	for(var i = 0; i < range; i++) {
		pos = Math.round(Math.random() * (arr.length - 1));
		str += arr[pos];
	}
	return str;
}
export function getDate(tm) {

	var timestamp = Date.parse(new Date(tm));
	return timestamp = timestamp / 1000;

}

export function handle(e) {
	var file = e.target.files[0];
	browserMD5File(file, function(err, md5) {
		console.log(md5); // 97027eb624f85892c69c4bcec8ab0f11
	});
}

export function showLoading(targetName) {
	var targetName = targetName ? targetName : '.el-main';
	const loading = Loading.service({
		lock: true,
		text: 'Loading',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)',
		target: targetName
	});
	return loading;
}

export function showNotification(type, message) {
	let title = '';
	switch(type) {
		case 'success':
			title = '成功';
			break;
		case 'warning':
			title = '警告';
			break;
		case 'info':
			title = '消息';
			break;
		case 'error':
			title = '错误';
			break;
	}
	Notification({
		title: title,
		message: message,
		type: type
	})
}


export function formatDate(date,fmt){
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth()+1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for(let k in o){    
        let str = o[k]+'';
        if(new RegExp(`(${k})`).test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1)?str:padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str){
    return ('00'+str).substr(str.length);
}