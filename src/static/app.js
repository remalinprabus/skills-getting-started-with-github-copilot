document.addEventListener("DOMContentLoaded", () => {
  const wordCountForm = document.getElementById("word-count-form");
  const messageDiv = document.getElementById("message");

  wordCountForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const word = document.getElementById("word").value;
    const textFile = document.getElementById("text-file").files[0];
    const formData = new FormData();
    formData.append("word", word);
    formData.append("text_file", textFile);

    try {
      const response = await fetch("/word-count", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = `"${result.word}" appears ${result.count} time(s) in ${result.filename}`;
        messageDiv.className = "success";
        wordCountForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to count words. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error counting words:", error);
    }
  });
});
