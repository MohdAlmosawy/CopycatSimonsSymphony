const textElement = document.getElementById('gameName');
const text = textElement.textContent;
const colorsPalette = ['rgb(255, 65, 54)', 'rgb(0, 116, 217)', 'rgb(46, 204, 64)', 'rgb(255, 220, 0)', 'white'];
let styledText = '';
for (let i = 0; i < text.length; i++) {
  let colorIndex = i % colorsPalette.length;
  const span = `<span style="color: ${colorsPalette[colorIndex]}">${text[i]}</span>`;
  styledText += span;
}
textElement.innerHTML = styledText;