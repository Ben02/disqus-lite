function showComments() {
	disqus.load();
	setTimeout(function() {
		if (!disqus_done && disqus_lite_run_count == 0) {
			$("#disqus_lite").html('<img src="https://benwong.cn/images/loading.png" class="comment_loading animated fadeInDown">');
			var dsq = document.createElement('script');
			dsq.type = 'text/javascript';
			dsq.async = true;
			dsq.src = '/js/comments.js';
			dsq.onload = function() {
				disqusLite.load();
			};
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

			$("#disqus_thread").hide();
		}
	}, 2000);
}