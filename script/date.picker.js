/**
 * 日期选择控件
 * varstion 1.0.0
 * by lsk
 * 
 * 	var domElPicker = null;
	$('#domEl').on('click',function(){
		if(domElPicker == null){
			domElPicker = new DatePicker();
		}
		domElPicker.show({
			frameBounces:true,//如果frame有bounces的话需要传值
			type: 'datetime'// 如：'yearmonth','date','datetime','time'
		},function(ret){
			$('#domEl').val(ret.year+'-'+ret.month+'-'+ret.day+' '+ret.hour+':'+ret.min+':00');
		});
	});
 */
(function( window, undefined ) {
	var DatePicker = function() {
    };
    DatePicker.prototype = {
    	create: function(params,callback){
    		var self = this;
			if(typeof(api) != 'undefined' && typeof(api) == 'object' && params.frameBounces){
                api.setFrameAttr({
                    bounces:false
                });
            }
			self.curDate = new Date();
			self.curYear = self.curDate.getFullYear();
			self.curMonth = self.curDate.getMonth()+1;
			self.curDay = self.curDate.getDate();
			self.curHour = self.curDate.getHours();
			self.curMin = self.curDate.getMinutes();
			if(!params.beginYear){
				params.beginYear = self.curDate.getFullYear()-10;
			}
			if(!params.endYear){
				params.endYear = self.curDate.getFullYear()+10;
			}
			var data1=[],data2=[],data3=[],data4=[],data5=[];
			var index1 = 0,index2 = 0,index3 = 0,index4 = 0,index5 = 0;
			for(var i=0;i<(params.endYear-params.beginYear);i++){
				data1.push({text:(params.beginYear+i)+'年',value:(params.beginYear+i)});
				if(self.curDate.getFullYear()==(params.beginYear+i)){
					index1 = i;
				}
			}
			for(var i=0;i<12;i++){
				var v = i+1;
				data2.push({text:(v<10?'0'+v:v)+'月',value:v<10?'0'+v:v});
				if(self.curDate.getMonth()+1==v){
					index2 = i;
				}
			}
			self.maxDate = self.getDaysInOneMonth(self.curDate.getFullYear(),self.curDate.getMonth());
			for(var i=0;i<self.maxDate;i++){
				var v = i+1;
				data3.push({text:(v<10?'0'+v:v)+'日',value:v<10?'0'+v:v});
				if(self.curDate.getDate()==v){
					index3 = i;
				}
			}
			for(var i=0;i<24;i++){
				data4.push({text:(i<10?'0'+i:i)+'点',value:i<10?'0'+i:i});
				if(self.curDate.getHours()==i){
					index4 = i;
				}
			}
			for(var i=0;i<60;i++){
				data5.push({text:(i<10?'0'+i:i)+'分',value:i<10?'0'+i:i});
				if(self.curDate.getMinutes()==i){
					index5 = i;
				}
			}
			
			if(params.type=='yearmonth'){
				if(self.yearmpicker==null||self.yearmpicker==undefined){
					self.yearmpicker = new Picker({
						data: [data1,data2],
						selectedIndex: [index1,index2],
						title: '选择年月'
					});
					self.yearmpicker.on('picker.change',function(index, selectedIndex){
						if(index===0){
							self.curYear = data1[selectedIndex].value;
						}
						if(index===1){
							self.curMonth = data2[selectedIndex].value;
						}
					});
					self.yearmpicker.on('picker.select', function (e, selectedVal, selectedIndex) {
						var vals = (selectedVal+'').split(',');
						if(callback){
		                    callback({
		                        year: data1[vals[0]].value,
		                        month: data2[vals[1]].value
		                    });
		                };
						if(typeof(api) != 'undefined' && typeof(api) == 'object' && params.frameBounces){
			                api.setFrameAttr({
			                    bounces:true
			                });
			            }
					});
					
					self.yearmpicker.on('picker.cancel',function(){
						if(typeof(api) != 'undefined' && typeof(api) == 'object' && params.frameBounces){
			                api.setFrameAttr({
			                    bounces:true
			                });
			            }
					});
				}
			}
    		if(params.type=='date'){
    			if(self.datepicker==null||self.datepicker==undefined){
	    			self.datepicker = new Picker({
						data: [data1,data2,data3],
						selectedIndex: [index1,index2,index3],
						title: '选择日期'
					});
					self.datepicker.on('picker.change',function(index, selectedIndex){
						if(index===0){
							self.curYear = data1[selectedIndex].value;
						}
						if(index===1){
							self.curMonth = data2[selectedIndex].value;
							data3 = [];
							self.maxDate = self.getDaysInOneMonth(self.curYear,self.curMonth);
							for(var i=0;i<self.maxDate;i++){
								var v = i+1;
								data3.push({text:v+'日',value:v<10?'0'+v:v});
							}
							self.datepicker.refillColumn(2,data3);
						}
						if(index===2){
							self.curDay = data3[selectedIndex].value;
						}
					});
					self.datepicker.on('picker.select', function (e, selectedVal, selectedIndex) {
						var vals = (selectedVal+'').split(',');
						if(callback){
		                    callback({
		                        year: data1[vals[0]].value,
		                        month: data2[vals[1]].value,
		                        day: data3[vals[2]].value
		                    });
		                };
						if(typeof(api) != 'undefined' && typeof(api) == 'object' && params.frameBounces){
			                api.setFrameAttr({
			                    bounces:true
			                });
			            }
					});
					self.datepicker.on('picker.cancel',function(){
						if(typeof(api) != 'undefined' && typeof(api) == 'object' && params.frameBounces){
			                api.setFrameAttr({
			                    bounces:true
			                });
			            }
					});
				}
    		}
    		if(params.type=='datetime'){
    			if(self.datetimepicker==null||self.datetimepicker==undefined){
	    			self.datetimepicker = new Picker({
						data: [data1,data2,data3,data4,data5],
						selectedIndex: [index1,index2,index3,index4,index5],
						title: '选择日期时间'
					});
					self.datetimepicker.on('picker.change',function(index, selectedIndex){
						if(index===0){
							self.curYear = data1[selectedIndex].value;
						}
						if(index===1){
							self.curMonth = data2[selectedIndex].value;
							data3 = [];
							self.maxDate = self.getDaysInOneMonth(self.curYear,self.curMonth);
							for(var i=0;i<self.maxDate;i++){
								var v = i+1;
								data3.push({text:v+'日',value:v<10?'0'+v:v});
							}
							self.datetimepicker.refillColumn(2,data3);
						}
						if(index===2){
							self.curDay = data3[selectedIndex].value;
						}
						if(index===3){
							self.curHour = data4[selectedIndex].value;
						}
						if(index===4){
							self.curMin = data5[selectedIndex].value;
						}
					});
					self.datetimepicker.on('picker.select', function (e, selectedVal, selectedIndex) {
						var vals = (selectedVal+'').split(',');
						if(callback){
		                    callback({
		                        year: data1[vals[0]].value,
		                        month: data2[vals[1]].value,
		                        day: data3[vals[2]].value,
		                        hour: data4[vals[3]].value,
		                        min: data5[vals[4]].value
		                    });
		                };
						if(typeof(api) != 'undefined' && typeof(api) == 'object' && params.frameBounces){
			                api.setFrameAttr({
			                    bounces:true
			                });
			            }
					});
					self.datetimepicker.on('picker.cancel',function(){
						if(typeof(api) != 'undefined' && typeof(api) == 'object' && params.frameBounces){
			                api.setFrameAttr({
			                    bounces:true
			                });
			            }
					});
				}
    		}
    		if(params.type=='time'){
    			if(self.timepicker==null||self.timepicker==undefined){
	    			self.timepicker = new Picker({
						data: [data4,data5],
						selectedIndex: [index4,index5],
						title: '选择时间'
					});
					self.timepicker.on('picker.change',function(index, selectedIndex){
						if(index===0){
							self.curHour = data4[selectIndex].value;
						}
						if(index===1){
							self.curMin = data5[selectIndex].value;	
						}
					});
					self.timepicker.on('picker.select', function (e, selectedVal, selectedIndex) {
						var vals = (selectedVal+'').split(',');
						if(callback){
		                    callback({
		                        hour: data4[vals[0]].value,
		                        min: data5[vals[1]].value
		                    });
		                };
						if(typeof(api) != 'undefined' && typeof(api) == 'object' && params.frameBounces){
			                api.setFrameAttr({
			                    bounces:true
			                });
			            }
					});
					self.timepicker.on('picker.cancel',function(){
						if(typeof(api) != 'undefined' && typeof(api) == 'object' && params.frameBounces){
			                api.setFrameAttr({
			                    bounces:true
			                });
			            }
					});
				}
    		}
    		
    	},
    	show: function(params,callback){
    		var self = this;
    		self.create(params,callback);
    		if(params.type=='yearmonth'){
    			self.yearmpicker.show();
    		}
    		if(params.type=='date'){
    			self.datepicker.show();
    		}
    		if(params.type=='time'){
    			self.timepicker.show();
    		}
    		if(params.type=='datetime'){
    			self.datetimepicker.show();
    		}
    	},
    	getDaysInOneMonth: function(year, month){  
		  	month = parseInt(month, 10);  
		  	var d= new Date(year, month, 0);  
		  	return d.getDate(); 
	  	}
    };
    window.DatePicker = DatePicker;
})(window);