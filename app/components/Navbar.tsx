'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('en')

  const links = [
    {href:'/schools',label:'Schools'},
    {href:'/compare',label:'Compare'},
    {href:'/visa',label:'Visa'},
    {href:'/chat',label:'Sakura AI'},
    {href:'/community',label:'Community'},
    {href:'/dashboard',label:'Dashboard'},
    {href:'/blog',label:'Blog'},
    {href:'/apply',label:'Apply'},
    {href:'/contact',label:'Contact'},
    {href:'/pricing',label:'Pricing'},
    {href:'/profile',label:'Profile'},
    {href:'/login',label:'Login'},
  ]

  const langs = [
    {code:'en',flag:'🇬🇧'},
    {code:'bn',flag:'🇧🇩'},
    {code:'ne',flag:'🇳🇵'},
    {code:'jp',flag:'🇯🇵'},
  ]

  return (
    <nav style={{background:'#0D0907',borderBottom:'2px solid #C42020',padding:'0 20px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
      <Link href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
        <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#C42020'