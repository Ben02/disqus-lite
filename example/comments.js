// jQuery 加载评论框 by Ben 2017.8

var disqusLite = {
    // 自建服务器地址，get 的地址和 nginx 配置一致，post 是放 index.php 的地方
    server: {
      get: 'https://d.benwong.cn/get',
      post: 'https://d.benwong.cn/post/index.php'
    },

    // 开始加载评论框
    load: function() {
      // moment.js 国际化配置
      moment.locale("zh-cn");
      // 自动获取 Disqus 的配置
      var listUrl = disqusLite.server.get + '/threads/listPosts.json?thread:ident=' + disqus_identifier + '&forum=' + disqus_shortname + '&order=asc';
      // 首次加载评论
      $.ajax({
          url: listUrl,
          dataType: 'jsonp',
          jsonp: "callback"
        })
        .done(function(res) {
          if (res.code == 0) {
            disqusLite.showList(res) //成功则加载整个评论框
            if (res.cursor.hasNext) {
              disqusLite.getNext(res.cursor.next); //若有翻页内容则继续加载
            }
          } else {
            disqusLite.showError(res.response);
          }
        })
        .fail(function(res) {
          disqusLite.showError(res);
        });
      disqus_lite_run_count++;
    },

    //整个评论框的架构
    showList: function(data) {
      //评论数
      var numUrl = disqusLite.server.get + '/threads/details.json?thread:ident=' + disqus_identifier + '&forum=' + disqus_shortname + '';
      $.ajax({
          url: numUrl,
          dataType: 'jsonp',
          jsonp: "callback"
        })
        .done(function(res) {
          if (res.code == 0) {
            $(".comment_num").append(res.response.posts + '条评论');
            $("#comment_title").append('<a onclick="window.open(\'' + disqusLite.server.post + '?type=0&thread=' + res.response.id + '\',\'\',\'channelmode=yes,scrollbars=no,width=380,height=450,left=60,top=150\')" class="comment_create">写评论</a>');
            $("#comment_title").append('<a class="comment_change" onclick="disqusLite.showDisqus()" title="请确认海外网络连接通畅后切换">切换完整版</a>');
          } else {
            disqusLite.showError(res.response);
          }
        })
        .fail(function(res) {
          disqusLite.showError(res);
        });

      $(".comment_loading").hide();
      $("#disqus_lite").append('<div id="comment_title"><a class="comment_num"></a></div>');
      $("#disqus_lite").append('<div id="comment_body" class="animated fadeInDown"></div>');

      //显示评论主体
      disqusLite.showPosts(data);
    },

    //加载翻页内容
    getNext: function(cursor) {
      var listUrl = disqusLite.server.get + '/threads/listPosts.json?thread:ident=' + disqus_identifier + '&forum=' + disqus_shortname + '&order=asc&cursor=' + cursor;

      $.ajax({
          url: listUrl,
          dataType: 'jsonp',
          jsonp: "callback"
        })
        .done(function(res) {
          if (res.code == 0) {
            disqusLite.showPosts(res) //成功则把翻页内容接到评论框里
            if (res.cursor.hasNext) {
              disqusLite.getNext(res.cursor.next); //还能翻页就继续
            }
          } else {
            disqusLite.showError(res.response);
          }

        })
        .fail(function(res) {
          disqusLite.showError(res);
        });
    },

    //显示评论主体
    showPosts: function(data) {
      //console.log(data);
      data.response.forEach(function(c) {
        disqusLite.insertPost(c);
      })
    },

    //单条评论的插入
    insertPost: function(c) {
      var author_name = '';
      if (c.author.url == '') {
        author_name = c.author.name;
      } else {
        author_name = '<a href="' + c.author.url + '">' + c.author.name + '</a>';
      }
      //回复的链接
      var replyLink = '<a onclick="window.open(\'' + disqusLite.server.post + '?type=1&thread=' + c.thread + '&parent=' + c.id + '\',\'\',\'channelmode=yes,scrollbars=no,width=380,height=450,left=60,top=150\')" class="comment_reply">回复</a>';
      //每条评论的模板
      var comment_post = '<div class="comment_wrapper"><img class="comment_avatar" src="' + c.author.avatar.large.cache + '"><div class="comment_desc"><p class="author_name">' + author_name + '</p><a href="#comment-' + c.id + '" class="comment_time">' + moment(c.createdAt + '+00:00').fromNow() + '</a>' + replyLink + '</div><div class="comment_message">' + c.message + '</div></div>';
      //插入嵌套
      if (!c.parent) {
        $("#comment_body").prepend('<div class="comment_post" id="comment-' + c.id + '">' + comment_post + '</div>');
      } else {
        $("#comment-" + c.parent).append('<div class="comment_post comment_children" id="comment-' + c.id + '">' + comment_post + '</div>');
      }
    },

    //切换到原版
    showDisqus: function() {
      $("#disqus_lite").hide();
      $("#disqus_thread").show();
      disqus.load();
    },

    //错误处理
    showError: function(err) {
      $("#disqus_lite").prepend('<p>出错了，请尝试刷新页面或报告博主！（错误信息：' + err + '）</p>');
    }
  }
  
  //异步加载 moment.js
  var mmt = document.createElement('script');
  mmt.type = 'text/javascript';
  mmt.async = true;
  mmt.src = '/js/moment.js';
  mmt.onload = function() {
    if (disqus_lite_run_count == 0) {
      disqusLite.load();
    }
  };
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(mmt);
