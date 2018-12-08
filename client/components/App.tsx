import * as React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd'
import NoteList from './NoteList'
import CurrentNote from './CurrentNote'
import OfflineModal from './OfflineModal'
import CreateNote from './CreateNote'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

export default function App(_props: {}) {
  return (
    <Layout>
      <Sider style={{ background:'#fff', overflow: 'auto', height: '100vh', position: 'fixed', left: 0, padding: '8px' }}>
        <div className="logo" />
        <h1>
          Organizer
        </h1>
        <CreateNote />
        <NoteList />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff' }}>
            <OfflineModal />
            <CurrentNote />
          </div>
        </Content>
      </Layout>
    </Layout>  
  )
}
