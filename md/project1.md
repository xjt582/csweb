**项目实现的四大核心目标**

**阶段 核心目标 成功标准与产出物**

1. **数据采集与存储 写一个Python脚本，能稳定地将服务器状态写入数据库。 运行脚本后，MySQL中monitor_data表里出现带有时间戳的CPU、内存记录。**
2. **自动化 让采集工作无人值守，定期执行。 通过crontab设置每分钟执行一次脚本，并确认数据库中有持续的新数据流入。**
3. **可视化展示 提供一个能通过浏览器访问的图表页面。 在浏览器输入 http://你的服务器IP:5000，能看到动态更新的CPU/内存折线图。**
4. **问题模拟与解决 主动制造并解决一个典型问题（这是面试最大亮点）。 例如：模拟磁盘写满导致数据写入失败，然后实现日志记录和告警功能，并将此过程记录下来。**



🧰 项目准备清单（开工会）

一、 硬件与软件准备

1. 本地开发环境：
   · 操作系统：CentOS 7 虚拟机，可作为监控目标与运行环境。
   · 代码编辑器：安装 VS Code，并配置好远程SSH连接或Python插件，方便你编辑服务器上的代码。
   · 本地连接工具： xShell
2. 基础软件安装（在你的CentOS 7上执行）：
   ```bash
   # 1. 更新系统并安装Python3及包管理工具
   yum update -y
   yum install python3 python3-pip -y
   
   # 2. 安装项目所需的Python库
   pip3 install psutil pymysql flask
   
   # 3. 安装并启动MySQL（如果尚未安装）
   # 参考你之前部署的经验，确保MySQL服务运行，并创建一个专用数据库和用户
   ```
   · 目标：成功运行 python3 --version、pip3 list 能看到已安装的包。

二、 知识快速梳理

开始前，花30分钟理解这几个核心概念，会让编码顺利很多：

组件 在本项目中的角色 你需要了解的最小知识
psutil 数据采集器 如何调用 psutil.cpu_percent(), psutil.virtual_memory() 等函数获取数据。
pymysql 数据搬运工 如何连接数据库、执行 INSERT 语句将采集的数据写入表中。
Flask 数据展示门户 如何创建一个最简单的Web应用，定义一个路由（如/），并返回一个HTML页面。
crontab 定时触发器 如何用 crontab -e 命令添加一行定时任务，让脚本每隔5分钟自动执行一次。
ECharts 图表画家 这是一个前端JS库，你只需要会从Flask后端传递数据到前端，并套用一个简单的折线图示例。

三、 

四、 第一步：初始化数据库 (立即可以开始)

这是最具体、不会出错的第一步：

1. 登录你的MySQL。
2. 执行以下SQL：

```sql
CREATE DATABASE server_monitor;
USE server_monitor;
CREATE TABLE monitor_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    cpu_percent FLOAT,
    memory_percent FLOAT,
    disk_percent FLOAT,
    bytes_sent FLOAT,
    bytes_recv FLOAT
);
```

完成这一步，你的项目就正式启动了！

