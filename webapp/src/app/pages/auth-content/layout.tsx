'use client'
import React from 'react'
import styled from 'styled-components'
import backgroundAuthScreen from '../../../assets/backgroundAuthScreen.png'

const Back = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundAuthScreen.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`

export default function AuthContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Back>{children}</Back>
}
