// ============================================
// North Star Bakery - Interactive Features
// ============================================

// ----- Product Data -----
const products = [
  { id: "breads", name: "Breads" },
  { id: "pastries", name: "Pastries" },
  { id: "cakes", name: "Cakes" },
  { id: "signature-loaf", name: "Signature Loaf" }
];

// The current favorites list
let favorites = [];

// ============================================
// Favorites Feature (Products Page)
// ============================================

function loadFavorites() {
  const stored = localStorage.getItem("northStarFavorites");
  if (stored) {
    favorites = JSON.parse(stored);
  } else {
    favorites = [];
  }
}

function saveFavorites() {
  localStorage.setItem("northStarFavorites", JSON.stringify(favorites));
}

function addFavorite(productId, productName) {
  const alreadySaved = favorites.some(function (item) {
    return item.id === productId;
  });

  if (!alreadySaved) {
    favorites.push({ id: productId, name: productName });
    saveFavorites();
    renderFavorites();
    updateButtons();
  }
}

function removeFavorite(productId) {
  favorites = favorites.filter(function (item) {
    return item.id !== productId;
  });
  saveFavorites();
  renderFavorites();
  updateButtons();
}

function renderFavorites() {
  const listContainer = document.getElementById("favorites-list");
  const emptyMessage = document.getElementById("favorites-empty");

  if (!listContainer) {
    return;
  }

  listContainer.innerHTML = "";

  if (favorites.length === 0) {
    if (emptyMessage) {
      emptyMessage.style.display = "block";
    }
    return;
  }

  if (emptyMessage) {
    emptyMessage.style.display = "none";
  }

  favorites.forEach(function (item) {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = item.name;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-favorite";
    removeBtn.addEventListener("click", function () {
      removeFavorite(item.id);
    });

    li.appendChild(nameSpan);
    li.appendChild(removeBtn);
    listContainer.appendChild(li);
  });
}

function updateButtons() {
  const buttons = document.querySelectorAll(".favorite-btn");

  buttons.forEach(function (btn) {
    const productId = btn.dataset.productId;
    const isSaved = favorites.some(function (item) {
      return item.id === productId;
    });

    if (isSaved) {
      btn.textContent = "Saved \u2713";
      btn.classList.add("saved");
    } else {
      btn.textContent = "Save to Favorites";
      btn.classList.remove("saved");
    }
  });
}

function setupFavoriteButtons() {
  const buttons = document.querySelectorAll(".favorite-btn");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const productId = btn.dataset.productId;
      const productName = btn.dataset.productName;

      const isSaved = favorites.some(function (item) {
        return item.id === productId;
      });

      if (isSaved) {
        removeFavorite(productId);
      } else {
        addFavorite(productId, productName);
      }
    });
  });
}

// ============================================
// Form Validation (Contact Page)
// ============================================

function showError(fieldId, message) {
  const errorSpan = document.getElementById(fieldId + "-error");
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.style.display = "block";
  }
}

function clearError(fieldId) {
  const errorSpan = document.getElementById(fieldId + "-error");
  if (errorSpan) {
    errorSpan.textContent = "";
    errorSpan.style.display = "none";
  }
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateForm(event) {
  let hasError = false;
    // --- Name check ---
  const nameField = document.getElementById("name");
  if (nameField) {
    const nameValue = nameField.value.trim();
    if (nameValue === "") {
      showError("name", "Please enter your name.");
      hasError = true;
    } else if (nameValue.length < 2) {
      showError("name", "Please enter at least 2 characters.");
      hasError = true;
    } else {
      clearError("name");
    }
  }

  // --- Pickup date check ---
  const pickupField = document.getElementById("pickup");
  if (pickupField) {
    const pickupValue = pickupField.value;
    if (pickupValue === "") {
      showError("pickup", "Please choose a pickup date.");
      hasError = true;
    } else {
      clearError("pickup");
    }
  }

  const email = document.getElementById("email");
  if (email) {
    const emailValue = email.value.trim();
    if (emailValue === "") {
      showError("email", "Please enter your email address.");
      hasError = true;
    } else if (!isValidEmail(emailValue)) {
      showError("email", "Please enter a valid email address (like name@example.com).");
      hasError = true;
    } else {
      clearError("email");
    }
  }

  const details = document.getElementById("details");
  if (details) {
    const detailsValue = details.value.trim();
    if (detailsValue === "") {
      showError("details", "Please describe what you'd like to order.");
      hasError = true;
    } else if (detailsValue.length < 10) {
      showError("details", "Please give us a bit more detail (at least 10 characters).");
      hasError = true;
    } else {
      clearError("details");
    }
  }

  if (hasError) {
    event.preventDefault();
  }
}

function setupFormValidation() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", validateForm);

    const email = document.getElementById("email");
    if (email) {
      email.addEventListener("input", function () {
        clearError("email");
      });
    }

    const details = document.getElementById("details");
    if (details) {
      details.addEventListener("input", function () {
        clearError("details");
      });
      
    }
        const nameField = document.getElementById("name");
    if (nameField) {
      nameField.addEventListener("input", function () {
        clearError("name");
      });
    }

    const pickupField = document.getElementById("pickup");
    if (pickupField) {
      pickupField.addEventListener("input", function () {
        clearError("pickup");
      });
    }
  }
}

// ============================================
// Initialize on Page Load
// ============================================

function init() {
  loadFavorites();
  setupFavoriteButtons();
  updateButtons();
  renderFavorites();
  setupFormValidation();
}

document.addEventListener("DOMContentLoaded", init);