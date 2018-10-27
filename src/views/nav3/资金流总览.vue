<template>
	<section>
		<el-row>
			<el-input
					type="textarea"
					:rows="2"
					placeholder="请输入筛选内容,空格分隔"
					v-model="textarea">
			</el-input>
			<template>
				<el-checkbox-group
						v-model="checkedList"
						>
					<el-checkbox v-for="object in checkList" :label="object.pName" :key="object.pId">{{object.pName}}</el-checkbox>
				</el-checkbox-group>
			</template>
			<el-button type="primary" @click="init">确认筛选</el-button>
		</el-row>
		<div id="container" style="height: 960px;width: 100%"></div>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import * as getData from '../../api/api';

	export default {
		data() {
			return {
                option : {
                    title: {
                        text: '资金流总览',
                        subtext: 'Circular layout',
                        top: 'bottom',
                        left: 'right'
                    },
                    tooltip: {},
                    legend: [{
                        // selectedMode: 'single',
                        data: [{name:'重点人员'},{name:'嫌疑人'},{name:'非嫌疑人'}]
                    }],
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series : [
						{
                            tooltip: {},
                            name: 'Person',
                            type: 'graph',
                            layout: 'circular',
                            circular: {
                                rotateLabel: true
                            },
                            focusNodeAdjacency: true,
                            data: [{
                                name: '郭燕',
                                value: 0,
                                symbolSize: 100,
								category:0,
                                label: {
                                    normal: {
                                        show:true,
                                        position: ['50%', '50%'],
                                        formatter: '郭燕',
										fontSize:20
                                    }
                                },
								tooltip:{
                                        trigger:'item',
                                        textStyle:{
                                            align:'left'
                                        },
                                        formatter:'姓名:郭燕\n支付宝：549455722@qq.com\n支付宝ID:2088902744752620',
                                    	extraCssText:' white-space:pre-wrap'
								},
                            },{
                                name: '郑宇',
                                value: 0,
                                symbolSize: 30,
                                category:0,
								label: {
                                    normal: {
                                        show:true,
                                        position: 'top',
                                        formatter: '郑宇'
                                    }
                                },
                                tooltip:{
                                    trigger:'item',
                                    textStyle:{
                                        align:'left'
                                    },
                                    formatter:'姓名:郑宇\n支付宝：549455722@qq.com\n支付宝ID:2088902744752620',
                                    extraCssText:' white-space:pre-wrap'
                                },
                            },{
                                name: '潘文水',
                                value: 0,
                                symbolSize: 100,
                                category:2,
                                label: {
                                    normal: {
                                        show:true,
                                        position: 'top',
                                        formatter: '潘文水'
                                    }
                                },
                                tooltip:{
                                    trigger:'item',
                                    textStyle:{
                                        align:'left'
                                    },
                                    formatter:'姓名:潘文水\n支付宝：549455722@qq.com\n支付宝ID:2088902744752620',
                                    extraCssText:' white-space:pre-wrap'
                                },
                            }],
                            links: [{
                                source: "郑宇",
                                target: "郑宇",
                                label: {                // 关系对象上的标签
                                    normal: {
                                        show: true,                 // 是否显示标签
                                        position: "middle",         // 标签位置:'top''left''right''bottom''inside''insideLeft''insideRight''insideTop''insideBottom''insideTopLeft''insideBottomLeft''insideTopRight''insideBottomRight'
                                        textStyle: {                // 文本样式
                                            fontSize: 16
                                        },
                                        formatter:"100",
                                    }
                                },
                                symbol:['circle','arrow'],
                            },{
                                source: "潘文水",
                                target: "郑宇",
                                label: {                // 关系对象上的标签
                                    normal: {
                                        show: true,                 // 是否显示标签
                                        position: "middle",         // 标签位置:'top''left''right''bottom''inside''insideLeft''insideRight''insideTop''insideBottom''insideTopLeft''insideBottomLeft''insideTopRight''insideBottomRight'
                                        textStyle: {                // 文本样式
                                            fontSize: 16
                                        },
                                        formatter:"500",
                                    }
                                },
								lineStyle:{
									normal:{
                                        width:5,
									}
								},
                                symbol:['circle','arrow'],
                            },{
                                source: "郭燕",
                                target: "郑宇",
                                label: {                // 关系对象上的标签
                                    normal: {
                                        show: true,                 // 是否显示标签
                                        position: "middle",         // 标签位置:'top''left''right''bottom''inside''insideLeft''insideRight''insideTop''insideBottom''insideTopLeft''insideBottomLeft''insideTopRight''insideBottomRight'
                                        textStyle: {                // 文本样式
                                            fontSize: 16
                                        },
                                        formatter:"100",
                                    }
                                },
                                symbol:['circle','arrow'],
                            }],
                            categories: [{
                                "name": "重点人员",//关系网名称
                            }
                                ,{
                                    "name": "嫌疑人",//关系网名称
                                }
                                ,{
                                    "name": "非嫌疑人",//关系网名称
                                }
                            ],
                            roam: true,
//                            label: {
//                                normal: {
//                                    position: 'right',
//                                    formatter: '{b}'
//                                }
//                            },
                            lineStyle: {
                                normal: {
                                    color: 'source',
                                    curveness: 0.3
                                }
                            }
                        }
                    ]
                },
                textarea:'',
				checkList:[],
				checkedList:[],
                isIndeterminate: true,
                checkAll: false,
			}
		},
        mounted() {
		    this.init_list();
//			getData.bannerList().then(res => { //测试外部接口（环鹏）
//
//			})
        },
		methods: {
		    test(){
		      	console.log(this.checkList)
				console.log(this.checkedList)
			},
		    init(){
                var echarts = require('echarts');
                var dom = document.getElementById("container");
                var myChart = echarts.init(dom);
                var option=null;
                myChart.showLoading();
                var params = this.textarea.split(" ");
                params.push(this.checkedList)
				console.log(params);
                getData.graph_Info(params).then(res=>{
                    this.option.series[0].data=res.data.data;
                    this.option.series[0].links=res.data.links;
                    console.log(this.option)
                    myChart.setOption(this.option, true);
                    myChart.hideLoading();
                    myChart.on('click', function (params) {
                        console.log(params)
                        //window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.data.label.normal.formatter));
                        if(params.dataType=="node"){
                            window.location='#/personDetail?type=node&name='+params.name;
//                            this.$router.push({path:'/personDetail',query:{type:"node",name:params.name}})
						}else if(params.dataType=="edge"){
                            window.location='#/peopleDetail?type=edge&name1='+params.data.source+'&name2='+params.data.target;
//                            this.$router.push({path:'/personDetail',query:{type:"edge",name1:params.data.source,name2:params.data.target}})
						}
                    })
				})

			},
			init_list(){
                getData.person_keyPerson().then(res=>{
                    this.checkList = res.data.list;
                    for(var i=0;i<this.checkList.length;i++){
                        this.checkedList[i]=this.checkList[i].pName;
					}
                })
			},
		},
	}

</script>

<style scoped>

</style>