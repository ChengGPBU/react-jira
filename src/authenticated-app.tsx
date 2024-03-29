import React from 'react'
import styled from '@emotion/styled'
import { Button, Dropdown, Menu, Typography } from 'antd'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Row } from './components/lib'
import { useAuth } from './context/auth-context'
import { ProjectListScreen } from './screens/project-list'
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
import { ProjectScreen } from './screens/project'
import { MainScreen } from './screens/main'
import { Home } from './screens/home'
import { resetRoute } from './utils'
import { BrandScreen } from './screens/brand'
import AppScreen from './screens/application'
import AppCreateScreen from './screens/application/create'

const { Title } = Typography

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <BrowserRouter>
        <Routes>
          {/* <Route path={'/'} element={<ProjectListScreen />} /> */}
          <Route path={'/'} element={<MainScreen />}>
            <Route index={true} element={<Home />} />
            <Route path={'/home'} element={<Home />} />
            <Route path={'/brand'} element={<BrandScreen />} />
            <Route path='/application/:name' element={<AppScreen />} />
            <Route path='/application/:name/create' element={<AppCreateScreen />} />
            <Route path='/publish/list' element={<div>list</div>} />
            <Route path='/publish/buildlist' element={<div>buildlist</div>} />
            <Route path='/users' element={<div>users</div>} />
          </Route>
          <Route path={'/projects'} element={<ProjectListScreen />} />
          {/* <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} /> */}
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

const PageHeader = () => {
  const { logout, user } = useAuth()
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type='link' onClick={resetRoute}>
          <Title level={3}>移动应用发布管理中台</Title>
          {/* <SoftwareLogo width={'18rem'} color={'rgb(38, 132,255)'} /> */}
        </Button>
      </HeaderLeft>

      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                <Button type='link' onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type='link' onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

// grid-area 给grid子元素命名
const Header = styled(Row)`
width: 100vw;
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1;
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
