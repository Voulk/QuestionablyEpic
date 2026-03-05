

export const downloadJson = (data: any, filename: string) => {

  // Create a Blob with the JSON data
  const blob = new Blob([data], { type: 'application/json;charset=utf-8;' });

  // Create a temporary anchor element to trigger the download
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = filename; // Set the file name
  document.body.appendChild(link);
  link.click();

  // Clean up by removing the link and revoking the object URL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};