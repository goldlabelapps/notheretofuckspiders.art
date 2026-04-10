
## How to update this codebase from upstream (goldlabelapps/nx)

1. View your current remotes:
	```sh
	git remote -v
	```

2. Add the upstream remote if it is not already set:
	```sh
	git remote add upstream https://github.com/goldlabelapps/nx.git
	```

3. Fetch the latest changes from upstream:
	```sh
	git fetch upstream
	```

4. Merge or rebase the upstream branch (usually main) into your local branch:
	```sh
	git merge upstream/master
	# or
	git rebase upstream/master
	```

5. Push your updated branch to your origin if needed:
	```sh
	git push origin <your-branch-name>
	```


## NX

NX 是一个现代化的全栈 Web 应用框架和平台，基于 Next.js 和 React 构建。它为构建可扩展、模块化和高性能的 Web 应用提供了强大的基础，并专注于开发者体验、设计系统和多租户支持。

在这个开源版本中，我们提供了一个公共代码库。NX 已达到生产就绪状态，并附有完整的文档，使全栈 JavaScript 开发人员能够在 30 分钟内快速启动一个功能齐全、基于 Firebase 的 NX 实例。

#### 功能特性

- **Next.js 16**：服务器端渲染 (SSR)、静态站点生成器 (SSG)、API 路由和高级路由

- **TypeScript**：严格的类型规范和现代 JavaScript 特性

- **Material UI (MUI)**：美观且易于访问的 UI 组件

- **Redux Toolkit**：状态管理

- **Firebase**：身份验证和后端集成

- **PWA 支持**：支持离线 Service Worker

- **多租户架构**：轻松支持多个品牌/客户

- **RESTful API**：内置 API 端点（[API 文档](https://goldlabel.pro/api)）

- **设计系统**：可重用的组件和钩子

- **富媒体支持**：Markdown、图像、SVG、PDF 等

#### 快速入门

1. **克隆仓库：**

```bash

git clone https://github.com/goldlabelapps/nx

cd nx

```
2. **安装依赖项：**

```bash

yarn install

```
3. **运行开发服务器：**

```bash

yarn dev

```

该应用可通过 [http://localhost:1999](http://localhost:1999) 访问。NX 在 `/api` 目录下提供 RESTful API。详情请参阅 [app/api/README.md](app/api/README.md) 和 [在线 API 文档](https://github.com/goldlabelapps/python-nx-ai)。

#### 技术栈

- [Next.js 16](https://nextjs.org/)

- [React 19](https://react.dev/)

- [TypeScript](https://www.typescriptlang.org/)

- [Material UI](https://mui.com/)

- [Redux Toolkit](https://redux-toolkit.js.org/)

- [Firebase](https://firebase.google.com/)

- [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/)

- [GSAP](https://greensock.com/gsap/)

- [PWA](https://web.dev/progressive-web-apps/)

#### 脚本

- `yarn dev` — 启动开发服务器

- `yarn build` — 构建生产环境

- `yarn start` — 启动生产服务器

- `yarn lint` — 运行 ESLint

- `yarn clean` — 清理构建产物

#### 贡献

欢迎贡献！请提交 issue 或 pull request。

对于重大更改，请先提交 issue 进行讨论。

#### 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE)。

#### 所有者

NX 由 [Goldlabel Apps Ltd](https://goldlabel.pro) 构建和维护。

![NextJS](public/shared/png/opengraph/apps.png)