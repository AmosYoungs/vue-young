
<template>
  <div class="wrapper" ref="wrapper">
    <div class="refreshDiv" :style="{'min-height': minH + 'px'}">
      <div class="upTip flex flex-ac flex-jc" v-if="pullDownRefresh">
        <div class="flex flex-ac flex-jc" v-show="refreshStatusTag!=2">
          <span v-show="refreshStatusTag==0">下拉刷新</span>
          <span v-show="refreshStatusTag==1">释放刷新</span>
        </div>
        <div v-show="refreshStatusTag==2">
          <span>刷新中...</span>
        </div>
      </div>
      <slot></slot>
      <div v-if="pullUpLoad&&isLoad" class="downTip">
        <div class="flex flex-ac flex-jc">
          <span v-show="loadmoreDataTag==0">上拉获取下一页</span>
          <span v-show="loadmoreDataTag==1">加载中...</span>
          <span v-show="loadmoreDataTag==2">没有更多了</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: 'MyScroll',
  components: {},
  data() {
    return {
      minH: 0,
      refreshStatusTag: 0, // 下拉刷新状态
      loadmoreDataTag: 0, // 加载更多状态
      isLoad: false, // 列表是否已加载完成
      noDataTag: false
    };
  },
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    // 下拉刷新配置
    pullDownRefresh: {
      type: Boolean,
      default: false
    },
    // 上拉加载配置
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    // 美化滚动条
    scrollbar: {
      type: Boolean,
      default: true
    },
    scrollX: {
      type: Boolean,
      default: true
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    bounce: {
      type: Boolean,
      default: true
    },
    eventPassthrough: {
      type: String,
      default: ''
    },
    listenScrollPos: { // 监听滚动位置
      type: Boolean,
      default: false
    },
    click: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    refresh() {
      let _self = this;
      this.$nextTick(() => {
        _self.scroll.refresh();
      });
    },
    onScroll(pos) {
      if (this.listenScrollPos) {
        this.$emit('onScrollPos', pos);
      }
      if (!this.pullDownRefresh) {
        return;
      }
      if (this.refreshStatusTag === 2) {
        return;
      }
      if (pos.y > 60) {
        this.refreshStatusTag = 1;
      } else {
        this.refreshStatusTag = 0;
      }
    },
    onPullingDown() {
      console.log('下拉刷新');
      this.refreshStatusTag = 2;
      this.$emit('refresh');
    },
    isRefreshData() {
      return this.refreshStatusTag === 2;
    },
    isLoadMoreData() {
      return this.loadmoreDataTag === 1;
    },
    scrollTo(x, y, time, easing) {
      if (this.scroll) {
        this.scroll.scrollTo(x, y, time, easing);
      }
    },
    downEnd() {
      let _self = this;
      this.scroll.finishPullDown();
      setTimeout(() => {
        _self.scroll.refresh();
      });
    },
    downRefresh(len) {
      this.scroll.scrollTo(0, 0, 0);
      this.refreshStatusTag = 0;
      if (typeof len === 'undefined') {
        this.loadmoreDataTag = 0;
        return;
      }
      if (len === 0) {
        this.noDataTag = true;
        this.loadmoreDataTag = 0;
      } else if (len < this.pageSize) {
        this.loadmoreDataTag = 2;
        this.noDataTag = false;
      } else {
        this.loadmoreDataTag = 0;
        this.noDataTag = false;
      }
      this.downEnd();
    },
    onPullingUp() {
      let _self = this;
      if (_self.loadmoreDataTag === 2) {
        _self.upEnd();
        return;
      }
      _self.isLoad = true;
      _self.loadmoreDataTag = 1;
      _self.$emit('getNextPage');
    },

    upEnd() {
      this.loadmoreDataTag = 0;
      this.scroll.finishPullUp();
      this.refresh();
    },
    upRefresh(len) {
      let _self = this;
      if (_self.pageSize > len) {
        _self.loadmoreDataTag = 2;
      } else {
        _self.loadmoreDataTag = 0;
      }
      _self.upEnd();
    },
    refreshStatus(len) {
      let _self = this;
      _self.isLoad = true;
      if (_self.isRefreshData()) {
        _self.refreshStatusTag = 0;
        _self.downRefresh(len);
      }
      if (_self.isLoadMoreData()) {
        _self.upRefresh(len);
      }
    },
    initScroll() {
      let _self = this;
      _self.$nextTick(() => {
        if (!this.scroll) {
          let pullDownRefresh = _self.pullDownRefresh ? {
            threshold: 60,
            stop: 50
          } : false;
          let pullUpLoad = _self.pullUpLoad ? {
            threshold: 60
          } : false;

          let opt = {
            click: _self.click,
            pullDownRefresh,
            pullUpLoad,
            scrollX: _self.scrollX,
            scrollY: _self.scrollY,
            scrollbar: _self.scrollbar,
            bounce: _self.bounce,
            probeType: 3
          };
          if (this.zoom) {
            let zoom = {
              start: 1,
              min: 1,
              max: 1
            };
            this.commonUtil.extend(this.zoom, zoom);
            opt.zoom = zoom;
          }
          this.scroll = new BScroll(this.$refs.wrapper, opt);
          this.scroll.on('scroll', this.onScroll);
          _self.pullDownRefresh&&this.scroll.on('pullingDown', this.onPullingDown);
          _self.pullUpLoad&&this.scroll.on('pullingUp', this.onPullingUp);
          setTimeout(function() {
            console.log(_self.pullDownRefresh);
            if (_self.pullDownRefresh) {
              _self.minH = _self.$refs.wrapper.offsetHeight + 50;
            }
            _self.scroll.refresh();
          }, 200);
        }
      });
    }
  },
  mounted() {
    this.initScroll();
  }
};
</script>
<style lang='less' scoped>
.wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  .refreshDiv {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    .upTip {
      //   z-index: 1;
      width: 100%;
      position: absolute;
      top: -2.2rem;
      height: 2.2rem;
      text-align: center;
      color: #333;
      background: #e6e6e6;
    }
  }
}
</style>