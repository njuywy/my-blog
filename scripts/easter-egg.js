// scripts/easter-egg.js
// 小彩蛋：在头像区域添加吃豆人，点击进入游戏页面

hexo.extend.filter.register('after_render:html', function(html, data) {
    const easterEggScript = `
<!-- 小彩蛋脚本：点击吃豆人进入游戏 -->
<style>
@keyframes pacmanMove{0%,100%{left:20%;}50%{left:80%;}@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(-8px);}}.easter-egg-pacman{position:absolute!important;top:50%!important;left:50%!important;transform:translate(-50%,-50%)!important;width:30px!important;height:30px!important;background:linear-gradient(135deg,#feca57 0%,#ff9f43 100%)!important;border-radius:50%!important;cursor:pointer!important;z-index:1000!important;animation:pacmanMove 3s ease-in-out infinite!important;box-shadow:0 0 15px rgba(254,202,87,0.8)!important;display:flex!important;align-items:center!important;justify-content:center!important;text-decoration:none!important}.easter-egg-pacman:hover{transform:translate(-50%,-50%) scale(1.2)!important;box-shadow:0 0 25px rgba(254,202,87,1)!important}.easter-egg-hint{position:fixed!important;bottom:30px!important;left:50%!important;transform:translateX(-50%)!important;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)!important;color:white!important;padding:12px 25px!important;border-radius:25px!important;font-size:14px!important;box-shadow:0 5px 20px rgba(102,126,234,0.4)!important;animation:bounce 2s infinite!important;z-index:9999!important;cursor:pointer!important;opacity:0!important;transition:opacity 0.5s!important}
</style>
<script>
(function(){function initEasterEgg(){var avatarArea=document.querySelector('.avatar-img');if(!avatarArea)return;var existingPacman=avatarArea.querySelector('.easter-egg-pacman');if(existingPacman)return;var pacman=document.createElement('a');pacman.href='/my-blog/games/';pacman.className='easter-egg-pacman';pacman.innerHTML='<span style="font-size:20px;">👾</span>';pacman.title='🎮 点击进入小游戏！';pacman.onclick=function(e){e.preventDefault();window.location.href='/my-blog/games/';};avatarArea.appendChild(pacman);var hint=document.createElement('div');hint.className='easter-egg-hint';hint.innerHTML='🎮 点击吃豆人进入小游戏！';hint.onclick=function(){window.location.href='/my-blog/games/';};document.body.appendChild(hint);setTimeout(function(){hint.style.opacity='1';},500);setTimeout(function(){hint.style.opacity='0';setTimeout(function(){hint.remove();},500);},5000);}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initEasterEgg);}else{initEasterEgg();}})();
</script>
`;
    
    // 注入到 </body> 标签前
    return html.replace('</body>', easterEggScript + '</body>');
});
