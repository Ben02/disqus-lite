这是一个基于 nginx 的反向代理 Disqus 的 Docker 镜像，适用于无法直接访问 Disqus 的地区。

要在博客显示经过代理的 Disqus 评论框需要前后端的配合，首先你需要一个服务器进行反向代理和显示提交评论的页面，其次你需要前台解析经过代理后的数据并显示评论框结构。简单来说，服务器部署本仓库 `docker` 里的东西，博客上部署本仓库 `example` 里的东西。具体的原理请 [点击此处](https://medium.com/cnhinata/disqus-api-%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86-70d11d8e39af?source=collection_home---2------4---------------------)。

## 懒人教程

首先需要一个 VPS，然后上面要装 Docker，装 Docker 的方法 [请点此处](https://yeasy.gitbooks.io/docker_practice/content/install/)。

然后在 VPS 上执行 `docker pull ben02/disqus-lite`，再执行 `docker run -d -p 1313:80 ben02/disqus-lite`。

下载本仓库 `example` 的内容，替换里面所有文件的 `d.benwong.cn` 为 `你服务器绑定的域名:1313`。

在前台自行引入 jQuery 和 `comments.css` 和 `main.js`；并且自行下载 `moment.js`，和 `comments.js` 一起放到网站根目录的 `js` 文件夹下。

`comments.html` 是 Hugo 博客的示例，参照着修改自己主题即可，如果是其他博客请自行修改成对应格式。

## 进阶使用

实际上本项目只提供对 Disqus API 的反向代理，即 `docker` 文件夹里的内容，处理并使用 API 获得的数据、在前台显示出评论框应该自行完成，`example` 文件夹里的东西只是我的一个粗糙的 example。如何使用 Disqus API 请看 [官方文档](https://disqus.com/api/docs/)，注意把调用接口的地址替换成 `/disqus/threads/listPosts.json` 这样的形式。

运行时指定 `docker run` 的参数可以实现自定义，`-p 1313:80` 表示绑定 `1313` 端口接受 HTTP 访问，`-p 443:443` 表示绑定 SSL 端口接受 HTTPS 访问，`-v /docker/php:/var/www/app/` 可以挂载 `/docker/php` 的内容以编辑提交评论页面，`-v /path/to/conf:/etc/nginx/sites-enabled/` 可以挂载 `/path/to/conf` 以编辑 nginx 配置。
