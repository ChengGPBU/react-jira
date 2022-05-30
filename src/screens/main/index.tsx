import React from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu, Breadcrumb } from 'antd'
import { Routes, Route, Navigate, Link, Outlet } from 'react-router-dom'
import {
  AccountBookOutlined,
  BankOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

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

const items: MenuItem[] = [
  getItem(<Link to='home'>首页</Link>, '1', <HomeOutlined></HomeOutlined>, null),
  getItem(<Link to='brand'>品牌管理</Link>, '2', <BankOutlined />, null),
  getItem('应用管理', 'sub1', <AccountBookOutlined />, [
    getItem(<Link to='/application/mini'>小程序管理</Link>, '3', null, null),
    getItem(<Link to='/application/app'>App管理</Link>, '4', null, null),
    getItem(<Link to='/application/bundle'>Bundle管理</Link>, '5', null, null),
    getItem(<Link to='/application/h5'>H5管理</Link>, '6', null, null),
  ]),
  getItem('发布管理', 'sub2', <UserOutlined />, [
    getItem(<Link to='/publish/list'>发布单</Link>, '7', null, null),
    getItem(<Link to='/publish/buildlist'>构建发布</Link>, '8', null, null),
  ]),
  getItem(<Link to='/users'>用户管理</Link>, '9', <TeamOutlined />, null),
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
