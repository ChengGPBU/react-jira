import React from 'react'
import { ProList } from '@ant-design/pro-components'
import { Button, Space, Tag } from 'antd'
import request from 'umi-request'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { useAuth } from '@/context/auth-context'

interface Application {
  id: number
  createTime: Date
  updateTime: Date
  describe: string
  isDeleted: boolean
  version: number
  appName: string
  identify: string
  logo: string
  appType: string
  appPlatform: string
  brandName: string
  brandId: number
}

interface Brand {
  id: number
  createTime: Date
  updateTime: Date
  brandName: string
  describe: string
  isDeleted: boolean
  version: number
  logo: string
  applications: Application[]
}

interface BrandResponseObj {
  data: Brand[]
  code: number
  msg: string
}

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
)

const dataSource = [
  {
    title: '语雀的天空',
  },
  {
    title: 'Ant Design',
  },
  {
    title: '蚂蚁金服体验科技',
  },
  {
    title: 'TechUI',
  },
]

export const BrandScreen = () => {
  const { user } = useAuth()
  const token = user?.token
  return (
    <ProList<{ title: string }>
      toolBarRender={() => {
        return [
          <Button key='3' type='primary'>
            新建
          </Button>,
        ]
      }}
      itemLayout='horizontal'
      rowKey='id'
      headerTitle='竖排样式'
      dataSource={dataSource}
      metas={{
        avatar: {
          render: () => (
            <img
              width={100}
              alt='logo'
              src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
            />
          ),
        },
        // description: {
        //   render: () => (
        //     <>
        //       <Tag>语雀专栏</Tag>
        //       <Tag>设计语言</Tag>
        //       <Tag>蚂蚁金服</Tag>
        //     </>
        //   ),
        // },
        actions: {
          render: () => [
            <IconText icon={StarOutlined} text='' key='list-vertical-star-o' />,
            <IconText icon={LikeOutlined} text='' key='list-vertical-like-o' />,
            <IconText icon={MessageOutlined} text='' key='list-vertical-message' />,
          ],
        },
        subTitle: {
          render: () => {
            return (
              <div>
                段落示意：蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
              </div>
            )
          },
        },
      }}
    />
  )
}
