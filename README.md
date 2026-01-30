# 炜煜の博客

使用 Hexo + Butterfly 主题搭建的博客。

## 快速开始

### 安装依赖
```bash
npm install
```

### 本地预览
```bash
hexo s
```
访问 http://localhost:4000

### 新建文章
```bash
hexo new "文章标题"
```

### 部署到 GitHub Pages
```bash
hexo d -g
```

## 目录结构
- `source/_posts/` - 文章存放位置
- `themes/butterfly/` - 主题
- `public/` - 生成的静态文件

## 部署配置

编辑 `_config.yml` 中的 deploy 部分：

```yaml
deploy:
  type: git
  repo: https://github.com/你的用户名/你的仓库名.git
  branch: gh-pages
```

需要先安装部署插件：
```bash
npm install hexo-deployer-git --save
```

## GitHub Pages 部署步骤

1. 创建 GitHub 仓库（如 `username.github.io`）
2. 推送博客代码到仓库
3. 启用 GitHub Pages（source: gh-pages 分支）
4. 访问 https://username.github.io

## Vercel 部署（推荐）

1. 注册 [Vercel](https://vercel.com)
2. 导入 GitHub 仓库
3. Vercel 自动检测 Hexo 并部署
4. 绑定自定义域名（可选）

---

*Powered by Hexo & Butterfly*
