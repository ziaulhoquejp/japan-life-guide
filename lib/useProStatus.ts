import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export function useProStatus() {
  const [isPro, setIsPro] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function checkPro() {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) { setLoading(false); return }
      setUser(userData.user)

      const { data: profile } = await supabase
        .from('profiles')
        .select('plan, status')
        .eq('id', userData.user.id)
        .single()

      if (profile && (profile.plan === 'pro' || profile.plan === 'lifetime')) {
        setIsPro(true)
      }
      setLoading(false)
    }
    checkPro()
  }, [])

  return { isPro, loading, user }
}