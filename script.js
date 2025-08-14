
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
    if (descInput.value.trim() === "") {
        cardDescription.style.display = "none";
    } else {
        cardDescription.style.display = "block";
        // Esegui quando mostri la descrizione

        updateDescriptionPosition();
        cardDescription.innerHTML = descInput.value.replaceAll("\n", "<br>") || "Descrizione della carta";
    }
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
const allowedSymbols = ["⇑", "⇓", "⇒", "⇐", "∞", "⚡", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",  "-1", "-2", "-3", "-4", "-5", "-6", "-7", "-8", "-9"];
const allowedShapes = ["circle", "star", "diamond"];
const E = ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"];
const colorisimboli = ["black", "black","black"];
const coloriforme = ["white", "white", "white"];
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
        symbolColorInput.addEventListener("input", (e) => {
            colorisimboli[i] = e.target.value; // Salva il colore della forma
            updateFooterSymbol(e);
        });
        shapeColorInput.addEventListener("input", (e) => {
            coloriforme[i] = e.target.value; // Salva il colore della forma
            updateFooterSymbol(e);
        });

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
            swatch.dataset.index = i.toString(); // 👈 AGGIUNTO QUESTO
            swatch.addEventListener("click", (e) => {
                colorisimboli[i] = color; // Salva il colore della forma
                updateFooterSymbol(e);
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
            swatch.dataset.index = i.toString(); // 👈 AGGIUNTO QUESTO
            swatch.addEventListener("click", (e) => {
                coloriforme[i] = color; // Salva il colore della forma
                updateFooterSymbol(e);
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
const formeaggiunte = [0, 0, 0, 0, 0,0];
// Aggiorna simbolo+forma in footer
function updateFooterSymbol(e) {
   
    const index = e.target.dataset.index;
    const selects = document.querySelectorAll(`select[data-index="${index}"]`);
    const box = document.querySelector(`.footer-image-box[data-index="${index}"]`);
    const symbolColorInput = document.querySelector(`input.symbol-color[data-index="${index}"]`);
    const shapeColorInput = document.querySelector(`input.shape-color[data-index="${index}"]`);
    const symbol = index === "1" ? selects[0].value : selects[1].value;
    if (!box || selects.length === 0 || !symbolColorInput || !shapeColorInput) return;
    if (index === "1") {
        const symbol = selects[0].value;
        box.className = "footer-image-box";
        box.textContent = symbol;
        box.style.color = symbolColorInput.value;
        box.style.backgroundColor = shapeColorInput.value;
    } else {

        formeaggiunte[index] = 1
        const totaleForme = formeaggiunte.reduce((acc, val) => acc + val, 0);
        if (totaleForme >= 4) {
            const availableWidth = document.querySelector('.card-footer').clientWidth;
            const boxSize = Math.floor(190/ 7);
            resizeFooterShapes(boxSize);
        }
        const shape = index === "1" ? null : selects[0].value;
        const symbolColor = symbolColorInput.value;
        const shapeColor = shapeColorInput.value;

        // Definizione delle forme SVG
        const shapePolygons = {
            triangle: "50,0 100,100 0,100",
            hexagon: "25,0 75,0 100,50 75,100 25,100 0,50",
            star: "50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35",
            diamond: "50,0 100,50 50,100 0,50",
            square: "0,0 100,0 100,100 0,100",
            circle: "circle"
        };


        let shapeElement = "";

        if (shape === "circle") {
            shapeElement = `<circle cx="50" cy="50" r="45" id=shape${index} fill="${coloriforme[index]}" />`;
        } else {
            const points = shapePolygons[shape] || shapePolygons.square;
            shapeElement = `<polygon points="${points}" id=shape${index} fill="${coloriforme[index]}" />`;
        }

        // Costruzione SVG
        const svg = `
<svg xmlns="http://www.w3.org/2000/svg"  class="shape" viewBox="0 0 100 100" width="100%" height="100%">
  ${shapeElement}
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"id=symbol${index}
        fill="${colorisimboli[index]}" font-size="40" font-family="Noto Sans Symbols, Arial">
    ${symbol}
  </text>
</svg>
`;

        // Inserisci l’SVG nella box
        box.innerHTML = svg;
        box.style.display = "block";
    }
}


// Rarità
const rarityLabel = document.createElement("label");
rarityLabel.textContent = "Rarità (C, NC, R, SR, UR)";
rarityLabel.style.display = "block";
rarityLabel.style.marginTop = "15px";

const raritySelect = document.createElement("select");
["", "C", "NC", "R", "SR", "UR"].forEach(rarity => {
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
symbolColorInput.addEventListener("input", (color) => {
    shapeColorInput.value = color;
    Rarita.style.color = color;
    NumeroCarta.style.color = color;
    const Casella1 = document.getElementById(`Casella1`);
    if (Casella1) {
        Casella1.style.color = color;
    }
    for (let i = 2; i <= 5; i++) {
        const shapenuovo = document.getElementById(`symbol${i}`);
        if (shapenuovo) {
            shapenuovo.setAttribute('fill', color);
        }
    }
});
shapeColorInput.addEventListener("input", (color) => {
    shapeColorInput.value = color;
    Rarita.style.backgroundColor = color;
    NumeroCarta.style.backgroundColor = color;
    const Casella1 = document.getElementById(`Casella1`);
    if (Casella1) {
        Casella1.style.backgroundColor = color;
    }
    for (let i = 2; i <= 5; i++) {
        const shapenuovo = document.getElementById(`shape${i}`);
        if (shapenuovo) {
            shapenuovo.setAttribute('fill', color);
        }
    }

});



// Inizializza swatch

createColorSwatches("titleColorSwatches", "titleFontColor", updateTitleFontColor);
createColorSwatches("titleBgColorSwatches", "titleBgColor", updateTitleBgColor);
createColorSwatches("descColorSwatches", "descFontColor", updateDescFontColor);
createColorSwatches("descBgColorSwatches", "descBgColor", updateDescBgColor);
createColorSwatches("cardBgColorSwatches", "cardBgColor", updateCardBgColor);
createColorSwatches("footerBgColorSwatches", "footerBgColor", updateFooterBgColor);
createColorSwatches("symbolColorSwatches", "symbolColor", (color) => {
    shapeColorInput.value = color;
    Rarita.style.color = color;
    NumeroCarta.style.color = color;
    const Casella1 = document.getElementById(`Casella1`);
    if (Casella1) {
        Casella1.style.color = color;
    }
    for (let i = 2; i <= 5; i++) {
        const shapenuovo = document.getElementById(`symbol${i}`);
        if (shapenuovo) {
            shapenuovo.setAttribute('fill', color);
        }
    }
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
    Rarita.style.backgroundColor = color;
    NumeroCarta.style.backgroundColor = color;
    const Casella1 = document.getElementById(`Casella1`);   
    if (Casella1) {
        Casella1.style.backgroundColor = color;
    }
    for (let i = 2; i <= 5; i++) {
        const shapenuovo = document.getElementById(`shape${i}`);
        if (shapenuovo) {
            shapenuovo.setAttribute('fill', color);
        }
    }

});

// Inizializzazione
window.addEventListener("DOMContentLoaded", () => {
    updateImageContainerSize();
    cardTitle.textContent = titleInput.value || "Titolo";
    cardDescription.innerHTML = descInput.value.replaceAll("\n", "<br>") || "Descrizione della carta";
    cardTopSymbol.innerHTML = topSymbolSelect.value;
    updateRarityColors();
    updateNumeroCartaColors();
    const cardHeader = document.querySelector('.card-header');

    const headerWidth = cardHeader.offsetWidth;
    imageContainer.style.width = `${headerWidth}px`;

    const headerRect = cardHeader.getBoundingClientRect();
    const cardRect = cardHeader.closest('.card').getBoundingClientRect();

    const headerBottom = headerRect.bottom - cardRect.top; // posizione relativa alla .card
    imageContainer.style.top = `${headerBottom + 4}px`;
    imageWidthInput.value = imageContainer.offsetWidth;
    imageHeightInput.value = imageContainer.offsetHeight;

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
    let i = 2
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




function resizeFooterShapes( larghezza) {
    const footer = document.querySelector('.card-footer');
    const boxes = footer.querySelectorAll('.footer-image-box');
    const totalWidth = footer.clientWidth;
    const gap = 6; // come nel CSS
    const boxCount = boxes.length;



    boxes.forEach(box => {
        box.style.width = `${larghezza}px`;
       
    });
}




const card = document.querySelector('.card');

let isDragging = false;
let offsetX, offsetY;

imageContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = imageContainer.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const cardRect = card.getBoundingClientRect();
        let newLeft = e.clientX - cardRect.left - offsetX;
        let newTop = e.clientY - cardRect.top - offsetY;

        // Limiti per non uscire dalla card
        const maxLeft = card.clientWidth - imageContainer.clientWidth;
        const maxTop = card.clientHeight - imageContainer.clientHeight;

        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        imageContainer.style.left = `${newLeft}px`;
        imageContainer.style.top = `${newTop}px`;

        // Aggiorna la posizione della descrizione
        const imageBottom = newTop + imageContainer.offsetHeight;
        cardDescription.style.marginTop = `${imageBottom + 2}px`; // solo 2px di spazio
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

function updateDescriptionPosition() {
    const top = parseInt(imageContainer.style.top) || 0;
    const height = imageContainer.offsetHeight;
    const imageBottom = top + height;
    cardDescription.style.marginTop = `${imageBottom + 2}px`;
}

const observer = new ResizeObserver(() => {
    imageWidthInput.value = imageContainer.offsetWidth;
    imageHeightInput.value = imageContainer.offsetHeight;
});

observer.observe(imageContainer);


const shapePolygoni = {
  
    star: "7,0 8.54,4.9 13.72,4.9 9.94,8 11.48,12.9 7,10 2.52,12.9 4.06,8 0.28,4.9 5.46,4.9",
    diamond: "7,0 14,7 7,14 0,7",

    circle: "circle"
};

const bottone = document.getElementById("InserisciSimboloDesc");
const container = document.getElementById("container");
bottone.addEventListener("click", () => {
    const wrapper2 = document.createElement("div");
    wrapper2.style.marginBottom = "10px";
    wrapper2.style.display = "flex";
    wrapper2.style.flexDirection = "column"; // tutto in colonna
    wrapper2.style.gap = "5px"; // spazio tra gli elementi

    // Dropdown forme
    const shapeSelect = document.createElement("select");
    Object.keys(shapePolygoni).forEach(shape => {
        const option = document.createElement("option");
        option.value = shape;
        option.textContent = shape;
        shapeSelect.appendChild(option);
    });

    // Dropdown simboli
    const symbolSelect = document.createElement("select");
    allowedSymbols.forEach(symbol => {
        const option = document.createElement("option");
        option.value = symbol;
        option.textContent = symbol;
        symbolSelect.appendChild(option);
    });

    // Input colore simbolo
    const symbolColorInput = document.createElement("input");
    symbolColorInput.type = "color";
    symbolColorInput.value = "#000000";
    symbolColorInput.id = "symbolColorInput";

    // Container swatches simbolo (in riga, ma va a capo se necessario)
    const symbolColorSwatchContainer = document.createElement("div");
    symbolColorSwatchContainer.id = "symbolSwatchesContainer";
    symbolColorSwatchContainer.style.display = "flex";
    symbolColorSwatchContainer.style.flexWrap = "wrap"; // <- aggiunto
    symbolColorSwatchContainer.style.gap = "2px";


    // Input colore forma
    const shapeColorInput = document.createElement("input");
    shapeColorInput.type = "color";
    shapeColorInput.value = "#dddddd";
    shapeColorInput.id = "shapeColorInput";

    // Container swatches forma (in riga, ma va a capo se necessario)
    const shapeColorSwatchContainer = document.createElement("div");
    shapeColorSwatchContainer.id = "shapeSwatchesContainer";
    shapeColorSwatchContainer.style.display = "flex";
    shapeColorSwatchContainer.style.flexWrap = "wrap"; // <- aggiunto
    shapeColorSwatchContainer.style.gap = "2px";

    // SVG anteprima
    const svgPreview = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgPreview.setAttribute("width", "14");
    svgPreview.setAttribute("height", "14");
    svgPreview.setAttribute("viewBox", "0 0 14 14");

    const updateShape = () => {
        svgPreview.innerHTML = "";
        const shape = shapeSelect.value;
        const symbol = symbolSelect.value;
        const shapeColor = shapeColorInput.value;
        const symbolColor = symbolColorInput.value;
        let shapeElement;

        if (shape === "circle") {
            shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            shapeElement.setAttribute("cx", "7");
            shapeElement.setAttribute("cy", "7");
            shapeElement.setAttribute("r", "6");
            shapeElement.setAttribute("fill", shapeColor);
        } else {
            shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            shapeElement.setAttribute("points", shapePolygoni[shape]);
            shapeElement.setAttribute("fill", shapeColor);
        }

        const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textElement.setAttribute("x", "7");
        textElement.setAttribute("y", "8.5");
        textElement.setAttribute("text-anchor", "middle");
        textElement.setAttribute("dominant-baseline", "middle");
        textElement.setAttribute("font-size", "8");
        textElement.setAttribute("fill", symbolColor);
        textElement.textContent = symbol;

        svgPreview.append(shapeElement, textElement);
    };

    const insertButton = document.createElement("button");
    insertButton.textContent = "Inserisci simbolo";
    insertButton.addEventListener("click", () => {
        const cardDesc = document.getElementById("cardDescription");
        if (!cardDesc) return;

        const parolaDaSostituire = prompt("Inserisci la parola da sostituire con il simbolo:");
        if (!parolaDaSostituire) return;

        const svgInsert = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgInsert.setAttribute("width", "16");
        svgInsert.setAttribute("height", "16");
        svgInsert.setAttribute("viewBox", "0 0 16 16");
        svgInsert.style.verticalAlign = "middle";
        svgInsert.style.marginRight = "2px";

        const shape = shapeSelect.value;
        const symbol = symbolSelect.value;
        const shapeColor = shapeColorInput.value;
        const symbolColor = symbolColorInput.value;
        let shapeElement;

        if (shape === "circle") {
            shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            shapeElement.setAttribute("cx", "8");
            shapeElement.setAttribute("cy", "8");
            shapeElement.setAttribute("r", "7");
            shapeElement.setAttribute("fill", shapeColor);
        } else {
            shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            const points = shapePolygoni[shape].split(" ").map(p => {
                const [x, y] = p.split(",").map(Number);
                return `${(x / 14 * 16).toFixed(2)},${(y / 14 * 16).toFixed(2)}`;
            }).join(" ");
            shapeElement.setAttribute("points", points);
            shapeElement.setAttribute("fill", shapeColor);
        }

        const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textElement.setAttribute("x", "8");
        textElement.setAttribute("y", "9.5");
        textElement.setAttribute("text-anchor", "middle");
        textElement.setAttribute("dominant-baseline", "middle");
        textElement.setAttribute("font-size", "9");
        textElement.setAttribute("fill", symbolColor);
        textElement.textContent = symbol;

        svgInsert.append(shapeElement, textElement);

        // Sostituzione della parola
        const nodes = Array.from(cardDesc.childNodes);
        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const idx = node.textContent.indexOf(parolaDaSostituire);
                if (idx !== -1) {
                    const before = node.textContent.slice(0, idx);
                    const after = node.textContent.slice(idx + parolaDaSostituire.length);
                    const beforeNode = document.createTextNode(before);
                    const afterNode = document.createTextNode(after);
                    cardDesc.replaceChild(afterNode, node);
                    cardDesc.insertBefore(svgInsert, afterNode);
                    cardDesc.insertBefore(beforeNode, svgInsert);
                }
            }
        });
    });

    shapeSelect.addEventListener("change", updateShape);
    symbolSelect.addEventListener("change", updateShape);
    shapeColorInput.addEventListener("input", updateShape);
    symbolColorInput.addEventListener("input", updateShape);

    updateShape();

    // Append degli elementi (tutto in colonna)
    wrapper2.appendChild(shapeSelect);
    wrapper2.appendChild(symbolSelect);

    wrapper2.appendChild(symbolColorInput);
    wrapper2.appendChild(symbolColorSwatchContainer);

    wrapper2.appendChild(shapeColorInput);
    wrapper2.appendChild(shapeColorSwatchContainer);

    wrapper2.appendChild(svgPreview);
    wrapper2.appendChild(insertButton);

    container.appendChild(wrapper2);

    // Chiamata a createColorSwatches (gli swatch saranno in riga)
    createColorSwatches("symbolSwatchesContainer", "symbolColorInput", (color) => {
        symbolColorInput.value = color;
        updateShape();
    });
    createColorSwatches("shapeSwatchesContainer", "shapeColorInput", (color) => {
        shapeColorInput.value = color;
        updateShape();
    });
});


