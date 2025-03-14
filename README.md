# 区块链认证图片签名

### **0：本地运行**

1. 先将仓库克隆到本地再进入仓库
```powershell
git clone git@github.com:karenepitaya/image-signature.git // 保存到本地（GitHub）
git clone git@gitee.com:karenepitaya/image-signature.git // 保存到本地（Gitee）
cd image-signature
```

2. 配置环境安装依赖
```powershell
npm install // 安装项目总依赖
cd ./client/
npm install // 安装vue项目依赖
cd ../blockchain/
npm install // 安装hardhat项目依赖
```

3. 运行项目
```powershell
cd ./blockchain         // 在终端一中执行
npx hardhat compile     // 编译合约
cd ..                   // 返回项目家目录
npm run start-hardhat   // 在终端一中保持运行
npm run wait-and-deploy // 在终端二中执行
npm run start-server    // 在终端二中保持运行
cd ./client             // 在终端三中执行
npm run dev             // 在终端三中保持执行并在浏览器中打开前端链接
```
### **1: 技术栈**

要实现区块链图片签名功能，我们需要以下技术支持：

#### **前端技术栈**

- **HTML**: 创建简单的用户界面（用于图片上传）。
- **CSS**: 提供基本的界面样式（可选）。
- **JavaScript**: 处理用户交互，调用后端 API。

#### **后端技术栈**

- **Node.js**: 搭建后端服务。
- **Express**: 提供 API 接口。
- **Crypto模块**: 用于生成图片的哈希值和签名。

#### **区块链技术栈**

- **Ethereum**: 使用以太坊网络。
- **Solidity**: 编写智能合约，用于存储图片哈希和签名数据。
- **Hardhat**: 开发、部署和测试智能合约的工具。
- **Web3.js**: 连接前端与区块链。

#### **其他工具**

- **文件系统（fs模块）**: 处理图片文件的读取和存储（用于后端）。
- **SHA-256**: 用于生成图片的唯一哈希值。
- **MetaMask**: 用于测试和与区块链交互的钱包插件。
- **Ganache**: 搭建本地测试链。

------

### **2：TODOS**

#### **开发目标**

1. **前端开发**：
   - 创建一个页面，允许用户上传图片。
   - 显示签名结果和区块链存储状态。
2. **后端开发**：
   - 处理图片上传，生成 SHA-256 哈希。
   - 使用私钥对哈希进行数字签名。
   - 提供 API 供前端调用。
3. **区块链开发**：
   - 编写智能合约，存储图片哈希和签名。
   - 部署智能合约到本地以太坊网络。
   - 提供方法验证图片签名。
4. **集成**：
   - 将前端与后端集成，调用 API 实现签名功能。
   - 将后端与区块链交互，存储签名数据。

------

### **3: 目录结构**

#### **基础目录结构**

```tree
image-signature/
├── client/                 # vue项目
|   ├── public/             # 顶层资源     
│   │   ├── accounts.json   
│   │   ├── fav.ico       
│   │   └── vite.svg       
│   ├── src/                # 页面资源
│   │   ├── assets/
│   │   ├── components/
│   │   ├── router/
│   │   ├── app.vue
│   │   ├── main.js
│   │   └── style.css 
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json        # 项目配置
│   ├── vite.config.js
│   └── README.md
├── server/                 # 后端代码
│   ├── app.js              
│   ├── routes/             # 路由模块
│   │   └── imageRoutes.js  
│   ├── controllers/        # 控制器逻辑
│   │   └── imageController.js
│   └── utils/              # 工具函数
├── blockchain/             # 区块链相关代码
│   ├── contracts/          # 智能合约
│   │   └── ImageStorge.sol
│   ├── scripts/            # 部署与测试脚本
│   │   └── deploy.js
│   └── hardhat.config.js   # Hardhat 配置
│   └── ···
├── node_moudles/           # Node.js 项目依赖地址
│   └── ···
├── uploads/                # 上传图片存储目录
├── package.json            # Node.js 项目配置
├── package_lock.json
├── README.md               # 项目说明文档
└── .gitignore              # 忽略文件
```

#### **目录结构说明**

1. **client/**: 存放前端代码，负责用户界面和与后端的交互。
2. **server/**: 存放后端代码，处理图片上传、签名逻辑和与区块链的交互。
3. **blockchain/**: 存放区块链代码，包括智能合约、部署脚本和 Hardhat 配置。
4. **package.json**: 项目依赖管理文件。
