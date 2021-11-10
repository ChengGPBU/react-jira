import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import { EpicScreen } from '../epic'
import { KanBanScreen } from '../kanban'
export const ProjectScreen = () => {
  return (
    <div>
      <Link to='kanban'>看板</Link>
      <Link to='epic'>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanBanScreen />} />
        <Route path={'/epic'} element={<EpicScreen />} />
      </Routes>
    </div>
  )
}

const Container = styled.div`
  padding:  3.2rem;
`
