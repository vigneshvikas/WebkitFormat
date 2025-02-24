// Automatically format FetchXML as the user types
document.getElementById('fetchXmlInput').addEventListener('input', (event) => {
  const input = event.target.value;
  const formattedOutput = formatFetchXml(input);
  document.getElementById('formattedOutput').textContent = formattedOutput;
});

// Copy to Clipboard functionality
document.getElementById('copyButton').addEventListener('click', () => {
  const formattedOutput = document.getElementById('formattedOutput').textContent;
  if (formattedOutput) {
    navigator.clipboard.writeText(formattedOutput)
      .then(() => {
        alert('Formatted FetchXML copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy to clipboard. Please try again.');
      });
  } else {
    alert('No formatted FetchXML to copy.');
  }
});

// Maximize/Minimize functionality
const maximizeButton = document.getElementById('maximizeButton');
const outputBox = document.querySelector('.output-box');
const preElement = document.getElementById('formattedOutput');

maximizeButton.addEventListener('click', () => {
  if (outputBox.classList.contains('maximized')) {
    // Minimize
    outputBox.classList.remove('maximized');
    maximizeButton.innerHTML = '<i class="fas fa-expand"></i>';
    maximizeButton.title = 'Maximize';
  } else {
    // Maximize
    outputBox.classList.add('maximized');
    maximizeButton.innerHTML = '<i class="fas fa-compress"></i>';
    maximizeButton.title = 'Minimize';
  }
});

// Function to format FetchXML
function formatFetchXml(fetchXml) {
  // Add line breaks after tags
  fetchXml = fetchXml.replace(/(<[^>]+>)/g, '$1\n');

  // Indent the XML
  let formattedXml = '';
  let indentLevel = 0;
  fetchXml.split('\n').forEach(line => {
    line = line.trim();
    if (!line) return; // Skip empty lines

    // Decrease indent level for closing tags
    if (line.startsWith('</')) {
      indentLevel--;
    }

    // Add indentation
    formattedXml += '  '.repeat(indentLevel) + line + '\n';

    // Increase indent level for opening tags (unless self-closing)
    if (line.startsWith('<') && !line.endsWith('/>') && !line.startsWith('</')) {
      indentLevel++;
    }
  });

  return formattedXml.trim(); // Remove trailing newline
}