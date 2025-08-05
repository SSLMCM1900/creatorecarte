// Elementi principali
const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const imageInput = document.getElementById("imageInput");
const imageWidthInput = document.getElementById("imageWidth");
const imageHeightInput = document.getElementById("imageHeight");
const topSymbolSelect = document.getElementById("topSymbolSelect");
const downloadBtn = document.getElementById("downloadBtn");

const cardTitle = document.getElementById("cardTitle");
const cardDescription = document.getElementById("cardDescription");
const cardImage = document.getElementById("cardImage");
const imageContainer = document.querySelector(".image-container");
const cardTopSymbol = document.getElementById("cardTopSymbol");
const footerControls = document.getElementById("footerControls");
const rarityBox = document.querySelector(".footer-rarity-box");
const cardPreview = document.getElementById("cardPreview");

// Nuovi input per colori simboli e forme
const symbolColorInput = document.getElementById("symbolColor");
const shapeColorInput = document.getElementById("shapeColor");

// Titolo
titleInput.addEventListener("input", () => {
    cardTitle.textContent = titleInput.value || "Titolo";
});

// Descrizione
descInput.addEventListener("input", () => {
    cardDescription.innerHTML = descInput.value.replaceAll("\n", "<br>") || "Descrizione della carta";
});

// Immagine
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            cardImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        cardImage.src = "";
    }
});

// Dimensioni immagine
function updateImageContainerSize() {
    const w = parseInt(imageWidthInput.value);
    const h = parseInt(imageHeightInput.value);
    if (!isNaN(w) && !isNaN(h)) {
        imageContainer.style.width = w + "px";
        imageContainer.style.height = h + "px";
    }
}
imageWidthInput.addEventListener("input", updateImageContainerSize);
imageHeightInput.addEventListener("input", updateImageContainerSize);

// Simbolo in alto
topSymbolSelect.addEventListener("change", () => {
    cardTopSymbol.innerHTML = topSymbolSelect.value;
});

// Simboli e forme
const allowedSymbols = ["↑", "↓", "→", "←", "∞", "⚡", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const allowedShapes = ["circle", "star", "diamond"];

for (let i = 1; i <= 5; i++) {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "10px";

    const shapeLabel = document.createElement("label");
    shapeLabel.textContent = `Forma casella ${i}`;
    shapeLabel.style.display = "block";

    const shapeSelect = document.createElement("select");
    shapeSelect.dataset.index = i;
    allowedShapes.forEach(shape => {
        const opt = document.createElement("option");
        opt.value = shape;
        opt.textContent = shape;
        shapeSelect.appendChild(opt);
    });

    const symbolLabel = document.createElement("label");
    symbolLabel.textContent = `Simbolo casella ${i}`;
    symbolLabel.style.display = "block";
    symbolLabel.style.marginTop = "5px";

    const symbolSelect = document.createElement("select");
    symbolSelect.dataset.index = i;
    allowedSymbols.forEach(symbol => {
        const opt = document.createElement("option");
        opt.value = symbol;
        opt.textContent = symbol;
        symbolSelect.appendChild(opt);
    });

    shapeSelect.addEventListener("change", updateFooterSymbol);
    symbolSelect.addEventListener("change", updateFooterSymbol);

    wrapper.appendChild(shapeLabel);
    wrapper.appendChild(shapeSelect);
    wrapper.appendChild(symbolLabel);
    wrapper.appendChild(symbolSelect);
    footerControls.appendChild(wrapper);
}

// Aggiorna simbolo+forma in footer
function updateFooterSymbol(e) {
    const index = e.target.dataset.index;
    const shape = document.querySelectorAll(`select[data-index="${index}"]`)[0].value;
    const symbol = document.querySelectorAll(`select[data-index="${index}"]`)[1].value;
    const box = document.querySelector(`.footer-image-box[data-index="${index}"]`);
    if (box) {
        box.className = `footer-image-box ${shape}`;
        box.textContent = symbol;

        // Mantieni colori correnti (non sovrascrivere)
        box.style.color = symbolColorInput.value;
        box.style.backgroundColor = shapeColorInput.value;
    }
}

// Rarità
const rarityLabel = document.createElement("label");
rarityLabel.textContent = "Rarità (C, NC, R, UR)";
rarityLabel.style.display = "block";
rarityLabel.style.marginTop = "15px";

const raritySelect = document.createElement("select");
["", "C", "NC", "R", "UR"].forEach(rarity => {
    const opt = document.createElement("option");
    opt.value = rarity;
    opt.textContent = rarity;
    raritySelect.appendChild(opt);
});
raritySelect.addEventListener("change", () => {
    rarityBox.textContent = raritySelect.value;
    updateFooterColors(); // aggiorna colori rarità quando cambia
});

footerControls.appendChild(rarityLabel);
footerControls.appendChild(raritySelect);

// Scarica immagine
downloadBtn.addEventListener("click", () => {
    html2canvas(cardPreview).then(canvas => {
        const link = document.createElement("a");
        link.download = "carta.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

// Palette colori Word
const wordColors = [
    "#000000", "#FFFFFF", "#EEECE1", "#1F497D", "#4F81BD",
    "#C0504D", "#9BBB59", "#8064A2", "#4BACC6", "#F79646",
    "#FFFF00", "#FF0000", "#00FF00", "#0000FF", "#FF00FF"
];

function createColorSwatches(containerId, inputId, updateFunc) {
    const container = document.getElementById(containerId);
    const input = document.getElementById(inputId);

    wordColors.forEach(color => {
        const swatch = document.createElement("div");
        swatch.className = "color-swatch";
        swatch.style.backgroundColor = color;
        swatch.addEventListener("click", () => {
            input.value = color;
            updateFunc(color);
        });
        container.appendChild(swatch);
    });

    input.addEventListener("input", () => {
        updateFunc(input.value);
    });
}

// Colori
function updateTitleFontColor(color) {
    cardTitle.style.color = color;
    cardTopSymbol.style.color = color;
}
function updateTitleBgColor(color) {
    const header = document.querySelector(".card-header");
    header.style.backgroundColor = color;
}

function updateDescFontColor(color) {
    cardDescription.style.color = color;
}

function updateDescBgColor(color) {
    cardDescription.style.backgroundColor = color;
}
function updateCardBgColor(color) {
    cardPreview.style.backgroundColor = color;
}

function updateFooterBgColor(color) {
    const footer = document.querySelector(".card-footer");
    if (footer) {
        footer.style.backgroundColor = color;
    }
}

// Gestione colori simboli e forme + rarità
function updateFooterColors() {
    const symbolColor = symbolColorInput.value;
    const shapeColor = shapeColorInput.value;

    for (let i = 1; i <= 5; i++) {
        const box = document.querySelector(`.footer-image-box[data-index="${i}"]`);
        if (box) {
            box.style.color = symbolColor;
            box.style.backgroundColor = shapeColor;
        }
    }

    if (rarityBox) {
        rarityBox.style.backgroundColor = shapeColor;
        rarityBox.style.color = symbolColor;
    }
}
symbolColorInput.addEventListener("input", updateFooterColors);
shapeColorInput.addEventListener("input", updateFooterColors);

// Inizializza swatch
createColorSwatches("titleColorSwatches", "titleFontColor", updateTitleFontColor);
createColorSwatches("titleBgColorSwatches", "titleBgColor", updateTitleBgColor);
createColorSwatches("descColorSwatches", "descFontColor", updateDescFontColor);
createColorSwatches("descBgColorSwatches", "descBgColor", updateDescBgColor);
createColorSwatches("cardBgColorSwatches", "cardBgColor", updateCardBgColor);
createColorSwatches("footerBgColorSwatches", "footerBgColor", updateFooterBgColor);
createColorSwatches("symbolColorSwatches", "symbolColor", (color) => {
    symbolColorInput.value = color;
    updateFooterColors();
});

createColorSwatches("shapeColorSwatches", "shapeColor", (color) => {
    shapeColorInput.value = color;
    updateFooterColors();
});

// Inizializzazione
window.addEventListener("DOMContentLoaded", () => {
    updateImageContainerSize();
    cardTitle.textContent = titleInput.value || "Titolo";
    cardDescription.innerHTML = descInput.value.replaceAll("\n", "<br>") || "Descrizione della carta";
    cardTopSymbol.innerHTML = topSymbolSelect.value;

    // Colori
    updateTitleFontColor(document.getElementById("titleFontColor").value);
    updateTitleBgColor(document.getElementById("titleBgColor").value);
    updateDescFontColor(document.getElementById("descFontColor").value);
    updateDescBgColor(document.getElementById("descBgColor").value);
    updateCardBgColor(document.getElementById("cardBgColor").value);
    updateFooterBgColor(document.getElementById("footerBgColor").value);

    // Inizializza colori simboli e forme
    updateFooterColors();

    // Reset caselle
    for (let i = 1; i <= 5; i++) {
        const box = document.querySelector(`.footer-image-box[data-index="${i}"]`);
        if (box) {
            box.className = "footer-image-box";
            box.textContent = "";
        }
    }

    if (rarityBox) {
        rarityBox.textContent = "";
    }
});
