import QRCode from 'react-qr-code'

export default function QrCodeGenerator({url}) {
	return (
		<>
			<QRCode value={url} size={240} />
		</>
	)
}
