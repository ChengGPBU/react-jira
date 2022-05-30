import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button, Pagination, Typography } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { Row as LayoutRow } from '@/components/lib'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

const { Title, Text } = Typography

export const MiniHome = () => {
  const [size, setSize] = useState<SizeType>('large')

  return (
    <Container>
      <Header>
        <Title level={3}>小程序管理</Title>
        <Button type='primary' icon={<DownloadOutlined />} size={size}>
          新建小程序
        </Button>
      </Header>
      <Content>
        <Pagination size='small' total={50} showTotal={(total) => `共${total}条`} />
      </Content>
    </Container>
  )
}

const Container = styled.div`
  padding:  2rem;
  width: 100%;
  height: 100%;
  background: #f0f2f5
`

const Header = styled(LayoutRow)`
    width: 100%;
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    background: #fff;
    justify-content: space-between;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f4f5f5;
    margin-top: 16px;
`
