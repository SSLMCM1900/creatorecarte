
// Elementi principali
const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const imageInput = document.getElementById("imageInput");
const imageWidthInput = document.getElementById("imageWidth");
const imageHeightInput = document.getElementById("imageHeight");
const topSymbolSelect = document.getElementById("topSymbolSelect");
const downloadBtn = document.getElementById("downloadBtn");
const rarityTextColorInput = document.getElementById("rarityTextColor");
const rarityBgColorInput = document.getElementById("rarityBgColor");
const cardTitle = document.getElementById("cardTitle");
const cardDescription = document.getElementById("cardDescription");
const cardImage = document.getElementById("cardImage");
const imageContainer = document.querySelector(".image-container");
const cardTopSymbol = document.getElementById("cardTopSymbol");
const footerControls = document.getElementById("footerControls");
const rarityBox = document.querySelector(".footer-rarity-box");
const cardPreview = document.getElementById("cardPreview");
const NumeroCarta = document.getElementById("NumeroCarta");
const cardNumberInput = document.getElementById("cardNumberInput");


const NCartaTestoInput = document.getElementById("NCartaTesto");
const NCartaSfondoInput = document.getElementById("NCartaSfondo");
const Rarita = document.getElementById("Rarita");   
const wordColors = [
    "#000000", "#FFFFFF", "#EEECE1", "#1F497D", "#4F81BD",
    "#C0504D", "#9BBB59", "#8064A2", "#4BACC6", "#F79646",
    "#FFFF00", "#FF0000", "#00FF00", "#0000FF", "#FF00FF"
];
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
const allowedSymbols = ["⇑", "⇓", "⇒", "⇐", "∞", "⚡", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const allowedShapes = ["circle", "star", "diamond"];
const E = ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9" ];
for (let i = 1; i <= 5; i++) {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "15px";
    
    if (i === 1) {
        // SOLO simboli da E[] per casella 1 (Tipologia E)
        const symbolLabel = document.createElement("label");
        symbolLabel.textContent = "Tipologia E";
        symbolLabel.style.display = "block";

        const symbolSelect = document.createElement("select");
        symbolSelect.dataset.index = i;
        E.forEach(symbol => {
            const opt = document.createElement("option");
            opt.value = symbol;
            opt.textContent = symbol;
            symbolSelect.appendChild(opt);
        });

        // Colore simbolo casella 1
        const symbolColorInput = document.createElement("input");
        symbolColorInput.type = "color";
        symbolColorInput.value = "#000000";
        symbolColorInput.dataset.index = i;
        symbolColorInput.classList.add("symbol-color");


        // Sfondo (forma) casella 1
        const shapeColorInput = document.createElement("input");
        shapeColorInput.type = "color";
        shapeColorInput.value = "#ffffff";
        shapeColorInput.dataset.index = i;
        shapeColorInput.classList.add("shape-color");

        symbolSelect.addEventListener("change", updateFooterSymbol);
        symbolColorInput.addEventListener("input", updateFooterSymbol);
        shapeColorInput.addEventListener("input", updateFooterSymbol);
        

     
       

       

    
    






        wrapper.appendChild(symbolLabel);
        wrapper.appendChild(symbolSelect);
        wrapper.appendChild(document.createTextNode("Colore simbolo: "));
        wrapper.appendChild(symbolColorInput);
        const textSwatchContainer = document.createElement("div");

        const element = document.getElementById(`Casella1`);

        textSwatchContainer.className = "swatch-container"; // classe già definita nel CSS con flex

        wordColors.forEach(color => {
            const swatch = document.createElement("div");
            swatch.className = "color-swatch";
            swatch.style.backgroundColor = color;
            swatch.addEventListener("click", () => {
                element.style.color = color;
            });
            textSwatchContainer.appendChild(swatch);
        });

        wrapper.appendChild(textSwatchContainer);
        wrapper.appendChild(document.createTextNode(" Colore sfondo: "));
       

        const bgSwatchContainer = document.createElement("div");
        bgSwatchContainer.className = "swatch-container";
        wordColors.forEach(color => {
            const swatch = document.createElement("div");
            swatch.className = "color-swatch";
            swatch.style.backgroundColor = color;
            swatch.addEventListener("click", () => {
                element.style.backgroundColor = color;
            });
            bgSwatchContainer.appendChild(swatch);
        });

        wrapper.appendChild(bgSwatchContainer);
        wrapper.appendChild(shapeColorInput);
        const Elimina = document.createElement("button")

        Elimina.textContent = "Elimina Casella 1";
        Elimina.addEventListener("click", () => {
            const box = document.getElementById(`Casella1`);
            if (box) {
                box.style.display = "none"; // Nascondi la casella
                // Pulisci il testo
            }
        });
        wrapper.appendChild(Elimina);
    } else {
        // Forma
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

        // Simbolo
        const symbolLabel = document.createElement("label");
        symbolLabel.textContent = `Simbolo casella ${i}`;
        symbolLabel.style.display = "block";

        const symbolSelect = document.createElement("select");
        symbolSelect.dataset.index = i;
        allowedSymbols.forEach(symbol => {
            const opt = document.createElement("option");
            opt.value = symbol;
            opt.textContent = symbol;
            symbolSelect.appendChild(opt);
        });

        // Colori
        const symbolColorInput = document.createElement("input");
        symbolColorInput.type = "color";
        symbolColorInput.value = "#000000";
        symbolColorInput.dataset.index = i;
        symbolColorInput.classList.add("symbol-color");

        const shapeColorInput = document.createElement("input");
        shapeColorInput.type = "color";
        shapeColorInput.value = "#ffffff";
        shapeColorInput.dataset.index = i;
        shapeColorInput.classList.add("shape-color");

        shapeSelect.addEventListener("change", updateFooterSymbol);
        symbolSelect.addEventListener("change", updateFooterSymbol);
        symbolColorInput.addEventListener("input", updateFooterSymbol);
        shapeColorInput.addEventListener("input", updateFooterSymbol);

        wrapper.appendChild(shapeLabel);
        wrapper.appendChild(shapeSelect);
        wrapper.appendChild(symbolLabel);
        wrapper.appendChild(symbolSelect);
        wrapper.appendChild(document.createTextNode("Colore simbolo: "));
        wrapper.appendChild(symbolColorInput);
        const textSwatchContainer = document.createElement("div");
        
       const element = document.getElementById(`Casella${i}`);
       
        textSwatchContainer.className = "swatch-container"; // classe già definita nel CSS con flex

        wordColors.forEach(color => {
            const swatch = document.createElement("div");
            swatch.className = "color-swatch";
            swatch.style.backgroundColor = color;
            swatch.addEventListener("click", () => {
                element.style.color = color;
            });
            textSwatchContainer.appendChild(swatch);
        });

        wrapper.appendChild(textSwatchContainer);
       
        
        wrapper.appendChild(document.createTextNode(" Colore sfondo: "));
     
        const bgSwatchContainer = document.createElement("div");
        bgSwatchContainer.className = "swatch-container";
        wordColors.forEach(color => {
            const swatch = document.createElement("div");
            swatch.className = "color-swatch";
            swatch.style.backgroundColor = color;
            swatch.addEventListener("click", () => {
                element.style.backgroundColor = color;
            });
            bgSwatchContainer.appendChild(swatch);
        });

        wrapper.appendChild(bgSwatchContainer);
        wrapper.appendChild(shapeColorInput);
        const Elimina = document.createElement("button")

        Elimina.textContent = `Elimina Casella ${i}`;
        Elimina.addEventListener("click", () => {
            const box = document.getElementById(`Casella${i}`);
            if (box) {
                box.style.display = "none"; // Nascondi la casella
                // Pulisci il testo
            }
        });
        wrapper.appendChild(Elimina);
    }

    footerControls.appendChild(wrapper);
}

// Aggiorna simbolo+forma in footer
function updateFooterSymbol(e) {
    const index = e.target.dataset.index;
    const selects = document.querySelectorAll(`select[data-index="${index}"]`);
    const box = document.querySelector(`.footer-image-box[data-index="${index}"]`);
    box.style.display = "flex"; // Assicurati che la casella sia visibile
    if (!box) return;

    // Colori per questa casella
    
   

    const symbolColorInput = document.querySelector(`input.symbol-color[data-index="${index}"]`);
    const shapeColorInput = document.querySelector(`input.shape-color[data-index="${index}"]`);
    if (index === "1") {

        const symbol = selects[0].value;
        box.className = "footer-image-box";
        box.textContent = symbol;
        box.style.color = symbolColorInput.value;
        box.style.backgroundColor = shapeColorInput.value;
    } else {
        const shape = selects[0].value;
        const symbol = selects[1].value;
        box.className = `footer-image-box ${shape}`;
        box.textContent = symbol;
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
    updateRarityColors(); // nuova funzione
});




cardNumberInput.addEventListener("input", () => {
    NumeroCarta.textContent = cardNumberInput.value || "Numero Carta";
});

footerControls.appendChild(rarityLabel);
footerControls.appendChild(raritySelect);

// Scarica immagine
downloadBtn.addEventListener("click", () => {
    const imageContainer = document.querySelector('.image-container');

    // Aggiunge la classe che rimuove resize, overflow e bordi
    imageContainer.classList.add('export-cleanup');

    html2canvas(cardPreview, { scale: 3.213 }).then(canvas => {
        const link = document.createElement("a");
        link.download = `carta_${cardTitle.textContent}.png`;
        link.href = canvas.toDataURL();
        link.click();

        // Ripristina lo stile dopo il download
        imageContainer.classList.remove('export-cleanup');
    });
});

// Palette colori Word


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
function updateRarityColors() {
    if (rarityBox) {
        rarityBox.style.color = rarityTextColorInput.value;
        rarityBox.style.backgroundColor = rarityBgColorInput.value;
    }
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
       
            box.style.color = symbolColor;
            box.style.backgroundColor = shapeColor;
        
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
createColorSwatches("rarityTextColorSwatches", "rarityTextColor", (color) => {
    rarityTextColorInput.value = color;
    updateRarityColors();
});

createColorSwatches("rarityBgColorSwatches", "rarityBgColor", (color) => {
    rarityBgColorInput.value = color;
    updateRarityColors();
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
    updateRarityColors();
    updateNumeroCartaColors();


    // Colori
    updateTitleFontColor(document.getElementById("titleFontColor").value);
    updateTitleBgColor(document.getElementById("titleBgColor").value);
    updateDescFontColor(document.getElementById("descFontColor").value);
    updateDescBgColor(document.getElementById("descBgColor").value);
    updateCardBgColor(document.getElementById("cardBgColor").value);
    updateFooterBgColor(document.getElementById("footerBgColor").value);

    // Inizializza colori simboli e forme
    updateFooterColors();
    updateFontSizes();

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
const titleFontSizeInput = document.getElementById("titleFontSizeInput");
const descFontSizeInput = document.getElementById("descFontSizeInput");

function updateFontSizes() {
    const titleSize = parseInt(titleFontSizeInput.value) || 14;
    const descSize = parseInt(descFontSizeInput.value) || 10;

    cardTitle.style.fontSize = `${titleSize}px`;
    cardTopSymbol.style.fontSize = `${titleSize}px`;
    cardDescription.style.fontSize = `${descSize}px`;
}

rarityTextColorInput.addEventListener("input", updateRarityColors);
rarityBgColorInput.addEventListener("input", updateRarityColors);

function updateNumeroCartaColors() {
    if (NumeroCarta) {
        NumeroCarta.style.color = NCartaTestoInput.value;
        NumeroCarta.style.backgroundColor = NCartaSfondoInput.value;
    }
}

NCartaTestoInput.addEventListener("input", updateNumeroCartaColors);
NCartaSfondoInput.addEventListener("input", updateNumeroCartaColors);
createColorSwatches("NCartaTestoColori", "NCartaTesto", (color) => {
    NCartaTestoInput.value = color;
    updateNumeroCartaColors();
});
createColorSwatches("NCartaSfondoColori", "NCartaSfondo", (color) => {
    NCartaSfondoInput.value = color;
    updateNumeroCartaColors();
});
const titleFontFamily = document.getElementById("titleFontFamily");
titleFontSizeInput.addEventListener("input", updateFontSizes);
titleFontFamily.addEventListener("change", () => {
    cardTitle.style.fontFamily = titleFontFamily.value;
    cardTopSymbol.style.fontFamily = titleFontFamily.value;
}

)

const descFontFamily = document.getElementById("descFontFamily");
descFontSizeInput.addEventListener("input", updateFontSizes);
descFontFamily.addEventListener("change", () => {
    cardDescription.style.fontFamily = descFontFamily.value;
   
}

)

const numberFontFamily = document.getElementById("numberFontFamily");

numberFontFamily.addEventListener("change", () => {
    NumeroCarta.style.fontFamily = numberFontFamily.value;

}

)
