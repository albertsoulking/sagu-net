读取 frontend_admin 里面的内容，理解并优化前端项目的结构和技术栈要求。确保项目符合现代化 SaaS Dashboard 的设计风格，并且具备良好的用户体验和性能表现。根据系统功能需求，设计合理的组件结构和数据流，使用合适的库和工具来实现各项功能。同时，注重代码的可维护性和可扩展性，确保项目能够适应未来的需求变化。

优化内容如下：

1. dashboard 页面先不用修改，先把其他页面做好，dashboard 页面后续再优化。

2. Users 页面：
- 用户列表 table head: User ID, Name, Phone, Region, Plan, Months, End Date, Day Left, Status, ONU Status, Type, Registred
- status 是当前用户的状态，分为 Active 启用状态, Expired 欠费状态，Suspended 停用状态 三种状态。
- ONU Status 是用户的 ONU 设备状态，分为 Online 在线状态, Offline 离线状态 两种状态。
- Type 是用户的类型，分为 Premium 付费用户, FOC 免费用户 两种状态。
- 点击用户列表中的某一行，进入用户详情页面，显示该用户的详细信息和操作选项，内容为标题是用户ID，当前内容不要删除，Name 显示用户姓名，Phone 显示用户电话，Region 显示用户区域，Plan 显示用户当前套餐，Months 显示用户订阅的月份，End Date 显示用户到期日期，Day Left 显示用户剩余天数，Status 显示用户状态，Type 显示用户类型，Registered 显示用户注册日期。
- 加一个用户备注字段，显示在用户详情页面，方便管理员记录用户的特殊情况或备注信息。

3. 用户详情页面：
- 用户详情页面往下是显示安装信息，包括 经度，纬度，DN/SN，Port，Cable Length 用米显示，SN/Mac, ONU Type, ONU Status。
- 下面的地图显示用户所在的区域位置根据 user.latitude, user.longitude，空数据也要防止出现错误，保留地图显示不要删除。
- 地图下面就是操作选项，包括续费，升级套餐，设置类型，设置状态，设置ONU状态，删除账号等功能。
- 续费功能：管理员可以选择续费的月份数，系统会自动计算新的到期日期和剩余天数，并更新用户的状态。
- 升级套餐功能：管理员可以选择新的套餐，系统会根据新的套餐价格计算续费金额，并更新用户的套餐信息。
- 设置类型功能：管理员可以将用户的类型设置为 Premium 或 FOC，根据用户的类型调整其权限和功能。
- 设置状态功能：管理员可以将用户的状态设置为 Active、Expired 或 Suspended，根据用户的状态调整其访问权限和功能。
- 设置ONU状态功能：管理员可以将用户的ONU状态设置为 Online 或 Offline，根据ONU状态调整用户的网络访问权限。
- 删除账号功能：管理员可以选择删除用户账号，系统会将用户数据从数据库中删除，并移除其相关的所有信息。

4. 添加用户页面：
你可以直接用你的 React + shadcn/ui 在一个弹窗（Dialog/Modal）或者一个独立页面里实现这个全自动向导：

[步骤条]  (1) 基本信息 -------- (2) 订阅信息 -------- (3) 安装/ONU信息
Step 1: 基本信息 (Basic Info)
填写内容：用户ID， 姓名、电话、区域，备注。

交互： 页面很干净。填完后，右下角只有一个 [ 下一步 (Next) ] 按钮。

代码逻辑： 触发前端表单验证（Validation），确保电话和名字没漏填。

Step 2: 订阅信息 (Subscription Info)
填写内容： 用户类型（Premium / FOC）、选择 Wi-Fi 套餐（Plan）、订阅月份数量（1月/3月/6月/12月），额外月份数量（选择了6月就显示+1，选了12月就显示+2，并且禁用状态），计费开始时间，结束时间。
下面还有一个 adjustment 的输入框，管理员可以在这里输入一个调整金额（Adjustment Amount），这个金额会在用户续费时自动加到续费金额上，正数表示加钱，负数表示减钱。
往下就有一个 text 显示根据用户选择的套餐和订阅月份数量计算出的续费金额，调整金额也会实时反映在这个续费金额上。

交互： 点击 [ 下一步 (Next) ]。

Step 3: 安装信息 (Installation & ONU Info)
填写内容： 负责安装的 Staff 名字、光猫的 SN/MAC 码（ONU SN/MAC）、OLT 槽位号/端口号（PON Port），DN/SN，经度，纬度，install type, cable length。cable length 是一个数字输入框，单位是米。
下面用 text 显示根据 installation rule 的规则自动计算的 cable length 的价格，如果是免费安装不要安装费，cable超过300米就要 每米300mmk，如果是正常安装费是5万mmk，cable 长度超过300米就每米300mmk。
当前的展示地图保留，不要删除，地图上显示用户的安装位置，根据输入的经度和纬度自动更新地图位置。

最后还需加一个支付类型，分为 Cash 现金支付，Bank Transfer 银行转账，Mobile Money 手机支付 三种支付方式。放在合适的位置。

交互： 此时右下角的按钮变成 [ 确认创建 (Submit) ]。
