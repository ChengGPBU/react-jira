import React from 'react'
import styled from '@emotion/styled'
import { Card, Col, Divider, Row, Typography } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Row as LayoutRow } from '@/components/lib'

const { Title, Text } = Typography

export const Home = () => {
  return (
    <Container>
      <Header>
        <Title level={3}>你好，祝你开心工作每一天~</Title>
      </Header>
      <Content>
        <ContentTitle>
          <Text>我的项目</Text>
        </ContentTitle>
        <Row gutter={24} style={{ padding: '10px 14px 0' }}>
          <Col span={8}>
            <Card
              title='工程1'
              bordered={false}
              actions={[<EditOutlined key='edit' />, <DeleteOutlined key='deleted' />]}
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title='工程2'
              bordered={false}
              actions={[<EditOutlined key='edit' />, <DeleteOutlined key='deleted' />]}
            >
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title='工程3'
              bordered={false}
              actions={[<EditOutlined key='edit' />, <DeleteOutlined key='deleted' />]}
            >
              Card content
            </Card>
          </Col>
        </Row>
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
    background: #fff
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f4f5f5;
    margin-top: 16px;
`

const ContentTitle = styled(LayoutRow)`
    width: 100%;
    padding: 1.5rem;
    border-bottom: solid #f0f0f0 1px;
`

const CardContainer = styled(LayoutRow)`
    width: 100%;
`
