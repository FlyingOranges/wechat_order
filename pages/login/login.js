// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'Leo,你的账本',
    passwordStr: 'xiaofeng',
    password: ''
  },

  /**
   * 点击确定按钮的时候执行
   */
  submitClick: function(e) {
    if (this.data.passwordStr != this.data.password) {
      wx.showToast({
        title: '密码不正确',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.reLaunch({
        url: '/pages/index/index',
      });
    }
  },

  getPassword:function(e){
    this.data.password = e.detail.value;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('说好的指纹呢？');
    this.fingerpriter(options);
  },

  fingerpriter(e) {
    var that = this;
    if (wx.canIUse("checkIsSupportSoterAuthentication")) {//判断此接口是否可用
      console.log(e)
      wx.checkIsSupportSoterAuthentication({
        success: function (res) {
          console.log('本机支持的 SOTER 生物认证', res);
          var keys = [];
          for (var key in res) {
            keys.push(res[key])
          }
          console.log(res)
          that.setData({
            print: keys//页面中输出支持情况
          })
          if (res.supportMode == "fingerPrint") {
            wx.startSoterAuthentication({
              requestAuthModes: ['fingerPrint'],
              challenge: '123456',
              authContent: "请用指纹解锁",
              success: function (res) {
                console.log('js', res);
                var result = JSON.parse(res.resultJSON);
                console.log(result);
                if (res.errCode == 0 && result.uid == '989d73a87dab437c6f744a94de58dad8'){
                  //指纹识别成功
                  wx.reLaunch({
                    url: '/pages/index/index',
                  });
                }
              },
              fail: function (res) {
                that.setData({
                  c: "用户取消了指纹识别，或调用出现错误"
                })
              }
            })
          } else {
            that.setData({
              b: "当前该设备不支持指纹识别"
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})