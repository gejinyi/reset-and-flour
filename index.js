const qiantu = {
    el: null,
    ol:null,
  bannerList: [],
  // oIndexList:[],
  curIndex: 0,
  bannerWidth: 0,
  timer: null,
    initData :function (){
        this.father = document.getElementsByClassName('father')[0];
        this.el = document.getElementsByClassName('pic')[0];
        this.ol = document.getElementsByClassName('f')[0];
        this.oBannerList = this.el.getElementsByClassName('list')[0];
        this.bannerLength = this.oBannerList.children.length;
        this.bannerWidth = this.oBannerList.children[0].offsetWidth;
        this.oIndexList = this.ol.getElementsByClassName('index'); 
        this.oActiveIndex = this.ol.getElementsByClassName('index active')[0];
    },
    init: function (){
      this.initData();
        this.handle();
        this.startMove();
    },
    handle: function () {
        this.handleBannerTranistion(); 
        this.handleIndexClick();
      },
        
    startMove () {
        
        this.timer = setTimeout(this.autoMove.bind(this), 1500)
        },

    autoMove: function () {
        var oBannerList = this.oBannerList;
        var bannerWidth = this.bannerWidth;
        this.curIndex ++;
        oBannerList.style.marginLeft = -bannerWidth * this.curIndex + 'px';
        this.changeIndex();
    },
    changeIndex: function () {
        var oIndexList = this.oIndexList;
        var oActiveIndex = this.oActiveIndex;
        var bannerLength = this.bannerLength;
        var curIndex = this.curIndex % (bannerLength - 1);
        oIndexList[curIndex].classList.add('active');
        oActiveIndex.classList.remove('active');
        this.oActiveIndex = oIndexList[curIndex];
    },
    handleBannerTranistion () {
        var self = this;
        var oBannerList = this.oBannerList;
        var bannerLength = this.bannerLength;
        oBannerList.addEventListener("transitionend", function () {
          if(self.curIndex === bannerLength - 1) {
            oBannerList.style.marginLeft = 0; 
            oBannerList.style.transition = 'none';  
            self.curIndex = 0;  
          }
    
          if(oBannerList.style.marginLeft === 0) {
            oBannerList.style.transition = 'all .2s';
          }
          self.startMove();
        });
      },
      handleIndexClick: function () {
        var self= this;
        var oIndexList = this.oIndexList;
        var indexLength = oIndexList.length;
        var oBannerList = this.oBannerList;
        var bannerWidth = this.bannerWidth;
    
        for(var i = 0; i < indexLength; i ++) {
          (function (i) {
            var oIndex = oIndexList[i]
    
            oIndex.onclick = function () {
              var isActive = oIndex.classList.contains('active'); 
              if( isActive ) { return };
              clearTimeout(self.timer);
              self.curIndex = i;  
              self.changeIndex(); 
              oBannerList.style.marginLeft = -i * bannerWidth + 'px'; 
            }
          })(i);
        };
    },
  }
