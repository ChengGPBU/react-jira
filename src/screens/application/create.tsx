import React, { useState, useEffect, useCallback } from 'react'
import { createForm } from '@formily/core'
import { Field } from '@formily/react'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'
import { Form, FormItem, Input, Select, Submit, FormButtonGroup } from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button, Spin } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useParams, Navigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import request from 'umi-request'
import { useAuth } from '@/context/auth-context'
import { FieldDataSource } from '@formily/core/esm'

import './create.less'
import { UploadFile } from 'antd/lib/upload/interface'

export type Brand = {
  id: number
  createTime: Date
  updateTime: Date
  brandName: string
  describe: string
  isDeleted: boolean
  version: number
  logo: string
}

type BrandListRes = {
  data: Brand[]
  code: number
  msg: string
}

const form = createForm({
  validateFirst: true,
})

const uploadPorps: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList)
    // }
    console.log(info)
    // if (info.file.status === 'done') {
    //   message.success(`${info} file uploaded successfully`)
    // } else if (info.file.status === 'error') {
    //   message.error(`${info} file upload failed.`)
    // }
  },
}

const IDUpload = () => {
  // const [fileList, setFileList] = useState<Array<UploadFile<any>>>([])
  const { user } = useAuth()
  const token = user?.token
  return (
    <Upload
      {...uploadPorps}
      // action='http://localhost:3000/file-upload/image'
      // name='image'
      // method='POST'
      // // fileList={fileList}
      // onChange={(fileList) => {
      //   console.log('~~~~~~~~~~~status', fileList)
      // }}
      // headers={{
      //   Authorization: token ? `Bearer ${token}` : '',
      // }}
    >
      <Button icon={<UploadOutlined />}>上传应用111logo</Button>
    </Upload>
  )
}

export default () => {
  const [loading, setLoading] = useState(true)
  const [brandlist, setBrandList] = useState<FieldDataSource>([])
  const { name: appPlatform } = useParams()

  const { user } = useAuth()
  const token = user?.token

  const {
    isSuccess,
    data: brandListRes,
    isLoading,
  } = useQuery('brandListData', () =>
    request<BrandListRes>('http://localhost:3000/application/queryBrandList', {
      method: 'GET',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
  )

  const brandList = useCallback(() => {
    const { code } = brandListRes || {}
    setLoading(isLoading)
    if (isSuccess && code === 200) {
      const list = brandListRes?.data.map((item: Brand) => {
        const { brandName, id } = item
        return {
          label: brandName,
          value: id,
        }
      })
      setBrandList(list)
    }
  }, [isSuccess, brandListRes])

  useEffect(() => {
    setTimeout(() => {
      form.setInitialValues({
        name: '',
        identify: '',
        brandId: '',
        appPlatform: '',
        appType: appPlatform,
        logo: [],
        describe: '',
      })
      setLoading(false)
    }, 1000)
  }, [])

  const createApp = async (v: any) => {
    const brandId = v.brandId
    const brandList = brandListRes?.data || []
    const brandName = brandList.find((item) => item.id === brandId)?.brandName
    const params = { ...v, logo: 'http://47.110.42.63:9000/static/icon.png', brandName }
    const res = await request<BrandListRes>('http://localhost:3000/application/create', {
      data: params,
      method: 'POST',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title='创建应用' style={{ width: 620 }}>
        <Spin spinning={loading}>
          <Form form={form} labelCol={5} wrapperCol={16} onAutoSubmit={console.log}>
            <Field
              name='name'
              title='应用名称'
              required
              decorator={[FormItem]}
              component={[Input]}
            />
            <Field
              name='identify'
              title='应用标识'
              required
              decorator={[FormItem]}
              component={[Input]}
            />
            <Field
              name='brandId'
              title='品牌名称'
              required
              decorator={[FormItem]}
              component={[Select]}
              //reactions={brandList}
              dataSource={[
                { label: '就享买333', value: 1 },
                { label: '就享买444', value: 2 },
                { label: '就享买1111', value: 3 },
              ]}
            />
            <Field
              name='appPlatform'
              title='应用平台'
              required
              decorator={[FormItem]}
              component={[Select]}
              dataSource={[
                { label: 'android', value: 'android' },
                { label: 'iOS', value: 'iOS' },
                { label: 'H5', value: 'h5' },
                { label: 'weapp', value: 'weapp' },
                { label: 'alipay', value: 'alipay' },
                { label: 'tt', value: 'tt' },
              ]}
            />
            <Field
              name='appType'
              title='应用类型'
              required
              decorator={[FormItem]}
              component={[Select]}
              dataSource={[
                { label: 'App', value: 'app' },
                { label: '小程序', value: 'mini' },
                { label: 'H5', value: 'h5' },
                { label: 'Bundle', value: 'bundle' },
              ]}
            />
            <Field
              name='logo'
              title='应用图标'
              required
              decorator={[FormItem]}
              component={[IDUpload]}
            />

            <Field
              name='describe'
              title='应用描述'
              required
              decorator={[FormItem]}
              component={[Input]}
            />
            <FormButtonGroup.FormItem>
              <Submit block size='large' onSubmit={createApp}>
                提交
              </Submit>
            </FormButtonGroup.FormItem>
          </Form>
        </Spin>
      </Card>
    </div>
  )
}
