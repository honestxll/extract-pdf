# 使用说明

现在只能提取 pdf 中的文字，所以图片的部分需要配合 `poppler` 使用

```bash
yarn dev
open http://localhost:3000
```

安装 `poppler`，完成后使用 `pdfimages` 命令处理 `pdf` 图片，弄出来的图片比较大，所以我们需要压缩一下，mac 上很简单

```bash
brew install poppler
pdfimages -h
pdfimages *.pdf -j images
jpegoptim --size=512k *.jpg
```