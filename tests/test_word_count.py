from fastapi.testclient import TestClient

from src.app import app, count_word_occurrences


client = TestClient(app)


def test_count_word_occurrences_matches_whole_word_case_insensitive():
    text = "Hello hello HELLO hello-world shellow hello."
    assert count_word_occurrences(text, "hello") == 5


def test_word_count_endpoint_returns_count():
    response = client.post(
        "/word-count",
        data={"word": "python"},
        files={"text_file": ("sample.txt", b"Python python pyTHON snake", "text/plain")},
    )

    assert response.status_code == 200
    assert response.json() == {"filename": "sample.txt", "word": "python", "count": 3}


def test_word_count_endpoint_rejects_empty_word():
    response = client.post(
        "/word-count",
        data={"word": "   "},
        files={"text_file": ("sample.txt", b"anything", "text/plain")},
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Word must not be empty"
