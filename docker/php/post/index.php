<?php
/*
type 是评论的类型，0 为撰写新评论，1 为回复评论
 thread 是文章的 id，会自动传过来的
 parent 是父评论的 id，会自动传过来
 */
?>
<!-- Page From https://imququ.com/ -->
<!Doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta content="width=device-width,minimum-scale=1.0" name="viewport">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="referrer" content="always">
<meta name="robots" content="noindex, nofollow, noarchive">
<title><?php
if ($_GET["type"]=="0"){
echo " 撰写新评论 ";
}else{
  echo " 回复评论 ";
}
 ?>
 - Ben Wong</title>
<style type="text/css">
*{margin:0;padding:0}html,body{height:100%}body{background:#fff;color:#2a2e2e;font-size:15px;font-family:"Helvetica Neue",arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}::selection,::-moz-selection,::-webkit-selection{background-color:#2479CC;color:#eee}h3{font-size:1.3em;line-height:1.5;margin:15px 30px;text-align:center}a{color:#2479CC;text-decoration:none}.card{margin:15px 25px;text-align:left}.submit input,.submit textarea{-webkit-appearance:none;border:1px solid #bbb;border-radius:1px;font-size:15px;height:20px;line-height:20px;margin-left:10px;padding:6px 8px}.submit span{position:relative;top:8px}.submit li{display:-webkit-box;display:-ms-flexbox;display:flex;margin:15px 0}.submit textarea{height:130px}.submit .line{-webkit-box-flex:1;display:block;-ms-flex:1;flex:1}.submit .btn-submit{-webkit-appearance:none;background:#12b0e6;border:none;border-radius:0;box-shadow:inset 0 -5px 20px rgba(0,0,0,.1);color:#fff;cursor:pointer;display:block;font-size:14px;line-height:1;padding:0.625em .5em;width:100%}.submit li.tips{color:#999;font-size:14px}
</style>
</head>
<body>
<header>
<!--<h3> 发表评论 </h3>-->
</header>
<div class="bd">
  <div class="card submit">
    <form onsubmit="return false" id="create-post">
      <ul>
        <li><span> 昵称：</span><input class="line" name="author_name" required placeholder=" 昵称会被公开显示 ">
        <li><span> 邮箱：</span><input class="line" name="author_email" type="email" required placeholder=" 邮箱不会公开显示 ">
        <li><span> 网址：</span><input class="line" name="author_url" type="url" placeholder=" 可输入个人主页地址 ">
        <li><span> 内容：</span><textarea class="line" name="message" required placeholder=" 请不要发表无意义的评论内容 "></textarea>
        <li><input type="hidden" name="thread" value="<?php echo $_GET["thread"]; ?>"><?php if(isset($_GET["parent"])){ ?><input type="hidden" name="parent" value="<?php echo $_GET["parent"]; ?>"><?php } ?><button class="btn-submit" type="submit"> 立即发表 </button>
        <li class="tips"> 注：通过本表单提交的数据，会原样转发给 Disqus，本站不做任何存储和记录。
        <li><a href="#close" onclick="window.close();void(0)"> 放弃评论 </a>
      </ul>
    </form>
  </div>
</div>
<footer></footer>
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script>!
function(a) {
  function e() {
    try {
      localStorage.author_name = $('[name="author_name"]').val(), localStorage.author_email = $('[name="author_email"]').val(),localStorage.author_url = $('[name="author_url"]').val()
    } catch (a) {}
  }
  function t() {
    $('[name="author_name"]').val(localStorage.author_name), $('[name="author_email"]').val(localStorage.author_email), $('[name="author_url"]').val(localStorage.author_url), ["author_name", "author_email", "message"].some(function(a) {
      var e = $('[name="' + a + '"]');
      return e.val() ? void 0 : e.focus()
    })
  }
  var o = !1;
  $("#create-post").on("submit", function(e) {
    if (e.preventDefault(), !o) {
      o = !0;
      var t = $(".tips");
      t.html("\u63d0\u4ea4\u4e2d..."), $.post("/get/posts/create.json", $("#create-post").serialize()).then(function(e) {
        o = !1, !e.code==0 ? t.html("\u63d0\u4ea4\u5931\u8d25\uff1a" + e.response) : ($(".btn-submit").prop("disabled", !0), t.html("\u63d0\u4ea4\u6210\u529f\uff01\u672c\u7a97\u53e3\u5373\u5c06\u5173\u95ed\u3002"), setTimeout(function() {
          try {
            a.opener.location.hash = "comment-" + e.response.id, a.opener.disqusLite.insertPost(e.response), a.close()
          } catch (t) {
            a.close()
          }
        }, 1e3))
      })
    }
  }), t(), $('[name="author_name"], [name="author_email"], [name="author_url"]').on("change", e)
}(this);</script>
</body>
</html>
