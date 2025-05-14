# MSAQE - 基于AI的景区质量评估系统

MSAQE（AI-Driven Scenic Area Quality Evaluation）是一个由复旦大学开发的景区质量评估系统，利用人工智能技术分析游客评论，为政府用户提供景区质量的实时评估。

## 项目特点

- 基于600万+游客评论的大规模数据分析
- 多维度质量评估（交通、游览、安全等8个维度）
- 实时数据可视化展示
- 按景区等级（5A-A级）分类查看
- 支持时间区间筛选

## 技术栈

- React.js
- Chart.js
- FontAwesome
- CSS3 (Flexbox & Grid)
- 响应式设计

## 安装与运行

1. 克隆项目
```bash
git clone https://github.com/yourusername/msaqe-showcase.git
cd msaqe-showcase
```

2. 安装依赖
```bash
npm install
```

3. 运行开发服务器
```bash
npm start
```

4. 构建生产版本
```bash
npm run build
```

## 项目结构

```
msaqe-showcase/
├── public/
│   ├── assets/
│   │   └── logo.png
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Header.js
│   │   ├── Introduction.js
│   │   ├── Dataset.js
│   │   ├── AiModel.js
│   │   ├── InteractiveDemo.js
│   │   ├── Benefits.js
│   │   └── Contact.js
│   ├── data.js
│   ├── App.js
│   ├── index.js
│   └── ...
└── ...
```

## 贡献指南

欢迎提交问题和功能请求。如果您想贡献代码，请遵循以下步骤：

1. Fork 项目
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 联系方式

如需更多信息，请联系：msaqe@fudan.edu.cn 