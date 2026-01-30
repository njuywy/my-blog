// scripts/easter-egg.js
// 彩蛋：把所有 /tags/ 链接改为游戏页面

hexo.extend.filter.register('after_render:html', function(html, data) {
    // 替换所有 /tags/ 链接为游戏页面
    return html.replace(/href="\/tags\//g, 'href="/my-blog/games/');
});
