# Word Occurrence Counter API

A simple FastAPI application that counts occurrences of a specific word in an uploaded text file.

## Features

- Upload a text file
- Count case-insensitive, whole-word matches for a given word

## Getting Started

1. Install the dependencies:

   ```
   pip install fastapi uvicorn
   ```

2. Run the application:

   ```
   python app.py
   ```

3. Open your browser and go to:
   - API documentation: http://localhost:8000/docs
   - Alternative documentation: http://localhost:8000/redoc

## API Endpoint

| Method | Endpoint      | Description                                                   |
| ------ | ------------- | ------------------------------------------------------------- |
| POST   | `/word-count` | Upload a text file and return how many times a word appears. |
