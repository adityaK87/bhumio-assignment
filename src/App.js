import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "./App.css";

function App() {
	const [imagePath, setImagePath] = useState("");
	const [text, setText] = useState("");
	const [progress, setProgress] = useState(0);

	const handleChange = (event) => {
		setImagePath(URL.createObjectURL(event.target.files[0]));
	};

	const handleClick = () => {
		Tesseract.recognize(imagePath, "eng", {
			logger: ({ status, progress }) => {
				setProgress(progress * 100);
			},
		})
			.catch((err) => {
				console.error(err);
			})
			.then((result) => {
				// Get Confidence score
				console.log("Result", result.data);
				let confidence = result.confidence;

				let text = result.data.text;
				setText(text);
			});
	};

	console.log("imagePath", imagePath);
	return (
		<div className="App">
			<main className="App-main">
				<h3>Actual image uploaded</h3>
				<img src={imagePath} className="App-image" alt="logo" />

				<h3>Extracted text</h3>
				<div className="text-box">
					<p> {text} </p>
				</div>
				<progress max={100} value={progress} />
				<input type="file" onChange={handleChange} />
				<button onClick={handleClick} style={{ height: 50 }}>
					convert to text
				</button>
			</main>
		</div>
	);
}

export default App;
