document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const dateInput = document.getElementById("date");
  const courseSelect = document.getElementById("course");
  const coursePreview = document.getElementById("coursePreview");

  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  if (courseSelect && coursePreview) {
    const updatePreview = () => {
      const selectedOption = courseSelect.options[courseSelect.selectedIndex];
      const imagePath = selectedOption?.getAttribute("data-image") || "";

      if (imagePath) {
        coursePreview.src = imagePath;
        coursePreview.style.display = "block";
      } else {
        coursePreview.src = "";
        coursePreview.style.display = "none";
      }
    };

    courseSelect.addEventListener("change", updatePreview);
    updatePreview();
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const contact = document.getElementById("contact").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!name || !contact || !phone) {
        alert("請填寫姓名、聯絡電話與 Email。")
        return;
      }

      const course = courseSelect?.value || "";
      const date = dateInput?.value || "";
      const time = document.getElementById("time").value;
      const people = document.getElementById("people").value;
      const note = document.getElementById("note").value.trim() || "無";

      const message = `確認報名資訊\n\n姓名：${name}\n聯絡電話：${phone}\nEmail：${contact}\n課程類型：${course || "未選擇"}\n報名日期：${date || "未選擇"}\n時段：${time}\n報名人數：${people}\n備註：${note}`;

      const confirmed = window.confirm(message);

      if (confirmed) {
        form.reset();
        if (dateInput) {
          dateInput.value = "";
        }
        if (coursePreview) {
          coursePreview.src = "";
          coursePreview.style.display = "none";
        }
        alert("報名資料已成功送出，感謝您的報名！");
      }
    });
  }
});