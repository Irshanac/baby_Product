import React from 'react'
import SideNav from './SideNav'
import { Outlet } from 'react-router-dom'
function AdminLayout() {
  return (
    <div style={styles.layout}>
      <SideNav/>
      <div style={styles.content}>
        <Outlet/>
      </div>
    </div>
  )
}
const styles = {
    layout: {
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100vh',
    },
    content: {
      flex: 1,
      padding: '1rem', // To prevent content being hidden behind footer
    }
  };

export default AdminLayout
