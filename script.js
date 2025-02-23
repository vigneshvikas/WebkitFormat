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
  
  // Bookmark This Site functionality
  document.getElementById('bookmarkButton').addEventListener('click', () => {
    const pageTitle = document.title;
    const pageUrl = window.location.href;
  
    if (window.sidebar && window.sidebar.addPanel) {
      // Firefox
      window.sidebar.addPanel(pageTitle, pageUrl, '');
    } else if (window.external && ('AddFavorite' in window.external)) {
      // Internet Explorer
      window.external.AddFavorite(pageUrl, pageTitle);
    } else if (window.opera && window.print) {
      // Opera
      const bookmarkLink = document.createElement('a');
      bookmarkLink.setAttribute('href', pageUrl);
      bookmarkLink.setAttribute('title', pageTitle);
      bookmarkLink.setAttribute('rel', 'sidebar');
      bookmarkLink.click();
    } else {
      // Other browsers (e.g., Chrome, Safari)
      alert(`Press ${navigator.userAgent.includes('Mac') ? 'Cmd+D' : 'Ctrl+D'} to bookmark this page.`);
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