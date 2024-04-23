import { useState } from 'react'

function withToggle(OriginalComponenet) {
	const NewComponenet = () => {
		const [toggleValue, setToggleValue] = useState(false)

		const toggleHandler = () => {
			setToggleValue(prevToggle => !prevToggle)
		}

		return (
			<OriginalComponenet
				toggleValue={toggleValue}
				toggleHandler={toggleHandler}
			/>
		)
	}

	return NewComponenet
}

export default withToggle
