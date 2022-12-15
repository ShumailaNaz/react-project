export default function ImageResult({ getImage, user, data }) {
	
	

	return (
		<div className="image-results">
			<div className="title">
				<h4>Image Results</h4>
			</div>
			{getImage && <div className="output-placeholder"
			>{data.sampleOutputText}</div>}
			{!getImage && <p>Loading...</p> }
		</div>
	);
}
