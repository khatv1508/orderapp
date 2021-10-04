
// export const copyToClipboard = (text) => {
//     document.execCommand('copy', true, text);
//   };

export async function copyToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }