# 目录结构

```shell
src
|   index.tsx                       // 入口文件
|   Router.tsx                      // 路由定义文件
|
+---assets                         // 资源目录
|   \---img                        // 图片资源
|           *.png
|
+---components                      // 自定义组件
|   |   Header.tsx                  // 头部
|   |   index.ts                    // 导出
|   |   popover.tsx                 // 弹出框
|   |   Progress.tsx                // 进度条
|   |   Table.tsx                   // 表格
|   |   Upload.tsx                  // 上传
|   |
|   +---button                       // 按钮
|   |       Button.tsx
|   |       IconButton.tsx
|   |       index.ts
|   |
|   +---card                         // 卡片
|   |       Card.tsx
|   |       CardImg.tsx
|   |       CardLay.tsx
|   |       CardTag.tsx
|   |       index.ts
|   |
|   +---Icon                        // 图标
|   |       enum.ts
|   |       FontIcon.tsx
|   |       index.ts
|   |       SvgIcon.tsx
|   |
|   +---modal                       // 模态框
|   |       index.tsx
|   |       Modal.tsx
|   |
|   \---pages                       // 由各个页面拆分出来的组件
|           ButtonGroup.tsx         // modelview下方按钮组
|           CardClip.tsx            // 剪切卡片(modelview右侧边栏)
|           CardMark.tsx            // 标记卡片(modelview右侧边栏)
|           CardRoam.tsx            // 路由卡片(modelview右侧边栏)
|           CardTable.tsx           // 表格卡片(modelview右侧边栏)
|           Clip.tsx                // 底部裁剪功能组件
|           ModelDel.tsx            // 删除模态框
|           ModelShare.tsx          // 分享模态框
|           SearchTree.tsx          // 树搜索
|           ViewAngle.tsx           // 底部视角变换
|
+---helper
|       api.ts                      // 请求api
|       util.ts                     // 工具函数
|
+---pages
|       Home.tsx                     // 模型列表页
|       HomeChild.tsx                // 子模型列表页
|       ModelView.tsx                // 模型查看页面
|
+---store
|   |   configureStore.ts             // store配置
|   |   rootReducer.ts                // reducer组合
|   |   rootSaga.ts                   // saga组合
|   |
|   +---home
|   |       action.ts                 // action定义
|   |       reducer.ts                // reducer定义
|   |       saga.ts                   // saga定义
|   |       types.ts                  // action以及state定义
|   |
|   \---modelview
|           action.ts
|           reducer.ts
|           saga.ts
|           types.ts
|
\---styles
        index.less                    // 导出
        lib-base.less                 // 全局基础样式声明
        lib-lay.less                  // 布局样式声明
        lib-mixins.less               // 全局混合样式声明
        lib-var.less                  // 全局变量声明
        mod-button.less               // 以下mod开头均对应components中的组件
        mod-card.less
        mod-icon.less
        mod-modal.less
        mod-popover.less
        mod-progress.less
        mod-Slider.less
        mod-Table.less
        mod-upload.less
        pag-home.less                  // 以下pag均对应pages中的组件
        pag-modelview.less
```
