import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable, TableDropdown } from '@ant-design/pro-components'
import { Button, Dropdown, Menu, Space, Tag } from 'antd'
import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import request from 'umi-request'
import { useParams } from 'react-router-dom'
import { useAuth } from '@/context/auth-context'

type Application = {
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

type ApplicationRes = {
  data: Application[]
  code: number
  msg: string
}

const getColumns = (buildJob: any): ProColumns<Application>[] => {
  return [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '应用标识',
      dataIndex: 'identify',
      search: false,
    },
    {
      title: '应用Logo',
      dataIndex: 'logo',
      valueType: 'avatar',
      search: false,
    },
    {
      title: '应用名称',
      dataIndex: 'appName',
      ellipsis: true,
      search: false,
    },
    {
      title: '所属项目',
      dataIndex: 'brandName',
      ellipsis: true,
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key='editable'
          onClick={() => {
            action?.startEditable?.(record.id)
          }}
        >
          编辑
        </a>,
        <Button
          key='button'
          type='primary'
          onClick={() => {
            buildJob(record)
          }}
        >
          构建
        </Button>,
      ],
    },
  ]
}
const HeaderTitle: { [key: string]: string } = {
  mini: '小程序管理',
  h5: 'H5管理',
  bundle: 'Bundle管理',
  app: 'App管理',
}

export default (props: any) => {
  const actionRef = useRef<ActionType>()
  const { user } = useAuth()
  const token = user?.token
  const { name = 'mini' } = useParams()

  const buildJob = useCallback((record: any) => {
    request<any>('http://localhost:3000/jenkins/buildJob', {
      data: {
        jobName: record.identify,
      },
      method: 'POST',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        ContentType: 'application/json',
      },
    })
  }, [])
  actionRef.current?.reload()
  console.log('~~~~~~~~~~~~~~~~~~appType', name)
  return (
    <ProTable<Application>
      columns={getColumns(buildJob)}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter)
        const { current, pageSize } = params
        return request<ApplicationRes>('http://localhost:3000/application/list', {
          params: {
            pageNum: current,
            pageSize,
            type: name,
          },
          method: 'GET',
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            ContentType: 'application/json',
          },
        })
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value)
        },
      }}
      rowKey='id'
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      headerTitle={HeaderTitle[name]}
      toolBarRender={() => [
        <Button key='button' icon={<PlusOutlined />} type='primary'>
          <Link to={`/application/${name}/create`}>新建</Link>
        </Button>,
      ]}
    />
  )
}
