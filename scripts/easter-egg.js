// scripts/easter-egg.js
// 彩蛋：修改文章末尾的标签链接为游戏页面

hexo.extend.filter.register('after_render:html', function(html, data) {
    // 把文章标签云的链接改为游戏页面
    var tagScript = `
<script>
(function(){
  var tagLinks=document.querySelectorAll('.tag-link, .article-tag-link, [class*="tag"] a, .post-tags a, .article-tag a');
  tagLinks.forEach(function(link){
    link.href='/my-blog/games/';
    link.title='点击进入游戏页面！';
  });
})();
</script>
`;
    
    return html.replace('</body>', tagScript + '</body>');
});
