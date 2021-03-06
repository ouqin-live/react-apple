import React,{ useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './App.less'
import Router from './Router'
import { Link } from "react-router-dom";


const { Header, Sider, Content } = Layout;

export default function APP(){
  const [collapsed,setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout className='app-layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          React-Apple
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="DiffToHtml" icon={<UserOutlined />}>
           <Link to="/DiffToHtml">diffToHtml</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Router/>
        </Content>
      </Layout>
    </Layout>
  );
}