import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function useGetFetch(api) {
	const supabase = createClient(
		api,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttbXdreXBwY2lyempoZ2NlbW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1NDk4NTUsImV4cCI6MjAxNTEyNTg1NX0.qRYhBkm3OOGsFKtlhDtC6VbR0U_0yJj4Ht1H3rBRtX4'
	)

	const [datas, setDatas] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch(supabase)
			.then((res) => res.json())
			.then((datas) => {
				setDatas(datas)
				setIsLoading(false)
			})
			.catch((err) => setError(err))
	}, [])

	return { datas, isLoading, error }
}
