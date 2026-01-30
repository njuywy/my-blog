#!/bin/bash
set -e

# 安装 yarn
npm install -g yarn

# 安装依赖
yarn install

# 生成静态文件
npx hexo generate
