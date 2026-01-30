// scripts/easter-egg.js
// 彩蛋：先点击个人信息 → 再点击标签 → 进入游戏页面

hexo.extend.filter.register('after_render:html', function(html, data) {
    const easterEggScript = `
<!-- 彩蛋脚本：先点击个人信息，再点击标签进入游戏 -->
<style>
.personal-info-active{outline:3px solid #feca57!important;outline-offset:5px!important;transition:all 0.3s}
.easter-egg-hint{position:fixed!important;bottom:30px!important;left:50%!important;transform:translateX(-50%)!important;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)!important;color:white!important;padding:12px 25px!important;border-radius:25px!important;font-size:14px!important;box-shadow:0 5px 20px rgba(102,126,234,0.4)!important;z-index:9999!important;cursor:pointer!important;opacity:0!important;transition:opacity 0.5s!important}
@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(-8px);}@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(254,202,87,0.7);}50%{box-shadow:0 0 0 15px rgba(254,202,87,0);}}.easter-egg-hint.show{opacity:1!important;animation:bounce 2s infinite}
</style>
<script>
(function(){
  var clickedInfo=false;
  var clickedTag=false;
  var hintShown=false;
  
  // 个人信息区域点击
  var infoAreas=['.author-info','.profile-text','.avatar-area','.personal-card','#aside-profile','.aside-author'];
  infoAreas.forEach(function(sel){
    var el=document.querySelector(sel);
    if(el){
      el.style.cursor='pointer';
      el.title='点击这里激活彩蛋，然后点击标签进入游戏！';
      el.onclick=function(){
        clickedInfo=true;
        this.classList.add('personal-info-active');
        // 高亮闪烁效果
        this.style.animation='pulse 1s infinite';
        setTimeout(function(){el.style.animation='';},2000);
        showHint();
      };
    }
  });
  
  // 标签点击
  var tagLinks=document.querySelectorAll('a[href*="/tags/"], .tag-link, [class*="tag"]');
  tagLinks.forEach(function(link){
    link.addEventListener('click',function(e){
      if(clickedInfo&&!clickedTag){
        clickedTag=true;
        e.preventDefault();
        e.stopPropagation();
        window.location.href='/my-blog/games/';
      }
    });
  });
  
  // 菜单标签点击
  var menuLinks=document.querySelectorAll('.menu-link, .nav-link');
  menuLinks.forEach(function(link){
    link.addEventListener('click',function(e){
      var href=this.getAttribute('href')||'';
      if(clickedInfo&&href.indexOf('/tags/')>-1){
        e.preventDefault();
        window.location.href='/my-blog/games/';
      }
    });
  });
  
  function showHint(){
    if(hintShown) return;
    hintShown=true;
    var hint=document.createElement('div');
    hint.className='easter-egg-hint';
    hint.innerHTML='🎮 已激活！点击任意标签进入游戏页面 →';
    hint.onclick=function(){window.location.href='/my-blog/games/';};
    document.body.appendChild(hint);
    setTimeout(function(){hint.classList.add('show');},100);
    setTimeout(function(){hint.classList.remove('show');setTimeout(function(){hint.remove();},500);},5000);
  }
  
  // 本地存储状态
  try{
    var savedState=localStorage.getItem('easterEggActivated');
    if(savedState==='true'){
      clickedInfo=true;
      var info=document.querySelector('.author-info, #aside-profile');
      if(info) info.classList.add('personal-info-active');
    }
  }catch(e){}
})();
</script>
`;
    
    return html.replace('</body>', easterEggScript + '</body>');
});
