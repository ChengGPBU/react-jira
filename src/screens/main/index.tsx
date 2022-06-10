import React from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu, Breadcrumb, Image } from 'antd'
import { Routes, Route, Navigate, Link, Outlet } from 'react-router-dom'
import {
  AccountBookOutlined,
  BankOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

import IconHome from '@assets/menu-home.png'
import IconBrand from '@assets/menu-brand.png'
import IconApp from '@assets/menu-app.png'
import IconPublish from '@assets/menu-publish.png'
import IconUser from '@assets/menu-user.png'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | null
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const iconMap: { [key: string]: string } = {
  home: IconHome,
  brand: IconBrand,
  app: IconApp,
  publish: IconPublish,
  user: IconUser,
}

const icons = ['home', 'brand', 'app', 'publish', 'user'].map((item) => {
  const path = iconMap[item]
  return (
    <div key={item} style={{ display: 'flex', justifyContent: 'center' }}>
      <Image src={path} width={20} height={20} style={{ display: 'flex', alignSelf: 'center' }} />
    </div>
  )
})

const items: MenuItem[] = [
  getItem(<Link to='home'>首页</Link>, '1', icons[0], null),
  getItem(<Link to='brand'>品牌管理</Link>, '2', icons[1], null),
  getItem('应用管理', 'sub1', icons[2], [
    getItem(<Link to='/application/mini'>小程序管理</Link>, '3', null, null),
    getItem(<Link to='/application/app'>App管理</Link>, '4', null, null),
    getItem(<Link to='/application/bundle'>Bundle管理</Link>, '5', null, null),
    getItem(<Link to='/application/h5'>H5管理</Link>, '6', null, null),
  ]),
  getItem('发布管理', 'sub2', icons[3], [
    getItem(<Link to='/publish/list'>发布单</Link>, '7', null, null),
    getItem(<Link to='/publish/buildlist'>构建发布</Link>, '8', null, null),
  ]),
  getItem(<Link to='/users'>用户管理</Link>, '9', icons[4], null),
]

export class MainScreen extends React.Component {
  state = {
    collapsed: false,
  }

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  render() {
    const { collapsed } = this.state
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          {/* <div className='logo' /> */}
          <Menu
            theme='dark'
            defaultSelectedKeys={['1']}
            mode='inline'
            items={items}
            onClick={(e) => {
              console.log('~~~~~~~~MenuItem', e)
            }}
          />
        </Sider>
        <Layout className='site-layout'>
          <Content>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Chengguang ©2022 Jenkins CI/CD</Footer>
        </Layout>
      </Layout>
    )
  }
}
