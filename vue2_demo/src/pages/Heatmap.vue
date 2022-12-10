<!-- 热力图 -->
<template>
  <div class="heatmapArea" style="width: 100%; height: 100%">
    <div class="basic_img" ref="basic_img" style="background-color: red">
      // 热力图的底图，也是创建热力图的容器
      // 需要获取图片的尺寸，因此操作需要在图片加载完成之后执行，onload事件
      <img src="../assets/logo.png" @load="imgReady" />
    </div>
  </div>
</template>

<script>
// 引入heatmap.js
import Heatmap from "heatmap.js";
export default {
  name: "Heatmap",
  data() {
    return {
      // 比例关系，图片可能随着父容器尺寸自适应，因此坐标也需要按比例进行变化
      rate: 1,
      // 定义一些随机点，分别用xPoints和yPoints来表示这些随机点的x，y坐标
      xPoints: [100,103, 20, 30, 2, 80, 4, 10, 50, 100, 200, 180, 180, 420, 400],
      yPoints: [10,13, 10, 40, 12, 60, 24, 20, 30, 50, 150, 110, 0, 10, 20],
    };
  },
  components: {},
  mounted() {},
  methods: {
    // 底图load完成后开始加载热力图
    imgReady() {
      this.getSize();
    },
    // 获取原始图片大小
    getSize() {
      // 注意this的指向问题
      let _this = this;
      let rate;
      var img = new Image();
      // 热力图底图，根据其原始宽高和实际页面中的宽高来计算比例，使坐标按照比例变化
      img.src = require("../assets/logo.png");
      img.onload = () => {
        _this.rate = _this.$refs.basic_img.offsetWidth / img.width;
        // 底图load完成后开始加载热力图
        this.getChart();
      };
    },
    // 加载热力图
    getChart() {
      let heatmapInstance = Heatmap.create({
        // 指定绘制热力图的容器
        container: this.$refs.basic_img,
        gradient: {
          // 自定义渐变颜色
          ".5": "#efebd1",
          ".7": "#f5df53",
          ".95": "#cea519"
        },
        // 最大透明度
        maxOpacity: 0.9,
        // 最小透明度
        minOpacity: 0,
        // 半径
        radius: 30
      });
      // 构建数据点
      let points = [];
      let val = Math.floor(Math.random() * 100);
      for (let i = 0; i < this.xPoints.length; i++) {
        // 将x坐标和y坐标按比例转换后设置为点
        let point = {
          x: this.xPoints[i] * this.rate,
          y: this.yPoints[i] * this.rate,
          value: val
        };
        points.push(point);
      }
      let max = 0;
      let data = {
        max: max,
        data: points
      };
      // 设置数据
      heatmapInstance.setData(data);
    }
  }
};
</script>
