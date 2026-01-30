#!/bin/bash
set -e

# 安装 Hexo
npm install -g hexo-cli

# 安装依赖
npm install

# 生成静态文件
hexo generate
