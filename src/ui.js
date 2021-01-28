import styled from 'styled-components'

export const Card = styled.div`
	box-shadow: 0 1px 3px rgba(41, 117, 209, 0.12),
		0 1px 2px rgba(41, 117, 209, 0.24);
	border: 4px solid var(--lighterColor);
	border-radius: 0.3rem;
	padding: 1rem;

	:hover {
		box-shadow: 0px 2px 4px -1px rgba(41, 117, 209, 0.2),
			0px 4px 5px 0px rgba(41, 117, 209, 0.14),
			0px 1px 10px 0px rgba(41, 117, 209, 0.12);
	}

	${(props) => (props.color ? `border-color: ${props.color}` : '')}
`
