var now = new Date(); 				//当前日期  
var nowDay = now.getDate(); 		//当前日 
var nowMonth = now.getMonth(); 		//当前月 
var nowYear = now.getYear(); 		//当前年 
nowYear += (nowYear < 2000) ? 1900 : 0; 

//获得今日
export function getNowDate(){
	return formatDate(new Date()); 
}
//获得近几日（包括上月末日期）
export function getCurrentDate(num){
	var day = new Date();
	day.setTime(day.getTime()-24*num*60*60*1000);
	var currentDate = new Date(day);
	return formatDate(currentDate); 
}

//格式化日期
function formatDate(date) { 
	var myyear = date.getFullYear(); 
	var mymonth = date.getMonth()+1; 
	var myweekday = date.getDate(); 
	if(mymonth < 10){ 
		mymonth = "0" + mymonth; 
	} 
	if(myweekday < 10){ 
		myweekday = "0" + myweekday; 
	}
	return (myyear+"-"+mymonth + "-" + myweekday);
}