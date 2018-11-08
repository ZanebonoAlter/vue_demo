import $ from 'jquery'
import * as d3 from 'd3'
var force = d3.layout.force();//layout将json格式转化为力学图可用的格式
var width = $(window).width() -5,height = $(window).height() - 5;
var x = 0,y = 0,pieName = '',pieId = '',Data = '',arcs = '';
var z_url = "http://192.168.0.43:8286/judge/suspect/getSuspect"; // 调用接口
// 点击搜索
$("#search").on('click',function(){
	var dataId = $("#dataId").val();
	var dataName = $("#dataName").val();
	$('#infoBox').hide();
	if(dataId == '' && dataName == ''){
		errorInfo('未填写信息'); //错误提示
	}else{
		var data = {
			accountId:dataId,
			name: dataName
		}
		// 请求数据
    var url = z_url;
		$.ajax({
			type:"get",
			url:url,
		 	data:data,
			// async:false
		}).done(function(res){
      var resJson = JSON.parse(res);
      if(resJson.data.nodes == "" && resJson.data.links == ""){
        errorInfo('此信息不存在'); //错误提示
        return false;
      }
			x = 0;y = 0;pieName = '';pieId = '';Data = '';arcs = '';
		 	var dataset= resJson.data; // 获取的数据变量
		 	let nodes = dataset.nodes;
			let links = dataset.links;
			links = editLinks(nodes,links);
		 	drawing(nodes,links);
		})
	}
})

// 未填写信息 错误提示
function errorInfo(info){
	var error_w = ($(window).width() - 200)/2;
	var error_h = ($(window).height() - 100)/2;
	var error_html = '<div class="errorInfo" style="left:'+ error_w +'px;top:'+ error_h +'px">';
	error_html += '<h4>错误提示<img src="img/del.svg" alt="" class="hideInfo" onclick="removeError()"></h4>';
	error_html += '<p>'+ info +'</p>';
	error_html += '</div>';
	error_html += '<div class="bg"></div>'
	$("body").append(error_html);
}

// 移除错误信息
function removeError(){
	$("body").children(".errorInfo").remove();
	$("body").children(".bg").remove();
}

// 画图
function drawing(nodes,links){
	// var x = 0,y = 0,pieName = '',pieId = '',Data = '',arcs = '';
	$("body").children("svg").remove();
	force.nodes(nodes)
		.links(links)
		.size([width-20, height-20])//作用域的大小
		.linkDistance(180)//连接线长度
		.friction(0.7) //摩擦力
		.linkStrength(0.8)
		.charge(-1600) //顶点的电荷数。该参数决定是排斥还是吸引，数值越小越互相排斥
		.on("tick", tick) //指时间间隔，隔一段时间刷新一次画面
		.start(); //开始转换

	// 拖拽
	var drag = force.drag()
	    .on("dragstart", dragstart);

	var svg = d3.select("body").append("svg")
  	.attr("width", width)
  	.attr("height", height)
    .on('click',function(){
      arcs.style("opacity",0);
      $("#infoBox").hide();
    })

   //箭头
	var marker=svg.append("marker")
    .attr("id", "resolved")
    //.attr("markerUnits","strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
    .attr("markerUnits","userSpaceOnUse")
    .attr("viewBox", "0 -5 10 10")//坐标系的区域
    .attr("refX",38)//箭头坐标
    .attr("refY", 0)
    .attr("markerWidth", 10)//标识的大小
    .attr("markerHeight", 10)
    .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
    .attr("stroke-width",1)//箭头宽度
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")//箭头的路径
    .style("stroke","#696969");

  //设置连接线    
	var edges_line = svg.selectAll(".edgepath")
    .data(force.links())
    .enter()
    .append("path")
    .attr({
      'd': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
      'class':'edgepath',
      'id':function(d,i) {return 'edgepath'+i;}})
    // .style("stroke","#708090")
    .style("stroke","#696969")
    .style("pointer-events", "none")
    .style("stroke-width",1)//线条粗细
    .attr("marker-end", "url(#resolved)" );//根据箭头标记的id号标记箭头

  var edges_text = svg.append("g").selectAll(".edgelabel")
    .data(force.links())
    .enter()
    .append("text")
    .style("pointer-events", "none")
    //.attr("class","linetext")
    .attr({  'class':'edgelabel',
      'id':function(d,i){return 'edgepath'+i;},
      'dx':80,
      'dy':0
     });

  //设置线条上的文字
	edges_text.append('textPath')
		.attr('xlink:href',function(d,i) {
		  return '#edgepath'+i
		})
		.style("pointer-events", "none")
		// .style("fill","#708090")
		.style("fill","#696969")
		.text(function(d){
		  return d.rela;
		});

	//圆圈
	var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())//表示使用force.nodes数据
    .enter().append("circle")
    .style("fill","#6DCE9E")
    .style('stroke',"#60B58B")
    .attr("r", 30)//设置圆圈半径    
    .attr("id",function(d){
      return d.id
    })
    .on("click",function(d){
      $("#infoBox").show();
      var d_id = d.id,d_name = d.name;
      if(d.name == 'null' || d.name == ''){
        d_name = '无';
      }
      $(".infoId").html(d_id);
      $(".infoName").html(d_name);
      arcs.style("opacity",1).attr("transform","translate("+d.x+","+d.y+")")
      pieName = d.name;
      pieId = d.id;
      Data = d;
      var event = d3.event;
      event.stopPropagation();
    })
    .on("mouseover",function(node){
      // 鼠标移入效果
      edges_line.style("stroke-width",function(line){
        if(line.source.id==node.id || line.target.id==node.id){
          return 4;
        }else{
          return 0.5;
        }
      });
      circle.style("cursor","pointer")
    })
    .on("mouseout",function(node){
      // 鼠标移入效果
      edges_line.style("stroke-width",function(line){
        return 0.5;
      });
      circle.style("cursor","default")
    })
    .call(force.drag);//将当前选中的元素传到drag函数中，使顶点可以被拖动

  var text = svg.append("g").selectAll("text")
    .data(force.nodes())
    //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
    .enter()
    .append("text")
    .attr("dy", ".35em")  
    .attr("text-anchor", "middle")//在圆圈中加上数据  
    .style("fill","white")
    .style("font-weight","normal")
    .attr('x',function(d){

      var re_en = /[a-zA-Z]+/g;
        if(d.name == null || d.name == 'null' || d.name == 'unknown'){
          d3.select(this).append('tspan')
          .attr('x',0)
          .attr('y',2)
          .text(function(){return "未知"});
          return
        }
        //如果是全英文
        if(d.name.match(re_en)){
          // 英文字符串 中有空格
            if(d.name.indexOf(" ")>=0){
              var nameArr = d.name.split(" ");
              for(var i in nameArr){
                var k = i*12 - 10;
                switch(i){
                  case 0: 
                  k = -2;
                  break;
                }
                d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',k)
                .text(function(){return nameArr[i];});
              }
            }else{
              // 如果没有空格英文不换行
              d3.select(this).append('tspan')
              .attr('x',0)
              .attr('y',2)
              .text(function(){return d.name;});
            }
        }
        //如果小于4个字符，不换行
        else if(d.name.length<=4){
            d3.select(this).append('tspan')
            .attr('x',0)
            .attr('y',2)
            .text(function(){return d.name;});
        }else if(d.name.length>=8){//大于8个字符时，将9个字后的内容显示为。。。
            var top=d.name.substring(0,4);
            var bot=d.name.substring(4,8)+"...";

            d3.select(this).text(function(){return '';});
            d3.select(this).append('tspan')//前n个字
                .attr('x',0)
                .attr('y',-7)
                .text(function(){return top;});
 
            d3.select(this).append('tspan')//后n个字
                .attr('x',0)
                .attr('y',10)
                .text(function(){return bot;});
           
           }
        else {//4-8字符分两行显示
            var top=d.name.substring(0,4);
            var bot=d.name.substring(4,d.name.length);
 
            d3.select(this).text(function(){return '';});
 
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',-3)
                .text(function(){return top;});
 
            d3.select(this).append('tspan')
                .attr('x',0)
                .attr('y',10)
                .text(function(){return bot;});
        }

    });
 // 圆环
	var pieData=[["1",20,"img/1.png"],["2",20,"img/2.png"],["3",20,"img/3.png"]];
	//(1)转化数据为适合生成饼图的对象数组
	var pie=d3.layout.pie(pieData)
	        .sort(null)             //不排序，不写则会从大到小，顺时针排序。
	        .value(function(d){  return d[1]});     //设置value值为上面的2二维数组中的数字

	var h=90;
	var w=90;

	var outerRadius=w/1.6;//外半径

	//(7)圆环内半径
	var innerRadius=w/3;

	//(2)用svg的path绘制弧形的内置方法
	var arc=d3.svg.arc()//设置弧度的内外径，等待传入的数据生成弧度
	    .outerRadius(outerRadius)
	    .innerRadius(innerRadius);
	//(3)颜色函数
	var color=d3.scale.category10();//创建序数比例尺和包括10中颜色的输出范围
 
	//(4)准备分组,把每个分组移到图表中心
	var arcs=svg.append("g").selectAll("g.arc")
	    .data(pie(pieData))
	    .enter()
	    .append("g")
	    .attr("class","arc")
	    //移到图表中心
	    .attr("transform","translate("+100+","+200+")");//translate(a,b)a表示横坐标起点，b表示纵坐标起点

	//(5)为组中每个元素绘制弧形路路径
	arcs.append("path")//每个g元素都追加一个path元素用绑定到这个g的数据d生成路径信息
    .attr("fill",function(d,i){//填充颜色
        return color(i);
    })
    .attr("d",arc)  //将角度转为弧度（d3使用弧度绘制）
    .on("click",function(d){
      if(d.data[0] ==1){
        // 删除
        // 删除文本
        d3.selectAll("text").each(function(d,i){
          var temp = d.id;
          if(temp==pieId){
            d3.select(this).remove();
          }
        });
        // 删除圆
        d3.selectAll("circle").each(function(d,i){
          var temp = d.id;
          if(temp==pieId){
            d3.select(this).remove();
          }
        });
        // 删除连线
        d3.selectAll(".edgepath").each(function(e){
          if(e.source===Data||e.target===Data){
            d3.select(this).remove();
          }
        })
        pieName = '';pieId = '';Data = '';
        // 隐藏 圆环和节点信息弹窗
        arcs.style("opacity",0); 
        $("#infoBox").hide();
      }else if(d.data[0] == 2){
        // 添加
        add(nodes,links,pieId,pieName);
      }else if(d.data[0] == 3){
        // 取消圆环
        pieName = '';
        pieId = '';
        Data = '';
        arcs.style("opacity",0)
      }
      var event = d3.event;
      event.stopPropagation();
    })
    .on("mouseover",function(){
      arcs.style("cursor","pointer");
      // 滑入加粗
      edges_line.style("stroke-width",function(line){
        if(line.source.id==Data.id || line.target.id==Data.id){
          return 4;
        }else{
          return 1;
        }
      });
    })
    .on("mouseout",function(){
      // 鼠标移入效果
      edges_line.style("stroke-width",function(line){
        return 1;
      });
      arcs.style("cursor","default")
    });

    if(x == 0 && y == 0){
    	arcs.style("opacity",0)
    }
	arcs.append("image")
	  .attr("transform",function(d){
	    var tranX = arc.centroid(d)[0] - 8;
	    var tranY = arc.centroid(d)[1] - 8;
	      return "translate(" + tranX+","+ tranY + ")";
	  })
	  .attr("href",function(d){
	    return d.data[2];
	  })
	  .style("width",16);
	 


	// 拖拽
	function tick() {
		circle.attr("transform", function(d){
		  if(d.id == pieId && d.name == pieName){
		    x = d.x; y = d.y;
		    // arcs.attr("transform","translate(" + d.x + "," + d.y+ ")")
		  }

		  return "translate(" + d.x + "," + d.y + ")";
		});//圆圈
	  text.attr("transform", transform2);//顶点文字
	  edges_line.attr('d', function(d) { 
	    var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
	    return path;
	  });  
	  // if(flog){
	  // arcs.attr("transform","translate(" + x + "," + y+ ")")
	  arcs.attr("transform",function(){
	  	return "translate(" + x + "," + y+ ")";
	  })
	  // }
	  edges_text.attr('transform',function(d,i){
	    if (d.target.x<d.source.x){
	      bbox = this.getBBox();
	      rx = bbox.x+bbox.width/2;
	      ry = bbox.y+bbox.height/2;
	      return 'rotate(180 '+rx+' '+ry+')';
	    }
	    else {
	      return 'rotate(0)';
	    }
	  });
	}
}

// 处理d3 添加的数据
function editLinks(nodes,links){
	links.forEach(function(e){
	  let sourceNode = nodes.filter(function(n){
	    if((n.id !== undefined) && (n.id !== null) && (n.id !== '')){
	      return n.id === e.from;
	    }
	    else if((n.num !== undefined) && (n.num !== null) && (n.num !== '')){
	      return n.num === e.from;
	    }
	  })[0];
	  
	  let targetNode = nodes.filter(function(n){
	    if((n.id !== undefined) && (n.id !== null) && (n.id !== '')){
	      return n.id === e.to;
	    }
	    else if((n.num !== undefined) && (n.num !== null) && (n.num !== '')){
	      return n.num === e.to;
	    }
	  })[0];
	  
	  e.source = sourceNode;
	  e.target = targetNode;
	});
	return links
}


// 拖拽定点
function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
}

// text 文字
function transform2(d) {
  return "translate(" + (d.x) + "," + d.y + ")";
}

// 添加节点 点击 + 
function add(nodes,links,id,name){
  if(nodes == ''){
    return false;
  }
	var newLinks = links;
	var newArr = [];
  var getData = {
    accountId:id,
    name:name
  }

  var add_url = z_url; // 添加的路径
	$.get(add_url,getData,function(res){
    var resJson = JSON.parse(res).data;
    var newNodes = nodes;
    for(var i in resJson.nodes){
      var count = 0;
      $.each(newNodes,function(d,obj){
        if(obj.id==resJson.nodes[i].id){
          count ++;
        }
      });
      if(count == 0){
        nodes.push(resJson.nodes[i]);
      }
    }
    for(var j in resJson.links){
      newArr.push(resJson.links[j]);
    }
    newArr = editLinks(nodes,newArr)
    links = addLinks(newLinks,newArr);
    drawing(nodes,links);
  })

}



// 处理添加数据的函数
function addLinks(arr,newArr){
	for(var i in newArr){
		arr.push(newArr[i])
	}
	return arr
}
