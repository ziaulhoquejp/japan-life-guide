'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type School = {
  id: string
  name_en: string
  name_jp: string
  city: string
  annual_fee_jpy: number
  has_dorm: boolean
  jlpt_prep: boolean
  scholarship: boolean
  rating: number
  icon: string
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function getSchools() {
      console.log('Fetching schools...')
      const { data, error } = await supabase
        .from('schools')
        .select('*')
      
      console.log('Data:', data)
      console.log('Error:', error)
      
      if (error) {
        setError(error.message)
      }
      if (data) setSchools(data)
      setLoading(false)
    }
    getSchools()
  }, [])

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: '#0D0907',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
    }}>
      🌸 読み込み中...
    </div>
  )

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0D0907',
      padding: '40px',
      fontFamily: 'sans-serif',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          color: 'white',
          fontSize: '40px',
          fontWeight: '700',
          marginBottom: '8px',
        }}>
          🏫 語学学校一覧
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '16px',
        }}>
          {schools.length}校のデータが見つかりました
        </p>
        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            エラー: {error}
          </p>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {schools.map(school => (
          <div key={school.id} style={{
            background: '#1A2035',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            <div style={{
              background: 'rgba(196,32,32,0.1)',
              padding: '32px',
              textAlign: 'center',
              fontSize: '48px',
            }}>
              {school.icon}
            </div>
            <div style={{ padding: '20px' }}>
              <h2 style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '4px',
              }}>
                {school.name_en}
              </h2>
              <p style={{
                color: '#C42020',
                fontSize: '12px',
                marginBottom: '8px',
              }}>
                {school.name_jp}
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '12px',
                marginBottom: '16px',
              }}>
                📍 {school.city}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{
                  color: '#F0A830',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                }}>
                  ¥{school.annual_fee_jpy.toLocaleString()}/yr
                </span>
                <span style={{
                  color: '#F0A830',
                  fontSize: '14px',
                }}>
                  ⭐ {school.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}